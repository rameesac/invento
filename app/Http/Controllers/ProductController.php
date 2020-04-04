<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use Webpatser\Uuid\Uuid;

use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\Printer;
use Mike42\Escpos\CapabilityProfile;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::with('category:id,name', 'unit:id,name,short_name')->get();
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
            $product->sku = $this->generateSKU();
        }
        $product->name = $request->name;
        $product->barcode = $request->barcode;
        $product->category_id = $request->category_id;
        $product->unit_id = $request->unit_id;
        $product->cost = $request->cost;
        $product->rate = $request->rate;
        $product->description = $request->description;
        $product->save();
        // $this->print();
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

    /**
     * Print name of the product
     *
     * @param  \App\Product  $id
     * @return \Illuminate\Http\Response
     */
     public function print()
     {
        $profile = CapabilityProfile::load("simple");
        $connector = new WindowsPrintConnector("webprinter");
        $printer = new Printer($connector, $profile);

          try {
            /* Print a "Hello world" receipt" */
            $printer -> text("Hello World!\n");
            $printer -> cut();
            
            /* Close printer */
            $printer -> close();
        } catch (Exception $e) {
            echo "Couldn't print to this printer: " . $e -> getMessage() . "\n";
        }  finally {
            $printer -> close();
          }
     }

    /**
     * Return SKU for new Product.
     *
     * @return \Webpatser\Uuid\Uuid $SKU
     */
    private function generateSKU() {
        $SKU = 'P-'.''.substr(str_replace('-', '', strtoupper(Uuid::generate(4)->string)), 0, 6);
        return $SKU;
    }
}
