<?php

namespace App\Api\Providers;

use Exception;
use App\IOCs\DBCol;
use App\Api\BaseApi;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Contracts\ApiInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;


class RoleApi extends BaseApi implements ApiInterface
{
    
    public function __construct(Role $model)
    {
        parent::__construct($model);
    }

    public function store(array $raw)
    {
        // try {
        //     DB::beginTransaction();

        //     $record = [];
        //     $record[DBCol::PASSWORD] = Hash::make(Str::uuid()->toString());
        //     $record = $this->parseGeneralFields($record, $raw);
        //     $record = $this->parseAvatar($record, $raw);
        //     $user = User::firstOrCreate($record);
        //     $this->syncRole($user, $raw);

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
        //     $record = $this->parseAvatar($record, $raw);
        //     $model->update($record);
        //     $this->syncRole($model, $raw);

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
                    DBCol::ROLE
                ]
            )
        );

        return $record;
    }
}
