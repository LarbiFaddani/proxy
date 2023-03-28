<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class LoginController extends Controller
{/*
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::guard('admin')->attempt($credentials)) {
            // Authentication passed...
            return response()->json(['message' => 'Logged in successfully']);
        } else {
            return response()->json(['message' => 'Invalid email or password'], 401);
        }
    }*/public function login(Request $request)
    {
        $login = $request->only('email', 'password');

        if (User::attempt($login)) {
            // Authentication passed...
            return response()->json(['message' => 'Logged in successfully']);
        } else {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
    }
}
