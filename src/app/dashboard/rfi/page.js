"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function RFIPage() {

    const [rfis, setRfis] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchRFIs();

    }, []);

    const fetchRFIs =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/rfi"
                    );

                setRfis(
                    response.data.rfis || []
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

    const handleDelete =
        async (id) => {

            const confirmDelete =
                confirm(
                    "Delete this RFI?"
                );

            if (
                !confirmDelete
            )
                return;

            try {

                await axios.delete(
                    `/api/rfi/${id}`
                );

                fetchRFIs();

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to delete RFI"
                );

            }

        };

    if (loading) {

        return (
            <div className="text-center mt-5">
                Loading...
            </div>
        );

    }

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="page-title">

                        RFI Management

                    </h2>

                    <p className="text-muted mb-0">

                        Request For Information

                    </p>

                </div>

                <Link
                    href="/dashboard/rfi/add"
                    className="btn btn-dark"
                >

                    Add RFI

                </Link>

            </div>

            <div className="card shadow border-0">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-bordered align-middle">

                            <thead className="table-dark">

                                <tr>

                                    <th>
                                        ID
                                    </th>

                                    <th>
                                        RFI No
                                    </th>

                                    <th>
                                        Project
                                    </th>

                                    <th>
                                        Title
                                    </th>

                                    <th>
                                        Priority
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Raised By
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {rfis.length >
                                    0 ? (

                                    rfis.map(
                                        (item) => (

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
                                                        item.rfiNumber
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        item.project
                                                            ?.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        item.title
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${item.priority ===
                                                            "Critical"
                                                            ? "bg-danger"
                                                            : item.priority ===
                                                                "High"
                                                                ? "bg-warning text-dark"
                                                                : item.priority ===
                                                                    "Medium"
                                                                    ? "bg-primary"
                                                                    : "bg-success"
                                                            }`}
                                                    >

                                                        {
                                                            item.priority
                                                        }

                                                    </span>

                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${item.status ===
                                                            "Closed"
                                                            ? "bg-success"
                                                            : item.status ===
                                                                "Answered"
                                                                ? "bg-info"
                                                                : item.status ===
                                                                    "In Review"
                                                                    ? "bg-warning text-dark"
                                                                    : "bg-secondary"
                                                            }`}
                                                    >

                                                        {
                                                            item.status
                                                        }

                                                    </span>

                                                </td>

                                                <td>

                                                    {
                                                        item.user
                                                            ?.name
                                                    }

                                                </td>

                                                <td>

                                                    <div className="d-flex gap-2">

                                                        <Link
                                                            href={`/dashboard/rfi/view/${item.id}`}
                                                            className="btn btn-info btn-sm"
                                                        >

                                                            View

                                                        </Link>

                                                        <Link
                                                            href={`/dashboard/rfi/edit/${item.id}`}
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

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="8"
                                            className="text-center"
                                        >

                                            No RFI Found

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}