<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get Auth
     *
     * @param Request $request
     * @return App\Models\User $user
     */
    public function auth(Request $request)
    {
        $user = $request->user()->load('roles');

        return compact('user');
    }
}
