<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IssueStatusLog extends Model
{
    protected $fillable = [
        Issue::FK,
        IssueStatus::FK
    ];

    public function status() {
        return $this->belongsTo(IssueStatus::class, IssueStatus::FK);
    }

    public function issue() {
        return $this->belongsTo(Issue::class, Issue::FK);
    }
}
