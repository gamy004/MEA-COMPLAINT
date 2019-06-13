<?php

namespace App\Api;

use Exception;
use Illuminate\Support\Collection;
use InvalidArgumentException;

class Architect
{
    protected $parser;
    protected $options;
    protected $resolvers;
    protected $default;
    private $modeResolvers = [];

    public function __construct(Parser $parser)
    {
        $this->parser = $parser;
        $this->options = $parser->result();
        $this->resolvers = config('api.resolver');
        $this->default = config('api.default_resolver');
    }

    /**
     * Parse a collection using given modes.
     * @param  mixed $data The collection to be parsed
     * @param  array  $modes The modes to be used, format is ['relation' => 'mode']
     * @param  string $key A key to hoist the collection into the root array
     * @return array
     */
    public function parseData($data, array $modes, $key = null)
    {
        $return = [];

        uksort($modes, function ($a, $b) {
            return substr_count($b, '.') - substr_count($a, '.');
        });

        if (Utility::isCollection($data)) {
            $parsed = $this->parseCollection($modes, $data, $return);
        } else {
            $parsed = $this->parseResource($modes, $data, $return);
        }
        if ($key !== null) {
            $return[$key] = $parsed;
        } else {
            if (in_array('sideload', $modes)) {
                throw new InvalidArgumentException('$key cannot be null when ' .
                    'resources are transformed using sideload.');
            }
            $return = $parsed;
        }
        return collect($return);
    }
    /**
     * Parse a collection using given modes
     * @param  array  $modes
     * @param  mixed $collection
     * @param  array $root
     * @param  string $fullPropertyPath
     * @return mixed
     */
    private function parseCollection(array $modes, $collection, &$root, $fullPropertyPath = '')
    {
        if (is_array($collection)) {
            foreach ($collection as $i => $resource) {
                $collection[$i] = $this->parseResource($modes, $resource, $root, $fullPropertyPath);
            }
        } elseif ($collection instanceof Collection) {
            $collection = $collection->map(function ($resource) use ($modes, &$root, $fullPropertyPath) {
                return $this->parseResource($modes, $resource, $root, $fullPropertyPath);
            });
        }
        return $collection;
    }
    /**
     * Parse a single resource using given modes
     * @param  array  $modes
     * @param  mixed $resource
     * @param  array $root
     * @param  string $fullPropertyPath
     * @return mixed
     */
    private function parseResource(array $modes, &$resource, &$root, $fullPropertyPath = '')
    {
        foreach ($modes as $relation => $mode) {
            $modeResolver = $this->resolveMode($mode);
            $steps = explode('.', $relation);
            // Get the first resource in the relation
            // TODO: Refactor
            $property = array_shift($steps);

            if (is_array($resource)) {
                if ($resource[$property] === null) {
                    continue;
                }
                $object = &$resource[$property];
            } else {
                if ($resource->{$property} === null) {
                    continue;
                }
                $object = &$resource->{$property};
            }
            // dump($object, $resource, $property);
            if (empty($steps)) {
                // This is the deepest level. Resolve it.
                $fullPropertyPath .= $relation;
                try {
                    $object = $this->modeResolvers[$mode]->resolve($relation, $object, $root, $fullPropertyPath);
                } catch (Exception $e) {
                    // Some nested reltion might been already solved. Thus, the algorithm might didn't find the relation later and we skip that resolve.
                }
            } else {
                // More levels exist in this relation.
                // We want a drill down and resolve the deepest level first.
                $path = implode('.', $steps);
                $modes = [
                    $path => $mode,
                ];
                // Add the previous levels to the full path so it can be used
                // to populate the root level properly.
                $fullPropertyPath .= $property . '.';
                if (Utility::isCollection($object)) {
                    $object = $this->parseCollection($modes, $object, $root, $fullPropertyPath);
                } else {
                    $object = $this->parseResource($modes, $object, $root, $fullPropertyPath);
                }
            }
            // Reset the full property path after running a full relation
            $fullPropertyPath = '';
            Utility::setProperty($resource, $property, $object);
        }

        return $resource;
    }
    /**
     * Resolve a mode resolver class if it has not been resolved before
     * @param  string $mode The mode to be resolved
     * @return App\Api\Resolvers\ModeResolverInterface
     */
    private function resolveMode($mode)
    {
        if (!isset($this->modeResolvers[$mode])) {
            $this->modeResolvers[$mode] = $this->createModeResolver($mode);
        }

        return $this->modeResolvers[$mode];
    }
    /**
     * Instantiate a mode resolver class
     * @param  string $mode [description]
     * @return App\Api\Resolvers\ModeResolverInterface
     */
    private function createModeResolver($mode)
    {
        if (!array_key_exists($mode, $this->resolvers)) {
            $mode = $this->default;
        }

        return app($this->resolvers[$mode]);
    }
}
