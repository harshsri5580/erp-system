"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

import {
    Plus,
    Eye,
    Pencil,
    Trash2,
    Search,
    ClipboardCheck,
} from "lucide-react";

export default function InspectionsPage() {

    const [inspections, setInspections] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        fetchInspections();

    }, []);

    const fetchInspections =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/inspections"
                    );

                setInspections(
                    response.data
                        .inspections || []
                );

            } catch (error) {

                console.log(error);

            }

        };

    const handleDelete =
        async (id) => {

            const result =
                await Swal.fire({
                    title: "Delete Inspection?",
                    text: "This action cannot be undone.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#dc3545",
                    cancelButtonColor: "#6c757d",
                    confirmButtonText: "Delete",
                });

            if (!result.isConfirmed)
                return;
            try {

                toast.success(
                    "Inspection deleted successfully"
                );

                await axios.delete(
                    `/api/inspections/${id}`
                );

                fetchInspections();

            } catch (error) {

                toast.error(
                    "Failed to delete inspection"
                );

            }

        };

    const filteredData =
        inspections.filter(
            (item) =>
                item.inspectionNumber
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.project?.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.user?.fullName
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.status
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
                        Inspection Management
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#6B7280",
                        }}
                    >
                        Track and manage all site inspections
                    </p>

                </div>

                <Link
                    href="/dashboard/inspections/add"
                    className="btn btn-dark rounded-3 px-4 d-flex align-items-center gap-2"
                >
                    <Plus size={18} />
                    Add Inspection
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
                                    size={18}
                                    style={{
                                        position: "absolute",
                                        left: "14px",
                                        top: "14px",
                                        color: "#6B7280",
                                    }}
                                />

                                <input
                                    type="text"
                                    className="form-control rounded-3 ps-5"
                                    placeholder="Search inspection..."
                                    value={search}
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

                        <table className="table table-bordered table-hover">

                            {filteredData.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="8"
                                        className="text-center py-5"
                                    >

                                        <ClipboardCheck
                                            size={50}
                                            className="mb-3 text-secondary"
                                        />

                                        <h5>
                                            No Inspections Found
                                        </h5>

                                        <p className="text-muted mb-0">
                                            Inspection records will appear here
                                        </p>

                                    </td>

                                </tr>

                            )}

                            <thead
                                style={{
                                    background: "#F9FAFB",
                                }}
                            >

                                <tr>

                                    <th>ID</th>

                                    <th>Inspection No</th>

                                    <th>Project</th>

                                    <th>Inspector</th>

                                    <th>Type</th>

                                    <th>Date</th>

                                    <th>Status</th>

                                    <th width="280">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredData.map(
                                    (
                                        item
                                    ) => (

                                        <tr
                                            key={
                                                item.id
                                            }
                                        >

                                            <td>
                                                {
                                                    item.id
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.inspectionNumber
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item
                                                        .project
                                                        ?.name
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item
                                                        .user
                                                        ?.name
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.inspectionType
                                                }
                                            </td>

                                            <td>
                                                {item.inspectionDate
                                                    ? new Date(
                                                        item.inspectionDate
                                                    ).toLocaleDateString()
                                                    : "-"}
                                            </td>

                                            <td>

                                                <span
                                                    className={`badge px-3 py-2 ${item.status === "Completed"
                                                        ? "bg-success"
                                                        : item.status === "In Progress"
                                                            ? "bg-warning text-dark"
                                                            : "bg-primary"
                                                        }`}
                                                >
                                                    {item.status}
                                                </span>

                                            </td>
                                            <td>

                                                <div className="d-flex gap-2">

                                                    <Link
                                                        href={`/dashboard/inspections/view/${item.id}`}
                                                        className="btn btn-outline-info btn-sm rounded-3 d-flex align-items-center gap-1"
                                                    >
                                                        <>
                                                            <Eye size={14} />
                                                            View
                                                        </>
                                                    </Link>

                                                    <Link
                                                        href={`/dashboard/inspections/edit/${item.id}`}
                                                        className="btn btn-outline-warning btn-sm rounded-3 d-flex align-items-center gap-1"
                                                    >
                                                        <>
                                                            <Pencil size={14} />
                                                            Edit
                                                        </>
                                                    </Link>

                                                    <button
                                                        className="btn btn-danger btn-sm"
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
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}