import React, { useEffect, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { AutoComplete } from 'primereact/autocomplete';

import * as productService from '../../../service/ProductService';
import * as stockMovementService from '../../../service/StockMovementService';
import * as stockMovementTypeService from '../../../service/StockMovementTypeService';
import showToast from '../../../service/ToastService';

const StockMovement = () => {
    const initialData = {
        id: null,
        stock_movement_type_id: '',
        product_id: null,
        product_name: '',
        quantity: '',
        description: ''
    };
    const [stockMovement, setStockMovement] = useState(initialData);
    const [id, setId] = useState(null);
    const [stockMovements, setStockMovements] = useState([]);
    const [stockMovementTypes, setStockMovementTypes] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);

    const [products, setProducts] = useState([]);
    const [productsNames, setProductsNames] = useState([]);
    const [productsNameSuggestions, setProductsNameSuggestions] = useState([]);

    useEffect(() => {
        initData();
    }, []);

    useEffect(() => {
        loadStockMovementTypes();
        loadProducts();
    }, []);

    function loadStockMovementTypes() {
        stockMovementTypeService.list().then(data => {
            data.unshift({ label: 'Select a type', value: null });
            setStockMovementTypes(data);
        });
    }

    function loadProducts() {
        productService.get().then(data => {
            setProductsNames(data.map(data => data.name));
            setProducts(data);
        });
    }

    function initData() {
        stockMovementService.get().then(data => {
            setStockMovements(data);
        });
    }

    function onClick() {
        setStockMovement(initialData);
        setVisible(true);
    }

    function onHide() {
        setVisible(false);
    }

    function onClickDelete(id) {
        setId(id);
        setVisibleDelete(true);
    }

    function onHideDelete() {
        setId(null);
        setVisibleDelete(false);
    }

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === 'product_name') {
            const product = products.find(p => p.name === value);
            setStockMovement(data => ({
                ...data,
                product_name: product ? product.name : value,
                product_id: product ? product.id : null
            }));
        } else {
            setStockMovement(data => ({
                ...data,
                [name]: value
            }));
        }
    }

    async function handleSave(event) {
        event.preventDefault();
        try {
            await stockMovementService.save(stockMovement);
            showToast({
                message: `Stock Movement has beed ${
                    !stockMovement.id ? 'created' : 'updated'
                } successfully`,
                type: 'SUCCESS'
            });
            initData();
            setVisible(false);
        } catch (error) {
            showToast({
                message: `Error while ${
                    !stockMovement.id ? 'creating' : 'updating'
                }`,
                type: 'ERROR'
            });
        }
    }

    function filterProducts(event) {
        let results = [];
        const productByBarcode = products.find(product => {
            return product.barcode === event.query;
        });

        results = productsNames.filter(name => {
            return name.toLowerCase().startsWith(event.query.toLowerCase());
        });

        if (results.length == 0 && productByBarcode) {
            results = productsNames.filter(name => {
                return name
                    .toLowerCase()
                    .startsWith(productByBarcode.name.toLowerCase());
            });
        }

        setProductsNameSuggestions(results);
    }

    async function handleDelete(event, id) {
        event.preventDefault();
        try {
            await stockMovementService.destroy(id);
            showToast({
                message: 'Stock Movement has beed deleted successfully',
                type: 'SUCCESS'
            });
            initData();
            setVisibleDelete(false);
        } catch (error) {
            showToast({
                message: 'Error while deleting',
                type: 'ERROR'
            });
        }
    }

    function intiEditData(data) {
        onClick();
        setStockMovement({
            id: data.id,
            stock_movement_type_id: data.stock_movement_type.id,
            product_id: data.product_id,
            product_name: data.product.name,
            quantity: data.quantity,
            description: data.description
        });
    }

    const footer = (
        <div>
            <Button
                label="Submit"
                className="p-button-success"
                icon="pi pi-check"
                onClick={handleSave}
            />
            <Button
                label="Cancel"
                className="p-button-danger"
                icon="pi pi-times"
                onClick={() => {
                    onHide();
                }}
            />
        </div>
    );

    const footerDelete = (
        <div>
            <Button
                label="Submit"
                className="p-button-success"
                icon="pi pi-check"
                onClick={e => {
                    handleDelete(e, id);
                }}
            />
            <Button
                label="Cancel"
                className="p-button-danger"
                icon="pi pi-times"
                onClick={() => {
                    onHideDelete();
                }}
            />
        </div>
    );

    const actionTemplate = (data, column) => {
        return (
            <div>
                <Button
                    type="button"
                    icon="pi pi-pencil"
                    className="p-button-warning"
                    style={{ marginRight: '.5em' }}
                    onClick={() => {
                        intiEditData(data);
                    }}
                ></Button>
                <Button
                    type="button"
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => {
                        onClickDelete(data.id);
                    }}
                ></Button>
            </div>
        );
    };

    const paginatorLeft = <Button icon="pi pi-refresh" onClick={initData} />;

    return (
        <>
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        <h1>Stock Movement</h1>
                        <Button
                            label="Create"
                            className="mb-3"
                            icon="pi pi-plus"
                            onClick={() => {
                                onClick();
                            }}
                        />
                        <DataTable
                            value={stockMovements}
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
                            <Column
                                field="stock_movement_type.name"
                                header="Stock Movement Type"
                            />
                            <Column
                                field="product.name"
                                header="Product Name"
                            />
                            <Column field="quantity" header="Quantity" />
                            <Column field="narration" header="Narration" />
                            <Column field="description" header="Description" />
                            <Column field="created_at" header="Created On" />
                            <Column
                                body={actionTemplate}
                                style={{ textAlign: 'center', width: '8em' }}
                            />
                        </DataTable>
                    </div>
                </div>
            </div>

            <Dialog
                header={`${
                    !stockMovement.id ? 'Create New' : 'Update'
                } Stock Movement ${
                    stockMovement.name ? ': ' + stockMovement.name : ''
                }`}
                visible={visible}
                style={{ width: '50vw' }}
                footer={footer}
                onHide={() => {
                    onHide();
                }}
            >
                <div className="p-grid">
                    <div className="p-md-1">
                        <label htmlFor="category_id">Type</label>
                    </div>
                    <div className="p-md-3">
                        <Dropdown
                            name="stock_movement_type_id"
                            id="stock_movement_type_id"
                            value={stockMovement.stock_movement_type_id || null}
                            options={stockMovementTypes}
                            inputStyle={{ width: '100%' }}
                            onChange={e => {
                                setStockMovement(data => ({
                                    ...data,
                                    stock_movement_type_id: e.value
                                }));
                            }}
                            placeholder="Select a Movement Type"
                        />
                    </div>
                    <div className="p-md-1">
                        <label htmlFor="product_name">Product</label>
                    </div>
                    <div className="p-md-3">
                        <AutoComplete
                            id="product_name"
                            name="product_name"
                            placeholder="Select a Product"
                            value={stockMovement.product_name || ''}
                            inputStyle={{ width: '100%' }}
                            onChange={e => {
                                handleChange({
                                    target: {
                                        name: 'product_name',
                                        value: e.value
                                    }
                                });
                            }}
                            appendTo={document.body}
                            suggestions={productsNameSuggestions}
                            completeMethod={e => {
                                filterProducts(e);
                            }}
                        />
                    </div>
                    <div className="p-md-1">
                        <label htmlFor="quantity">Quantity</label>
                    </div>
                    <div className="p-md-3">
                        <InputText
                            id="quantity"
                            name="quantity"
                            keyfilter="num"
                            value={stockMovement.quantity || ''}
                            style={{ width: '100%' }}
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className="p-md-2">
                        <label htmlFor="description">Description</label>
                    </div>
                    <div className="p-md-10">
                        <InputTextarea
                            rows={3}
                            name="description"
                            value={stockMovement.description || ''}
                            onChange={e => {
                                handleChange(e);
                            }}
                            style={{ width: '100%' }}
                            autoResize={true}
                        />
                    </div>
                </div>
            </Dialog>

            <Dialog
                header="Delete Stock Movement"
                visible={visibleDelete}
                style={{ width: '30vw' }}
                footer={footerDelete}
                onHide={() => {
                    onHideDelete();
                }}
            >
                <div className="p-grid">
                    <div className="p-md-12">
                        <h4>Are you sure.</h4>
                        <h4>Do you want to continue ?</h4>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default StockMovement;
