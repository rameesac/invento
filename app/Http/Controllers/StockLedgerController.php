<?php

namespace App\Http\Controllers;

use App\StockLedger;
use Illuminate\Http\Request;

class StockLedgerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return StockLedger::with('product:id,name', 'stock_movement_type:id,name')
        ->orderBy('id', 'desc')
        ->get();
    }
}
