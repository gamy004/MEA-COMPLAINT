<?php

namespace App\Traits;

use Exception;
use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Services\FileMaker;

trait HasAvatar
{
    private function parseAvatar(array $record, array $raw)
    {
        if (isset($raw[Data::AVATAR])) {
            $fileMaker = app(FileMaker::class);

            $file = $fileMaker->makeFromUpload('avatars/', $raw[Data::AVATAR], 'public');

            $record[DBCol::AVATAR_ID] = $file->{DBCol::ID};
        }

        return $record;
    }

    private function avatarRules()
    {
        return [
            Data::AVATAR => 'sometimes|required|array',
            Data::AVATAR.'.display_name' => 'sometimes|required|string',
            Data::AVATAR.'.hash_name' => 'sometimes|required|string|max:255',
            Data::AVATAR.'.size' => 'sometimes|required|numeric',
            Data::AVATAR.'.formatted_size' => 'sometimes|required|string|max:255',
            Data::AVATAR.'.uploaded_path' => 'sometimes|required|string'
        ];
    }
}
