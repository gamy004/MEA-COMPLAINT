<?php

namespace App\Api\Providers;

use Exception;
use App\IOCs\DBCol;
use App\Api\BaseApi;
use Illuminate\Support\Arr;
use App\Models\IssueStatus;
use App\Contracts\ApiInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;

class IssueStatusApi extends BaseApi implements ApiInterface
{
    
    public function __construct(IssueStatus $model)
    {
        parent::__construct($model);
    }

    public function store(array $raw)
    {
        // try {
        //     DB::beginTransaction();

        //     $record = [];
        //     $record = $this->parseGeneralFields($record, $raw);
        //     $user = IssueStatus::firstOrCreate($record);

        //     DB::commit();
        // } catch (Exception $exception) {
        //     DB::rollback();
        //     Log::error($exception);
        //     throw new Exception("Error Creating User Request", 1);
        // }

        // return $this->find($user->id);
    }

    public function update(Model $model, array $raw)
    {
        // try {
        //     DB::beginTransaction();

        //     $record = [];
        //     $record = $this->parseGeneralFields($record, $raw);
        //     $model->update($record);

        //     DB::commit();
        // } catch (Exception $exception) {
        //     DB::rollback();
        //     Log::error($exception);
        //     throw new Exception("Error Updating model Request", 1);
        // }

        // return $this->find($model->id);
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
                    DBCol::STATUS
                ]
            )
        );

        return $record;
    }
}
