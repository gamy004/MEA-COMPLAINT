<?php

namespace App\Models;

use App\IOCs\Data;
use App\IOCs\DBCol;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class File extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        DBCol::DISPLAY_NAME,
        DBCol::HASH_NAME,
        DBCol::SIZE,
        DBCol::FORMATTED_SIZE,
        DBCol::MIME,
        DBCol::PATH,
        DBCol::URL,
        DBCol::_PUBLIC
    ];

    static public function makeFullPath($path)
    {
        return storage_path(Data::APP_DIR . $path);
    }

    public function fullPath()
    {
        return self::makeFullPath($this->{DBCol::PATH});
    }

    public function headers()
    {
        return array('Content-Type' => $this->{DBCol::MIME});
    }

    /**
     * Relation with issues table
     *
     * @return void
     */
    public function issues()
    {
        return $this->belongsToMany(
            Issue::class, 'issue_attachment', 'attachment_id', Issue::FK
        )->using(IssueAttachment::class);
    }

    /**
     * Relation with issue_notes table
     *
     * @return void
     */
    public function issueNotes()
    {
        return $this->belongsToMany(
            IssueNote::class, 'issue_note_attachment', 'attachment_id', IssueNote::FK
        )->using(IssueNoteAttachment::class);
    }
}
