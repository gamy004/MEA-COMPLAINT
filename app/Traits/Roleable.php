<?php

namespace App\Traits;

trait Roleable {

    public function scopeRole($query, $name)
    {
        $query->where("role", $name);
    }

    public function scopeRoleIn($query,array $names)
    {
        $query->whereIn("role", $names);
    }
}