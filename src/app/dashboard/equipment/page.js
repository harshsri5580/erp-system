"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import toast from "react-hot-toast";

import {
    Plus,
    Eye,
    Pencil,
    Trash2,
    Search,
    Wrench,
} from "lucide-react";

export default function EquipmentPage() {

    const [equipments, setEquipments] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        fetchEquipments();

    }, []);

    const fetchEquipments =
        async () => {

            try {

                const res =
                    await axios.get(
                        "/api/equipment"
                    );

                setEquipments(
                    res.data.equipments || []
                );

            } catch (error) {

                console.log(error);

            }

        };

    const handleDelete =
        async (id) => {

            try {

                await axios.delete(
                    `/api/equipment/${id}`
                );

                toast.success(
                    "Equipment deleted successfully"
                );

                fetchEquipments();

            } catch (error) {

                console.log(error);

                toast.error(
                    "Failed to delete equipment"
                );

            }

        };

    const filteredData =
        equipments.filter(
            (item) =>
                item.equipmentCode
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.equipmentName
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.category
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.project?.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (

        <div className="container-fluid px-4 py-3">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2
                        className="fw-bold mb-1"
                        style={{
                            color: "#111827",
                        }}
                    >
                        Equipment Management
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#6B7280",
                        }}
                    >
                        Track and manage company equipment
                    </p>

                </div>

                <Link
                    href="/dashboard/equipment/add"
                    className="btn btn-dark rounded-3 px-4 d-flex align-items-center gap-2"
                >
                    <Plus size={18} />
                    Add Equipment
                </Link>

            </div>

            <div
                className="card border-0 rounded-4"
                style={{
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
                }}
            >

                <div className="card-body p-4">

                    <div className="row mb-3">

                        <div className="col-md-4">

                            <div className="position-relative">

                                <Search
                                    size={16}
                                    className="position-absolute"
                                    style={{
                                        left: "12px",
                                        top: "12px",
                                        color: "#6B7280",
                                    }}
                                />

                                <input
                                    type="text"
                                    className="form-control rounded-3 ps-5"
                                    placeholder="Search Equipment..."
                                    value={
                                        search
                                    }
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>

                    </div>

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead
                                style={{
                                    background: "#F9FAFB",
                                }}
                            >

                                <tr>

                                    <th>ID</th>

                                    <th>Code</th>

                                    <th>Name</th>

                                    <th>Category</th>

                                    <th>Project</th>

                                    <th>Usage Hours</th>

                                    <th>Status</th>

                                    <th width="250">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredData.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center"
                                        >

                                            <div className="py-5">

                                                <Wrench
                                                    size={45}
                                                    className="text-secondary mb-3"
                                                />

                                                <h5>
                                                    No Equipment Found
                                                </h5>

                                                <p className="text-muted mb-0">
                                                    Equipment records will appear here
                                                </p>

                                            </div>

                                        </td>

                                    </tr>

                                ) : (

                                    filteredData.map(
                                        (item) => (

                                            <tr
                                                key={
                                                    item.id
                                                }
                                            >

                                                <td>
                                                    {item.id}
                                                </td>

                                                <td>
                                                    {
                                                        item.equipmentCode
                                                    }
                                                </td>

                                                <td className="fw-semibold">
                                                    {item.equipmentName}
                                                </td>

                                                <td>
                                                    {
                                                        item.category
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        item.project?.name
                                                    }
                                                </td>

                                                <td className="fw-bold text-primary">
                                                    {item.totalUsageHours}
                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${item.status ===
                                                            "Available"
                                                            ? "bg-success"
                                                            : item.status ===
                                                                "In Use"
                                                                ? "bg-warning text-dark"
                                                                : "bg-danger"
                                                            }`}
                                                    >

                                                        {
                                                            item.status
                                                        }

                                                    </span>

                                                </td>

                                                <td>

                                                    <div className="d-flex gap-2">

                                                        <Link
                                                            href={`/dashboard/equipment/view/${item.id}`}
                                                            className="btn btn-outline-info btn-sm d-flex align-items-center gap-1"
                                                        >

                                                            <>
                                                                <Eye size={14} />
                                                                View
                                                            </>

                                                        </Link>

                                                        <Link
                                                            href={`/dashboard/equipment/edit/${item.id}`}
                                                            className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
                                                        >

                                                            <>
                                                                <Pencil size={14} />
                                                                Edit
                                                            </>

                                                        </Link>

                                                        <button
                                                            className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                        >

                                                            <>
                                                                <Trash2 size={14} />
                                                                Delete
                                                            </>

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}