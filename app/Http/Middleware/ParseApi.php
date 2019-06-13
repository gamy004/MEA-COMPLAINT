<?php

namespace App\Http\Middleware;

use Closure;
use Log;
use App\Api\Parser;

class ParseApi
{
    protected $parser;
    
    function __construct(
        Parser $parser
    ) {
        $this->parser = $parser;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        Log::info('request', $request->all());

        $this->parser->parse($request->all());

        Log::info('result', $this->parser->result());

        return $next($request);
    }
}
