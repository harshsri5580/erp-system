"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ChangeOrdersPage() {

    const [changeOrders, setChangeOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchChangeOrders();

    }, []);

    const fetchChangeOrders =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/change-orders"
                    );

                setChangeOrders(
                    response.data.changeOrders || []
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
                    "Delete this Change Order?"
                );

            if (!confirmDelete)
                return;

            try {

                await axios.delete(
                    `/api/change-orders/${id}`
                );

                fetchChangeOrders();

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to delete Change Order"
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

                        Change Orders

                    </h2>

                    <p className="text-muted">

                        Contract Variations & Scope Changes

                    </p>

                </div>

                <Link
                    href="/dashboard/change-orders/add"
                    className="btn btn-dark"
                >

                    Add Change Order

                </Link>

            </div>

            <div className="card shadow border-0">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-bordered">

                            <thead className="table-dark">

                                <tr>

                                    <th>ID</th>

                                    <th>CO Number</th>

                                    <th>Project</th>

                                    <th>Client</th>

                                    <th>Title</th>

                                    <th>Old Amount</th>

                                    <th>New Amount</th>

                                    <th>Difference</th>

                                    <th>Status</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {changeOrders.length > 0 ? (

                                    changeOrders.map(
                                        (item) => (

                                            <tr
                                                key={item.id}
                                            >

                                                <td>
                                                    {item.id}
                                                </td>

                                                <td>
                                                    {item.coNumber}
                                                </td>

                                                <td>
                                                    {
                                                        item.project
                                                            ?.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        item.client
                                                            ?.companyName
                                                    }
                                                </td>

                                                <td>
                                                    {item.title}
                                                </td>

                                                <td>
                                                    ₹
                                                    {item.oldAmount}
                                                </td>

                                                <td>
                                                    ₹
                                                    {item.newAmount}
                                                </td>

                                                <td>
                                                    ₹
                                                    {
                                                        item.differenceAmount
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${item.status ===
                                                            "Approved"
                                                            ? "bg-success"
                                                            : item.status ===
                                                                "Rejected"
                                                                ? "bg-danger"
                                                                : item.status ===
                                                                    "Submitted"
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

                                                    <div className="d-flex gap-2">

                                                        <Link
                                                            href={`/dashboard/change-orders/view/${item.id}`}
                                                            className="btn btn-info btn-sm"
                                                        >
                                                            View
                                                        </Link>

                                                        <Link
                                                            href={`/dashboard/change-orders/edit/${item.id}`}
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
                                            colSpan="10"
                                            className="text-center"
                                        >

                                            No Change Orders Found

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