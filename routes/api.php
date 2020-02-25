<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('category', 'CategoryController')->except([
    'create',
]);

Route::resource('supplier', 'SupplierController')->except([
    'create',
]);

Route::resource('product', 'ProductController')->except([
    'create',
]);

Route::resource('purchase', 'PurchaseController')->except([
    'create',
]);

Route::resource('purchase_details', 'PurchaseDetailsController')->except([
    'create',
]);

Route::resource('stock', 'StockController')->except([
    'create',
]);

Route::resource('stock_movement_type', 'StockMovementTypeController')->except([
    'create',
]);

Route::resource('stock_ledger', 'StockLedgerController')->except([
    'create',
]);