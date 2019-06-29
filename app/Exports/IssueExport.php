<?php

namespace App\Exports;

use App\Issue;
use App\Contracts\ApiInterface;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\Exportable;

class IssueExport implements FromQuery
{
    use Exportable;
    
    protected $api;
    protected $raw;

    public function __construct(ApiInterface $api, array $raw = [])
    {
        $this->api = $api;
        $this->raw = $raw;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function query()
    {
        $baseBuilder = $this->api->getBaseBuilder();

        return $baseBuilder;
    }
}
