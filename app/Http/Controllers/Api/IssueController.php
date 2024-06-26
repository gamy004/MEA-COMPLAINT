<?php

namespace App\Http\Controllers\Api;

use App\IOCs\DBCol;
use App\Models\Issue;
use Illuminate\Http\Request;
use App\Http\Requests\ShowIssueRequest;
use App\Http\Requests\StoreIssueRequest;
use App\Http\Requests\UpdateIssueRequest;

class IssueController extends BaseApiController
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
    public function store(StoreIssueRequest $request)
    {
        return $this->api->store(
            $request->all()
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function show(ShowIssueRequest $request, Issue $issue)
    {
        return $this->api->show($issue);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function edit(Issue $issue)
    {
        return $this->api->find($issue->{DBCol::ID});
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateIssueRequest $request, Issue $issue)
    {
        return $this->api->update(
            $issue,
            $request->all()
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function destroy(Issue $issue)
    {
        return $this->api->destroy($issue);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function forceDelete($issue)
    {
        return $this->api->forceDelete($issue);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function restore($issue)
    {
        return $this->api->restore($issue);
    }

    /**
     * Archive the specified resource from storage.
     *
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function archive(Request $request, $issue)
    {
        return $this->api->archive($issue, $request->all());
    }

    /**
     * Generate report the specified resource from storage.
     *
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function export(Request $request)
    {
        return $this->api->export($request->all());
    }

    public function search(Request $request)
    {
        return $this->api->search($request->all());
    }

    public function fetchSearch(Request $request)
    {
        return $this->api->fetchSearch($request->all());
    }

    /**
     * Generate report the specified resource from searchResult.
     *
     * @param  \App\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function exportSearch(Request $request)
    {
        return $this->api->exportSearch($request->all());
    }

}
