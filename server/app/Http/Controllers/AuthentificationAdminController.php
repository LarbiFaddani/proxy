<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;


class AuthentificationAdminController extends Controller
{
    public function login(Request $request)
{
    $credentials = $request->only('email', 'password');
    $role = 'admin';

    if (Auth::attempt($credentials)) {

        // L'utilisateur est authentifié
        if (Auth::user()->role === $role) {
            // L'utilisateur a le rôle "admin"
            return response()->json(['success' => true, 'message' => 'Authentification réussie']);
        } else {
            // L'utilisateur n'a pas le rôle "admin"
            Auth::logout();
            return response()->json(['success' => false, 'message' => 'Vous n\'êtes pas autorisé à vous connecter']);
        }
    } else {
        //dd($credentials);
        // Les informations d'identification sont incorrectes
        return response()->json(['success' => false, 'message' => 'Informations d\'identification incorrectes']);
    }
}

}
