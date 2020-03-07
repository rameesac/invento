<?php

namespace App\Http\Controllers;

use App\StockMovement;
use App\Stock;
use App\StockMovementType;
use App\StockLedger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StockMovementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return StockMovement::with('stock_movement_type:id,name', 'product:id,name')        
        ->orderBy('id', 'desc')
        ->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $stock_data = [];
            $stock_previouse = Stock::where('product_id', $request->product_id)->get()->first();
            $previouse_stock_qty = $stock_previouse ?  $stock_previouse->quantity : 0;

            if ($request->id) {
                $stockMovement = StockMovement::find($request->id);
                if($stockMovement->quantity > $request->quantity) {
                    if($request->stock_movement_type_id==3) {
                        $stock_data['quantity'] = $previouse_stock_qty + ($stockMovement->quantity - $request->quantity);
                    } else {
                        $stock_data['quantity'] = $previouse_stock_qty - ($stockMovement->quantity - $request->quantity);
                    }
                } else if($stockMovement->quantity < $request->quantity) {                                                                                
                    if($request->stock_movement_type_id==3) {
                        $stock_data['quantity'] = $previouse_stock_qty - ($request->quantity 
                        - $stockMovement->quantity);
                    } else {
                        $stock_data['quantity'] = $previouse_stock_qty + ($request->quantity 
                        - $stockMovement->quantity);
                    }
                } else {
                        $stock_data['quantity'] = $previouse_stock_qty;
                }
                
            } else {
                $stockMovement = new StockMovement;
                if($request->stock_movement_type_id==3) {
                    $stock_data['quantity'] = $previouse_stock_qty - $request->quantity;
                } else {
                    $stock_data['quantity'] = $previouse_stock_qty + $request->quantity;
                }
            }
            $stockMovement->stock_movement_type_id = $request->stock_movement_type_id;
            $stockMovement->product_id = $request->product_id;
            $stockMovement->quantity = $request->quantity;
            $stock_movement_type = StockMovementType::find($stockMovement->stock_movement_type_id)->name;
            $stockMovement->narration = $stock_movement_type;
            $stockMovement->description = $request->description;
            $stockMovement->save();

            // Update stock if create / delete / update

            $stock = Stock::updateOrCreate(
                ['product_id' => $stockMovement->product_id],
                ['quantity' => $stock_data['quantity']]
            );

            // If no matching model exists, create one.

            if($previouse_stock_qty !== $stock_data['quantity']) {
                $stockLedger = StockLedger::create(
                    ['product_id' => $stockMovement->product_id,
                    'stock_movement_type_id' => $stockMovement->stock_movement_type_id,
                    'movement_id' => $stockMovement->id,
                    'previouse_quantity' => $previouse_stock_qty, 
                    'latest_quantity' => $stock_data['quantity'],
                    'description'=> "Stock Movement : ". " ".$stock_movement_type]
                );
            }
            
        } catch (\Throwable $th) {
            DB::rollBack();
           throw new \ErrorException($th);
        }
        DB::commit();
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
        DB::beginTransaction();
        try {
            $stock_data = [];
            $movement = StockMovement::find($id);
            $stock = Stock::where('product_id', $movement->product_id)->get()->first();
            $previouse_stock_qty = $stock ?  $stock->quantity : 0;

            $stock_movement_type = StockMovementType::find($movement->stock_movement_type_id)->name;

            if($movement->stock_movement_type_id === 3) {
                $stock_data['quantity'] = $previouse_stock_qty + $movement->quantity;
            } else {
                $stock_data['quantity'] = $previouse_stock_qty - $movement->quantity;
            }

            // Update stock if create / delete / update

            $stock->update(['quantity' => $stock_data['quantity']]);

            // If no matching model exists, create one.

            if($previouse_stock_qty !== $stock_data['quantity']) {
                $stockLedger = StockLedger::create(
                    ['product_id' => $movement->product_id,
                    'stock_movement_type_id' => $movement->stock_movement_type_id,
                    'movement_id' => $movement->id,
                    'previouse_quantity' => $previouse_stock_qty, 
                    'latest_quantity' => $stock_data['quantity'],
                    'description'=> "Stock Movement DELETE: ". " ".$stock_movement_type]
                );
            }
            
            $movement->delete();

        } catch (\Throwable $th) {
            DB::rollBack();
            throw new \ErrorException($th);
        }
        DB::commit();
        return response(200);
    }
}
