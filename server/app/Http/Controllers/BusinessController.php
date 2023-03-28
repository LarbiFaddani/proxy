<?php

namespace App\Http\Controllers;

use App\Models\Business;
use App\Models\User;
use Illuminate\Http\Request;

class BusinessController extends Controller
{
    public function index(Request $request)
    {
        $businesses = Business::query();
        if ($request->has('id')) {
            $businesses->where('id', $request->id);
        }
        if ($request->has('user_id')) {
            $businesses->where('user_id',$request->user_id);
        }
        if ($request->has('location_id')) {
            $businesses->where('location_id', 'LIKE', '%'.$request->location_id.'%');
        }
        if ($request->has('longitude')) {
            $businesses->where('longitude', 'LIKE', '%'.$request->longitude.'%');
        }
        if ($request->has('altitude')) {
            $businesses->where('altitude', 'LIKE', '%'.$request->altitude.'%');
        }
        //http://127.0.0.1:8000/api/businesses?sort_by=user_id&sort_dir=asc
        return response($businesses->get(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'id' => 'bail|integer',
            'email'=> 'bail|required|string|email|max:65',
            'password'=> 'bail|required|string|max:45', 
            'status'=> 'bail|integer|in:0,1',//par defaut true
            'name'=> 'bail|required|string|max:45',
            'phone'=> 'bail|required|string|max:45',
            'address'=> 'bail|required|string|max:120',
            'location_id' => 'bail|required|integer',
            'longitude' => 'bail|required|numeric',
            'altitude' => 'bail|required|numeric',
            'business_type_id' => 'bail|required|numeric',
            'business_activity_id' => 'bail|required|numeric',
            // 'role' => 'bail|required|string|min:4|max:45',
        ]);
        // Créer un nouvel utilisateur
        $user = User::create([
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'name' => $data['name'],
            'phone' => $data['phone'],
            'address' => $data['address'],
            'role' => 'business',
        ]);
        Business::create([
            'id' =>  empty($data['id'])?null:$data['id'],
            'user_id' => $user->id,
            'longitude' => $data['longitude'],
            'altitude' => $data['altitude'],
            'location_id' => $data['location_id'],
            'business_type_id' => $data['business_type_id'],
            'business_activity_id' => $data['business_activity_id'],
        ]);
        // Retourner une réponse JSON avec un message de succès
        return response()->json(['message' => 'Utilisateur et entreprise créés avec succès'], 200);
    }


    public function show($id)
    {
        $business = Business::select('u.id as user_id', 'u.email', 'u.status', 'u.name', 'u.phone', 'u.address', 'b.location_id', 'b.longitude', 'b.altitude', 'u.created_at', 'u.updated_at')
        ->from('users as u')
        ->join('businesses as b', 'u.id', '=', 'b.user_id')
        ->where('u.role', 'business')->where('b.id', $id)
        ->first();
        return response($business, 200);
    }

    public function update(Request $request, $id)
    {
        if (!Business::where('id', $id)->first()) {
            return response()->json(['message' => 'business non trouvé'], 404);
        }

        $business = Business::where('id', $id)->first();

        if (!User::find($business->user_id)) {
            return response()->json(['message' => 'Utilisateur non trouvé'], 404);
        }
        // dd($business->user_id);
        $user = User::find($business->user_id);
        $data = $request->validate([
            'email' => 'bail|string|email|min:5|max:65',
            'password' => 'bail|string|min:5|max:45',
            'status' => 'bail|integer|in:0,1',
            'name' => 'bail|string|max:45',
            'phone' => 'bail|string|min:9|max:45',
            'address' => 'bail|string|min:5|max:120',
            'location_id' => 'bail|integer',
            'longitude' => 'bail|numeric',
            'altitude' => 'bail|numeric',
            'business_type_id' => 'bail|numeric',
            'business_activity_id' => 'bail|numeric',

        ]);
        if(isset($data['email']))
            $user->email = $data['email'];
        if(isset($data['password']))
            $user->password = bcrypt($data['password']);
        if(isset($data['name']))
            $user->name = $data['name'];
        if(isset($data['phone']))
            $user->phone = $data['phone'];
        if(isset($data['address']))
            $user->address = $data['address'];
        if(isset($data['status']))
            $user->status = $data['status'];
        $user->update();
        
        if (!$business) {
            return response()->json(['message' => 'Entreprise non trouvée'], 404);
        }
        if(isset($data['location_id']))
            $business->location_id = $data['location_id'];
        if(isset($data['longitude']))
            $business->longitude = $data['longitude'];
        if(isset($data['altitude']))
            $business->altitude = $data['altitude'];
        if(isset($data['business_type_id']))
            $business->business_type_id = $data['business_type_id'];
        if(isset($data['business_activity_id']))
            $business->business_activity_id = $data['business_activity_id'];
        $business->update();

        return response()->json(['message' => 'Utilisateur et entreprise mis à jour avec succès'], 200);
    }
}