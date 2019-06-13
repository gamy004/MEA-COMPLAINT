<?php

namespace App\Api\Parsers;

use App\Contracts\ParserInterface;

class IncludeParser extends BaseParser implements ParserInterface {
    protected $template = [
        self::PARAMS['INCLUDES']    => [],
        self::PARAMS['MODES']   => []
    ];

    function __construct()
    {
        parent::__construct();
    }

    public function parse()
    {
        if (isset($this->options[self::PARAMS['INCLUDES']])) {
            $this->result[self::PARAMS['INCLUDES']] = array_reduce(
                $this->options[self::PARAMS['INCLUDES']],
                function ($res, $include) {
                    $explode = explode(':', $include);
                    
                    $relation = $explode[0];

                    if (!isset($explode[1])) {
                        $explode[1] = self::DEFAULT['INCLUDE_MODE'];
                    }

                    $res[] = $relation;

                    $this->result[self::PARAMS['MODES']][$relation] = $explode[1];

                    return $res;
                },
                []
            );
        }

        return $this;
    }
}