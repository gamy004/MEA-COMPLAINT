<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IssueCategory extends Model
{
    const FK = 'issue_category_id';
    
    public function issues()
    {
        return $this->hasMany(Issue::class, self::FK);
    }
}
