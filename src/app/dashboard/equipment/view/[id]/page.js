"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    useParams,
    useRouter,
} from "next/navigation";

import Link from "next/link";

import {
    ArrowLeft,
    Pencil,
} from "lucide-react";

export default function ViewEquipmentPage() {

    const params =
        useParams();
    const router =
        useRouter();

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
            <div className="container-fluid px-4 py-5 text-center">
                Loading Equipment...
            </div>
        );
    }

    return (

        <div className="container-fluid px-4 py-3">

            <div
                className="card border-0 rounded-4"
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
                }}
            >

                <div className="card-body p-4 p-lg-5">

                    <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">

                        <div>

                            <h2
                                className="fw-bold mb-1"
                                style={{
                                    color: "#111827",
                                }}
                            >
                                Equipment Details
                            </h2>

                            <p
                                className="mb-0"
                                style={{
                                    color: "#6B7280",
                                }}
                            >
                                View equipment information
                            </p>

                        </div>

                        <div className="d-flex gap-2">

                            <Link
                                href={`/dashboard/equipment/edit/${equipment.id}`}
                                className="btn btn-dark"
                            >
                                <Pencil size={15} />
                            </Link>

                            <button
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    router.push(
                                        "/dashboard/equipment"
                                    )
                                }
                            >
                                <ArrowLeft size={15} />
                            </button>

                        </div>

                    </div>

                    <table className="table align-middle mb-0">

                        <tbody
                            style={{
                                fontSize: "15px",
                            }}
                        >

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
                                <td className="fw-bold text-primary">
                                    {equipment.totalUsageHours}
                                </td>
                            </tr>

                            <tr>
                                <th>Purchase Cost</th>
                                <td className="fw-semibold">
                                    ₹{equipment.purchaseCost}
                                </td>
                            </tr>

                            <tr>
                                <th>Current Value</th>
                                <td className="fw-bold text-success">
                                    ₹{equipment.currentValue}
                                </td>
                            </tr>

                            <tr>
                                <th>Maintenance Cost</th>
                                <td className="fw-bold text-danger">
                                    ₹{equipment.maintenanceCost}
                                </td>
                            </tr>

                            <tr>
                                <th>Status</th>
                                <td>

                                    <span
                                        className={`badge ${equipment.status === "Available"
                                            ? "bg-success"
                                            : equipment.status === "In Use"
                                                ? "bg-warning text-dark"
                                                : equipment.status === "Under Maintenance"
                                                    ? "bg-info"
                                                    : "bg-secondary"
                                            }`}
                                    >
                                        {equipment.status}
                                    </span>

                                </td>
                            </tr>

                            <tr>
                                <th>Maintenance Remarks</th>
                                <td>

                                    <div
                                        className="p-3 rounded-3"
                                        style={{
                                            background: "#F9FAFB",
                                        }}
                                    >
                                        {equipment.maintenanceRemarks || "-"}
                                    </div>

                                </td>
                            </tr>

                            <tr>
                                <th>Remarks</th>
                                <td>

                                    <div
                                        className="p-3 rounded-3"
                                        style={{
                                            background: "#F9FAFB",
                                        }}
                                    >
                                        {equipment.remarks || "-"}
                                    </div>

                                </td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}