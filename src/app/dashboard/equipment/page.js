"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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

            const confirmDelete =
                confirm(
                    "Delete this equipment?"
                );

            if (!confirmDelete)
                return;

            try {

                await axios.delete(
                    `/api/equipment/${id}`
                );

                fetchEquipments();

            } catch (error) {

                console.log(error);

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

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="page-title">
                    Equipment Management
                </h2>

                <Link
                    href="/dashboard/equipment/add"
                    className="btn btn-primary"
                >

                    Add Equipment

                </Link>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <div className="row mb-3">

                        <div className="col-md-4">

                            <input
                                type="text"
                                className="form-control"
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

                    <div className="table-responsive">

                        <table className="table table-bordered table-hover">

                            <thead>

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

                                            No Equipment Found

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

                                                <td>
                                                    {
                                                        item.equipmentName
                                                    }
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

                                                <td>
                                                    {
                                                        item.totalUsageHours
                                                    }
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
                                                            className="btn btn-info btn-sm"
                                                        >

                                                            View

                                                        </Link>

                                                        <Link
                                                            href={`/dashboard/equipment/edit/${item.id}`}
                                                            className="btn btn-warning btn-sm"
                                                        >

                                                            Edit

                                                        </Link>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                        >

                                                            Delete

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