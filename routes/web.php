<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::group([
    'as' => 'api:',
    'prefix' => 'api',
    'namespace' => 'Api',
    'middleware' => ['parse.api'],
], function () {
        // Controllers Within The "App\Http\Controllers\Admin" Namespace
        Route::get('/auth', 'UserController@auth')->name('auth');

        Route::get(
            '/{hash}/download',
            'FileController@download'
        )->name('file.download')->middleware('signed');

        Route::middleware(['auth'])->group(function () {
            Route::group(['as' => 'file.', 'prefix' => 'file'], function () {
                Route::get('/{hash}/generate-link', 'FileController@generateLink')->name('generate-link');
                Route::post('/upload', 'FileController@upload')->name('upload');
            });

            Route::resources([
                'issues' => 'IssueController'
            ]);
        });
    }
);

Route::get('/{vue_capture?}', 'HomeController@index')
    ->where('vue_capture', '[\/\w\.-]*')
    ->name('magicRoute');
    
// Route::get('/home', 'HomeController@index')->name('home');
