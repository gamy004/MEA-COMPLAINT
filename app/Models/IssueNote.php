<?php

namespace App\Models;

use App\IOCs\DBCol;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IssueNote extends Model
{
    use SoftDeletes;

    protected $fillable = [
        DBCol::DESCRIPTION,
        Issue::FK,
        DBCol::CREATED_BY
    ];

    public function issue()
    {
        return $this->belongsTo(Issue::class, Issue::FK);
    }

    public function creator()
    {
        return $this->belongsTo(Group::class, DBCol::CREATED_BY);
    }
}
