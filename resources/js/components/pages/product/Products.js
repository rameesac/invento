import React, { useEffect, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

import * as productService from '../../../service/ProductService';
import * as categoryService from '../../../service/CategoryService';
import showToast from '../../../service/ToastService';

const Products = () => {
    const initialData = {
        id: null,
        name: '',
        barcode: '',
        category_id: null,
        cost: '',
        description: ''
    };
    const [product, setProduct] = useState(initialData);
    const [id, setId] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);

    useEffect(() => {
        initData();
    }, []);

    useEffect(() => {
        loadCatagories();
    }, []);

    function loadCatagories() {
        categoryService.list().then(data => {
            setCategories(data);
        });
    }

    function initData() {
        productService.get().then(data => {
            setProducts(data);
        });
    }

    function onClick() {
        setProduct(initialData);
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
        setProduct(data => ({
            ...data,
            [name]: value
        }));
    }

    async function handleSave(event) {
        event.preventDefault();
        try {
            await productService.save(product);
            showToast({
                message: `Product has beed ${
                    !product.id ? 'created' : 'updated'
                } successfully`,
                type: 'SUCCESS'
            });
            initData();
            setVisible(false);
        } catch (error) {
            showToast({
                message: `Error while ${!product.id ? 'creating' : 'updating'}`,
                type: 'ERROR'
            });
        }
    }

    async function handleDelete(event, id) {
        event.preventDefault();
        try {
            await productService.destroy(id);
            showToast({
                message: 'Product has beed deleted successfully',
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
        setProduct({
            id: data.id,
            name: data.name,
            barcode: data.barcode,
            category_id: data.category_id,
            cost: data.cost,
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
                        <h1>Products</h1>
                        <Button
                            label="Create"
                            className="mb-3"
                            icon="pi pi-plus"
                            onClick={() => {
                                onClick();
                            }}
                        />
                        <DataTable
                            value={products}
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
                            <Column field="code" header="Code" />
                            <Column field="name" header="Name" />
                            <Column field="barcode" header="Barcode" />
                            <Column field="category.name" header="Category" />
                            <Column field="cost" header="Cost" />
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
                header={`${!product.id ? 'Create New' : 'Update'} Product ${
                    product.name ? ': ' + product.name : ''
                }`}
                visible={visible}
                style={{ width: '50vw' }}
                footer={footer}
                onHide={() => {
                    onHide();
                }}
            >
                <div className="p-grid">
                    <div className="p-md-2">
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="p-md-10">
                        <InputText
                            id="name"
                            name="name"
                            value={product.name || ''}
                            style={{ width: '100%' }}
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className="p-md-2">
                        <label htmlFor="barcode">Barcode</label>
                    </div>
                    <div className="p-md-3">
                        <InputText
                            id="barcode"
                            name="barcode"
                            value={product.barcode || ''}
                            style={{ width: '100%' }}
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className="p-md-1">
                        <label htmlFor="category_id">Catagory</label>
                    </div>
                    <div className="p-md-3">
                        <Dropdown
                            name="category_id"
                            id="category_id"
                            value={product.category_id || null}
                            options={categories}
                            style={{ width: '100%' }}
                            onChange={e => {
                                // handleChange(e);
                                setProduct(data => ({
                                    ...data,
                                    category_id: e.value
                                }));
                            }}
                            placeholder="Select a Catagory"
                        />
                    </div>
                    <div className="p-md-1">
                        <label htmlFor="cost">Cost</label>
                    </div>
                    <div className="p-md-2">
                        <InputText
                            id="cost"
                            name="cost"
                            value={product.cost || ''}
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
                            value={product.description || ''}
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
                header="Delete Product"
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

export default Products;
