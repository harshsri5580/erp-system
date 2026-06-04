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
            <h4>
                Loading...
            </h4>
        );
    }

    // ======================
    // NO EXPENSE
    // ======================

    if (!expense) {

        return (
            <h4>
                Expense not found
            </h4>
        );
    }

    return (

        <div className="container-fluid">

            <div className="card shadow border-0 rounded-4">

                {/* HEADER */}

                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">

                    <h3 className="mb-0">
                        Expense Details
                    </h3>

                    <span
                        className={`badge ${expense.status === "Paid"
                            ? "bg-success"
                            : "bg-warning text-dark"
                            }`}
                    >
                        {expense.status}
                    </span>

                </div>

                {/* BODY */}

                <div className="card-body">

                    <div className="row">

                        {/* TITLE */}

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Expense Title
                            </h6>

                            <h5>
                                {expense.title}
                            </h5>

                        </div>

                        {/* CATEGORY */}

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Category
                            </h6>

                            <h5>
                                {expense.category}
                            </h5>

                        </div>

                        {/* AMOUNT */}

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Amount
                            </h6>

                            <h4 className="text-danger fw-bold">
                                ₹{expense.amount}
                            </h4>

                        </div>

                        {/* DATE */}

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Expense Date
                            </h6>

                            <h5>
                                {expense.date}
                            </h5>

                        </div>

                        {/* STATUS */}

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
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

                        <div className="col-md-12 mb-4">

                            <h6 className="text-muted">
                                Notes
                            </h6>

                            <p>

                                {expense.notes ||

                                    "No notes available"}

                            </p>

                        </div>

                        {/* CREATED */}

                        <div className="col-md-12">

                            <h6 className="text-muted">
                                Created At
                            </h6>

                            <p>

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