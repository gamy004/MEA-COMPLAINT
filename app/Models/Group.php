<?php

namespace App\Models;

use App\IOCs\DBCol;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    const FK = 'group_id';

    protected $fillable = [
        DBCol::NAME
    ];

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

    public function subGroups()
    {
        return $this->hasMany(Group::class, DBCol::PARENT_ID);
    }

    public function parentGroup()
    {
        return $this->belongsTo(Group::class, DBCol::PARENT_ID);
    }

    public function relatedIssues()
    {
        return $this->belongsToMany(
            Issue::class, 'issue_recipient', DBCol::RECIPIENT_ID, 'issue_id'
        )->using(IssueRecipient::class);
    }
}
