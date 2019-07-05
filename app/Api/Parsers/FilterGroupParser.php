<?php

namespace App\Api\Parsers;

use InvalidArgumentException;
use App\Contracts\ParserInterface;

class FilterGroupParser extends BaseParser implements ParserInterface {
    protected $template = [
        self::PARAMS['FILTER_GROUPS']   => [],
        self::PARAMS['FILTER_MAPPING']   => [],
    ];

    function __construct()
    {
        parent::__construct();
    }

    public function parse()
    {
        // When request coming with key "filter_groups"
        if (
            isset($this->options[self::PARAMS['FILTER_GROUPS']])
        ) {
            $this->result[self::PARAMS['FILTER_GROUPS']] = array_reduce(
                $this->options[self::PARAMS['FILTER_GROUPS']],
                function ($res, $filters) {
                    $or = isset($filters[self::PARAMS['OR']]) ? $filters[self::PARAMS['OR']] : false;

                    $filters = $this->parseFilterGroup($filters);

                    $res[] = compact(self::PARAMS['FILTERS'], self::PARAMS['OR']);
 
                    return $res;
                },
                []
            );
        }

        // When request coming with "filters"
        if (
            isset($this->options[self::PARAMS['FILTERS']])
        ) {
            $filters = $this->options[self::PARAMS['FILTERS']];

            $this->result[self::PARAMS['FILTER_GROUPS']] = [];

            $this->result[self::PARAMS['FILTER_GROUPS']][] = [
                self::PARAMS['FILTERS'] => $this->parseFilters($filters),
                self::PARAMS['OR'] => false
            ];
        }
        
        return $this;
    }

    protected function parseFilterGroup(array $filter_group)
    {
        if (!isset($filter_group[self::PARAMS['FILTERS']])) {
            throw new InvalidArgumentException(
                'Filter group does not have the \'filters\' key.'
            );
        }

        $filters = $filter_group[self::PARAMS['FILTERS']];

        return $this->parseFilters($filters);
    }

    protected function parseFilters(array $filters)
    {
        return array_map(
            function ($filter) {
                $value = isset($filter[self::PARAMS['VALUE']]) ? $filter[self::PARAMS['VALUE']] : 'null';

                $filter[self::PARAMS['VALUE']] = $value;

                $this->result[self::PARAMS['FILTER_MAPPING']][$filter[self::PARAMS['KEY']]] = $value;

                if (!isset($filter[self::PARAMS['NOT']])) {
                    $filter[self::PARAMS['NOT']] = self::DEFAULT['NOT'];
                }

                if (!isset($filter[self::PARAMS['OPERATOR']])) {
                    $filter[self::PARAMS['OPERATOR']] = self::DEFAULT['OPERATOR'];
                }

                return $filter;
            },
            $filters
        );
    }
}