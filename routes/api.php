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

Route::get('category/list', 'CategoryController@list');

Route::resource('category', 'CategoryController')->except([
    'create', 'edit', 'update', 'show'
]);

Route::get('supplier/list', 'SupplierController@list');

Route::resource('supplier', 'SupplierController')->except([
    'create', 'edit', 'update', 'show'
]);

Route::resource('product', 'ProductController')->except([
    'create', 'edit', 'update', 'show'
]);

Route::resource('purchase', 'PurchaseController')->except([
    'create', 'edit', 'update', 'show'
]);

Route::resource('purchase_details', 'PurchaseDetailsController')->except([
    'create', 'edit', 'update', 'show'
]);

Route::resource('stock', 'StockController')->except([
    'create', 'edit', 'update', 'show'
]);

Route::resource('stock_movement_type', 'StockMovementTypeController')->except([
    'create', 'edit', 'update', 'show'
]);

Route::resource('stock_ledger', 'StockLedgerController')->except([
    'create', 'edit', 'update', 'show'
]);
