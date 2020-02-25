import React, { Component } from "react";
import { CarService } from "../service/CarService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

export class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            selectedCar: null
        };
        this.carservice = new CarService();
    }

    componentDidMount() {
        this.carservice.getCarsSmall().then(data => {
            data = data.filter((value, index) => index < 10);
            this.setState({ cars: data });
        });
    }

    render() {
        return (
            <div className="p-grid p-fluid dashboard">
                <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">Products</span>
                        <span className="detail">
                            Number of available products
                        </span>
                        <span className="count visitors">12</span>
                    </div>
                </div>
                <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">Sales</span>
                        <span className="detail">Number of sales</span>
                        <span className="count purchases">534</span>
                    </div>
                </div>
                <div className="p-col-12 p-lg-4">
                    <div className="card summary">
                        <span className="title">Revenue</span>
                        <span className="detail">Income for today</span>
                        <span className="count revenue">$3,200</span>
                    </div>
                </div>

                <div className="p-col-12 p-lg-6">
                    <div className="card">
                        <h1 style={{ fontSize: "16px" }}>Recent Sales</h1>
                        <DataTable
                            value={this.state.cars}
                            style={{ marginBottom: "20px" }}
                            responsive={true}
                            selectionMode="single"
                            selection={this.state.selectedCar}
                            onSelectionChange={e =>
                                this.setState({ selectedCar: e.value })
                            }
                        >
                            <Column field="vin" header="Vin" sortable={true} />
                            <Column
                                field="year"
                                header="Year"
                                sortable={true}
                            />
                            <Column
                                field="brand"
                                header="Brand"
                                sortable={true}
                            />
                            <Column
                                field="color"
                                header="Color"
                                sortable={true}
                            />
                        </DataTable>
                    </div>
                </div>
            </div>
        );
    }
}
