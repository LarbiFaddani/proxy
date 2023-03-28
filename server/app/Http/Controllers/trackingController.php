<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tracking;
use App\Models\Campaign;

class TrackingController extends Controller
{
    public function index()
    {
        $trackings = Tracking::all();
        return response()->json($trackings);
    }

    public function show($id)
    {
        $tracking = Tracking::find($id);
        return response()->json($tracking);
    }

    public function store(Request $request)
    {
        $tracking = new Tracking();
        $tracking->type = $request->input('type');
        $tracking->date = $request->input('date');
        $tracking->display_time = $request->input('display_time');
        $tracking->save();
        return response()->json($tracking);
    }


    public function update(Request $request, $id)
    {
        $tracking = Tracking::find($id);
        $tracking->type = $request->input('type');
        $tracking->date = $request->input('date');
        $tracking->display_time = $request->input('display_time');
        $tracking->save();
        return response()->json($tracking);
    }

    public function destroy($id)
    {
        $tracking = Tracking::find($id);
        $tracking->delete();
        return response()->json('Tracking removed successfully');
    }
    public function trackCampaign(Request $request, $campaignId)
    {
        // Récupérez la campagne correspondante à l'ID
        $campaign = Campaign::find($campaignId);

        if (!$campaign) {
            return response()->json(['error' => 'La campagne n\'existe pas.'], 400);
        } elseif (!$campaign->isActive()) {
            return response()->json(['error' => 'La campagne est terminée ou n\'est pas encore active.'], 400);
        }
        // Ajoutez le temps écoulé depuis le dernier passage
        $secondsToAdd = $request->input('seconds_to_add');
        $tracking = new Tracking();
        $tracking->type = 'passage';
        $tracking->date = now();
        $tracking->display_time = $secondsToAdd;
        $tracking->campaign_id = $campaign->id;
        $tracking->save();

        return response()->json(['success' => 'Passage enregistré avec succès.']);
    }
}
