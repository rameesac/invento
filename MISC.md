
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
