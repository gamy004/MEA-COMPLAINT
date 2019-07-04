<?php

namespace App\Models;

use App\IOCs\DBCol;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    const FK = 'group_id';

    public function users()
    {
        return $this->hasMany(User::class, self::FK);
    }

    public function issues()
    {
        return $this->hasMany(Issue::class, DBCol::ISSUED_BY);
    }

    public function notes()
    {
        return $this->hasMany(IssueNote::class, DBCol::CREATED_BY);
    }

    public function relatedIssues()
    {
        return $this->belongsToMany(
            Issue::class, 'issue_recipient', DBCol::RECIPIENT_ID, 'issue_id'
        )->using(IssueRecipient::class);
    }
}
