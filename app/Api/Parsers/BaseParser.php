<?php

namespace App\Api\Parsers;

use InvalidArgumentException;

class BaseParser
{
    const DEFAULT = [
        'NOT'               => false,
        'OPERATOR'          => 'eq',
        'INCLUDE_MODE'      => 'embbed',
        'SORT_DIRECTION'    => 'ASC',
        'SORT_FIELD'        => 'id',
        'PAGE'              => null,
        'LIMIT'             => null,
        'OFFSET'            => null
    ];

    const PARAMS = [
        'KEY'               => 'key',
        'NOT'               => 'not',
        'OR'                => 'or',
        'FILTERS'           => 'filters',
        'FILTER_GROUPS'     => 'filter_groups',
        'FILTER_MAPPING'    => 'filter_mapping',
        'INCLUDES'          => 'includes',
        'OPERATOR'          => 'operator',
        'MODES'             => 'modes',
        'SORT'              => 'sort',
        'DIRECTION'         => 'direction',
        'PAGE'              => 'page',
        'LIMIT'             => 'limit',
        'OFFSET'            => 'offset',
        'FIELDS'            => 'fields',
        'SELECT'            => 'select',
        'SEARCH'            => 'search',
        'VALUE'             => 'value',
        'MAP'               => 'map',
        'REDUCE'            => 'reduce'
    ];

    protected $template = array();

    protected $options;

    protected $result;

    function __construct()
    {
        $this->result = $this->template;
    }

    public function template()
    {
        return $this->template;
    }

    public function result()
    {
        return $this->result;
    }

    public function setOption(array $options)
    {
        $this->options = $options;

        return $this;
    }
}
