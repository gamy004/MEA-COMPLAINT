<?php

namespace App\Traits;

use Exception;
use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Models\File;
use App\Services\FileMaker;
use Illuminate\Database\Eloquent\Model;

trait HasFile
{
    protected $hasfile_relation = 'files';
    protected $root_directory = 'generals/';

    private function setHasFileRelation($relation)
    {
        $this->hasfile_relation = $relation;

        return $this;
    }

    private function setHasFileRootDirectory($root_directory)
    {
        $this->root_directory = $root_directory;

        return $this;
    }

    private function parseUploadedFiles(Model $model, array $raw)
    {
        $uploaded_file_ids = [];

        if (isset($raw[Data::UPLOADED_FILES])) {
            $fileMaker = app(FileMaker::class);
            $uploaded_files = $raw[Data::UPLOADED_FILES];

            foreach ($uploaded_files as $uploaded_file_key => $uploaded_file) {
                $file = $fileMaker->makeFromUpload(
                    $this->root_directory,
                    $uploaded_file,
                    'public'
                );

                $uploaded_file_ids[$uploaded_file_key] = $file->{DBCol::ID};
            }

            // if (count($uploaded_file_ids)) {
            //     return $model->{$this->hasfile_relation}()->attach($uploaded_file_ids);
            // }
        }

        return $uploaded_file_ids;
    }

    private function uploadedFilesRules()
    {
        return [
            Data::UPLOADED_FILES => 'array',
            Data::UPLOADED_FILES.'.*.display_name' => 'required|string',
            Data::UPLOADED_FILES.'.*.hash_name' => 'required|string|max:255',
            Data::UPLOADED_FILES.'.*.size' => 'sometimes|required|numeric',
            Data::UPLOADED_FILES.'.*.formatted_size' => 'sometimes|required|string|max:255',
            Data::UPLOADED_FILES.'.*.uploaded_path' => 'sometimes|required|string'
        ];
    }

    private function parseSyncResult($result)
    {
        if (isset($result[Data::DETACHED])
            && count($result[Data::DETACHED])
        ) {
            $detached_file_ids = $result[Data::DETACHED];

            File::whereIn('id', $detached_file_ids)
                ->each(function($file) {
                    $file->delete();
                });
        }
    }
}
