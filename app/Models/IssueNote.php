<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IssueNote extends Model
{
    public function issue()
    {
        return $this->belongsTo(Issue::class, Issue::FK);
    }
}
