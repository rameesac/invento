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
        return Purchase::with('supplier', ['purchase_details' => function ($query) {
            $query->select('id', 'purchase_id, product_id', 'quantity', 'cost', 'rate', 'discount', 'net_amount');
        }])->get();
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
            $purchase->tax_amount = $request->tax_amount = 0;
            $purchase->total = $request->total = 0;
            $purchase->discount = $request->discount = 0;
            $purchase->description = $request->description;
            $purchase->save();

        if(count($request->purchase_details) > 0) {
            foreach($request->purchase_details as $value) {
                $stock_data = [];
                $stock_previouse = Stock::where('product_id', 3)->get()->first();
                $previouse_stock_qty = $stock_previouse ?  $stock_previouse->quantity : 0;
                /* For delete and update */

                if($value['id']) {

                    $purchase_details_found = PurchaseDetails::find($value['id']);

                    if($value['deleted']) {

                        /* For Delete */

                        $stock_data['type'] = 3;
                        $stock_data['quantity'] =  $previouse_stock_qty - $purchase_details_found->quantity;
                        $stock_data['cost'] = $purchase_details_found->cost;
                        $stock_data['description'] = $this->getMovementDescription(3);
    
                        PurchaseDetails::destroy($purchase_details_found->id);

                        /* For Delete */

                    } else {


                        /* For Update */

                        $stock_data['type'] = 2;
                        $stock_data['quantity'] = ($purchase_details_found->quantity - $value['quantity']) + $previouse_stock_qty;
                        $stock_data['cost'] = $value['cost'];
                        $stock_data['description'] = $this->getMovementDescription(2);

                        $purchase_details_found->purchase_id = $purchase->id;
                        $purchase_details_found->product_id = $value['product_id'] = 3;
                        $purchase_details_found->quantity = $value['quantity'];
                        $purchase_details_found->cost = $value['cost'];
                        $purchase_details_found->discount = $value['discount'];
                        $purchase_details_found->net_amount = $value['net_amount'];
                        $purchase_details_found->save();

                        /* For Update */

                    }

                 } else {

                        $stock_data['type'] = 1;
                        $stock_data['quantity'] = $previouse_stock_qty + $value['quantity'];
                        $stock_data['cost'] = $value['cost'];
                        $stock_data['description'] = $this->getMovementDescription(1);

                        $purchase_details = new PurchaseDetails;
                        $purchase_details->purchase_id = $purchase->id;
                        $purchase_details->product_id = $value['product_id'] = 3;
                        $purchase_details->quantity = $previouse_stock_qty + $value['quantity'];
                        $purchase_details->cost = $value['cost'];
                        $purchase_details->discount = $value['discount'];
                        $purchase_details->net_amount = $value['net_amount'];
                        $purchase_details->save();

                 }

            // Update stock if create / delete / update

            $stock = Stock::updateOrCreate(
                ['product_id' => $purchase_details->product_id],
                ['quantity' => $stock_data['quantity'], 'rate'=> 255, 'cost' => $stock_data['cost']]);


            // If no matching model exists, create one.
            $stockLedger = StockLedger::create(
                ['stock_movement_type_id' => $stock_data['type'],
                'purchase_id' => $purchase->id, 
                'previouse_quantity' => $previouse_stock_qty, 
                'latest_quantity' => $stock_data['quantity'],
                'description'=> $stock_data['description']]);

            }
        }

        } catch (\Throwable $th) {
           DB::rollBack();
           throw new \ErrorException('Error found');
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
