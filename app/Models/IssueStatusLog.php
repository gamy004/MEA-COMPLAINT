<?php

namespace App\Models;

use App\IOCs\DBCol;
use Illuminate\Database\Eloquent\Model;

class IssueStatusLog extends Model
{
    protected $fillable = [
        Issue::FK,
        IssueStatus::FK,
        DBCol::STARTED_AT,
        DBCol::ENDED_AT
    ];

    public function status() {
        return $this->belongsTo(IssueStatus::class, IssueStatus::FK);
    }

    public function issue() {
        return $this->belongsTo(Issue::class, Issue::FK);
    }
}
