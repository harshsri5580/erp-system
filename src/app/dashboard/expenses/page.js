"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import {
    Plus,
    Eye,
    Pencil,
    Trash2,
    Receipt,
    Wallet,
    Clock3,
} from "lucide-react";

import toast from "react-hot-toast";

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

        <div className="container-fluid px-4 py-3">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <h2
                                className="fw-bold mb-1"
                                style={{
                                    color: "#111827",
                                }}
                            >
                                Expense Management
                            </h2>

                            <p
                                className="mb-0"
                                style={{
                                    color: "#6B7280",
                                }}
                            >
                                Track and manage company expenses
                            </p>

                        </div>



                    </div>
                </div>

                <Link
                    href="/dashboard/expenses/add"
                    className="btn btn-dark"
                >
                    Add Expense
                </Link>

            </div>

            {/* STATS */}

            <div className="row g-4 mb-4">

                <div className="col-md-4">

                    <div className="card border-0 rounded-4 h-100"

                        style={{
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,.06)",
                        }}>

                        <div className="card-body">

                            <div className="d-flex justify-content-between mb-4">

                                <h6 className="text-muted mb-0">
                                    Total Expenses
                                </h6>

                                <Receipt
                                    size={20}
                                    className="text-danger"
                                />

                            </div>

                            <h2 className="fw-bold text-danger mb-2">
                                ₹{totalExpenses.toLocaleString()}
                            </h2>

                            <small className="text-muted">
                                Paid Expenses
                            </small>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card border-0 rounded-4 h-100"

                        style={{
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,.06)",
                        }}>

                        <div className="card-body">

                            <div className="d-flex justify-content-between mb-4">

                                <h6 className="text-muted mb-0">
                                    Expense Entries
                                </h6>

                                <Wallet
                                    size={20}
                                    className="text-primary"
                                />

                            </div>

                            <h2 className="fw-bold text-primary mb-2">
                                {expenses.length}
                            </h2>

                            <small className="text-muted">
                                Total Records
                            </small>

                        </div>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="card border-0 rounded-4 h-100"

                        style={{
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,.06)",
                        }}>

                        <div className="card-body">

                            <div className="d-flex justify-content-between mb-4">

                                <h6 className="text-muted mb-0">
                                    Pending Expenses
                                </h6>

                                <Clock3
                                    size={20}
                                    className="text-warning"
                                />

                            </div>

                            <h2 className="fw-bold text-warning mb-2">

                                ₹{
                                    expenses
                                        .filter(
                                            (item) =>
                                                item.status === "Pending"
                                        )
                                        .reduce(
                                            (acc, item) =>
                                                acc +
                                                Number(item.amount || 0),
                                            0
                                        )
                                        .toLocaleString()
                                }

                            </h2>

                            <small className="text-muted">
                                Awaiting Approval
                            </small>

                        </div>

                    </div>

                </div>

            </div>

            {/* TABLE */}

            <div className="card border-0 rounded-4 h-100"

                style={{
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
                }}>

                <div className="card-body">

                    {loading ? (

                        <h5>
                            Loading...
                        </h5>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead
                                    style={{
                                        background: "#F9FAFB",
                                    }}
                                >

                                    <tr>

                                        <th className="fw-semibold text-secondary">ID</th>

                                        <th className="fw-semibold text-secondary">Title</th>

                                        <th className="fw-semibold text-secondary">Category</th>

                                        <th className="fw-semibold text-secondary">Amount</th>

                                        <th className="fw-semibold text-secondary">Date</th>

                                        <th className="fw-semibold text-secondary">Status</th>

                                        <th className="fw-semibold text-secondary">Actions</th>

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

                                                    <td className="fw-semibold">
                                                        {expense.title}
                                                    </td>

                                                    <td>
                                                        {expense.category}
                                                    </td>

                                                    <td className="fw-bold text-danger">
                                                        ₹{expense.amount}
                                                    </td>

                                                    <td className="text-muted">
                                                        {new Date(
                                                            expense.date
                                                        ).toLocaleDateString()}
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
                                                                className="btn btn-outline-info btn-sm d-flex align-items-center gap-1"
                                                            >
                                                                <>
                                                                    <Eye size={14} />
                                                                    View
                                                                </>
                                                            </Link>

                                                            <Link
                                                                href={`/dashboard/expenses/edit/${expense.id}`}
                                                                className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
                                                            >
                                                                <>
                                                                    <Pencil size={14} />
                                                                    Edit
                                                                </>
                                                            </Link>

                                                            <button
                                                                className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
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

                                                                        toast.error(
                                                                            "Failed to delete expense"
                                                                        );
                                                                        toast.success(
                                                                            "Expense deleted successfully"
                                                                        );
                                                                    }
                                                                }}
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