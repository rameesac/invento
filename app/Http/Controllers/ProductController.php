<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::all();
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
            $product = Product::find($request->id);
        } else {
            $product = new Product;
        }
        $product->name = $request->name;
        $product->code = "CAT_" . strtoupper(substr(trim($request->name), 0, 3));
        $product->barcode = $request->barcode;
        $product->category_id = $request->category_id;
        $product->cost = $request->cost;
        $product->description = $request->description;
        $product->save();
        return $product;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        return Product::destroy($id);
    }
}
