<?php

namespace App\Models;

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
        return $this->hasMany(Issue::class, 'issued_by');
    }

    public function relatedIssues()
    {
        return $this->belongsToMany(
            Issue::class, 'issue_recipient', 'recipient_id', 'issue_id'
        )->using(IssueRecipient::class);
    }
}
