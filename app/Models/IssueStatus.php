<?php

namespace App\Models;

use App\IOCs\DBCol;
use Illuminate\Database\Eloquent\Model;

class IssueStatus extends Model
{
    const FK = 'issue_status_id';

    protected $fillable = [
        DBCol::STATUS,
        DBCol::DEFAULT
    ];

    public function issues()
    {
        return $this->hasMany(Issue::class, self::FK);
    }

    public function scopeDefault($query, $value = 1)
    {
        $query->where(DBCol::DEFAULT, $value);
    }
}
