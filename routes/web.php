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
        )->name('files.download')->middleware('signed');

        Route::middleware(['auth'])->group(function () {
            Route::post('files/destroy-by-path', 'FileController@destroyByPath')->name('files.destroy-by-path');

            Route::group(['as' => 'files.', 'prefix' => 'files'], function () {
                Route::get('/{hash}/generate-link', 'FileController@generateLink')->name('generate-link');
                Route::post('/{file}/restore', 'FileController@restore')->name('restore');
                Route::post('/upload', 'FileController@upload')->name('upload');
            });
            /**
             * Custom route IssueController
             */
            Route::group(['as' => 'issues.', 'prefix' => 'issues/{issue}'], function () {
                Route::post('/restore', 'IssueController@restore')->name('restore');
            });

            Route::resources([
                'issues' => 'IssueController',
                'groups' => 'GroupController',
                'issue-statuses' => 'IssueStatusController',
                'issue-categories' => 'IssueCategoryController',
                'issue-notes' => 'IssueNoteController',
                'files' => 'FileController'
            ]);
        });
    }
);

Route::get('/{vue_capture?}', 'HomeController@index')
    ->where('vue_capture', '[\/\w\.-]*')
    ->name('magicRoute');

// Route::get('/home', 'HomeController@index')->name('home');
