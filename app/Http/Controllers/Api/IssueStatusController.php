<?php

namespace App\Http\Controllers\Api;

use App\Models\IssueStatus;
use Illuminate\Http\Request;
use App\Http\Requests\StoreStatusRequest;
use App\Http\Requests\UpdateStatusRequest;
use App\Http\Controllers\Api\BaseApiController;

class IssueStatusController extends BaseApiController
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
    public function store(StoreStatusRequest $request)
    {
        return $this->api->store($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\IssueStatus  $issue_status
     * @return \Illuminate\Http\Response
     */
    public function show(IssueStatus $issue_status)
    {
        return $this->api->find($issue_status->id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\IssueStatus  $issue_status
     * @return \Illuminate\Http\Response
     */
    public function edit(IssueStatus $issue_status)
    {
        return $this->api->find($issue_status->id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\IssueStatus  $issue_status
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStatusRequest $request, IssueStatus $issue_status)
    {
        return $this->api->update($issue_status, $request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\IssueStatus  $issue_status
     * @return \Illuminate\Http\Response
     */
    public function destroy(IssueStatus $issue_status)
    {
        return $this->api->destroy($issue_status);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  Integer  $issue_status ID
     * @return \Illuminate\Http\Response
     */
    public function restore($issue_status)
    {
        return $this->api->restore($issue_status);
    }
}
