<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    public function issuer()
    {
        return $this->belongsTo(Group::class);
    }

    public function recipients()
    {
        return $this->belongsToMany(
            Group::class, 'issue_recipient', 'issue_id', 'recipient_id'
        )->using(IssueRecipient::class);
    }
}
