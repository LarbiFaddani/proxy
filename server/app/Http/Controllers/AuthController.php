<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller ;

use App\Models\User;



class AuthController extends Controller
{
    public function login(Request $request)
{
    $credentials=$request->validate([
        'email'=>'required|email',
        'password'=>'required'
    ]);

    if(Auth::attempt($credentials)){
        echo ('bonjour');
        $user=Auth::user();
            var_dump($user);
        if($user->role=='admin'){
            $token=$user->createToken('authToken')->accessToken;
            return response()->json([
                'success' => true,
                'message' => 'Successfully logged in',
                'user' => $user,
                'token' => $token
            ], 200);
        }else{
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }
    }else{
        echo('invalid');
        return response()->json([
            'success' => false,
            'message' => 'Invalid email or password'
        ], 401);
    }
}

}
