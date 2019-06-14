<?php

namespace App\Http\Controllers\Api;

use App\Contracts\ApiInterface;
use App\Http\Controllers\Controller;

class BaseApiController extends Controller
{
    function __construct(ApiInterface $api)
    {
        $this->api = $api;
    }
}
