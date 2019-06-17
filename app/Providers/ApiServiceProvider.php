<?php

namespace App\Providers;

use App\Api\Parser;
use App\Contracts\ApiInterface;
use Illuminate\Support\ServiceProvider;

class ApiServiceProvider extends ServiceProvider
{
    protected $controllers = [
        \App\Http\Controllers\Api\IssueController::class => \App\Api\Providers\IssueApi::class,
        \App\Http\Controllers\Api\FileController::class => \App\Api\Providers\FileApi::class
    ];

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Parser::class);

        foreach ($this->controllers as $controller => $api) {
            $this->app->when($controller)
                ->needs(ApiInterface::class)
                ->give($api);
        }
    }
}
