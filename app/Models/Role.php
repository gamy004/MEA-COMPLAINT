<?php

namespace App\Models;

use App\Traits\Roleable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use Roleable,
        SoftDeletes;

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_role')->using(UserRole::class);
    }
}
