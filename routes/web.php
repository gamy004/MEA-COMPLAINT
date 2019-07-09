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

            Route::group(['as' => 'export.', 'prefix' => 'export'], function () {
                Route::get('/issues', 'IssueController@export')->name('issues');
                Route::get('/search-issues', 'IssueController@exportSearch')->name('search-issues');
            });

            /**
             * Custom route IssueController
             */
            // Route::get('issues/search', 'IssueController@search')->name('issues.search');
            // Route::get('issues/search', 'IssueController@search')->name('issues.search');

            Route::group(['as' => 'issues.', 'prefix' => 'issues'], function () {
                Route::get('/search', 'IssueController@search')->name('search');
                Route::get('/fetch-search', 'IssueController@fetchSearch')->name('fetch-search');
            });

            Route::group(['as' => 'issues.', 'prefix' => 'issues/{issue}'], function () {
                Route::post('/restore', 'IssueController@restore')->name('restore');
                Route::put('/archive', 'IssueController@archive')->name('archive');
            });

            /**
             * Custom route IssueNoteController
             */
            Route::group(['as' => 'issue-notes.', 'prefix' => 'issue-notes/{issue_note}'], function () {
                Route::post('/restore', 'IssueNoteController@restore')->name('restore');
            });

            /**
             * Custom route IssueCategoryController
             */
            Route::group(['as' => 'issue-categories.', 'prefix' => 'issue-categories/{issue_category}'], function () {
                Route::post('/restore', 'IssueCategoryController@restore')->name('restore');
            });

            /**
             * Custom route IssueStatusController
             */
            Route::group(['as' => 'issue-statuses.', 'prefix' => 'issue-statuses/{issue_status}'], function () {
                Route::post('/restore', 'IssueStatusController@restore')->name('restore');
            });

            /**
             * Custom route IssueStatusController
             */
            Route::group(['as' => 'users.', 'prefix' => 'users/{user}'], function () {
                Route::put('/update-config', 'UserController@updateConfig')->name('update-config');
            });

            Route::resources([
                'users' => 'UserController',
                'issues' => 'IssueController',
                'roles' => 'RoleController',
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
