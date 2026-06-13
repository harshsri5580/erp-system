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
    AlertTriangle,
} from "lucide-react";
export default function IncidentsPage() {

    const [incidents, setIncidents] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        fetchIncidents();

    }, []);

    const fetchIncidents =
        async () => {

            try {

                const res =
                    await axios.get(
                        "/api/incidents"
                    );

                setIncidents(
                    res.data.incidents || []
                );

            } catch (error) {

                console.log(error);

            }

        };

    const handleDelete = async (id) => {

        const result = await Swal.fire({
            title: "Delete Incident?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, Delete",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        try {

            await axios.delete(
                `/api/incidents/${id}`
            );

            toast.success(
                "Incident deleted successfully"
            );

            fetchIncidents();

        } catch (error) {

            console.log(error);

            toast.error(
                error?.response?.data?.message ||
                "Failed to delete incident"
            );

        }

    };

    const filteredIncidents =
        incidents.filter(
            (item) =>
                item.incidentNumber
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.title
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.project?.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.user?.name
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

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">

                <div>

                    <h2
                        className="fw-bold mb-1"
                        style={{ color: "#111827" }}
                    >
                        Incident Management
                    </h2>

                    <p
                        className="mb-0"
                        style={{ color: "#6B7280" }}
                    >
                        Track, monitor and manage all project incidents
                    </p>

                </div>

                <Link
                    href="/dashboard/incidents/add"
                    className="btn btn-dark rounded-3 px-4 d-flex align-items-center gap-2"
                >
                    <>
                        <Plus size={16} />
                        Add Incident
                    </>
                </Link>

            </div>

            <div
                className="card border-0 rounded-4"
                style={{
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)"
                }}
            >

                <div className="card-body">

                    <div className="row mb-3">

                        <div className="col-md-4">

                            <input
                                type="text"
                                className="form-control rounded-3 border-0"
                                style={{
                                    background: "#F9FAFB",
                                    height: "48px"
                                }}
                                placeholder="Search Incident..."
                                value={
                                    search
                                }
                                onChange={(e) =>
                                    setSearch(
                                        e.target
                                            .value
                                    )
                                }
                            />

                        </div>

                    </div>

                    <div className="table-responsive">

                        <table className="table table-bordered table-hover">

                            <thead
                                style={{
                                    background: "#F9FAFB"
                                }}
                            >

                                <tr>

                                    <th>ID</th>

                                    <th>Incident No</th>

                                    <th>Title</th>

                                    <th>Project</th>

                                    <th>Reported By</th>

                                    <th>Type</th>

                                    <th>Severity</th>

                                    <th>Status</th>

                                    <th width="250">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredIncidents
                                    .length ===
                                    0 ? (

                                    <tr>

                                        <td
                                            colSpan="9"
                                            className="text-center"
                                        >

                                            <div className="py-5 text-center">

                                                <AlertTriangle
                                                    size={48}
                                                    className="text-secondary mb-3"
                                                />

                                                <h6 className="fw-bold">
                                                    No Incident Records Found
                                                </h6>

                                                <p className="text-muted mb-0">
                                                    Create your first incident report
                                                </p>

                                            </div>

                                        </td>

                                    </tr>

                                ) : (

                                    filteredIncidents.map(
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
                                                        item.incidentNumber
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        item.title
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
                                                        item.incidentType
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge px-3 py-2 ${item.severity === "High"
                                                            ? "bg-danger"
                                                            : item.severity === "Medium"
                                                                ? "bg-warning text-dark"
                                                                : "bg-success"
                                                            }`}
                                                    >

                                                        {
                                                            item.severity
                                                        }

                                                    </span>

                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge px-3 py-2 ${item.status ===
                                                            "Closed"
                                                            ? "bg-success"
                                                            : item.status ===
                                                                "In Progress"
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

                                                    <div className="d-flex gap-2 flex-wrap">

                                                        <Link
                                                            href={`/dashboard/incidents/view/${item.id}`}
                                                            className="btn btn-outline-info btn-sm rounded-3"
                                                        >

                                                            <>
                                                                <Eye size={14} />
                                                                View
                                                            </>

                                                        </Link>

                                                        <Link
                                                            href={`/dashboard/incidents/edit/${item.id}`}
                                                            className="btn btn-outline-warning btn-sm rounded-3"
                                                        >

                                                            <>
                                                                <Pencil size={14} />
                                                                Edit
                                                            </>

                                                        </Link>

                                                        <button
                                                            className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1 rounded-3"
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