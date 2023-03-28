<?php

namespace App\Http\Controllers;
use App\Models\BusinessType;
use Illuminate\Http\Request;

class BusinessTypeController extends Controller
{
    public function index(){
        $businesstypes = BusinessType::all();
        return response($businesstypes ,200);
        
    }
    
    public function store(Request $request){
        $data = $request->validate([
        'name'=> 'bail|required|string|max:45']
        );
        BusinessType::create($data);
        return response()->json(['message' => 'the new type is successfully created'],201);    
    }


    public function show($id){
        $businesstypes=BusinessType::findOrFail($id);
        return response($businesstypes ,200);
    }
   
    
    public function update(Request $request, BusinessType $business_type)
    {
        $data=$request->validate(['name'=> 'bail|string|max:45']);

        $businesstype = BusinessType::findOrFail($business_type->id);
        $businesstype->update($data);
        return response()->json('Update successful', 200);
    }

    
    public function destroy(BusinessType $business_type)
    {
        $businesstype=BusinessType::findOrFail($business_type->id);
        $businesstype->delete();
         return response()->json(['message'=>'business types deleted successfully']);
}
}