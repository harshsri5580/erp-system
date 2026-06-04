"use client";

import { useEffect, useState } from "react";
import axios from "axios";

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

    return (

        <div className="container-fluid">

            {/* HEADER */}

            <div className="mb-4">

                <h2 className="page-title">
                    Transactions
                </h2>

                <p className="text-muted mb-0">
                    Complete financial activity
                </p>

            </div>

            {/* STATS */}

            <div className="row mb-4">

                {/* CREDIT */}

                <div className="col-md-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Total Credit
                            </h6>

                            <h2 className="fw-bold text-success">
                                ₹{totalCredit}
                            </h2>

                        </div>

                    </div>

                </div>

                {/* DEBIT */}

                <div className="col-md-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Total Debit
                            </h6>

                            <h2 className="fw-bold text-danger">
                                ₹{totalDebit}
                            </h2>

                        </div>

                    </div>

                </div>

                {/* BALANCE */}

                <div className="col-md-4">

                    <div className="card shadow border-0 rounded-4">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Net Balance
                            </h6>

                            <h2 className="fw-bold text-primary">
                                ₹
                                {totalCredit -
                                    totalDebit}
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

                                        <th>Type</th>

                                        <th>Amount</th>

                                        <th>Reference</th>

                                        <th>Date</th>

                                        <th>Status</th>

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

                                                    <td>
                                                        {
                                                            transaction.title
                                                        }
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

                                                    <td>
                                                        {
                                                            transaction.date
                                                        }
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