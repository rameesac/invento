<?php

namespace App\Http\Controllers;

use App\StockMovement;
use Illuminate\Http\Request;

class StockMovementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return StockMovement::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->id) {
            $stockMovement = StockMovement::find($request->id);
        } else {
            $stockMovement = new StockMovement;
        }
        $stockMovement->stock_movement_type_id = $request->stock_movement_type_id;
        $stockMovement->product_id = $request->product_id;
        $stockMovement->quantity = $request->quantity;
        $stockMovement->narration = $request->narration;
        $stockMovement->description = $request->description;
        $stockMovement->save();
        return $stockMovement;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\StockMovement  $stockMovement
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        return StockMovement::destroy($id);
    }
}
