<?php

namespace App\Http\Controllers\Api;

use App\Models\IssueStatus;
use Illuminate\Http\Request;

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
     * @param  \App\IssueStatus  $issueStatus
     * @return \Illuminate\Http\Response
     */
    public function show(IssueStatus $issueStatus)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\IssueStatus  $issueStatus
     * @return \Illuminate\Http\Response
     */
    public function edit(IssueStatus $issueStatus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\IssueStatus  $issueStatus
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, IssueStatus $issueStatus)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\IssueStatus  $issueStatus
     * @return \Illuminate\Http\Response
     */
    public function destroy(IssueStatus $issueStatus)
    {
        //
    }
}
