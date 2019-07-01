<?php

namespace App\Api\Providers;

use Exception;
use App\IOCs\DBCol;
use App\Api\BaseApi;
use Illuminate\Support\Arr;
use App\Models\IssueCategory;
use App\Contracts\ApiInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Model;

class IssueCategoryApi extends BaseApi implements ApiInterface
{
    
    public function __construct(IssueCategory $model)
    {
        parent::__construct($model);
    }

    public function store(array $raw)
    {
        try {
            DB::beginTransaction();

            $record = [];
            
            $record = $this->parseGeneralFields($record, $raw);
            
            $issue_category = IssueCategory::create($record);

            DB::commit();

            return $this->find($issue_category->{DBCol::ID});

        } catch (Exception $exception) {
            DB::rollback();
            Log::error($exception);
            throw new Exception("Error Creating IssueCategory Request", 1);
        }
    }

    public function update(Model $issue_category, array $raw)
    {
        try {
            DB::beginTransaction();

            $record = [];

            $record = $this->parseGeneralFields($record, $raw);

            if (count($record)) {
                $issue_category->update($record);
            }

            DB::commit();

            return $this->find($issue_category->id);
            
        } catch (Exception $exception) {
            DB::rollback();
            Log::error($exception);
            dd($exception);
            throw new Exception("Error Updating IssueCategory Request", 1);
        }
    }

    private function parseGeneralFields($record, $raw)
    {
        $record = array_merge(
            $record,
            Arr::only(
                $raw,
                [
                    DBCol::CATEGORY
                ]
            )
        );

        return $record;
    }
}
