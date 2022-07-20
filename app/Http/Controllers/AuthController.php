<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use DateTime;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
    // register
    public function register(Request $request)
    {
        $data = $request->validate(
            [
                'name' => 'required|string',
                'email' => 'required|email|string|unique:users,email',
                'password' => 'required'

            ]
        );

        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    // login
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email|string|exists:users,email',
            'password' => [
                'required',
            ],
            'remember' => 'boolean'
        ]);
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            return response([
                'error' => 'The Provided credentials are not correct'
            ], 422);
        }
        $user = Auth::user();
        /** @var User $user */
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }
    // logout
    public function logout()
    {
        /** @var User $user */
        $user = Auth::user();
        // Revoke the token that was used to authenticate the current request...
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }

    // check membership 
    public function buyMembership(Request $request)
    {
        $user = Auth::user();
        DB::table('users')
            ->where('id', $user->id)
            ->update(['membership' =>  $request->getContent()]);


        return response([
            'success' => true
        ]);
    }

    // validate membership
    public function validateMembership()
    {
        $user = Auth::user();
        $date_now = strtotime(date('Y-m-d'));

        if ($user->membership) {
            $expire_time = strtotime($user->membership);
            if ($date_now < $expire_time) {
                return response(['success' => true]);
            }
        }

        return response(['success' => false]);
    }
}
