<?php

namespace App\Http\Controllers;

use App\Purchase;
use App\PurchaseDetails;
use App\Stock;
use App\StockLedger;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Purchase::with('supplier:id,name', 'purchase_details:id,purchase_id,product_id,quantity,cost,rate,discount,net_amount')
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
            if ($request->id) {
                $purchase = Purchase::find($request->id);
            } else {
                $purchase = new Purchase;
            }
            $purchase->dr_cr = $request->dr_cr;
            $purchase->purchase_date = Carbon::parse($request->purchase_date)->format('Y-m-d');
            $purchase->supplier_id = $request->supplier_id;
            $purchase->net_amount = $request->net_amount;
            $purchase->tax_amount = $request->tax_amount;
            $purchase->total = $request->total;
            $purchase->discount = $request->discount;
            $purchase->description = $request->description;
            $purchase->save();

        if(count($request->purchase_details) > 0) {

            foreach($request->purchase_details as $value) {
                $stock_data = [];
                $stock_previouse = Stock::where('product_id', $value['product_id'])->get()->first();
                $previouse_stock_qty = $stock_previouse ?  $stock_previouse->quantity : 0;
                /* For delete and update */

                if($value['id']) {

                    $purchase_details_found = PurchaseDetails::find($value['id']);

                    if($value['deleted']) {

                        /* For Delete */

                        $stock_data['type'] = 3;
                        $stock_data['quantity'] =  $previouse_stock_qty - $purchase_details_found->quantity;
                        $stock_data['cost'] = $purchase_details_found->cost;
                        $stock_data['rate'] = $purchase_details_found->rate;
                        $stock_data['description'] = $this->getMovementDescription(3);
    
                        PurchaseDetails::destroy($purchase_details_found->id);

                        /* For Delete */

                    } else {

                        /* For Update */

                        $stock_data['type'] = 2;

                        if($purchase_details_found->quantity > $value['quantity']) {
                            $stock_data['quantity'] = $previouse_stock_qty - ($purchase_details_found->quantity - $value['quantity']);
                        } else if($purchase_details_found->quantity < $value['quantity']) {
                            $stock_data['quantity'] = ($value['quantity'] 
                            - $purchase_details_found->quantity) + $previouse_stock_qty;
                        } else {
                            $stock_data['quantity'] = $previouse_stock_qty;
                        }

                        $stock_data['cost'] = $value['cost'];
                        $stock_data['rate'] = $value['rate'];
                        $stock_data['description'] = $this->getMovementDescription(2);

                        $purchase_details_found->purchase_id = $purchase->id;
                        $purchase_details_found->product_id = $value['product_id'];
                        $purchase_details_found->quantity = $value['quantity'];
                        $purchase_details_found->cost = $value['cost'];
                        $purchase_details_found->rate = $value['rate'];
                        $purchase_details_found->discount = $value['discount'];
                        $purchase_details_found->net_amount = $value['net_amount'];
                        $purchase_details_found->save();

                        /* For Update */

                    }

                 } else {

                        $stock_data['type'] = 1;
                        $stock_data['quantity'] = $previouse_stock_qty + $value['quantity'];
                        $stock_data['cost'] = $value['cost'];
                        $stock_data['rate'] = $value['rate'];
                        $stock_data['description'] = $this->getMovementDescription(1);

                        $purchase_details = new PurchaseDetails;
                        $purchase_details->purchase_id = $purchase->id;
                        $purchase_details->product_id = $value['product_id'];
                        $purchase_details->quantity = $value['quantity'];
                        $purchase_details->cost = $value['cost'];
                        $purchase_details->rate = $value['rate'];
                        $purchase_details->discount = $value['discount'];
                        $purchase_details->net_amount = $value['net_amount'];
                        $purchase_details->save();

                 }

            // Update stock if create / delete / update

            $stock = Stock::updateOrCreate(
                ['product_id' => $value['product_id']],
                ['quantity' => $stock_data['quantity'], 'rate'=> $stock_data['rate'], 'cost' => $stock_data['cost']]
            );

            // If no matching model exists, create one.

            if($previouse_stock_qty !== $stock_data['quantity']) {
                $stockLedger = StockLedger::create(
                    ['product_id' => $value['product_id'],
                    'stock_movement_type_id' => 4,
                    'purchase_id' => $purchase->id, 
                    'previouse_quantity' => $previouse_stock_qty, 
                    'latest_quantity' => $stock_data['quantity'],
                    'description'=> $stock_data['description']]
                );
            }
            }
        }

        } catch (\Throwable $th) {
           DB::rollBack();
           throw new \ErrorException($th);
        }

        DB::commit();

        return $purchase;
    }


    public function getMovementDescription(int $create) {
        $action = ($create == 1) ? 'Added' : ($create == 2 ? 'Updated' : 'Deleted');
        return "PURCHASE :Stock ". " ". $action;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function destroy(Purchase $purchase)
    {
        //
    }
}
