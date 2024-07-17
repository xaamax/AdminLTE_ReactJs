<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HealthController extends Controller
{
	public function getHealth(Request $request)
    {
        return response()->json(["Message" => "Sucesso"], 200);
    }
}
