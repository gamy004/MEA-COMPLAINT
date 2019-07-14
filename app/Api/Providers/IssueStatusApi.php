<?php

namespace App\Api\Providers;

use Exception;
use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Api\BaseApi;
use App\Models\IssueStatus;
use Illuminate\Support\Arr;
use App\Contracts\ApiInterface;
use App\Models\IssueStatusConfig;
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
        try {
            DB::beginTransaction();

            $record = [];
            
            $record = $this->parseGeneralFields($record, $raw);
            
            $issue_status = IssueStatus::create($record);

            $this->updateConfigs($issue_status, $raw);

            DB::commit();

            return $this->find($issue_status->{DBCol::ID});

        } catch (Exception $exception) {
            DB::rollback();
            Log::error($exception);
            throw new Exception("Error Creating IssueStatus Request", 1);
        }
    }

    public function update(Model $issue_status, array $raw)
    {
        try {
            DB::beginTransaction();

            $record = [];

            $record = $this->parseGeneralFields($record, $raw);

            if (count($record)) {
                $issue_status->update($record);
            }

            $this->updateConfigs($issue_status, $raw);

            DB::commit();

            return $this->find($issue_status->{DBCol::ID});
            
        } catch (Exception $exception) {
            DB::rollback();
            Log::error($exception);
            dd($exception);
            throw new Exception("Error Updating IssueStatus Request", 1);
        }
    }

    private function parseGeneralFields($record, $raw)
    {
        $record = array_merge(
            $record,
            Arr::only(
                $raw,
                [
                    DBCol::STATUS,
                    DBCol::COLOR,
                    DBCol::DEFAULT
                ]
            )
        );

        return $record;
    }

    private function updateConfigs(IssueStatus $issue_status, array $raw = [])
    {
        if (isset($raw[Data::CONFIGS])) {
            $configs = $raw[Data::CONFIGS];
            $config_ids = [];

            foreach ($configs as $config_key => $config) {
                $raw_record = Arr::only($config, [DBCol::DURATION, DBCol::UNIT, DBCol::COLOR]);
                
                if (!isset($config[DBCol::ID])) {
                    $config = $issue_status->configs()->create($raw_record);
                } else {
                    $config = IssueStatusConfig::findOrFail($config[DBCol::ID]);
                    $config->update($raw_record);
                }

                array_push($config_ids, $config->{DBCol::ID});
            }

            $deleted_configs = $issue_status->configs()->whereNotIn(DBCol::ID, $config_ids);

            if ($deleted_configs->exists()) {
                $deleted_configs->each(
                    function($c) {
                        $c->delete();
                    }
                );
            }
        }

        return $this;
    }
}
