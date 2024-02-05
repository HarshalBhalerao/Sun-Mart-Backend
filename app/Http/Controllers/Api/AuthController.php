<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $data = $request->validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'password_confirmation' => $data['password_confirmation']
        ]);
    }

    public function signup(SignupRequest $request)
    {

    }

    public function logout(Request $request)
    {

    }
}
