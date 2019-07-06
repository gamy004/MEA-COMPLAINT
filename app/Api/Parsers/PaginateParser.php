<?php

namespace App\Api\Parsers;

use InvalidArgumentException;
use App\Contracts\ParserInterface;

class PaginateParser extends BaseParser implements ParserInterface {
    protected $template = [
        self::PARAMS['PAGE']    => self::DEFAULT['PAGE'],
        self::PARAMS['LIMIT']   => self::DEFAULT['LIMIT'],
        self::PARAMS['OFFSET']   => self::DEFAULT['OFFSET'],
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
            isset($this->options[self::PARAMS['OFFSET']])
        ) {
            $this->result[self::PARAMS['OFFSET']] = $this->options[self::PARAMS['OFFSET']];
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