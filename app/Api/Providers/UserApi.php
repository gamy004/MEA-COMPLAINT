<?php

namespace App\Api\Providers;

use Exception;
use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Api\BaseApi;
use App\Models\File;
use App\Models\Role;
use App\Models\User;
use App\Models\Group;
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
        $baseTable = $this->getBaseBuilderTable();
        $roleTable = model_table(Role::class);
        $groupTable = model_table(Group::class);
        $fileTable = model_table(File::class);
        $roleIntermediateTable = model_table(UserRole::class);

        $subGroupQuery = $this->getGroupQuery();
        $subGroupQueryName = 'subGroupQuery';

        return $this->getOriginalModel()
            ->leftJoinSub(
                $subGroupQuery,
                $subGroupQueryName,
                function($join) use ($baseTable, $subGroupQueryName) {
                $join->on(
                    sprintf("%s.%s", $baseTable, DBCol::ID),
                    '=',
                    sprintf("%s.%s", $subGroupQueryName, DBCol::ID)
                )->on(
                    sprintf("%s.%s", $baseTable, DBCol::SUB_GROUP_ID),
                    '=',
                    sprintf("%s.%s", $subGroupQueryName, DBCol::SUB_GROUP_ID)
                );
            })
            ->join(
                $groupTable,
                sprintf("%s.%s", $baseTable, GROUP::FK),
                "=",
                sprintf("%s.%s", $groupTable, DBCol::ID),
                "left"
            )
            ->join(
                $fileTable,
                sprintf("%s.%s", $baseTable, DBCol::AVATAR_ID),
                "=",
                sprintf("%s.%s", $fileTable, DBCol::ID),
                "left"
            )
            ->join(
                $roleIntermediateTable,
                sprintf("%s.%s", $baseTable, DBCol::ID),
                "=",
                sprintf("%s.%s", $roleIntermediateTable, User::FK)
            )
            ->join(
                $roleTable,
                sprintf("%s.%s", $roleTable, DBCol::ID),
                "=",
                sprintf("%s.%s", $roleIntermediateTable, Role::FK)
            )
            ->whereNull(sprintf("%s.%s", $groupTable, DBCol::DELETED_AT))
            // ->join(
            //     $fileTable,
            //     sprintf("%s.%s", $fileTable, DBCol::ID),
            //     "=",
            //     sprintf("%s.%s", $baseTable, DBCol::AVATAR),
            //     "left"
            // )
            ->select(
                [
                    sprintf("%s.%s", $baseTable, DBCol::ID),
                    sprintf("%s.%s", $baseTable, DBCol::USERNAME),
                    sprintf("%s.%s", $baseTable, DBCol::NAME),
                    sprintf("%s.%s", $baseTable, DBCol::EMAIL),
                    sprintf("%s.%s as %s", $fileTable, DBCol::URL, DBCol::AVATAR),
                    sprintf("%s.%s", $baseTable, DBCol::GROUP_ID),
                    sprintf("%s.%s as %s", $groupTable, DBCol::NAME, Data::GROUP_NAME),
                    sprintf("%s.%s", $subGroupQueryName, DBCol::SUB_GROUP_ID),
                    sprintf("%s.%s", $subGroupQueryName, Data::SUB_GROUP_NAME),
                    sprintf("%s.%s", $roleIntermediateTable, Role::FK),
                    sprintf("%s.%s", $roleTable, DBCol::ROLE),
                    // sprintf("%s.%s as %s", $fileTable, DBCol::PATH, DBCol::AVATAR),
                ]
            );
    }

    private function getGroupQuery() {
        $baseTable = $this->getBaseBuilderTable();
        $groupTable = model_table(Group::class);

        return $this->getOriginalModel()
            ->join(
                $groupTable,
                sprintf("%s.%s", $baseTable, DBCol::SUB_GROUP_ID),
                "=",
                sprintf("%s.%s", $groupTable, DBCol::ID),
                "left"
            )
            ->whereNull(sprintf("%s.%s", $groupTable, DBCol::DELETED_AT))
            ->select([
                sprintf("%s.%s", $baseTable, DBCol::ID),
                sprintf("%s.%s as %s", $groupTable, DBCol::ID, DBCol::SUB_GROUP_ID),
                sprintf("%s.%s as %s", $groupTable, DBCol::NAME, Data::SUB_GROUP_NAME),
            ]);
    }

    public function find($id)
    {
        $users = $this->queryIndex()
            ->where(
                sprintf(
                    "%s.%s",
                    model_table(User::class),
                    DBCol::ID
                ), $id
            )
            ->first();

        return compact('users');
    }

    public function store(array $raw)
    {
        try {
            DB::beginTransaction();

            $record = [];
            $record = $this->parseGeneralFields($record, $raw);
            $record = $this->parsePassword($record, $raw);
            $record = $this->parseAvatar($record, $raw);
            $record = $this->parseGroup($record, $raw);
            $user = User::firstOrCreate($record);

            $this->syncRole($user, $raw);

            DB::commit();

            return $this->find($user->id);
        } catch (Exception $exception) {
            DB::rollback();
            Log::error($exception);
            dd($exception);
            throw new Exception("Error Creating User Request", 1);
        }


    }

    public function update(Model $user, array $raw)
    {
        try {
            DB::beginTransaction();

            $record = [];
            $record = $this->parseGeneralFields($record, $raw);
            $record = $this->parsePassword($record, $raw);
            $record = $this->parseAvatar($record, $raw);
            $record = $this->parseGroup($record, $raw);
            $user->update($record);
            $this->syncRole($user, $raw);

            DB::commit();

            return $this->find($user->id);
        } catch (Exception $exception) {
            DB::rollback();
            Log::error($exception);
            dd($exception);
            throw new Exception("Error Updating User Request", 1);
        }
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
                    DBCol::USERNAME,
                    DBCol::NAME,
                    DBCol::EMAIL,
                    DBCol::GROUP_ID,
                    DBCol::SUB_GROUP_ID,
                    DBCol::INBOX_SETTINGS
                ]
            )
        );

        return $record;
    }

    private function parsePassword($record, array $raw = [])
    {
        if (isset($raw[DBCol::PASSWORD])) {
            $record[DBCol::PASSWORD] = Hash::make($raw[DBCol::PASSWORD]);
        }

        return $record;
    }

    private function parseGroup($record, array $raw = [])
    {
        $record[DBCol::GROUP_ID] = isset($raw[DBCol::GROUP_ID])
            ? $raw[DBCol::GROUP_ID]
            : null;
        $record[DBCol::SUB_GROUP_ID] = isset($raw[DBCol::SUB_GROUP_ID])
            ? $raw[DBCol::SUB_GROUP_ID]
            : null;

        if (isset($raw[Data::GROUP])) {
            $group = Group::create([
                DBCol::NAME => $raw[Data::GROUP]
            ]);
            $record[DBCol::GROUP_ID] = $group->{DBCol::ID};
            $record = $this->parseSubGroup($group, $record, $raw);
        }

        return $record;
    }

    private function parseSubGroup(Group $parentGroup, $record, array $raw = [])
    {
        if (isset($raw[Data::SUB_GROUP])) {
            $subGroup = $parentGroup->subGroups()->create([
                DBCol::NAME => $raw[Data::SUB_GROUP]
            ]);

            $record[DBCol::SUB_GROUP_ID] = $subGroup->{DBCol::ID};
        }

        return $record;
    }

    private function syncRole(Model $user, $raw)
    {
        if (isset($raw[Data::ROLE])) {
            $user->roles()->sync($raw[Data::ROLE]);
        }
    }
}
