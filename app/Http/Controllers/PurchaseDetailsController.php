<?php

namespace App\Http\Controllers;

use App\PurchaseDetails;
use Illuminate\Http\Request;

class PurchaseDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PurchaseDetails::all();
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
     * @param  \App\PurchaseDetails  $purchaseDetails
     * @return \Illuminate\Http\Response
     */
    public function show(PurchaseDetails $purchaseDetails)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PurchaseDetails  $purchaseDetails
     * @return \Illuminate\Http\Response
     */
    public function edit(PurchaseDetails $purchaseDetails)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PurchaseDetails  $purchaseDetails
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PurchaseDetails $purchaseDetails)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PurchaseDetails  $purchaseDetails
     * @return \Illuminate\Http\Response
     */
    public function destroy(PurchaseDetails $purchaseDetails)
    {
        //
    }
}
