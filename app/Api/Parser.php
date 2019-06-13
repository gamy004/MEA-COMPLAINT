<?php

namespace App\Api;

class Parser
{
    /**
     * Array store parsed options
     *
     * @var array
     */
    protected $options = array();
    protected $result = array();

    function __construct()
    {
        $this->buildTemplate();
    }

    public function getTemplate()
    {
        $this->buildTemplate();
        
        return $this->options;
    }

    private function buildTemplate()
    {
        array_map(
            function ($parser) {
                $this->options = array_merge(
                    $this->options,
                    app($parser)->template()
                );
            },
            $this->getParsers()
        );

        $this->result = $this->options;
        
        return $this;
    }

    protected function getParsers()
    {
        return config('api.parser');
    }

    public function result()
    {
        return $this->result;
    }

    public function getOption($key)
    {
        return $this->hasOption($key) ? $this->options[$key] : null;
    }

    public function setOption($key, $value)
    {
        $this->options[$key] = $value;
    }

    public function hasOption($key)
    {
        return array_key_exists($key, $this->options);
    }

    public function parse(array $options = [])
    {
        $this->result = [];

        $parsers = $this->getParsers();

        array_map(
            function ($parser) use ($options) {
                $parser = app($parser);
                
                $this->result = array_merge(
                $this->result,
                $parser->setOption($options)->parse()->result()
            );
            },
            $parsers
        );
        
        return $this;
    }
}
