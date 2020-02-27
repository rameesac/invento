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
        $stockLedger = StockLedger::all();
        return $stockLedger;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\StockLedger  $stockLedger
     * @return \Illuminate\Http\Response
     */
    public function show(StockLedger $stockLedger)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\StockLedger  $stockLedger
     * @return \Illuminate\Http\Response
     */
    public function edit(StockLedger $stockLedger)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\StockLedger  $stockLedger
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StockLedger $stockLedger)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\StockLedger  $stockLedger
     * @return \Illuminate\Http\Response
     */
    public function destroy(StockLedger $stockLedger)
    {
        //
    }
}
