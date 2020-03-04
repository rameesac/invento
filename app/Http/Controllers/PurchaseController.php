<?php

namespace App\Http\Controllers;

use App\Purchase;
use App\PurchaseDetails;
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
                   $purchase_details = new PurchaseDetails;
                   $purchase_details->purchase_id = $purchase->id;
                   $purchase_details->product_id = $value['product_id'] = 3;
                   $purchase_details->quantity = $value['quantity'];
                   $purchase_details->cost = $value['cost'];
                   $purchase_details->discount = $value['discount'];
                   $purchase_details->net_amount = $value['net_amount'];
                   $purchase_details->save();
                }
            }
        } catch (\Throwable $th) {
            DB::rollBack();
        }

        DB::commit();

        return $purchase;
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
