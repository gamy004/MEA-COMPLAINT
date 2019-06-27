<?php

namespace App\Api\Providers;

use Exception;
use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Api\BaseApi;
use App\Models\Issue;
use App\Traits\HasFile;
use App\Models\IssueNote;
use Illuminate\Support\Arr;
use App\Contracts\ApiInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;

class IssueNoteApi extends BaseApi implements ApiInterface
{
    use HasFile;
    
    public function __construct(IssueNote $model)
    {
        parent::__construct($model);
    }

    public function store(array $raw)
    {
        try {
            DB::beginTransaction();

            $record = [];
            
            $record = $this->parseGeneralFields($record, $raw);
            
            $issue_note = IssueNote::create($record);

            $uploaded_file_ids = $this->setHasFileRelation('attachments')
                ->setHasFileRootDirectory('issue_notes/')
                ->parseUploadedFiles($issue_note, $raw);

            $this->syncAttachments($issue_note, $raw, $uploaded_file_ids);

            DB::commit();

            return $this->find($issue_note->id);

        } catch (Exception $exception) {
            DB::rollback();
            Log::error($exception);
            throw new Exception("Error creating issue note request", 1);
        }
    }

    public function update(Model $issue_note, array $raw)
    {
        try {
            DB::beginTransaction();

            $record = [];

            $record = $this->parseGeneralFields($record, $raw);

            if (count($record)) {
                $issue->update($record);
            }
            
            $uploaded_file_ids = $this->setHasFileRelation('attachments')
                ->setHasFileRootDirectory('issues/')
                ->parseUploadedFiles($issue_note, $raw);

            $this->syncAttachments($issue_note, $raw, $uploaded_file_ids);

            DB::commit();
        } catch (Exception $exception) {
            DB::rollback();
            Log::error($exception);
            throw new Exception("Error updating issue note request", 1);
        }

        return $this->find($issue_note->id);
    }

    public function destroy(Model $model)
    {

    }

    private function parseGeneralFields($record, $raw)
    {
        $record = array_merge(
            $record,
            Arr::only(
                $raw,
                [
                    DBCol::DESCRIPTION,
                    Issue::FK,
                    DBCol::CREATED_BY
                ]
            )
        );

        return $record;
    }

    private function syncAttachments(IssueNote $issue_note, $raw, array $uploaded_file_ids = [])
    {
        if (isset($raw[Data::ATTACHMENTS])) {
            $attachment_ids = $raw[Data::ATTACHMENTS];

            $result = $issue_note->attachments()->sync(array_merge(
                $attachment_ids,
                $uploaded_file_ids
            ));

            $this->parseSyncResult($result);
        }

        return false;
    }
}
