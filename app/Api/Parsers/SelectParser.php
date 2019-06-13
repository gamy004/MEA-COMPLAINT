<?php

namespace App\Api\Parsers;

use App\IOCs\Data;
use App\Contracts\ParserInterface;

class SelectParser extends BaseParser implements ParserInterface {
    protected $template = [
        self::PARAMS['SELECT']   => [],
        self::PARAMS['SEARCH']   => [
            Data::KEYWORD   => '',
            Data::FIELDS    => []
        ]
    ];

    public static $messages = [
        'missing_fields_argument' => "Search requires parameter 'FIELDS'",
        'missing_keyword_argument' => "Search requires parameter 'KEYWORD'",
    ];

    function __construct()
    {
        parent::__construct();
    }

    public function parse()
    {
        // When request coming with key "select"
        if (
            isset($this->options[self::PARAMS['SELECT']])
        ) {
            $result = $this->parseSelect($this->options[self::PARAMS['SELECT']]);

            $this->result[self::PARAMS['SELECT']] = $result[self::PARAMS['SELECT']];
        }

        if (
            isset($this->options[self::PARAMS['SEARCH']])
        ) {
            $this->result[self::PARAMS['SEARCH']] = $this->options[self::PARAMS['SEARCH']];
        }

        return $this;
    }

    protected function parseSelect(array $selects)
    {
        return array_reduce(
            $selects,
            function ($res, $select) {
                $extracted_select = explode(":", $select);

                if (count($extracted_select) === 1) {
                    array_push($res[self::PARAMS['SELECT']], head($extracted_select));
                } else {
                    $relation = $extracted_select[0];
                    $selectFields = explode(",", $extracted_select[1]);
                    $res[self::PARAMS['SELECT']][$relation] = $selectFields;
                    unset($relation, $selectFields);
                }

                return $res;
            }, $this->template
        );
    }
}