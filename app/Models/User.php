<?php

namespace App\Models;

use App\IOCs\DBCol;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable,
        SoftDeletes;

    const FK = 'user_id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        DBCol::USERNAME,
        DBCol::NAME,
        DBCol::PASSWORD,
        DBCol::EMAIL,
        DBCol::GROUP_ID,
        DBCol::SUB_GROUP_ID,
        DBCol::AVATAR_ID,
        DBCol::INBOX_SETTINGS
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Relation with roles table
     *
     * @return void
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_role')->using(UserRole::class);
    }

    public function isAdmin() {
        return $this->roles()->where(DBCol::ROLE, Role::ADMIN)->exists();
    }

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function avatar()
    {
        return $this->belongsTo(File::class);
    }
}
