<?php

namespace App\Api\Providers;

use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Api\BaseApi;
use App\Models\File;
use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Support\Arr;
use App\Contracts\ApiInterface;
use Illuminate\Support\Facades\URL;
use Illuminate\Database\Eloquent\Model;


class FileApi extends BaseApi implements ApiInterface
{
    
    public function __construct(File $model)
    {
        parent::__construct($model);
    }

    // public function index()
    // {
    //     return $this->setCustomQuery(
    //         $this->queryIndex()
    //     )->get();
    // }

    // private function queryIndex()
    // {
    //     $baseModel = $this->getOriginalModel();
    //     $baseTable = model_table(User::class);
    //     $roleTable = model_table(Role::class);
    //     $fileTable = model_table(File::class);
    //     $intermediateTable = model_table(UserRole::class);

    //     return $this->getOriginalModel()
    //         ->join(
    //             $intermediateTable,
    //             sprintf("%s.%s", $baseTable, DBCol::ID),
    //             "=",
    //             sprintf("%s.%s", $intermediateTable, User::FK)
    //         )->join(
    //         $roleTable,
    //         sprintf("%s.%s", $roleTable, DBCol::ID),
    //         "=",
    //         sprintf("%s.%s", $intermediateTable, Role::FK)
    //     )->join(
    //         $fileTable,
    //         sprintf("%s.%s", $fileTable, DBCol::ID),
    //         "=",
    //         sprintf("%s.%s", $baseTable, DBCol::AVATAR),
    //         "left"
    //     )->select(
    //         [
    //             sprintf("%s.%s", $baseTable, DBCol::ID),
    //             sprintf("%s.%s", $baseTable, DBCol::NAME),
    //             sprintf("%s.%s", $baseTable, DBCol::EMAIL),
    //             sprintf("%s.%s", $baseTable, DBCol::PHONE),
    //             sprintf("%s.%s", $baseTable, DBCol::AVAILABLE),
    //             sprintf("%s.%s", $baseTable, DBCol::EXPIRE_AT),
    //             sprintf("%s.%s", $intermediateTable, Role::FK),
    //             sprintf("%s.%s as %s", $roleTable, DBCol::NAME, Data::ROLE),
    //             sprintf("%s.%s as %s", $fileTable, DBCol::PATH, DBCol::AVATAR),
    //         ]
    //     );
    // }

    public function store(array $raw)
    {
         //
    }

    public function update(Model $model, array $raw)
    {
         //
    }

    public function destroy(Model $model)
    {

    }

    public function generateTemporaryLink($hash)
    {
        $user_id = auth()->id();
        
        return URL::temporarySignedRoute(
            'api::file.download',
            now()->addHour(),
            compact('hash', 'user_id')
        );
    }

    public function generateDownloadContent($hash_name)
    {
        $file = File::where(DBCol::HASH_NAME, $hash_name)->firstOrFail();

        $display_name = $file->{DBCol::DISPLAY_NAME};

        $path = $file->fullPath();

        $headers = $file->helpers();

        return compact('display_name', 'path', 'headers');
    }

    public function destroyByPath($path, $backup = true)
    {
        $full_path = File::makeFullPath($path);

        if ($backup) {
            // move file tp backup folder
        }

        if (Storage::exists($full_path)) {
            return Storage::delete($full_path);
        }
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
                    DBCol::EXPIRE_AT
                ]
            )
        );

        return $record;
    }
}
