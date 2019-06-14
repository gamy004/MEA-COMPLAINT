<?php

namespace App\Models;

use App\Helpers\DateTimeHelper;
use Illuminate\Database\Eloquent\Model;

class Issue extends Model
{
    public function getCreatedAtAttribute($timestamp)
    {
        $dateTimeHelper = app(DateTimeHelper::class);

        return $dateTimeHelper->parseFullDateTime($timestamp);
    }

    public function getUpdatedAtAttribute($timestamp)
    {
        $dateTimeHelper = app(DateTimeHelper::class);

        return $dateTimeHelper->parseFullDateTime($timestamp);
    }
    
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
