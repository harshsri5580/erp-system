"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

import {
    Plus,
    Eye,
    Pencil,
    Trash2,
    FileCheck,
    Search,
} from "lucide-react";

import toast from "react-hot-toast";

export default function GRNPage() {

    const [grns, setGrns] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    // ======================
    // FETCH GRN
    // ======================

    const fetchGRN =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/grn"
                    );

                setGrns(
                    response.data.grns || []
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

    useEffect(() => {

        fetchGRN();

    }, []);

    // ======================
    // DELETE
    // ======================

    const handleDelete = async (id) => {
        try {

            await axios.delete(
                `/api/grn/${id}`
            );

            toast.success(
                "GRN deleted successfully"
            );

            fetchGRN();

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                "Delete failed"
            );

        }
    };

    const filteredGRN =
        grns.filter(
            (item) =>
                item.grnNumber
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.vendor
                    ?.companyName
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (

        <div className="container-fluid">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2
                        className="fw-bold mb-1"
                        style={{
                            color: "#111827",
                        }}
                    >
                        Goods Receipt Notes
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#6B7280",
                        }}
                    >
                        Track and manage received materials
                    </p>

                </div>

                <Link
                    href="/dashboard/grn/add"
                    className="btn btn-dark rounded-3 px-4 d-flex align-items-center gap-2"
                >
                    <Plus size={18} />
                    Add GRN
                </Link>

            </div>

            {/* CARD */}

            <div
                className="card border-0 rounded-4"
                style={{
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
                }}
            >

                <div className="card-body">

                    {/* SEARCH */}

                    <div className="row mb-3">

                        <div className="col-md-5">

                            <div className="position-relative">

                                <Search
                                    size={16}
                                    className="position-absolute"
                                    style={{
                                        left: "14px",
                                        top: "12px",
                                        color: "#9CA3AF",
                                    }}
                                />

                                <input
                                    type="text"
                                    className="form-control rounded-3 ps-5"
                                    placeholder="Search GRN Number or Vendor..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                    </div>

                    {/* TABLE */}

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead
                                style={{
                                    background: "#F9FAFB",
                                }}
                            >

                                <tr>

                                    <th>GRN No</th>

                                    <th>Vendor</th>

                                    <th>Project</th>

                                    <th>PO ID</th>

                                    <th>Received Qty</th>

                                    <th>Pending Qty</th>

                                    <th>Status</th>

                                    <th>Date</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan="9"
                                            className="text-center"
                                        >
                                            <div className="py-5 text-center">
                                                Loading GRN Data...
                                            </div>
                                        </td>

                                    </tr>

                                ) : filteredGRN.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="9"
                                            className="text-center py-5"
                                        >

                                            <FileCheck
                                                size={45}
                                                className="mb-3 text-secondary"
                                            />

                                            <div className="fw-semibold fs-5 mt-2">
                                                No GRN Records Found
                                            </div>

                                            <div className="text-muted">
                                                Create your first GRN entry
                                            </div>

                                        </td>

                                    </tr>

                                ) : (

                                    filteredGRN.map(
                                        (grn) => (

                                            <tr
                                                key={grn.id}
                                            >

                                                <td>
                                                    {
                                                        grn.grnNumber
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        grn.vendor
                                                            ?.companyName
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        grn.project
                                                            ?.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        grn.purchaseOrderId
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        grn.receivedQty
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        grn.pendingQty
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge px-3 py-2 ${grn.status === "Completed"
                                                            ? "bg-success"
                                                            : grn.status === "Pending"
                                                                ? "bg-warning text-dark"
                                                                : "bg-primary"
                                                            }`}
                                                    >

                                                        {
                                                            grn.status
                                                        }

                                                    </span>

                                                </td>

                                                <td>

                                                    {new Date(
                                                        grn.receivedDate
                                                    ).toLocaleDateString()}

                                                </td>

                                                <td>

                                                    <div className="d-flex gap-2">

                                                        <Link
                                                            href={`/dashboard/grn/view/${grn.id}`}
                                                            className="btn btn-outline-info btn-sm d-flex align-items-center gap-1"
                                                        >
                                                            <>
                                                                <Eye size={14} />
                                                                View
                                                            </>
                                                        </Link>

                                                        <Link
                                                            href={`/dashboard/grn/edit/${grn.id}`}
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
                                                                    grn.id
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