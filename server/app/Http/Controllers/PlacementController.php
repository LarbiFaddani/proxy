<?php

namespace App\Http\Controllers;

use App\Models\Placement;
use Illuminate\Http\Request;

class PlacementController extends Controller
{
    public function index(Request $request)

{
    $placements = Placement::query();

    if ($request->has('id')) {
        $placements->where('id', $request->id);
    }

    if ($request->has('name')) {
        $placements->where('name', 'like', '%' . $request->name . '%');
    }
    if ($request->has('business_id')) {
        $placements->where('business_id',$request->name);
    }

    if ($request->has('sort_by')) {
        $sortDirection = $request->has('sort_dir') && strtolower($request->sort_dir) === 'desc' ? 'desc' : 'asc';
        $placements->orderBy($request->sort_by, $sortDirection);
    } else {
        $placements->orderBy('id', 'asc');
    }

    $placements = $placements->with('business')->get();

    return response($placements, 200);
}


    public function store(Request $request)
    {
        $data = $request->validate([
            "name" => 'bail|required|string|max:45',
            "business_id" => 'bail|required|integer',
        ]);
        Placement::create($data);
        return response()->json("Placement a été créé avec succès", 201);
    }

    public function show(Placement $placement)
    {
        $placement = Placement::findOrFail($placement->id);
        // return response($placement, 200);
        return $placement;
    }

    public function update(Request $request, Placement $placement)
    {
        {
            $data = $request->validate([
                "name" => 'bail|string|max:45',
                "business_id" => 'bail|integer',
            ]);
            $placement = Placement::findOrFail($placement->id);
            $placement->update($data);
            return response()->json("Placement a été mise à jour avec succès", 201);
        }
    }

    public function destroy(Placement $placement)
    {
        $placement = Placement::findOrFail($placement->id);
        $placement->delete();
        return response()->json(['message' => 'Placement supprimée avec succès'], 200);
    }
}
