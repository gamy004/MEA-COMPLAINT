<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IssueStatus extends Model
{
    const FK = 'issue_status_id';

    public function issues()
    {
        return $this->hasMany(Issue::class, self::FK);
    }
}
