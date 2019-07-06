<?php

namespace App\Helpers;

use Carbon\Carbon;
use App\IOCs\DBCol;
use Illuminate\Support\Str;

class DateTimeHelper
{
    const DEFAULT_FORMAT = '%M %d,%Y %H:%i %p';
    const CARBON_FORMAT = 'M d, Y g:i A';

    protected $carbon;
    
    function __construct() {
        $this->carbon = app(Carbon::class);

        $this->carbon->setLocale(config('app.locale'));
    }

    function parseFullDateTime($timestamp)
    {
        return $this->carbon->parse($timestamp)->format(self::CARBON_FORMAT);
    }

    function isDateTimeField($field)
    {
        $date_time_fields = [
            DBCol::CREATED_AT,
            DBCol::UPDATED_AT
        ];

        return in_array($field, $date_time_fields);
    }
}