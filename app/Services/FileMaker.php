<?php

namespace App\Services;

use App\IOCs\Data;
use App\IOCs\DBCol;
use App\Models\File;
use Illuminate\Support\Facades\Storage;

class FileMaker
{
    const VISIBILITY_PRIVATE = 'private';
    const VISIBILITY_PUBLIC = 'public';

    public function __construct(File $file, Storage $storage)
    {
        $this->file = $file;
        $this->storage = $storage;
    }

    public function makeFromUpload($new_dir, array $file_data, $visibility = 'private')
    {
        $name = $file_data[DBCol::DISPLAY_NAME];
        $hash = $file_data[DBCol::HASH_NAME];
        $upload_path = $file_data[Data::UPLOAD_PATH];
        $move_path = $file_path = $new_dir . $hash;
        $is_public = $visibility === self::VISIBILITY_PUBLIC;

        if ($is_public) {
            $move_path = Data::PUBLIC_DIR . $move_path;
            $file_path = '/'.Data::STORAGE_DIR . $file_path;
        }

        if (Storage::exists($upload_path)) {
            Storage::move($upload_path, $move_path);
            Storage::setVisibility($move_path, $visibility);
        }

        if (Storage::exists($move_path)) {
            return File::firstOrCreate(
                [
                    DBCol::DISPLAY_NAME => $name,
                    DBCol::HASH_NAME => $hash,
                    DBCol::SIZE => Storage::size($move_path),
                    DBCol::MIME => Storage::mimeType($move_path),
                    DBCol::PATH => $file_path,
                    DBCol::_PUBLIC => $is_public,
                ]
            );
        }

    }
}
