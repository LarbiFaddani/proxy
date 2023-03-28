<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{

    public function index()
    {
        $locations = Location::all();
        return response($locations, 200);
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'region'=> 'bail|required|string|max:45',
            'city'=> 'bail|required|string|max:45',
            'secteur' => 'bail|required|string|max:45',
            'longitude' => 'bail|required|integer',
            'altitude' => 'bail|required|integer',
        ]);
             Location::create($data);
             return response()->json('Location Created', 201);
    }


    public function show(Location $location)
    {
        $location = Location::find($location->id);
        return response($location, 200);
    }


    public function update(Request $request, Location $location)
    {
        $data = $request->validate([
            'region'=> 'bail|string|max:45',
            'city'=> 'bail|string|max:45',
            'secteur' => 'bail|string|max:45',
            'longitude' => 'bail|integer',
            'altitude' => 'bail|integer',
        ]);
        $location = Location::findOrFail($location->id);
        $location->update($data);
        return response()->json('Update successful', 200);
    }


    public function destroy(Location $location)
    {
        $location = Location::findOrFail($location->id);
        $location->delete();
        return response()->json(['message' => 'Location supprimée avec succès'], 200);
    }


}
