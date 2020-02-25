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
        $sockMovementType = StockMovementType::all();
        return $sockMovementType;
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
     * @param  \App\StockMovementType  $stockMovementType
     * @return \Illuminate\Http\Response
     */
    public function show(StockMovementType $stockMovementType)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\StockMovementType  $stockMovementType
     * @return \Illuminate\Http\Response
     */
    public function edit(StockMovementType $stockMovementType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\StockMovementType  $stockMovementType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, StockMovementType $stockMovementType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\StockMovementType  $stockMovementType
     * @return \Illuminate\Http\Response
     */
    public function destroy(StockMovementType $stockMovementType)
    {
        //
    }
}
