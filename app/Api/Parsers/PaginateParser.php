<?php

namespace App\Api\Parsers;

use InvalidArgumentException;
use App\Contracts\ParserInterface;

class PaginateParser extends BaseParser implements ParserInterface {
    protected $template = [
        self::PARAMS['PAGE']    => self::DEFAULT['PAGE'],
        self::PARAMS['LIMIT']   => self::DEFAULT['LIMIT']
    ];

    public static $messages = [
        'missing_limit_argument' => 'Cannot use page option without limit option'
    ];

    function __construct()
    {
        parent::__construct();
    }

    public function parse()
    {
        if (
            isset($this->options[self::PARAMS['PAGE']])
        ) {
            $this->result[self::PARAMS['PAGE']] = $this->options[self::PARAMS['PAGE']];
        }

        if (
            isset($this->options[self::PARAMS['LIMIT']])
        ) {
            $this->result[self::PARAMS['LIMIT']] = $this->options[self::PARAMS['LIMIT']];
        }

        if (
            ! is_null($this->result[self::PARAMS['PAGE']])
            && is_null($this->result[self::PARAMS['LIMIT']])
        ) {
            throw new InvalidArgumentException(self::$messages['missing_limit_argument']);
        }

        return $this;
    }
}