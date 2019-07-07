<?php

namespace App\Models;

use App\Traits\Roleable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Role extends Model
{
    use Roleable,
        SoftDeletes;

    const ADMIN = 'admin';
    const USER = 'user';
    const FK = 'role_id';

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_role')->using(UserRole::class);
    }
}
