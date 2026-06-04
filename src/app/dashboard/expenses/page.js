"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ExpensesPage() {

    const [expenses, setExpenses] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const fetchExpenses =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/expenses"
                    );

                setExpenses(
                    response.data.expenses
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

    useEffect(() => {

        fetchExpenses();

    }, []);

    const totalExpenses =
        expenses
            .filter(
                (item) =>
                    item.status ===
                    "Paid"
            )
            .reduce(
                (acc, item) =>
                    acc +
                    Number(item.amount || 0),
                0
            );

    return (

        <div className="container-fluid">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="page-title">
                        Expense Management
                    </h2>

                    <p className="text-muted mb-0">
                        Track company expenses
                    </p>

                </div>

                <Link
                    href="/dashboard/expenses/add"
                    className="btn btn-dark"
                >
                    Add Expense
                </Link>

            </div>

            {/* STATS */}

            <div className="row mb-4">

                <div className="col-md-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Total Expenses
                            </h6>

                            <h2 className="fw-bold text-danger">
                                ₹{totalExpenses}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Expense Entries
                            </h6>

                            <h2 className="page-title">
                                {expenses.length}
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Pending Expenses
                            </h6>

                            <h2 className="fw-bold text-warning">
                                ₹{expenses
                                    .filter(
                                        (item) =>
                                            item.status ===
                                            "Pending"
                                    )
                                    .reduce(
                                        (acc, item) =>
                                            acc +
                                            Number(item.amount || 0),
                                        0
                                    )}
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

                                        <th>Title</th>

                                        <th>Category</th>

                                        <th>Amount</th>

                                        <th>Date</th>

                                        <th>Status</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {expenses.length > 0 ? (

                                        expenses.map(
                                            (expense) => (

                                                <tr
                                                    key={expense.id}
                                                >

                                                    <td>
                                                        {expense.id}
                                                    </td>

                                                    <td>
                                                        {expense.title}
                                                    </td>

                                                    <td>
                                                        {expense.category}
                                                    </td>

                                                    <td className="fw-bold text-danger">
                                                        ₹{expense.amount}
                                                    </td>

                                                    <td>
                                                        {expense.date}
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`badge ${expense.status === "Paid"
                                                                ? "bg-success"
                                                                : "bg-warning text-dark"
                                                                }`}
                                                        >
                                                            {expense.status}
                                                        </span>

                                                    </td>

                                                    <td>

                                                        <div className="d-flex gap-2">

                                                            <Link
                                                                href={`/dashboard/expenses/view/${expense.id}`}
                                                                className="btn btn-info btn-sm"
                                                            >
                                                                View
                                                            </Link>

                                                            <Link
                                                                href={`/dashboard/expenses/edit/${expense.id}`}
                                                                className="btn btn-warning btn-sm"
                                                            >
                                                                Edit
                                                            </Link>

                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={async () => {

                                                                    const confirmDelete =
                                                                        window.confirm(
                                                                            "Delete this expense?"
                                                                        );

                                                                    if (
                                                                        !confirmDelete
                                                                    )
                                                                        return;

                                                                    try {

                                                                        await axios.delete(
                                                                            `/api/expenses/${expense.id}`
                                                                        );

                                                                        fetchExpenses();

                                                                    } catch (error) {

                                                                        console.log(
                                                                            error
                                                                        );

                                                                        alert(
                                                                            "Failed to delete expense"
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
                                                colSpan="7"
                                                className="text-center"
                                            >
                                                No Expenses Found
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