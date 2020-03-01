<?php

namespace App\Http\Controllers;

use App\Purchase;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PurchaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Purchase::all();
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
