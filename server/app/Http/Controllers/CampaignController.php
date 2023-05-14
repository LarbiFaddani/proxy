<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campaign;

class CampaignController extends Controller
{
    public function index()
    {
        $campaigns = Campaign::all();
        return response($campaigns,200);
    }

    public function show($id)
    {
        $campaign = Campaign::findOrFail($id);
        return response($campaign,200);
    }

    public function store(Request $request)
    {
        $regEx1 = 'bail|required';
        $data = $request->validate([
            'name'=> 'bail|required|string',
            'budget_max'=> $regEx1,
            'begin_date' => $regEx1,
            'end_date' => $regEx1,
            'file' => 'bail|string',
            'display_hours'=>'bail',
            'url'=>'bail|string',
            'advertiser_id'=> $regEx1

        ]);

            Campaign::create($data);
             // récupérer l'ID de la campaign
            return response()->json('Campaign Created', 201);
    }

    public function update(Request $request, Campaign $Campaign)
    {
        $regEx1 = 'bail|required';
        $data=$request->validate(['name'=> 'bail|string',
        'name'=> 'bail|required|string',
        'budget_max'=> $regEx1,
        'begin_date' => $regEx1,
        'end_date' => $regEx1,
        'file' => 'bail|string',
        'display_hours'=>'bail',
        'url'=>'bail|string',

        'advertiser_id'=> $regEx1
    ]);
        $Campaign = Campaign::findOrFail($Campaign->id);
        $Campaign->update($data);
        return response()->json('Update successful', 200);
    }

    public function destroy(Campaign $Campaign)
    {
        $Campaign = Campaign::findOrFail($Campaign->id);
        $Campaign->delete();
        return response()->json(['message' => 'Location supprimée avec succès'], 204);
    }
    public function calculateMinutes(Request $request) {
        // Récupérer le budget de l'utilisateur depuis la requête
        $budget = $request->input('budget');

        // Calculer le nombre de minutes
        $pricePerMinute = 1;
        $minutes = floor($budget / $pricePerMinute);
        $heures=floor($minutes/60);

        // Retourner le nombre de minutes en tant que réponse JSON
        return response()->json(['heures' => $heures]);
      }
}
