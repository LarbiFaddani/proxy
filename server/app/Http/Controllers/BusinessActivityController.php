<?php
namespace App\Http\Controllers;
use App\Models\BusinessActivity;
use Illuminate\Http\Request;

class BusinessActivityController extends Controller
{
    public function index()

    {

      $dataActivity=BusinessActivity::all();
        return response($dataActivity ,200);

    }

    public function store(Request $request)
    {
        $data = $request->validate(['name'=> 'bail|required|string|max:45']);
        BusinessActivity::create($data);
            return response()->json(['message' => 'the new activity is successfully created'],201);
    }

    public function show($id)
    {
        $data = BusinessActivity::findOrFail($id);
        return response($data ,200);
    }

    public function update(Request $request, BusinessActivity  $business_activity)
    {
        $data=$request->validate(['name'=> 'bail|string|max:45']);
        // dd($business_activity->id);
        $businessactivity =BusinessActivity::findOrFail($business_activity->id);
        $businessactivity->update($data);
        return response()->json('Update successful',200);
    }

    public function destroy(BusinessActivity  $business_activity)
    {
        $businessactivity=BusinessActivity::findOrFail($business_activity->id);
        $businessactivity->delete();
            return response()->json(['message'=>'business Activity is  deleted successfully']);
    }
}
?>
