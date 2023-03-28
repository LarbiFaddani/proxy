<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\CampaignPlacement;
use App\Models\Campaign;
use App\Models\Placement;
use App\Models\Tracking;



class CampaignPlacementController extends Controller
{
    public function index()
    {
        $campaignPlacements = CampaignPlacement::all();

        return response()->json($campaignPlacements);
    }

    public function show($campaign_id , $placement_id)
    {
        $campaignPlacement = CampaignPlacement::where('campaign_id', $campaign_id)
        ->where('placement_id',$placement_id)
        ->get();
        if (!$campaignPlacement) {
            return response()->json(['error' => 'Campaign placement not found'], 404);
        }

        return response()->json($campaignPlacement);
    }

    public function store(Request $request)
    {
        // Récupérer les données de la requête
        $campaign_id = $request->input('campaign_id');
        $placement_id = $request->input('placement_id');
        $tracking_id = $request->input('tracking_id');

        // Créer l'enregistrement dans la table intermédiaire
        $campaignPlacement = new CampaignPlacement();
        $campaignPlacement->campaign_id = $campaign_id;
        $campaignPlacement->placement_id = $placement_id;
        $campaignPlacement->tracking_id = $tracking_id;
        $campaignPlacement->save();
        return response()->json($campaignLocation);
    }

    public function update(Request $request, $campaign_id, $placement_id)
    {
    CampaignPlacement::where('campaign_id', $campaign_id)
        ->where('placement_id', $placement_id)
        ->update(['tracking_id' => $request->input('tracking_id')]);

    return response()->json([
        'message' => 'CampaignPlacement updated successfully'
    ]);
    }


    public function destroy($campaign_id ,$placement_id)
    {
        $campaignPlacement = CampaignPlacement::where('campaign_id',$campaign_id)
        ->where('placement_id',$placement_id);
        if (!$campaignPlacement) {
            return response()->json(['error' => 'Campaign placement not found'], 404);
        }

        $campaignPlacement->delete();

        return response()->json(null, 204);
    }
}
