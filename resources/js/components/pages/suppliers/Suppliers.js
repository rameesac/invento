import React, { useEffect, useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

import * as supplierService from "../../../service/SupplierService";
import showToast from "../../../service/ToastServiceService";

const Suppliers = () => {
    const initialData = {
        id: null,
        name: "",
        contact_person: "",
        mobile: "",
        email: "",
        address_one: "",
        address_two: "",
        description: ""
    };
    const [supplier, setSupplier] = useState(initialData);
    const [id, setId] = useState(null);
    const [suppliers, setSuppliers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);

    useEffect(() => {
        initData();
    }, []);

    function initData() {
        supplierService.get().then(data => {
            setSuppliers(data);
        });
    }

    function onClick() {
        setSupplier(initialData);
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
        setSupplier(data => ({
            ...data,
            [name]: value
        }));
    }

    async function handleSave(event) {
        event.preventDefault();
        try {
            await supplierService.save(supplier);
            showToast({
                message: `Supplier has beed ${(!supplier.id ? 'created' : 'updated')} successfully`,
                type: 'SUCCESS'
            });
            initData();
            setVisible(false);
        } catch (error) {
            showToast({
                message: `Error while ${(!supplier.id ? 'creating' : 'updating')}`,
                type: 'ERROR'
            });
            setVisible(false);
        }
    }

    async function handleDelete(event, id) {
        event.preventDefault();
        try {
            await supplierService.delete(id);
            showToast({
                message: 'Supplier has beed deleted successfully',
                type: 'SUCCESS'
            });
            initData();
            setVisibleDelete(false);
        } catch (error) {
            showToast({
                message: 'Error while deleting',
                type: 'ERROR'
            });
            setVisibleDelete(false);
        }
    }

    function intiEditData(data) {
        setSupplier({
            id: data.id,
            name: data.name,
            name: data.contact_person,
            name: data.mobile,
            name: data.email,
            name: data.address_one,
            name: data.address_two,
            description: data.description
        });
        onClick();
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

    const actionTemplate = (rowData, column) => {
        console.log(column);
        return (
            <div>
                <Button
                    type="button"
                    icon="pi pi-pencil"
                    className="p-button-warning"
                    style={{ marginRight: ".5em" }}
                    onClick={() => {
                        intiEditData(rowData.id);
                    }}
                ></Button>
                <Button
                    type="button"
                    icon="pi pi-trash"
                    className="p-button-danger"
                    onClick={() => {
                        onClickDelete(rowData.id);
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
                        <h1>Categories</h1>
                        <Button
                            label="Create"
                            className="mb-3"
                            icon="pi pi-plus"
                            onClick={() => {
                                onClick();
                            }}
                        />
                        <DataTable value={suppliers} responsive={true}>
                            <Column
                                style={{ width: "50px" }}
                                field="id"
                                header="#"
                            />
                            <Column field="code" header="Code" />
                            <Column field="name" header="Name" />
                            <Column field="contact_person" header="Contact Person" />
                            <Column field="mobile" header="Mobile" />
                            <Column field="email" header="Email" />
                            <Column field="address_one" header="Address 1" />
                            <Column field="address_two" header="Address 2" />
                            <Column field="description" header="Description" />
                            <Column field="created_at" header="Created On" />
                            <Column
                                body={actionTemplate}
                                style={{ textAlign: "center", width: "8em" }}
                            />
                        </DataTable>
                    </div>
                </div>
            </div>

            <Dialog
                header="Add / Update Supplier"
                visible={visible}
                style={{ width: "50vw" }}
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
                            value={supplier.name || ""}
                            style={{ width: "100%" }}
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className="p-md-2">
                        <label htmlFor="contact_person">Contact Person</label>
                    </div>
                    <div className="p-md-10">
                        <InputText
                            id="name"
                            name="name"
                            value={supplier.contact_person || ""}
                            style={{ width: "100%" }}
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className="p-md-2">
                        <label htmlFor="mobile">Mobile</label>
                    </div>
                    <div className="p-md-10">
                        <InputText
                            id="name"
                            name="name"
                            value={supplier.mobile || ""}
                            style={{ width: "100%" }}
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className="p-md-2">
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="p-md-10">
                        <InputText
                            id="name"
                            name="name"
                            value={supplier.email || ""}
                            style={{ width: "100%" }}
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className="p-md-2">
                        <label htmlFor="address_one">Address 1</label>
                    </div>
                    <div className="p-md-10">
                        <InputText
                            id="name"
                            name="name"
                            value={supplier.address_one || ""}
                            style={{ width: "100%" }}
                            onChange={e => {
                                handleChange(e);
                            }}
                        />
                    </div>
                    <div className="p-md-2">
                        <label htmlFor="address_two">Address 2</label>
                    </div>
                    <div className="p-md-10">
                        <InputText
                            id="name"
                            name="name"
                            value={supplier.address_two || ""}
                            style={{ width: "100%" }}
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
                            value={category.description || ""}
                            onChange={e => {
                                handleChange(e);
                            }}
                            style={{ width: "100%" }}
                            autoResize={true}
                        />
                    </div>
                </div>
            </Dialog>

            <Dialog
                header="Delete Supplier"
                visible={visibleDelete}
                style={{ width: "30vw" }}
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

export default Suppliers;
