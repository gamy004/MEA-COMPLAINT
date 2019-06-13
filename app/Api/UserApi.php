<?php

namespace App\Api;

use Exception;
use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Api\BaseApi;
use App\Models\File;
use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use App\Traits\HasAvatar;
use App\Services\FileMaker;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Contracts\ApiInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;

class UserApi extends BaseApi implements ApiInterface
{
    use HasAvatar;
    
    public function __construct(User $q)
    {
        parent::__construct($q);
    }

    public function index()
    {
        return $this->setCustomQuery(
            $this->queryIndex()
        )->get();
    }

    private function queryIndex()
    {
        $baseModel = $this->getOriginalModel();
        $baseTable = model_table(User::class);
        $roleTable = model_table(Role::class);
        $fileTable = model_table(File::class);
        $intermediateTable = model_table(UserRole::class);

        return $this->getOriginalModel()
            ->join(
                $intermediateTable,
                sprintf("%s.%s", $baseTable, DBCol::ID),
                "=",
                sprintf("%s.%s", $intermediateTable, User::FK)
            )->join(
            $roleTable,
            sprintf("%s.%s", $roleTable, DBCol::ID),
            "=",
            sprintf("%s.%s", $intermediateTable, Role::FK)
        )->join(
            $fileTable,
            sprintf("%s.%s", $fileTable, DBCol::ID),
            "=",
            sprintf("%s.%s", $baseTable, DBCol::AVATAR),
            "left"
        )->select(
            [
                sprintf("%s.%s", $baseTable, DBCol::ID),
                sprintf("%s.%s", $baseTable, DBCol::NAME),
                sprintf("%s.%s", $baseTable, DBCol::EMAIL),
                sprintf("%s.%s", $baseTable, DBCol::PHONE),
                sprintf("%s.%s", $baseTable, DBCol::AVAILABLE),
                sprintf("%s.%s", $baseTable, DBCol::EXPIRE_AT),
                sprintf("%s.%s", $intermediateTable, Role::FK),
                sprintf("%s.%s as %s", $roleTable, DBCol::NAME, Data::ROLE),
                sprintf("%s.%s as %s", $fileTable, DBCol::PATH, DBCol::AVATAR),
            ]
        );
    }

    public function find($id)
    {
        return $this->queryIndex()
            ->where(
                sprintf(
                    "%s.%s",
                    model_table(User::class),
                    DBCol::ID
                ), $id
            )
            ->first();
    }

    public function store(array $raw)
    {
        try {
            DB::beginTransaction();

            $record = [];
            $record[DBCol::PASSWORD] = Hash::make(Str::uuid()->toString());
            $record = $this->parseGeneralFields($record, $raw);
            $record = $this->parseAvatar($record, $raw);
            $user = User::firstOrCreate($record);
            $this->syncRole($user, $raw);

            DB::commit();
        } catch (Exception $exception) {
            DB::rollback();
            Log::error($exception);
            throw new Exception("Error Creating User Request", 1);
        }

        return $this->find($user->id);
    }

    public function update(Model $user, array $raw)
    {
        try {
            DB::beginTransaction();

            $record = [];
            $record = $this->parseGeneralFields($record, $raw);
            $record = $this->parseAvatar($record, $raw);
            $user->update($record);
            $this->syncRole($user, $raw);

            DB::commit();
        } catch (Exception $exception) {
            DB::rollback();
            Log::error($exception);
            throw new Exception("Error Updating User Request", 1);
        }

        return $this->find($user->id);
    }

    public function destroy(Model $user)
    {

    }

    private function parseGeneralFields($record, $raw)
    {
        $record = array_merge(
            $record,
            Arr::only(
                $raw,
                [
                    DBCol::NAME,
                    DBCol::EMAIL,
                    DBCol::PHONE,
                    DBCol::AVAILABLE,
                    DBCol::EXPIRE_AT,
                ]
            )
        );

        return $record;
    }

    private function syncRole(Model $user, $raw)
    {
        if (isset($raw[Data::ROLE])) {
            $user->roles()->sync($raw[Data::ROLE]);
        }
    }
}
