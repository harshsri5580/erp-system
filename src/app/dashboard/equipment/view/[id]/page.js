"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ViewEquipmentPage() {

    const params =
        useParams();

    const [equipment, setEquipment] =
        useState(null);

    useEffect(() => {

        fetchEquipment();

    }, []);

    const fetchEquipment =
        async () => {

            try {

                const res =
                    await axios.get(
                        `/api/equipment/${params.id}`
                    );

                setEquipment(
                    res.data.equipment
                );

            } catch (error) {

                console.log(error);

            }

        };

    if (!equipment) {

        return (
            <div className="container-fluid mt-4">
                Loading...
            </div>
        );

    }

    return (

        <div className="container-fluid">

            <div className="card">

                <div className="card-body">

                    <h2 className="mb-4">

                        Equipment Details

                    </h2>

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>Code</th>
                                <td>{equipment.equipmentCode}</td>
                            </tr>

                            <tr>
                                <th>Name</th>
                                <td>{equipment.equipmentName}</td>
                            </tr>

                            <tr>
                                <th>Category</th>
                                <td>{equipment.category}</td>
                            </tr>

                            <tr>
                                <th>Brand</th>
                                <td>{equipment.brand}</td>
                            </tr>

                            <tr>
                                <th>Model</th>
                                <td>{equipment.modelNo}</td>
                            </tr>

                            <tr>
                                <th>Serial No</th>
                                <td>{equipment.serialNumber}</td>
                            </tr>

                            <tr>
                                <th>Project</th>
                                <td>{equipment.project?.name}</td>
                            </tr>

                            <tr>
                                <th>Assigned User</th>
                                <td>{equipment.user?.name}</td>
                            </tr>

                            <tr>
                                <th>Location</th>
                                <td>{equipment.location}</td>
                            </tr>

                            <tr>
                                <th>Usage Hours</th>
                                <td>{equipment.totalUsageHours}</td>
                            </tr>

                            <tr>
                                <th>Purchase Cost</th>
                                <td>{equipment.purchaseCost}</td>
                            </tr>

                            <tr>
                                <th>Current Value</th>
                                <td>{equipment.currentValue}</td>
                            </tr>

                            <tr>
                                <th>Maintenance Cost</th>
                                <td>{equipment.maintenanceCost}</td>
                            </tr>

                            <tr>
                                <th>Status</th>
                                <td>{equipment.status}</td>
                            </tr>

                            <tr>
                                <th>Maintenance Remarks</th>
                                <td>{equipment.maintenanceRemarks}</td>
                            </tr>

                            <tr>
                                <th>Remarks</th>
                                <td>{equipment.remarks}</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}