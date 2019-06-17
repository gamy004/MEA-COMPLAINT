<?php

namespace App\Models;

use App\IOCs\Data;
use App\IOCs\DBCol;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{

    static public function makeFullPath($path)
    {
        return storage_path(Data::APP_DIR . $path);
    }

    public function fullPath()
    {
        return self::makeFullPath($this->{DBCol::PATH});
    }

    public function headers()
    {
        return array('Content-Type' => $this->{DBCol::MIME});
    }
}
