<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CampaignLocation;
use App\Models\Campaign;
use App\Models\Location;


class CampaignLocationController extends Controller
{
    public function index()
    {
        $campaignLocations = CampaignLocation::all();
        return response()->json($campaignLocations);
    }

    public function store(Request $request)
    {
        $campaign = Campaign::findOrFail($request->input('campaign_id'));
        $location = Location::findOrFail($request->input('location_id'));


        $adsLocation = new CampaignLocation();
        $adsLocation->campaign()->associate($campaign);
        $adsLocation->location()->associate($location);
        $adsLocation->radius = $request->input('radius');
        $adsLocation->save();

        return response()->json(['message' => 'campaign location created'], 201);
    }

    public function show($campaign_id, $location_id)
    {
        $campaignLocation =  CampaignLocation::where('campaign_id', $campaign_id)
        ->where('location_id', $location_id)
        ->get();
        //if ($campaignLocation) {
            return response()->json($campaignLocation);
          // return response()->json(['message'=>'campaignlocation trouvé']);
        //} else {
        //    return response()->json(['error' => 'CampaignLocation not found'], 404);
        //}
    }
/*
    public function update(Request $request, $campaign_id, $location_id)
    {
        $campaign = Campaign::findOrFail($campaign_id);
        $location = Location::findOrFail($location_id);

        $campaignLocation = CampaignLocation::where('campaign_id', $campaign_id)
        ->where('location_id', $location_id)
        ->firstOrFail();

        $campaignLocation->radius = $request->input('radius');
        $campaignLocation->save();


        return response()->json(['message' => 'campaign location updated'], 200);
    }
*/public function update(Request $request, $campaign_id, $location_id)
{
    $campaignLocation = CampaignLocation::where('campaign_id', $campaign_id)
        ->where('location_id', $location_id)
        ->update(['radius' => $request->input('radius')]);

    return response()->json(['message' => 'campaign location updated'], 200);
}

/*
    public function destroy( $id)
    {
        $campaignLocation = CampaignLocation::findOrFail($id);
        if ($campaignLocation) {
            $campaignLocation->delete();
            return response()->json(['success' => true]);
        } else {
            return response()->json(['error' => 'CampaignLocation not found'], 404);
        }
    }
public function destroy($campaign_id, $location_id)
{
    $campaignLocation = CampaignLocation::where('campaign_id', $campaign_id)
        ->where('location_id', $location_id)
        ->firstOrFail();

    $campaign = Campaign::findOrFail($campaign_id);
    $location = Location::findOrFail($location_id);

    $campaignLocation->delete();

    // Vérifier si l'enregistrement supprimé existe toujours dans la table intermédiaire
    $campaignLocationExists = CampaignLocation::where('campaign_id', $campaign_id)
        ->where('location_id', $location_id)
        ->exists();

    // Si l'enregistrement n'existe plus dans la table intermédiaire, vérifier si les enregistrements dans les autres tables sont toujours utilisés
    if (!$campaignLocationExists) {
        $campaignExists = CampaignLocation::where('campaign_id', $campaign_id)->exists();
        $locationExists = CampaignLocation::where('location_id', $location_id)->exists();

        // Si les enregistrements ne sont plus utilisés, supprimer également les enregistrements dans les autres tables
        if (!$campaignExists) {
            $campaign->delete();
        }
        if (!$locationExists) {
            $location->delete();
        }
    }

    return response()->json(['message' => 'campaign location deleted'], 200);
}*/
public function destroy($campaign_id, $location_id)
{
    $campaignLocation = CampaignLocation::where('campaign_id', $campaign_id)
        ->where('location_id', $location_id)
        ->delete();

    return response()->json(['message' => 'campaign location deleted'], 200);
}


}
