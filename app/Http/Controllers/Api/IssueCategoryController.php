<?php

namespace App\Http\Controllers\Api;

use App\Models\IssueCategory;
use Illuminate\Http\Request;

class IssueCategoryController extends BaseApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->api->index();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\IssueCategory  $issue_category
     * @return \Illuminate\Http\Response
     */
    public function show(IssueCategory $issue_category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\IssueCategory  $issue_category
     * @return \Illuminate\Http\Response
     */
    public function edit(IssueCategory $issue_category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\IssueCategory  $issue_category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, IssueCategory $issue_category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\IssueCategory  $issue_category
     * @return \Illuminate\Http\Response
     */
    public function destroy(IssueCategory $issue_category)
    {
        //
    }
}
