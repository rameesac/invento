<?php

namespace App\Http\Controllers;

use App\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Supplier::orderBy('id', 'desc')->get();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list()
    {
        return Supplier::select(['name as label', 'id as value'])->get();
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
            $supplier = Supplier::find($request->id);
        } else {
            $supplier = new Supplier;
        }
        $supplier->name = $request->name;
        $supplier->code = "SUP_" . strtoupper(substr(trim($request->name), 0, 3));
        $supplier->contact_person = $request->contact_person;
        $supplier->mobile = $request->mobile;
        $supplier->email = $request->email;
        $supplier->address_one = $request->address_one;
        $supplier->address_two = $request->address_two;
        $supplier->description = $request->description;
        $supplier->save();
        return $supplier;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function destroy(Supplier $supplier)
    {
        return Supplier::destroy($id);
    }
}
