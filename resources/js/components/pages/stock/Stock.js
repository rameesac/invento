import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';

import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

import * as stockService from '../../../service/StockService';

const Stock = () => {
    const [stock, setStock] = useState([]);

    useEffect(() => {
        initData();
    }, []);

    function initData() {
        stockService.get().then(data => {
            setStock(data);
        });
    }

    const paginatorLeft = <Button icon="pi pi-refresh" onClick={initData} />;

    return (
        <>
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        <h1>Stock</h1>
                        <DataTable
                            value={stock}
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
                            <Column field="quantity" header="Quantity" />
                            <Column field="created_at" header="Created On" />
                            <Column field="updated_at" header="Updated On" />
                        </DataTable>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Stock;
