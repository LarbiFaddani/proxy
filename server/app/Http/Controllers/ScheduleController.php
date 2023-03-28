<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{

    public function index()
    {
        $schedules = Schedule::all();
        return response($schedules, 200);
    }

    
    public function store(Request $request)
    {
        $data = $request->validate([
            "opening_hour" => 'bail|required|date_format:H:i:s',
            "closing_hour" => 'bail|required|date_format:H:i:s',
            "day" => 'bail|required',
            "business_id" => 'bail|required|integer',
        ]);
        Schedule::create($data);
        return response()->json('Schedule created', 201);
    }

    public function show(Schedule $schedule)
    {
        $schedule = Schedule::findOrFail($schedule->id);
        return response()->json($schedule, 200);
    }

    
    public function update(Request $request, Schedule $schedule)
    {
        $data = $request->validate([
            "opening_hour" => 'bail|date_format:H:i:s',
            "closing_hour" => 'bail|date_format:H:i:s',
            "day" => 'bail|date',
            "business_id" => 'bail|integer',
        ]);
        $schedule = Schedule::findOrFail($schedule->id);
        $schedule->update($data);
        return response()->json('Schedule a été modifié', 201);
    }

    public function destroy(Schedule $schedule)
    {
        $schedule = Schedule::findOrFail($schedule->id);
        $schedule->delete();
        return response()->json('Schedule a été supprimé avec succès', 200);
    }
    public function delete($business_id)
    {   
        $schedules = Schedule::where('business_id', $business_id)->get();
        foreach ($schedules as $schedule) {
            $schedule->delete();
        }
        return response()->json('Les schedules ont été supprimés avec succès', 200);
    }
}
