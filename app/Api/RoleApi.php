<?php

namespace App\Api;

use App\Api\BaseApi;
use App\Contracts\ApiInterface;
use App\Models\Role;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class RoleApi extends BaseApi implements ApiInterface
{

    public function __construct(Role $q)
    {
        parent::__construct($q);
    }

    public function store(array $raw)
    {

    }

    public function update(Model $user, array $raw)
    {

    }

    public function destroy(Model $Role)
    {

    }
}
