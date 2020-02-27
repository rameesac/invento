import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { CategoryService } from "../../../service/CategoryService";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import showToast from "../../../service/ToastServiceService";

const Categories = () => {
    const initialData = {
        id: null,
        name: "",
        description: ""
    };
    const [category, setCategory] = useState(initialData);
    const [id, setId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [visible, setVisible] = useState(false);
    const [visibleDelete, setVisibleDelete] = useState(false);
    const categoryService = new CategoryService();

    useEffect(() => {
        categoryService.getCategories().then(data => {
            setCategories(data);
        });
    }, []);

    function intiData() {
        categoryService.getCategories().then(data => {
            setCategories(data);
        });
    }

    function onClick() {
        setCategory(initialData);
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
        setCategory(category => ({
            ...category,
            [name]: value
        }));
    }

    async function handleSave(event) {
        event.preventDefault();
        try {
            await categoryService.saveCategory(category);
            showToast({
                message: `Category has beed ${(!category.id ? 'created' : 'updated')} successfully`,
                type: 'SUCCESS'
            });
            intiData();
            setVisible(false);
        } catch (error) {
            showToast({
                message: `Error while ${(!category.id ? 'creating' : 'updating')}`,
                type: 'ERROR'
            });
            setVisible(false);
        }
    }

    async function handleDelete(event, id) {
        event.preventDefault();
        try {
            await categoryService.deleteCategory(id);
            showToast({
                message: 'Category has beed deleted successfully',
                type: 'SUCCESS'
            });
            intiData();
            setVisibleDelete(false);
        } catch (error) {
            showToast({
                message: 'Error while deleting',
                type: 'ERROR'
            });
            setVisibleDelete(false);
        }
    }

    function intiEditData(rowData) {
        setCategory({
            id: rowData.id,
            name: rowData.name,
            description: rowData.description
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
                        <DataTable value={categories} responsive={true}>
                            <Column
                                style={{ width: "50px" }}
                                field="id"
                                header="#"
                            />
                            <Column field="name" header="Name" />
                            <Column field="code" header="Code" />
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
                header="Add / Update Category"
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
                            value={category.name || ""}
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
                header="Delete Category"
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

export default Categories;
