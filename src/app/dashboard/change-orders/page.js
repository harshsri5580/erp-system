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
    FileEdit,
} from "lucide-react";

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

            const result =
                await Swal.fire({

                    title:
                        "Delete Change Order?",

                    text:
                        "This change order will be permanently removed.",

                    icon: "warning",

                    showCancelButton: true,

                    confirmButtonText:
                        "Yes, Delete",

                    cancelButtonText:
                        "Cancel",

                    reverseButtons: true,

                    confirmButtonColor:
                        "#dc3545",

                    cancelButtonColor:
                        "#6c757d",

                    customClass: {
                        popup: "rounded-4",
                    },

                });

            if (!result.isConfirmed)
                return;

            try {

                await axios.delete(
                    `/api/change-orders/${id}`
                );

                toast.success(
                    "Change Order deleted successfully"
                );

                fetchChangeOrders();

            } catch (error) {

                console.log(error);

                toast.error(
                    "Failed to delete Change Order"
                );

            }

        };

    if (loading) {

        return (
            <div className="container-fluid px-4 py-3">
                <div className="card border-0 rounded-4">
                    <div className="card-body text-center py-5">
                        Loading Change Orders...
                    </div>
                </div>
            </div>
        );

    }

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
                        Change Orders
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#6B7280",
                        }}
                    >
                        Contract variations and scope change management
                    </p>

                </div>

                <Link
                    href="/dashboard/change-orders/add"
                    className="btn btn-dark rounded-3 px-4 d-flex align-items-center gap-2"
                >
                    <Plus size={18} />
                    Add Change Order
                </Link>

            </div>

            <div
                className="card border-0 rounded-4"
                style={{
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,0.06)",
                }}
            >

                <div className="card-body p-4">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead
                                style={{
                                    background: "#F9FAFB",
                                }}
                            >

                                <tr>

                                    <th className="fw-semibold text-secondary">
                                        ID
                                    </th>

                                    <th className="fw-semibold text-secondary">CO Number</th>
                                    <th className="fw-semibold text-secondary">Project</th>
                                    <th className="fw-semibold text-secondary">Client</th>
                                    <th className="fw-semibold text-secondary">Title</th>
                                    <th className="fw-semibold text-secondary">Old Amount</th>
                                    <th className="fw-semibold text-secondary">New Amount</th>
                                    <th className="fw-semibold text-secondary">Difference</th>
                                    <th className="fw-semibold text-secondary">Status</th>
                                    <th className="fw-semibold text-secondary">Actions</th>

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

                                                <td className="fw-semibold">
                                                    {item.project?.name}
                                                </td>
                                                <td>
                                                    <span className="fw-medium">
                                                        {item.client?.companyName}
                                                    </span>
                                                </td>

                                                <td>
                                                    {item.title}
                                                </td>

                                                <td className="text-danger fw-semibold">
                                                    ₹{item.oldAmount}
                                                </td>

                                                <td className="text-primary fw-semibold">
                                                    ₹{item.newAmount}
                                                </td>

                                                <td className="text-success fw-bold">
                                                    ₹{item.differenceAmount}
                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge rounded-pill px-3 py-2 ${item.status === "Approved"
                                                            ? "bg-success"
                                                            : item.status === "Rejected"
                                                                ? "bg-danger"
                                                                : item.status === "Submitted"
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

                                                    <div className="d-flex gap-2 flex-wrap">

                                                        <Link
                                                            href={`/dashboard/change-orders/view/${item.id}`}
                                                            className="btn btn-outline-info btn-sm d-flex align-items-center gap-1"
                                                        >
                                                            <>
                                                                <Eye size={14} />
                                                                View
                                                            </>
                                                        </Link>

                                                        <Link
                                                            href={`/dashboard/change-orders/edit/${item.id}`}
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

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="10"
                                            className="text-center py-5"
                                        >

                                            <FileEdit
                                                size={40}
                                                className="mb-3 text-secondary"
                                            />

                                            <div className="fw-semibold">
                                                No Change Orders Found
                                            </div>

                                            <div className="text-muted">
                                                Create your first change order
                                            </div>

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