<?php

namespace App\Models;

use App\IOCs\DBCol;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Group extends Model
{
    use SoftDeletes;

    const FK = 'group_id';

    protected $fillable = [
        DBCol::NAME
    ];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($self) {
            $self->users()->each(function ($user) {
                $user->{self::FK} = null;
                $user->{DBCol::SUB_GROUP_ID} = null;
                $user->save();
            });

            $self->subGroupUsers()->each(function ($user) {
                $user->{DBCol::SUB_GROUP_ID} = null;
                $user->save();
            });

            // $self->issues()->each(function ($issue) {
            //     $issue->{DBCol::ISSUED_BY} = null;
            //     $issue->save();
            // });
        });
    }

    public function users()
    {
        return $this->hasMany(User::class, self::FK);
    }

    public function subGroupUsers()
    {
        return $this->hasMany(User::class, DBCol::SUB_GROUP_ID);
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
