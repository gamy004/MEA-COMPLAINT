<?php

namespace App\Models;

use App\IOCs\DBCol;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class IssueCategory extends Model
{
    use SoftDeletes;
    
    const FK = 'issue_category_id';

    protected $fillable = [
        DBCol::CATEGORY
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::deleting(function ($self) {
            Issue::where(self::FK, $self->{DBCol::ID})->update([self::FK => null]);
        });
    }
    
    public function issues()
    {
        return $this->hasMany(Issue::class, self::FK);
    }
}
