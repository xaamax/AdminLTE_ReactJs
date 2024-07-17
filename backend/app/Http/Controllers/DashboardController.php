<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Inspection;

class DashboardController extends Controller
{
    public function __construct(Report $report, Inspection $inspection)
    {
        $this->report = $report;
        $this->inspection = $inspection;
    }

    public function dashboard()
    {
        $dashboard = [
            "boxes" => [
                [
                    "label" => "Relatórios",
                    "icon" => "file-alt",
                    "routeList" => "/reports",
                    "routeAdd" => "/reports/create",
                    "childrens" => $this->report::byGroupSituacao()->get(),
                    "totalItems" => count($this->report::get())
                ],
                [
                    "label" => "Vistorias",
                    "icon" => "building",
                    "routeList" => "/inspections",
                    "routeAdd" => "/inspections/create",
                    "childrens" => $this->inspection::byGroupSituacao()->get(),
                    "totalItems" => count($this->inspection::get())
                ]
            ],
        ];

        return response()->json($dashboard, 200);
    }
}
