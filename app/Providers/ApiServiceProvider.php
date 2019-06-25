<?php

namespace App\Providers;

use App\Api\Parser;
use App\Contracts\ApiInterface;
use Illuminate\Support\ServiceProvider;

class ApiServiceProvider extends ServiceProvider
{
    protected $controllers = [
        \App\Http\Controllers\Api\IssueController::class => \App\Api\Providers\IssueApi::class,
        \App\Http\Controllers\Api\FileController::class => \App\Api\Providers\FileApi::class,
        \App\Http\Controllers\Api\GroupController::class => \App\Api\Providers\GroupApi::class,
        \App\Http\Controllers\Api\IssueCategoryController::class => \App\Api\Providers\IssueCategoryApi::class,
        \App\Http\Controllers\Api\IssueStatusController::class => \App\Api\Providers\IssueStatusApi::class,
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
