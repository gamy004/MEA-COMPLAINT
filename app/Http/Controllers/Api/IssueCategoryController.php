<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\IssueCategory;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;

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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCategoryRequest $request)
    {
        return $this->api->store($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\IssueCategory  $issue_category
     * @return \Illuminate\Http\Response
     */
    public function show(IssueCategory $issue_category)
    {
        return $this->api->find($issue_category->id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\IssueCategory  $issue_category
     * @return \Illuminate\Http\Response
     */
    public function edit(IssueCategory $issue_category)
    {
        return $this->api->find($issue_category->id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\IssueCategory  $issue_category
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCategoryRequest $request, IssueCategory $issue_category)
    {
        return $this->api->update($issue_category, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\IssueCategory  $issue_category
     * @return \Illuminate\Http\Response
     */
    public function destroy(IssueCategory $issue_category)
    {
        return $this->api->destroy($issue_category);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  Integer  $issue_category ID
     * @return \Illuminate\Http\Response
     */
    public function restore($issue_category)
    {
        return $this->api->restore($issue_category);
    }
}
