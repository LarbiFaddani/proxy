<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\comBusinessActivity;

class Com_businessActivityController extends Controller
{
    public function index()
    {
        $data=comBusinessActivity::all();
        return response($data , 200);
    }


    public function create()
    {

    }


    public function store(Request $request)
    {

    }


    public function show(string $id)
    {

    }


    public function edit(string $id)
    {

    }


    public function update(Request $request, string $id)
    {

    }


    public function destroy(string $id)
    {

    }
}
