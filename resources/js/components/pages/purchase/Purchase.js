import React, { useEffect, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { AutoComplete } from 'primereact/autocomplete';

import * as purchaseService from '../../../service/PurchaseService';
import * as supplierService from '../../../service/SupplierService';
import * as productService from '../../../service/ProductService';

import showToast from '../../../service/ToastService';

const Purchase = () => {
    const intialPurchaseDetails = {
        id: null,
        product_id: '',
        product_name: '',
        quantity: '',
        cost: '',
        rate: '',
        discount: '',
        tax_amount: '',
        net_amount: '',
        deleted: false
    };
    const initialData = {
        id: null,
        dr_cr: 1,
        purchase_date: new Date(),
        supplier_id: null,
        purchase_details: [intialPurchaseDetails],
        net_amount: '',
        tax_amount: '',
        total: '',
        discount: '',
        description: ''
    };
    const dr_crs = [
        { label: 'Select a type', value: null },
        { label: 'DR', value: 1 },
        { label: 'CR', value: 2 }
    ];
    const [purchase, setPurchase] = useState(initialData);
    const [id, setId] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [purchases, setPurchases] = useState([]);
    const [deletedPurchaseDetails, setDeletedPurchaseDetails] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);

    const [products, setProducts] = useState([]);
    const [productsNames, setProductsNames] = useState([]);
    const [productsNameSuggestions, setProductsNameSuggestions] = useState([]);

    useEffect(() => {
        initData();
    }, []);

    useEffect(() => {
        loadSuppliers();
    }, []);

    function loadSuppliers() {
        supplierService.list().then(data => {
            data.unshift({ label: 'Select a supplier', value: null });
            setSuppliers(data);
        });
    }

    function initData() {
        purchaseService.get().then(data => {
            setPurchases(data);
        });
        productService.get().then(data => {
            setProductsNames(data.map(data => data.name));
            setProducts(data);
        });
    }

    function onClick() {
        setPurchase(initialData);
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

    function grandCalculation(purchasDetails) {
        let net_amount = 0;
        let total = 0;
        purchasDetails.forEach(value => {
            if (value['net_amount']) {
                net_amount = +net_amount + +value['net_amount'];
            }
        });
        total =
            +net_amount +
            (purchase.tax_amount ? +purchase.tax_amount : 0) -
            (purchase.discount ? +purchase.discount : 0);
        setPurchase(data => ({
            ...data,
            total,
            net_amount
        }));
    }

    function handleChange(event, isDetailsChange = false, rowIndex = null) {
        const { name, value } = event.target;
        const { purchase_details } = { ...purchase };
        if (isDetailsChange && rowIndex !== null && name !== 'net_amount') {
            const purchasDetailsFound = purchase_details.map((data, index) => {
                if (rowIndex === index) {
                    data[name] = value;
                }
                return data;
            });

            if (
                ['quantity', 'cost', 'discount'].includes(name) &&
                purchasDetailsFound[rowIndex].quantity &&
                purchasDetailsFound[rowIndex].cost
            ) {
                purchasDetailsFound[rowIndex].net_amount =
                    +purchasDetailsFound[rowIndex].quantity *
                    +purchasDetailsFound[rowIndex].cost;
                if (purchasDetailsFound[rowIndex].discount) {
                    purchasDetailsFound[rowIndex].net_amount =
                        purchasDetailsFound[rowIndex].net_amount -
                        purchasDetailsFound[rowIndex].discount;
                }
                grandCalculation(purchasDetailsFound);
            }
            setPurchase(data => ({
                ...data,
                purchase_details: purchasDetailsFound
            }));
        } else {
            if (['tax_amount', 'discount'].includes(name)) {
                grandCalculation(purchase_details);
            }
            setPurchase(data => ({
                ...data,
                [name]: value
            }));
        }
    }

    async function handleSave(event) {
        event.preventDefault();
        try {
            const formData = { ...purchase };
            if (isEdit && deletedPurchaseDetails.length > 0) {
                formData.purchase_details.push(...deletedPurchaseDetails);
            }
            await purchaseService.save(formData);
            showToast({
                message: `Purchase has beed ${
                    !purchase.id ? 'created' : 'updated'
                } successfully`,
                type: 'SUCCESS'
            });
            initData();
            setVisible(false);
        } catch (error) {
            showToast({
                message: `Error while ${
                    !purchase.id ? 'creating' : 'updating'
                }`,
                type: 'ERROR'
            });
        }
    }

    async function handleDelete(event, id) {
        event.preventDefault();
        try {
            await purchaseService.destroy(id);
            showToast({
                message: 'Purchase has beed deleted successfully',
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
        setIsEdit(true);
        setDeletedPurchaseDetails([]);
        onClick();
        setPurchase({
            id: data.id,
            dr_cr: data.dr_cr,
            purchase_date: data.purchase_date,
            supplier_id: data.supplier_id,
            net_amount: data.net_amount,
            tax_amount: data.tax_amount,
            total: data.total,
            discount: data.discount,
            purchase_details: data.purchase_details,
            description: data.description
        });
    }

    function addPurchaseRow() {
        const { purchase_details } = { ...purchase };
        const initData = { ...intialPurchaseDetails };
        purchase_details.push(initData);
        setPurchase(data => ({
            ...data,
            purchase_details
        }));
    }

    function deletePurchaseRow(rowIndex) {
        const { purchase_details } = { ...purchase };
        const purchasDetailsReduced = purchase_details.filter((data, index) => {
            if (rowIndex === index) {
                data.deleted = true;
                let detailsData = [...deletedPurchaseDetails];
                detailsData.push(data);
                setDeletedPurchaseDetails(detailsData);
            }
            return rowIndex !== index;
        });
        grandCalculation(purchasDetailsReduced);
        setPurchase(data => ({
            ...data,
            purchase_details: purchasDetailsReduced
        }));
    }

    function fetchAndSetProductToRowData(
        event,
        isDetailsChange = true,
        rowIndex
    ) {
        const { name, value } = event.target;
        const { purchase_details } = { ...purchase };
        const product = products.find(p => {
            return p.name === value;
        });
        purchase_details[rowIndex].product_id = product.id;
        purchase_details[rowIndex].cost = product.cost;
        purchase_details[rowIndex].rate = product.rate ? product.rate : 0;
        setPurchase(data => ({
            ...data,
            purchase_details
        }));
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

    const inputTemplate = (data, column) => {
        const columnKey = column.columnKey;
        const rowIndex = column.rowIndex;
        const keyfilter = column.keyfilter;

        return (
            <InputText
                id={columnKey + rowIndex}
                name={columnKey}
                keyfilter={keyfilter}
                value={purchase.purchase_details[rowIndex][columnKey] || ''}
                style={{ width: '100%' }}
                onChange={e => {
                    handleChange(e, true, rowIndex);
                }}
            />
        );
    };

    function filterProducts(event, columnKey, rowIndex) {
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

        /*         if (results.length === 1) {
            fetchAndSetProductToRowData(
                {
                    target: {
                        name: columnKey,
                        value: results[0]
                    }
                },
                true,
                rowIndex
            );
        } */
    }

    const autoCompleteTemplate = (data, column) => {
        const columnKey = column.columnKey;
        const rowIndex = column.rowIndex;

        return (
            <AutoComplete
                id={columnKey + rowIndex}
                name={columnKey}
                placeholder="Products"
                value={purchase.purchase_details[rowIndex][columnKey] || ''}
                inputStyle={{ width: '100%' }}
                onChange={e => {
                    handleChange(e, true, rowIndex);
                }}
                onSelect={e => {
                    fetchAndSetProductToRowData(
                        {
                            target: {
                                name: columnKey,
                                value:
                                    purchase.purchase_details[rowIndex][
                                        columnKey
                                    ]
                            }
                        },
                        true,
                        rowIndex
                    );
                }}
                appendTo={document.body}
                suggestions={productsNameSuggestions}
                completeMethod={e => {
                    filterProducts(e, columnKey, rowIndex);
                }}
            />
        );
    };

    const rowIndex = (data, column) => {
        return +column.rowIndex + 1;
    };

    let actionHeader = (
        <Button
            className="p-button-success"
            type="button"
            icon="pi pi-plus"
            onClick={() => {
                addPurchaseRow();
            }}
        ></Button>
    );

    let purchaseActionTemplate = (data, column) => {
        return (
            <div>
                <Button
                    type="button"
                    disabled={!(purchase.purchase_details.length > 1)}
                    icon="pi pi-trash"
                    className="p-button-denger"
                    style={{ marginRight: '.5em', width: '56px !important' }}
                    onClick={() => {
                        deletePurchaseRow(column.rowIndex);
                    }}
                ></Button>
            </div>
        );
    };

    return (
        <>
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card">
                        <h1>Purchase</h1>
                        <Button
                            label="Create"
                            className="mb-3"
                            icon="pi pi-plus"
                            onClick={() => {
                                setIsEdit(false);
                                onClick();
                            }}
                        />
                        <DataTable value={purchases} responsive={true}>
                            <Column
                                style={{ width: '50px' }}
                                field="id"
                                header="#"
                            />
                            <Column field="dr_cr" header="Dr / Cr" />
                            <Column
                                field="purchase_date"
                                header="Purchase Date"
                            />
                            <Column
                                field="supplier.name"
                                header="Supplier Id"
                            />
                            <Column field="net_amount" header="Net amount" />
                            <Column field="tax_amount" header="Tax amount" />
                            <Column field="discount" header="Discount" />
                            <Column field="total" header="Total" />
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
                header={`${!purchase.id ? 'Create New' : 'Update'} purchase ${
                    purchase.name ? ': ' + purchase.name : ''
                }`}
                visible={visible}
                blockScroll
                maximizable
                style={{ width: '65vw' }}
                footer={footer}
                onHide={() => {
                    onHide();
                }}
            >
                <div className="p-grid">
                    <div className="p-md-2">
                        <label htmlFor="category_id">Dr / Cr</label>
                    </div>
                    <div className="p-md-4">
                        <Dropdown
                            name="dr_cr"
                            id="dr_cr"
                            value={purchase.dr_cr || null}
                            options={dr_crs}
                            style={{ width: '100%' }}
                            onChange={e => {
                                setPurchase(data => ({
                                    ...data,
                                    dr_cr: e.value
                                }));
                            }}
                            placeholder="Select a type"
                        />
                    </div>
                    <div className="p-md-2">
                        <label htmlFor="supplier_id">Supplier</label>
                    </div>
                    <div className="p-md-4">
                        <Dropdown
                            name="supplier_id"
                            id="supplier_id"
                            value={purchase.supplier_id || null}
                            options={suppliers}
                            style={{ width: '100%' }}
                            onChange={e => {
                                setPurchase(data => ({
                                    ...data,
                                    supplier_id: e.value
                                }));
                            }}
                            placeholder="Select a Supplier"
                        />
                    </div>
                    <div className="p-md-3">
                        <label htmlFor="purchase_date">Purchase Date</label>
                    </div>
                    <div className="p-md-8">
                        <Calendar
                            id="purchase_date"
                            name="purchase_date"
                            value={purchase.purchase_date || null}
                            dateFormat="dd-mm-yy"
                            showIcon={true}
                            onChange={e =>
                                setPurchase(data => ({
                                    ...data,
                                    purchase_date: e.value
                                }))
                            }
                        />
                    </div>
                    <div className="p-col-12">
                        <DataTable
                            value={purchase.purchase_details}
                            scrollable={true}
                            scrollHeight="200px"
                        >
                            <Column
                                columnKey="slno"
                                header="#"
                                style={{ width: '50px' }}
                                body={rowIndex}
                            />
                            <Column
                                columnKey="product_name"
                                header="Item"
                                body={autoCompleteTemplate}
                            />
                            <Column
                                columnKey="quantity"
                                keyfilter="num"
                                header="Quantity"
                                body={inputTemplate}
                            />
                            <Column
                                columnKey="cost"
                                keyfilter="money"
                                header="Cost"
                                body={inputTemplate}
                            />
                            <Column
                                columnKey="rate"
                                keyfilter="money"
                                header="Rate"
                                body={inputTemplate}
                            />
                            <Column
                                columnKey="discount"
                                keyfilter="money"
                                header="Discount"
                                body={inputTemplate}
                            />
                            <Column
                                columnKey="net_amount"
                                keyfilter="money"
                                header="Net Amount"
                                body={inputTemplate}
                            />
                            <Column
                                header={actionHeader}
                                style={{ width: '56px' }}
                                body={purchaseActionTemplate}
                            />
                        </DataTable>
                    </div>
                    <div className="p-md-2 p-offset-7">
                        <label htmlFor="net_amount">Net Amount</label>
                    </div>
                    <div className="p-col-3">
                        <InputText
                            id="net_amount"
                            name="net_amount"
                            tabIndex="-1"
                            value={purchase.net_amount || ''}
                            style={{ width: '100%' }}
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className="p-md-2 p-offset-7 pt-0">
                        <label htmlFor="tax_amount">Tax Amount</label>
                    </div>
                    <div className="p-col-3 pt-0">
                        <InputText
                            id="tax_amount"
                            name="tax_amount"
                            value={purchase.tax_amount || ''}
                            style={{ width: '100%' }}
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className="p-md-2 p-offset-7 pt-0">
                        <label htmlFor="discount">Discount</label>
                    </div>
                    <div className="p-col-3 pt-0">
                        <InputText
                            id="discount"
                            name="discount"
                            value={purchase.discount || ''}
                            style={{ width: '100%' }}
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className="p-md-2 p-offset-7 pt-0">
                        <label htmlFor="purchase_date">Grand Total</label>
                    </div>
                    <div className="p-col-3 pt-0">
                        <InputText
                            id="total"
                            name="total"
                            tabIndex="-1"
                            value={purchase.total || ''}
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
                        <InputText
                            id="description"
                            name="description"
                            value={purchase.description || ''}
                            onChange={e => {
                                handleChange(e);
                            }}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>
            </Dialog>

            <Dialog
                header="Delete Purchase"
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

export default Purchase;
