<?php

namespace App\Http\Controllers;


use App\Models\Advertiser;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;

class AdvertiserController extends Controller
{
    public function index(Request $request)
    {
        $data = Advertiser::query();
        if ($request->has('id')) {
            $data->where('id', $request->id);
        }
        if ($request->has('user_id')) {
            $data->where('user_id',$request->user_id);
        }
        if($request->has('act_id')){
            $data->where('act_id',$request->act_id);
        }
        if($request->has('act_name')){
            $data->where('act_name',$request->act_name);
        }
        return response($data->get(), 200);
    }
 
    public function show ($id){
      $dataAdv = Advertiser::select('u.id as user_id','u.email','ac.id','ac.name', 'u.status', 'u.name', 'u.phone','u.password', 'u.address','u.created_at', 'u.updated_at')
      ->from('users as u')
      ->join('advertisers as ad', 'u.id', '=', 'ad.user_id')
      ->join('business_activities as ac', 'ac.id', '=', 'ad.act_id')
      ->where('u.role', 'advertiser')
      ->where('ad.id', $id)
      ->get();
       return response($dataAdv, 200);
    }
    
    public function store(Request $request)
    {
        $reg_ex = 'bail|required|string|min:5|max:45';
        $data = $request->validate([
            'email'=> 'bail|required|string|email|min:5|max:65', 
            'status'=> 'bail|integer|in:0,1',
            'password'=> $reg_ex,
            'name'=> 'bail|required|string|max:45',
            'phone'=> 'bail|required|string|min:9|max:45',
            'address'=> 'bail|required|string|min:5|max:120',
            'role' => 'bail|required|string|min:4|max:45',
            'act_id'=>'bail|integer|required',
            'act_name'=> $reg_ex
        ]);
        $user = User::create([
            'email' => $data['email'],
            'name' => $data['name'],
            'phone' => $data['phone'],
            'address' => $data['address'],
            'role' => 'Advertiser',
            'password'=>$data['password'],
        ]);
        Advertiser::create([
            'user_id' => $user->id,
            'act_id'=> $data['act_id'],
        ]);
        return response()->json(['message' => 'advertiser est créés avec succès'], 200);
    }

    public function showdet($id)
    {
        $AdverS = Advertiser::select('u.id as user_id','u.email', 'ac.id','u.status','u.password', 'u.name', 'u.phone', 'u.address','u.created_at', 'u.updated_at')
                    ->from('users as u')
                    ->join('advertisers as ad', 'u.id', '=', 'ad.user_id')
                    ->join('business_activities as ac','ad.act_id','=','ac.id')
                    ->where('u.role', 'advertiser')->where('ad.id', $id)
                    ->first()
                    ->get();
        return response($AdverS, 200);      
    } 
   
    public function update(Request $request, string $id )
    {
    $data = Advertiser::where('id', $id)->first();
    if (!$data) {
        return response()->json(['message' => 'advertiser not found'], 404);
    }
    $reg_ex = 'bail|required|string|min:5|max:45';
    $user = User::find($data->user_id);
    $requestData = $request->validate([
    'email' => 'bail|string|email|min:5|max:65',
    'password'=> $reg_ex,
    'status' => 'bail|integer|in:0,1',
    'name' => 'bail|string|max:45',
    'phone' => 'bail|string|min:9|max:45',
    'address' => 'bail|string|min:5|max:120',
]);

if(isset($requestData['email'])){
    $user->email = $requestData['email'];
}  
if(isset($requestData['password'])){
    $user->password = bcrypt($requestData['password']);
} 
if(isset($requestData['name'])){
    $user->name = $requestData['name'];
}
if(isset($requestData['phone'])){
    $user->phone = $requestData['phone'];
}
if(isset($requestData['address'])){
    $user->address = $requestData['address'];
}
if(isset($requestData['status'])){
    $user->status = $requestData['status'];
}
$user->update();

if(isset($requestData['act_id'])){
    $data->act_id = $requestData['act_id'];
}
if(isset($requestData['act_name'])){
    $data->act_id = $requestData['act_name'];
}
$data->update($requestData);

return response()->json(['message' => 'advertiser updated'], 200);
    }
}
