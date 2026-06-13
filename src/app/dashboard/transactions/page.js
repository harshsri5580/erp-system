"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    ArrowDownCircle,
    ArrowUpCircle,
    Wallet,
} from "lucide-react";
export default function TransactionsPage() {

    const [transactions, setTransactions] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const fetchTransactions =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/transactions"
                    );

                setTransactions(
                    response.data.transactions
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

    useEffect(() => {

        fetchTransactions();

    }, []);

    const totalCredit =
        transactions
            .filter(
                (item) =>
                    item.type === "Credit" &&
                    item.status === "Completed"
            )
            .reduce(
                (acc, item) =>
                    acc +
                    Number(item.amount || 0),
                0
            );

    const totalDebit =
        transactions
            .filter(
                (item) =>
                    item.type === "Debit" &&
                    item.status === "Completed"
            )
            .reduce(
                (acc, item) =>
                    acc +
                    Number(item.amount || 0),
                0
            );

    const netBalance =
        totalCredit - totalDebit;

    return (

        <div className="container-fluid px-4 py-3">

            {/* HEADER */}

            <div className="mb-4">

                <h2
                    className="fw-bold mb-1"
                    style={{
                        color: "#111827",
                    }}
                >
                    Transactions Management
                </h2>

                <p
                    className="mb-0"
                    style={{
                        color: "#6B7280",
                    }}
                >
                    Monitor all financial transactions and cash flow
                </p>

            </div>

            {/* STATS */}

            <div className="row g-4 mb-4">

                {/* CREDIT */}

                <div className="col-md-4">

                    <div
                        className="card border-0 rounded-4"
                        style={{
                            minHeight: "170px",
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,.06)",
                        }}
                    >

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <h6 className="text-muted mb-0">
                                    Total Credit
                                </h6>

                                <div
                                    className="p-2 rounded-circle"
                                    style={{
                                        background: "#ECFDF5",
                                    }}
                                >
                                    <ArrowDownCircle
                                        size={20}
                                        className="text-success"
                                    />
                                </div>

                            </div>

                            <h2 className="fw-bold text-success mb-2">
                                ₹{totalCredit.toLocaleString()}
                            </h2>

                            <small className="text-muted">
                                Completed Income Transactions
                            </small>

                        </div>

                    </div>

                </div>

                {/* DEBIT */}

                <div className="col-md-4">

                    <div
                        className="card border-0 rounded-4"
                        style={{
                            minHeight: "170px",
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,.06)",
                        }}
                    >

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <h6 className="text-muted mb-0">
                                    Total Debit
                                </h6>

                                <div
                                    className="p-2 rounded-circle"
                                    style={{
                                        background: "#FEF2F2",
                                    }}
                                >
                                    <ArrowUpCircle
                                        size={20}
                                        className="text-danger"
                                    />
                                </div>

                            </div>

                            <h2 className="fw-bold text-danger mb-2">
                                ₹{totalDebit.toLocaleString()}
                            </h2>

                            <small className="text-muted">
                                Completed Expense Transactions
                            </small>

                        </div>

                    </div>

                </div>

                {/* BALANCE */}

                <div className="col-md-4">

                    <div
                        className="card border-0 rounded-4"
                        style={{
                            minHeight: "170px",
                            boxShadow:
                                "0 10px 30px rgba(0,0,0,.06)",
                        }}
                    >

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <h6 className="text-muted mb-0">
                                    Net Balance
                                </h6>

                                <div
                                    className="p-2 rounded-circle"
                                    style={{
                                        background: "#EFF6FF",
                                    }}
                                >
                                    <Wallet
                                        size={20}
                                        className="text-primary"
                                    />
                                </div>

                            </div>

                            <h2
                                className={`fw-bold mb-2 ${netBalance >= 0
                                    ? "text-primary"
                                    : "text-danger"
                                    }`}
                            >
                                ₹{netBalance.toLocaleString()}
                            </h2>

                            <small className="text-muted">
                                Current Available Balance
                            </small>

                        </div>

                    </div>

                </div>

            </div>

            {/* TABLE */}

            <div
                className="card border-0 rounded-4"
                style={{
                    minHeight: "120px",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
                }}
            >

                <div className="card-body p-4">

                    {loading ? (

                        <div className="text-center py-5">
                            Loading Transactions...
                        </div>

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

                                        <th className="fw-semibold text-secondary">Type</th>

                                        <th className="fw-semibold text-secondary">Amount</th>

                                        <th className="fw-semibold text-secondary">Reference</th>

                                        <th className="fw-semibold text-secondary">Date</th>

                                        <th className="fw-semibold text-secondary">Status</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {transactions.length > 0 ? (

                                        transactions.map(
                                            (
                                                transaction
                                            ) => (

                                                <tr
                                                    key={
                                                        transaction.id
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            transaction.id
                                                        }
                                                    </td>

                                                    <td className="fw-semibold">
                                                        {transaction.title}
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`badge ${transaction.type === "Credit"
                                                                ? "bg-success"
                                                                : "bg-danger"
                                                                }`}
                                                        >
                                                            {
                                                                transaction.type
                                                            }
                                                        </span>

                                                    </td>

                                                    <td
                                                        className={`fw-bold ${transaction.type === "Credit"
                                                            ? "text-success"
                                                            : "text-danger"
                                                            }`}
                                                    >
                                                        ₹
                                                        {
                                                            transaction.amount
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            transaction.reference
                                                        }
                                                    </td>

                                                    <td className="text-muted">
                                                        {new Date(
                                                            transaction.date
                                                        ).toLocaleDateString()}
                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`badge ${transaction.status === "Completed"
                                                                ? "bg-success"
                                                                : "bg-warning text-dark"
                                                                }`}
                                                        >
                                                            {
                                                                transaction.status
                                                            }
                                                        </span>

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
                                                No Transactions Found
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