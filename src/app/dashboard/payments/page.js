"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function PaymentsPage() {

    const [payments, setPayments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const fetchPayments =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/payments"
                    );

                setPayments(
                    response.data.payments
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

    useEffect(() => {

        fetchPayments();

    }, []);

    const totalPayments =
        payments
            .filter(
                (item) =>
                    item.status ===
                    "Completed"
            )
            .reduce(
                (acc, item) =>
                    acc +
                    Number(item.amount),
                0
            );

    const pendingPayments =
        payments
            .filter(
                (item) =>
                    item.status ===
                    "Pending"
            )
            .reduce(
                (acc, item) =>
                    acc +
                    Number(item.amount),
                0
            );

    const totalEntries =
        payments.length;

    return (

        <div className="container-fluid">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="page-title">
                        Payments Management
                    </h2>

                    <p className="text-muted mb-0">
                        Track all received payments
                    </p>

                </div>

                <Link
                    href="/dashboard/payments/add"
                    className="btn btn-dark"
                >
                    Add Payment
                </Link>

            </div>

            {/* STATS */}

            <div className="row mb-4">

                <div className="col-md-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Total Payments
                            </h6>

                            <h2 className="fw-bold text-success">
                                ₹{totalPayments}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Payment Entries
                            </h6>

                            <h2 className="page-title">
                                {totalEntries}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Pending Payments
                            </h6>

                            <h2 className="fw-bold text-warning">
                                ₹{pendingPayments}
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            {/* TABLE */}

            <div className="card shadow border-0 rounded-4">

                <div className="card-body">

                    {loading ? (

                        <h5>
                            Loading...
                        </h5>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>

                                        <th>Invoice</th>

                                        <th>Client</th>

                                        <th>Amount</th>

                                        <th>Payment Method</th>

                                        <th>Date</th>

                                        <th>Status</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {payments.length > 0 ? (

                                        payments.map(
                                            (payment) => (

                                                <tr
                                                    key={payment.id}
                                                >

                                                    <td>
                                                        {payment.id}
                                                    </td>

                                                    <td>
                                                        {payment.invoice?.invoiceNumber}
                                                    </td>

                                                    <td>
                                                        {payment.client?.companyName}
                                                    </td>

                                                    <td className="fw-bold text-success">
                                                        ₹{payment.amount}
                                                    </td>

                                                    <td>
                                                        {payment.paymentMethod}
                                                    </td>

                                                    <td>
                                                        {payment.paymentDate}
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`badge ${payment.status === "Completed"
                                                                ? "bg-success"
                                                                : "bg-warning text-dark"
                                                                }`}
                                                        >
                                                            {payment.status}
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <div className="d-flex gap-2">

                                                            <Link
                                                                href={`/dashboard/payments/view/${payment.id}`}
                                                                className="btn btn-info btn-sm"
                                                            >
                                                                View
                                                            </Link>

                                                            <Link
                                                                href={`/dashboard/payments/edit/${payment.id}`}
                                                                className="btn btn-warning btn-sm"
                                                            >
                                                                Edit
                                                            </Link>

                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={async () => {

                                                                    const confirmDelete =
                                                                        window.confirm(
                                                                            "Delete payment?"
                                                                        );

                                                                    if (
                                                                        !confirmDelete
                                                                    )
                                                                        return;

                                                                    try {

                                                                        await axios.delete(
                                                                            `/api/payments/${payment.id}`
                                                                        );

                                                                        fetchPayments();

                                                                    } catch (error) {

                                                                        console.log(
                                                                            error
                                                                        );

                                                                        alert(
                                                                            "Failed to delete payment"
                                                                        );
                                                                    }
                                                                }}
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
                                                No Payments Found
                                            </td>

                                        </tr>
                                    )}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}