<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
class UserController extends Controller
{
    public function index(Request $request)
{
    $users = User::query();
    if ($request->has('id')) {
        $users->where('id', $request->id);
    }
    if ($request->has('role')) {
        $users->where('role', 'LIKE', '%'.$request->role.'%');
    }
    if ($request->has('email')) {
        $users->where('email', 'LIKE', '%'.$request->email.'%');
    }
    if ($request->has('status')) {
        $users->where('status','LIKE', '%'. $request->status.'%');
    }
    if ($request->has('name')) {
        $users->where('name', 'LIKE', '%'.$request->name.'%');
    }
    if ($request->has('phone')) {
        $users->where('phone','LIKE', '%'. $request->phone.'%');
    }
    if ($request->has('address')) {
        $users->where('address', 'LIKE', '%'.$request->address.'%');
    }
    //filtrer avec les fields
    //http://127.0.0.1:8000/api/users?email=kamryn10@example.org
    if ($request->has('sort_by')) {
        $sortDirection = $request->has('sort_dir') && strtolower($request->sort_dir) === 'desc' ? 'desc' : 'asc';
        $users->orderBy($request->sort_by, $sortDirection);
    } else {
        $users->orderBy('id', 'asc');
    }
    //http://127.0.0.1:8000/api/users?sort_by=name
    //http://127.0.0.1:8000/api/users?sort_by=name&sort_dir=desc
    $users = $users->get();
    return response($users, 200);
        ///http://127.0.0.1:8000/api/users?role=business&status=1 //filter & sort_by
    }

    public function store(Request $request)
    {
         $data = $request->validate([
            'email'=> 'bail|required|string|email|min:5|max:65',
            'password'=> 'bail|required|string|min:5|max:45',
            'status'=> 'bail|integer|in:0,1',//par defaut true
            'name'=> 'bail|required|string|max:45',
            'phone'=> 'bail|required|string|min:9|max:45',
            'role'=> 'bail|required|string|min:4|max:45',
            'address'=> 'bail|required|string|min:5|max:120',

        ]); //validation des données
         $data['password']= bcrypt('password');//crypter avec la fonction bcrypt
            User::create($data);
            // return response($user, 200); //la variable User depuis l'affectation du l'objet créé
            return response()->json('User Created', 201);
    }

    public function show($id)
    {
        $user = User::find($id); //cherche sur l'id
        return response($user, 200);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'email'=> 'bail|string|email|min:5|max:65', //l'email ne doit pas changer car il s'agit d'une clé étrangère dans une autre table.
            bcrypt('password')=> 'bail|string|min:5',
            'status'=> 'bail|integer|in:0,1', //par default enable
            'name'=> 'bail|string|max:45',
            'phone'=> 'bail|string|min:9|max:45',
            'address'=> 'bail|string|min:5|max:120',
            'role'=> 'bail|string|min:4|max:45',
        ]);
        //$user = User::find($email);
        $user = User::find($id);
           // return response($user);
        if (!$user->exists()) {
            return response()->json('id not found', 404);
        }else{
            User::find($id)->update($data);
            return response()->json('Update successful', 200);
        }
    }
}
