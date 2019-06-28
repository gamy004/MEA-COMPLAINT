<?php

namespace App\Http\Controllers\Api;

use App\IOCs\DBCol;
use App\Models\Issue;
use App\Models\IssueNote;
use Illuminate\Http\Request;
use App\Http\Requests\StoreIssueNoteRequest;

class IssueNoteController extends BaseApiController
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
    public function store(StoreIssueNoteRequest $request)
    {
        return $this->api->store(
            $request->all()
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\IssueNote  $issue_note
     * @return \Illuminate\Http\Response
     */
    public function show(IssueNote $issue_note)
    {
        return $this->api->find($issue_note->{DBCol::ID});
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\IssueNote  $issue_note
     * @return \Illuminate\Http\Response
     */
    public function edit(IssueNote $issue_note)
    {
        return $this->api->find($issue_note->{DBCol::ID});
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\IssueNote  $issue_note
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, IssueNote $issue_note)
    {
        return $this->api->update(
            $issue_note,
            $request->all()
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\IssueNote  $issue_note
     * @return \Illuminate\Http\Response
     */
    public function destroy(IssueNote $issue_note)
    {
        return $this->api->destroy($issue_note);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  \App\Models\IssueNote  $issue_note
     * @return \Illuminate\Http\Response
     */
    public function restore($issue_note)
    {
        return $this->api->restore($issue_note);
    }
}
