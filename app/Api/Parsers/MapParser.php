<?php

namespace App\Api\Parsers;

use App\Contracts\ParserInterface;

class MapParser extends BaseParser implements ParserInterface {

    protected $template = [
        self::PARAMS['MAP']    => []
    ];

    function __construct()
    {
        parent::__construct();
    }

    public function parse()
    {
        if (
            isset($this->options[self::PARAMS['MAP']])
        ) {
            $this->result[self::PARAMS['MAP']] = $this->options[self::PARAMS['MAP']];
        }

        return $this;
    }
}