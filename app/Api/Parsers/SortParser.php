<?php

namespace App\Api\Parsers;

use App\Contracts\ParserInterface;

class SortParser extends BaseParser implements ParserInterface
{

    protected $template = [
        self::PARAMS['SORT'] => [],
    ];

    public function __construct()
    {
        parent::__construct();
    }

    public function parse()
    {
        if (!isset($this->options[self::PARAMS['SORT']])) {
            $this->options[self::PARAMS['SORT']][] = self::DEFAULT['SORT_FIELD'];
        }

        $this->result[self::PARAMS['SORT']] = array_reduce(
            $this->options[self::PARAMS['SORT']],
            function ($res, $sort) {
                array_push(
                    $res,
                    $this->parseSort($sort)
                );

                return $res;
            },
            []
        );

        return $this;
    }

    protected function parseSort($sort)
    {
        $direction = self::DEFAULT['SORT_DIRECTION'];

        preg_match('/-/', $sort, $matches, PREG_OFFSET_CAPTURE);

        if (!empty($matches)) {
            $match = $matches[0];

            $match_direction = $match[0];
            $match_index = $match[1];

            if ($match_direction === '-') {
                $direction = 'desc';
            }

            $sort = substr_replace($sort, "", $match_index, 1);
        }

        return [
            self::PARAMS['KEY'] => $sort,
            self::PARAMS['DIRECTION'] => $direction,
        ];
    }
}
