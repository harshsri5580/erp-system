"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AccountsPage() {

    const [stats, setStats] = useState({

        totalInvoices: 0,

        totalPayments: 0,

        totalExpenses: 0,

        totalRevenue: 0,

        pendingPayments: 0,

        completedPayments: 0,

        pendingExpenses: 0,

        completedExpenses: 0,

    });

    const [loading, setLoading] =
        useState(true);

    const fetchAccountsData =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/accounts"
                    );

                setStats(response.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

    useEffect(() => {

        fetchAccountsData();

    }, []);

    if (loading) {

        return (
            <h4>
                Loading...
            </h4>
        );
    }

    return (

        <div className="container-fluid px-4 py-3">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">

                <div>
                    <h2
                        className="fw-bold mb-1"
                        style={{
                            color: "#111827",
                            opacity: 1
                        }}
                    >
                        Accounts Dashboard
                    </h2>

                    <p className="text-muted mb-0">
                        Real-time financial overview and business performance
                    </p>
                </div>
                <div className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
                    Updated Today
                </div>
            </div>


            {/* CARDS */}

            <div className="row">

                {/* TOTAL INVOICES */}

                <div className="col-md-3 mb-4">

                    <div
                        className="card border-0 rounded-4 h-100"
                        style={{
                            background: "#fff",
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,0.06)"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <span className="text-muted fw-semibold">
                                    Total Invoices
                                </span>

                                <span className="fs-4">
                                    📄
                                </span>

                            </div>

                            <h2 className="fw-bold mb-0">
                                ₹{stats.totalInvoices}
                            </h2>

                        </div>

                    </div>

                </div>

                {/* PAYMENTS */}

                <div className="col-md-3 mb-4">

                    <div
                        className="card border-0 rounded-4 h-100"
                        style={{
                            background: "#fff",
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,0.06)"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <span className="text-muted fw-semibold">
                                    Payments Received
                                </span>

                                <span className="fs-4">
                                    💰
                                </span>

                            </div>

                            <h2 className="fw-bold text-success">
                                ₹{stats.totalPayments}
                            </h2>

                        </div>

                    </div>

                </div>

                {/* EXPENSES */}

                <div className="col-md-3 mb-4">

                    <div
                        className="card border-0 rounded-4 h-100"
                        style={{
                            background: "#fff",
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,0.06)"
                        }}
                    >

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <span className="text-muted fw-semibold">
                                    Total Expenses
                                </span>

                                <span className="fs-4">
                                    📉
                                </span>

                            </div>

                            <h2 className="fw-bold text-danger">
                                ₹{stats.totalExpenses}
                            </h2>

                        </div>

                    </div>

                </div>

                {/* REVENUE */}

                <div className="col-md-3 mb-4">

                    <div
                        className="card border-0 rounded-4 h-100"
                        style={{
                            background: "#fff",
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,0.06)"
                        }}
                    >

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center mb-3">

                                <span className="text-muted fw-semibold">
                                    Net Revenue
                                </span>

                                <span className="fs-4">
                                    🚀
                                </span>

                            </div>

                            <h2 className="fw-bold text-primary">
                                ₹{stats.totalRevenue}
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            {/* SECOND ROW */}

            <div className="row">

                {/* PENDING */}

                <div className="col-md-6 mb-4">

                    <div className="card shadow border-0 rounded-4 h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <h5 className="fw-bold mb-0">
                                    Pending Transactions
                                </h5>

                                <span className="badge bg-warning-subtle text-warning">
                                    Action Required
                                </span>

                            </div>

                            {/* <h2 className="text-warning fw-bold mb-4">
                                ₹{stats.totalPending}
                            </h2> */}

                            <div className="row">



                                <div className="col-6 mb-3">

                                    <div
                                        className="rounded-4 p-4"
                                        style={{
                                            background: "#fff8e1",
                                            border: "1px solid #ffe082"
                                        }}
                                    >

                                        <h6 className="text-muted">
                                            Pending Expenses
                                        </h6>

                                        <h5 className="text-warning fw-bold">
                                            ₹{stats.pendingExpenses}
                                        </h5>

                                    </div>

                                </div>

                                <div className="col-6 mb-3">

                                    <div
                                        className="rounded-4 p-4"
                                        style={{
                                            background: "#fff8e1",
                                            border: "1px solid #ffe082"
                                        }}
                                    >

                                        <h6 className="text-muted">
                                            Pending Payments
                                        </h6>

                                        <h5 className="text-warning fw-bold">
                                            ₹{stats.pendingPayments}
                                        </h5>

                                    </div>

                                </div>

                                {/* <div className="col-6">

                                    <div className="border rounded-3 p-3">

                                        <h6 className="text-muted">
                                            Completed Expenses
                                        </h6>

                                        <h5 className="text-danger fw-bold">
                                            ₹{stats.completedExpenses}
                                        </h5>

                                    </div>

                                </div> */}

                            </div>

                        </div>

                    </div>

                </div>

                {/* SUMMARY */}

                <div className="col-md-6 mb-4">

                    <div className="card shadow border-0 rounded-4 h-100">

                        <div className="card-body">

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <h5 className="fw-bold mb-0">
                                    Finance Summary
                                </h5>

                                <span>
                                    📊
                                </span>

                            </div>
                            <ul className="list-group list-group-flush">

                                <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                                    <span>
                                        Total Invoice Amount
                                    </span>

                                    <strong>
                                        ₹{stats.totalInvoices}
                                    </strong>
                                </li>

                                <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                                    <span>
                                        Total Expenses
                                    </span>

                                    <strong>
                                        ₹{stats.totalExpenses}
                                    </strong>
                                </li>

                                <li className="list-group-item d-flex justify-content-between align-items-center py-3">
                                    <span>
                                        Net Revenue
                                    </span>

                                    <strong className="text-success">
                                        ₹{stats.totalRevenue}
                                    </strong>
                                </li>

                            </ul>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}