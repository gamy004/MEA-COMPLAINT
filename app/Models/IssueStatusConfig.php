<?php

namespace App\Models;

use App\IOCs\DBCol;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IssueStatusConfig extends Model
{
    use SoftDeletes;

    const FK = 'issue_status_config_id';
    
    protected $fillable = [
        DBCol::DURATION,
        DBCol::UNIT,
        DBCol::COLOR
    ];

    public function status() {
        return $this->belongsTo(IssueStatus::class, IssueStatus::FK);
    }
}
