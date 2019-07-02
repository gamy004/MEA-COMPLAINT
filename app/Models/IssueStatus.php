<?php

namespace App\Models;

use App\IOCs\DBCol;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IssueStatus extends Model
{
    use SoftDeletes;

    const FK = 'issue_status_id';

    protected $fillable = [
        DBCol::STATUS,
        DBCol::COLOR,
        DBCol::DEFAULT
    ];

    public function issues()
    {
        return $this->hasMany(Issue::class, self::FK);
    }

    public function configs()
    {
        return $this->hasMany(IssueStatusConfig::class, self::FK);
    }

    public function scopeDefault($query, $value = 1)
    {
        $query->where(DBCol::DEFAULT, $value);
    }
}
