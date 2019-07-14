<?php

namespace App\Models;

use App\IOCs\DBCol;
use App\Helpers\DateTimeHelper;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Issue extends Model
{
    use SoftDeletes;

    const FK = 'issue_id';

    protected $fillable = [
        DBCol::SUBJECT,
        DBCol::DESCRIPTION,
        DBCol::ISSUED_BY,
        DBCol::REFERENCED_TO,
        DBCol::DRAFT,
        // IssueStatus::FK,
        IssueCategory::FK
    ];

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

    public function recipients()
    {
        return $this->belongsToMany(
            Group::class, 'issue_recipient', self::FK, DBCol::RECIPIENT_ID
        )->using(IssueRecipient::class);
    }

    public function attachments()
    {
        return $this->belongsToMany(
            File::class, 'issue_attachment', self::FK, 'attachment_id'
        )->using(IssueAttachment::class);
    }

    public function issuer()
    {
        return $this->belongsTo(Group::class, DBCol::ISSUED_BY);
    }

    public function category()
    {
        return $this->belongsTo(IssueCategory::class, IssueCategory::FK);
    }

    public function status() {
        return $this->belongsTo(IssueStatus::class, IssueStatus::FK);
    }

    public function notes() {
        return $this->hasMany(IssueNote::class);
    }

    public function logs()
    {
        return $this->hasMany(IssueStatusLog::class, self::FK);
    }
}
