<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CampaignPlacement;

class CampaignPlacementController extends Controller
{
    public function index()
    {
        $campaignPlacements = CampaignPlacement::all();
        return response()->json($campaignPlacements);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'campaign_id' => 'required|integer',
            'Placement_id' => 'required|integer',
            'tracking_id' => 'required|integer'
        ]);

        $campaignPlacement = CampaignPlacement::create($validatedData);

        if ($campaignPlacement) {
            return response()->json('created succesfully', 201);
        } else {
            return response()->json(['error' => 'CampaignPlacement could not be created'], 500);
        }
    }

    public function show($campaign_id, $Placement_id)
    {
        $campaignPlacement = CampaignPlacement::find(['campaign_id' => $campaign_id, 'Placement_id' => $Placement_id]);
        if ($campaignPlacement) {
            return response()->json($campaignPlacement);
        } else {
            return response()->json(['error' => 'CampaignPlacement not found'], 404);
        }
    }

    public function update(Request $request, $campaign_id, $Placement_id)
    {
        $validatedData = $request->validate([
            'campaign_id' => 'required|integer',
            'Placement_id' => 'required|integer',
            'trackin_id' => 'required|integer'
        ]);

        $campaignPlacement = CampaignPlacement::find(['campaign_id' => $campaign_id, 'Placement_id' => $Placement_id]);
        if ($campaignPlacement) {
            $campaignPlacement->update($validatedData);
            return response()->json($campaignPlacement);
        } else {
            return response()->json(['error' => 'CampaignPlacement not found'], 404);
        }
    }

    public function destroy($campaign_id, $Placement_id)
    {
        $campaignPlacement = CampaignPlacement::find(['campaign_id' => $campaign_id, 'Placement_id' => $Placement_id]);
        if ($campaignPlacement) {
            $campaignPlacement->delete();
            return response()->json(['success' => true]);
        } else {
            return response()->json(['error' => 'CampaignPlacement not found'], 404);
        }
    }
}
