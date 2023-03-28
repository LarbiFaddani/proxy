<?php

namespace App\Http\Controllers;

use App\Models\Parameters;
use Illuminate\Http\Request;

class ParametersController extends Controller
{
    public function index()
    {
        // Récupère tous les enregistrements de la table Parameters
        $parameters = Parameters::all();
        // Retourne les enregistrements sous forme de réponse JSON
        return response()->json($parameters);
    }

    public function store(Request $request)
    {
        // Valide les données envoyées dans la requête
        $validatedData = $request->validate([
            'ad_price_advertiser' => 'required',
            'ad_price_business' => 'required',
            'com_display_time' => 'required',
        ]);

        // Crée un nouveau modèle Parameters avec les données validées
        $parameters = Parameters::create($validatedData);

        // Retourne le modèle Parameters créé sous forme de réponse JSON
        return response()->json($parameters, 201);
    }

    public function show($id)
    {
        $parameters= Parameters::find($id);
        return response()->json($parameters,200);
    }

    public function update(Request $request, Parameters $parameters)
{
    // Validate les données envoyées dans la requête
    $validatedData = $request->validate([
        'ad_price_advertiser' => 'required|numeric',
        'ad_price_business' => 'required|numeric',
        'com_display_time' => 'required|numeric',
    ]);

    $parameters = Parameters::findOrFail($parameters->id);
    $parameters->update($validatedData);
    return response()->json('Update successful', 200);
}
    public function destroy( Parameters $Parameters)
    {
       $Parameters=Parameters::findOrFail($Parameters->id);
       $Parameters->delete();
       return response()->json(['message'=>'deleted successfuly']);
    }
}
?>
