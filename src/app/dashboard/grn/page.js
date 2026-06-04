"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

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

    const handleDelete =
        async (id) => {

            const confirmDelete =
                confirm(
                    "Delete this GRN?"
                );

            if (
                !confirmDelete
            )
                return;

            try {

                await axios.delete(
                    `/api/grn/${id}`
                );

                fetchGRN();

            } catch (error) {

                console.log(error);

                alert(
                    error?.response?.data
                        ?.message ||
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

                    <h2 className="page-title">
                        Goods Receipt Notes
                    </h2>

                    <p className="page-subtitle">
                        Manage received materials
                    </p>

                </div>

                <Link
                    href="/dashboard/grn/add"
                    className="btn btn-dark"
                >
                    Add GRN
                </Link>

            </div>

            {/* CARD */}

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body">

                    {/* SEARCH */}

                    <div className="row mb-3">

                        <div className="col-md-4">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search GRN..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                    {/* TABLE */}

                    <div className="table-responsive">

                        <table className="table table-hover align-middle">

                            <thead className="table-dark">

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
                                            Loading...
                                        </td>

                                    </tr>

                                ) : filteredGRN.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="9"
                                            className="text-center"
                                        >
                                            No GRN Found
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

                                                    <span className="badge bg-success">

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
                                                            className="btn btn-sm btn-info"
                                                        >
                                                            View
                                                        </Link>

                                                        <Link
                                                            href={`/dashboard/grn/edit/${grn.id}`}
                                                            className="btn btn-sm btn-warning"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    grn.id
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