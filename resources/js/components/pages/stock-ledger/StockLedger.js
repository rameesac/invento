import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';

import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import * as stockLedgerService from '../../../service/StockLedgerService';

const StockLedger = () => {
    const [stockLedger, setStockLedger] = useState([]);

    useEffect(() => {
        initData();
    }, []);

    function initData() {
        stockLedgerService.get().then(data => {
            setStockLedger(data);
        });
    }

    const paginatorLeft = <Button icon="pi pi-refresh" onClick={initData} />;

    return (
        <>
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        <h1>Stock Ledger</h1>
                        <DataTable
                            value={stockLedger}
                            responsive={true}
                            paginator={true}
                            paginatorLeft={paginatorLeft}
                            rows={5}
                            rowsPerPageOptions={[5, 10, 20]}
                        >
                            <Column
                                style={{ width: '50px' }}
                                field="id"
                                header="#"
                            />
                            <Column field="product.name" header="Product" />
                            <Column
                                field="stock_movement_type.name"
                                header="Stock movement type"
                            />
                            <Column
                                field="previouse_quantity"
                                header="Previouse quantity"
                            />
                            <Column
                                field="latest_quantity"
                                header="Latest quantity"
                            />
                            <Column field="description" header="Description" />
                            <Column field="created_at" header="Created On" />
                        </DataTable>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StockLedger;
