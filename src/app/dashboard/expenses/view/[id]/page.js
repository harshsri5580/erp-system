"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "next/navigation";

export default function ViewExpensePage() {

    const { id } = useParams();

    const [expense, setExpense] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    // ======================
    // FETCH EXPENSE
    // ======================

    const fetchExpense =
        async () => {

            try {

                const response =
                    await axios.get(
                        `/api/expenses/${id}`
                    );

                setExpense(
                    response.data.expense
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

    useEffect(() => {

        fetchExpense();

    }, []);

    // ======================
    // LOADING
    // ======================

    if (loading) {
        return (
            <div className="container-fluid px-4 py-5 text-center">
                <h5 className="text-muted">
                    Loading Expense Details...
                </h5>
            </div>
        );
    }

    // ======================
    // NO EXPENSE
    // ======================
    if (!expense) {
        return (
            <div className="container-fluid px-4 py-5 text-center">
                <h5 className="text-danger">
                    Expense not found
                </h5>
            </div>
        );
    }

    return (

        <div className="container-fluid px-4 py-3">
            <div className="mb-4 pb-3 border-bottom">

                <div className="d-flex justify-content-between align-items-center">

                    <div>

                        <h2
                            className="fw-bold mb-1"
                            style={{
                                color: "#111827",
                            }}
                        >
                            Expense Details
                        </h2>

                        <p
                            className="mb-0"
                            style={{
                                color: "#6B7280",
                            }}
                        >
                            Complete expense information
                        </p>

                    </div>

                    <span
                        className={`badge px-3 py-2 ${expense.status === "Paid"
                            ? "bg-success"
                            : "bg-warning text-dark"
                            }`}
                    >
                        {expense.status}
                    </span>

                </div>

            </div>

            <div
                className="card border-0 rounded-4"
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
                }}
            >

                {/* HEADER */}


                {/* BODY */}

                <div className="card-body">

                    <div className="row">

                        {/* TITLE */}

                        <div className="col-md-6 mb-4">

                            <h6
                                className="mb-2"
                                style={{
                                    color: "#6B7280",
                                    fontWeight: 600,
                                }}
                            >
                                Expense Title
                            </h6>

                            <h5>
                                {expense.title}
                            </h5>

                        </div>

                        <div className="col-12 mb-3">

                            <div
                                className="p-3 rounded-4"
                                style={{
                                    background: "#F8FAFC",
                                    border: "1px solid #E5E7EB",
                                }}
                            >

                                <h6 className="fw-bold mb-0">
                                    Expense Information
                                </h6>

                            </div>

                        </div>

                        {/* CATEGORY */}

                        <div className="col-md-6 mb-4">

                            <h6
                                className="mb-2"
                                style={{
                                    color: "#6B7280",
                                    fontWeight: 600,
                                }}
                            >
                                Category
                            </h6>

                            <h5>
                                {expense.category}
                            </h5>

                        </div>

                        {/* AMOUNT */}

                        <div className="col-md-6 mb-4">

                            <div
                                className="p-3 rounded-4"
                                style={{
                                    background: "#FEF2F2",
                                    border: "1px solid #FECACA",
                                }}
                            >

                                <h6 className="text-muted">
                                    Amount
                                </h6>

                                <h3 className="fw-bold text-danger mb-0">
                                    ₹{expense.amount}
                                </h3>

                            </div>

                        </div>

                        {/* DATE */}

                        <div className="col-md-6 mb-4">

                            <h6
                                className="mb-2"
                                style={{
                                    color: "#6B7280",
                                    fontWeight: 600,
                                }}
                            >
                                Expense Date
                            </h6>

                            <h5>
                                {expense.date}
                            </h5>

                        </div>

                        {/* STATUS */}

                        <div className="col-md-6 mb-4">

                            <h6
                                className="mb-2"
                                style={{
                                    color: "#6B7280",
                                    fontWeight: 600,
                                }}
                            >
                                Status
                            </h6>

                            <span
                                className={`badge fs-6 ${expense.status === "Paid"
                                    ? "bg-success"
                                    : "bg-warning text-dark"
                                    }`}
                            >
                                {expense.status}
                            </span>

                        </div>

                        {/* NOTES */}

                        <div className="col-12 mb-4">

                            <div
                                className="p-4 rounded-4"
                                style={{
                                    background: "#F9FAFB",
                                    border: "1px solid #E5E7EB",
                                }}
                            >

                                <h6
                                    className="fw-bold mb-3"
                                    style={{
                                        color: "#111827",
                                    }}
                                >
                                    Notes
                                </h6>

                                <p className="mb-0 text-muted">

                                    {expense.notes ||
                                        "No notes available"}

                                </p>

                            </div>

                        </div>

                        {/* CREATED */}

                        <div className="col-md-12">

                            <h6
                                className="mb-2"
                                style={{
                                    color: "#6B7280",
                                    fontWeight: 600,
                                }}
                            >
                                Created At
                            </h6>
                            <p
                                className="mb-0 fw-medium"
                                style={{
                                    color: "#374151",
                                }}
                            >

                                {new Date(
                                    expense.createdAt
                                ).toLocaleString()}

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}