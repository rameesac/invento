
## Category

php artisan make:migration create_catagories_table --create=category

    public function up()
    {
        Schema::create('category', function (Blueprint $table) {
            $table->increments('id');
            
            $table->string('name', 100);
            $table->char('code', 100);
            $table->longText('description')->nullable($value = true);
            
            $table->tinyInteger('status')->default(1);
            $table->mediumInteger('created_by')->nullable($value = true);
            $table->mediumInteger('updated_by')->nullable($value = true);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    
## Supplier

php artisan make:migration create_suppliers_table --create=supplier

    public function up()
    {
        Schema::create('supplier', function (Blueprint $table) {
            $table->increments('id');
            
            $table->string('name', 250);
            $table->char('code', 100);
            $table->string('contact_person', 250)->nullable($value = true);
            $table->string('mobile', 20)->nullable($value = true);
            $table->string('email', 50)->nullable($value = true);
            $table->string('address_one', 250)->nullable($value = true);
            $table->string('address_two', 250)->nullable($value = true);
            
            $table->longText('description')->nullable($value = true);
            $table->tinyInteger('status')->default(1);
            
            $table->mediumInteger('created_by')->nullable($value = true);
            $table->mediumInteger('updated_by')->nullable($value = true);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    
## Product

php artisan make:migration create_products_table --create=product

    public function up()
    {
        Schema::create('product', function (Blueprint $table) {
            $table->increments('id');
            
            $table->string('name', 250);
            $table->char('code', 100);
            $table->string('barcode', 250);
            
            $table->integer('category_id');
            $table->foreign('category_id')->references('id')->on('category');
            
            $table->double('cost', 8, 2);
            
            $table->longText('image')->nullable($value = true);
            $table->longText('description')->nullable($value = true);
            $table->tinyInteger('status')->default(1);
            
            $table->mediumInteger('created_by')->nullable($value = true);
            $table->mediumInteger('updated_by')->nullable($value = true);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    
## Purchase

php artisan make:migration create_purchases_table --create=purchase

    public function up()
    {
        Schema::create('purchase', function (Blueprint $table) {
            $table->increments('id');
            
            $table->tinyInteger('dr_cr')->nullable($value = true);
            $table->date('purchase_date');
            
            $table->integer('supplier_id');
            $table->foreign('supplier_id')->references('id')->on('supplier');
            
            $table->double('tax_amount', 8, 2);
            $table->double('total', 8, 2);
            $table->double('discount', 8, 2);
            
            $table->longText('description')->nullable($value = true);
            $table->tinyInteger('status')->default(1);
            
            $table->mediumInteger('created_by')->nullable($value = true);
            $table->mediumInteger('updated_by')->nullable($value = true);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    
 ## Purchase Details

php artisan make:migration create_purchase_details_table --create=purchase_details

    public function up()
    {
        Schema::create('purchase_details', function (Blueprint $table) {
            $table->increments('id');
            
            $table->integer('purchase_id');
            $table->foreign('purchase_id')->references('id')->on('purchase');
            
            $table->integer('product_id');
            $table->foreign('product_id')->references('id')->on('product');
            
            $table->integer('quantity');
            $table->double('cost', 8, 2);
            $table->double('discount', 8, 2);
            $table->double('net_amount', 8, 2);
            
            $table->longText('description')->nullable($value = true);
            $table->tinyInteger('status')->default(1);
            
            $table->mediumInteger('created_by')->nullable($value = true);
            $table->mediumInteger('updated_by')->nullable($value = true);
            $table->timestamps();
            $table->softDeletes();
        });
    }
    
## Stock

php artisan make:migration create_stocks_table --create=stock

    public function up()
    {
        Schema::create('stock', function (Blueprint $table) {
            $table->increments('id');
            
            $table->integer('product_id');
            $table->foreign('product_id')->references('id')->on('product');
            
            $table->integer('quantity');
            $table->double('rate', 8, 2);
            
            $table->mediumInteger('created_by')->nullable($value = true);
            $table->mediumInteger('updated_by')->nullable($value = true);
            $table->timestamps();
        });
    }
    
## Stock Movement Type

php artisan make:migration create_stock_movement_types_table --create=stock_movement_type

    public function up()
    {
        Schema::create('stock_movement_type', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('is_visible')->default(true);
            $table->string('name');
        });
    }
    
## Stock Ledger

php artisan make:migration create_stock_ledgers_table --create=stock_ledger

    public function up()
    {
        Schema::create('stock_ledger', function (Blueprint $table) {
            $table->increments('id');
            
            $table->integer('stock_movement_type_id');
            $table->foreign('stock_movement_type_id')->references('id')->on('stock_movement_type');
            
            $table->integer('purchase_id')->nullable($value = true);;
            $table->foreign('purchase_id')->references('id')->on('purchase');
            
            $table->integer('previouse_quantity');
            $table->integer('latest_quantity');
            
            $table->longText('description')->nullable($value = true);
            
            $table->mediumInteger('created_by')->nullable($value = true);
            $table->mediumInteger('updated_by')->nullable($value = true);
            $table->timestamps();
        });
    }


use App\Stock;
use App\StockLedger;

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

        foreach(purchase details values) {

            $stock_data = [];

            if(purchase_details_id) { // Delete or Update

                $purchase_details_found = PurchaseDetails::find($request->id);
                $stock_prev = Stock::find($purchase_details->product_id);

                if($deleted) { // Delete purchase details and update stock, stock ledger

                    $stock_data['type'] = 3;
                    (+ / -) $stock_data['quantity'] =  ($stock_prev->quantity ? $stock_prev->quantity : 0) - $purchase_details_found->quantity;  // Remove this quantity from stock
                    $stock_data['rate'] = $purchase_details->rate;
                    $stock_data['cost'] = $purchase_details->cost;
                    $stock_data['description'] = getMovementDescription(3);

                    PurchaseDetails::destroy($purchase_details->id);

                } else { // Update purchase details and update stock

                    $stock_data['type'] = 2;
                   ( + / - ) $stock_data['quantity'] = ($purchase_details_found->quantity - $purchase_details_request->quantity) + ($stock_prev->quantity);
                    $stock_data['rate'] = $purchase_details->rate;
                    $stock_data['cost'] = $purchase_details->cost;
                    $stock_data['description'] = getMovementDescription(2);

                    // Set purchase details values

                    $purchase_details_found = $request->keys;
                    .....

                    $purchase_details_found->save();


                }

            } else {
                

                $purchase_details = new PurchaseDetails;

                $stock_data['type'] = 1;
                $stock_data['quantity'] = $purchase_details->quantity;
                $stock_data['rate'] = $purchase_details->rate;
                $stock_data['cost'] = $purchase_details->cost;
                $stock_data['description'] = getMovementDescription(1);

                $purchase_details->save();

            }


            protected $fillable = ['product_id', 'quantity', 'rate', 'cost'];

            // Update stock if create / delete / update

            $stock = Stock::updateOrCreate(
            ['product_id' => $purchase_details->product_id],
            ['quantity' => $stock_data['quantity'], 'rate' => $stock_data['rate'], 'cost' => $stock_data['cost']]
            );


            protected $fillable = ['stock_movement_type_id', 'purchase_id', 'previouse_quantity', 'latest_quantity', 'description'];

            // If no matching model exists, create one.
            $stockLedger = StockLedger::create(
                ['stock_movement_type_id' => $stock_data['type'],
                'purchase_id' => $purchase->id, 
                'previouse_quantity' => ($stock_prev->quantity ? $stock_prev->quantity : 0), 
                'latest_quantity' => $stock_data['quantity'],
                'description'=> $stock_data['description']]
            );

        }

        function getMovementDescription(int $create=1) {
            return 'PURCHASE :Stock '.($create==1)? 'Added' : ($create==2) ? 'Updated' : 'Deleted';
        }
    }
