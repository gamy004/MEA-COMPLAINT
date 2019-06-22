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
        $hash_name = $file_data[DBCol::HASH_NAME];
        $upload_path = $file_data[Data::UPLOAD_PATH];
        $move_path = $file_path = $new_dir . $hash_name;
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
            $display_name = $file_data[DBCol::DISPLAY_NAME];
            $size = isset($file_data[DBCol::SIZE]) ? $file_data[DBCol::SIZE] : Storage::size($move_path);
            $formatted_size = isset($file_data[DBCol::FORMATTED_SIZE]) ? $file_data[DBCol::FORMATTED_SIZE] : sizeFormat($size);
            $mime = isset($file_data[DBCol::MIME]) ? $file_data[DBCol::MIME] : Storage::mimeType($move_path);

            return File::firstOrCreate(
                [
                    DBCol::DISPLAY_NAME => $display_name,
                    DBCol::HASH_NAME => $hash_name,
                    DBCol::SIZE => $size,
                    DBCol::FORMATTED_SIZE => $formatted_size,
                    DBCol::MIME => $mime,
                    DBCol::PATH => $move_path,
                    DBCol::URL => $file_path,
                    DBCol::_PUBLIC => $is_public
                ]
            );
        }

    }
}
