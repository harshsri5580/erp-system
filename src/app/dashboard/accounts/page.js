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

        <div className="container-fluid">

            {/* HEADER */}

            <div className="mb-4">

                <h2 className="page-title">
                    Accounts Dashboard
                </h2>

                <p className="page-subtitle">
                    Financial overview
                </p>

            </div>

            {/* CARDS */}

            <div className="row">

                {/* TOTAL INVOICES */}

                <div className="col-md-3 mb-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Total Invoices
                            </h6>

                            <h2 className="page-title">
                                ₹{stats.totalInvoices}
                            </h2>

                        </div>

                    </div>

                </div>

                {/* PAYMENTS */}

                <div className="col-md-3 mb-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Payments Received
                            </h6>

                            <h2 className="fw-bold text-success">
                                ₹{stats.totalPayments}
                            </h2>

                        </div>

                    </div>

                </div>

                {/* EXPENSES */}

                <div className="col-md-3 mb-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Total Expenses
                            </h6>

                            <h2 className="fw-bold text-danger">
                                ₹{stats.totalExpenses}
                            </h2>

                        </div>

                    </div>

                </div>

                {/* REVENUE */}

                <div className="col-md-3 mb-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Net Revenue
                            </h6>

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

                            <h5 className="fw-bold mb-3">
                                Pending Invoice Payments
                            </h5>

                            {/* <h2 className="text-warning fw-bold mb-4">
                                ₹{stats.totalPending}
                            </h2> */}

                            <div className="row">



                                <div className="col-6 mb-3">

                                    <div className="border rounded-3 p-3">

                                        <h6 className="text-muted">
                                            Pending Expenses
                                        </h6>

                                        <h5 className="text-warning fw-bold">
                                            ₹{stats.pendingExpenses}
                                        </h5>

                                    </div>

                                </div>

                                <div className="col-6 mb-3">

                                    <div className="border rounded-3 p-3">

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

                            <h5 className="fw-bold mb-3">
                                Finance Summary
                            </h5>

                            <ul className="list-group">

                                <li className="list-group-item d-flex justify-content-between">
                                    <span>
                                        Total Invoice Amount
                                    </span>

                                    <strong>
                                        ₹{stats.totalInvoices}
                                    </strong>
                                </li>

                                <li className="list-group-item d-flex justify-content-between">
                                    <span>
                                        Total Expenses
                                    </span>

                                    <strong>
                                        ₹{stats.totalExpenses}
                                    </strong>
                                </li>

                                <li className="list-group-item d-flex justify-content-between">
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