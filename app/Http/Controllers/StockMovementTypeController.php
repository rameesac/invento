<?php

namespace App\Http\Controllers;

use App\StockMovementType;
use Illuminate\Http\Request;

class StockMovementTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return StockMovementType::all();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list()
    {
        return StockMovementType::select(['name as label', 'id as value'])->get();
    }
}
