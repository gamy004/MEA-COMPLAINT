<?php

namespace App\Traits;

use Exception;
use App\IOCs\DBCol;
use App\Services\FileMaker;

trait HasAvatar
{
    private function parseAvatar(array $record, array $raw)
    {
        if (isset($raw[DBCol::AVATAR])) {
            $fileMaker = app(FileMaker::class);

            $file = $fileMaker->makeFromUpload('avatars/', $raw[DBCol::AVATAR], 'public');

            $record[DBCol::AVATAR] = $file->{DBCol::ID};
        }

        return $record;
    }
}
