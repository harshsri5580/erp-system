"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function InvoicesPage() {

    const [invoices, setInvoices] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchInvoices = async () => {

        try {

            const response = await axios.get(
                "/api/invoices"
            );

            setInvoices(response.data.invoices);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchInvoices();

    }, []);

    return (

        <div className="container-fluid">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="page-title">
                        Invoice Management
                    </h2>

                    <p className="text-muted mb-0">
                        Manage all invoices
                    </p>

                </div>

                <Link
                    href="/dashboard/invoices/add"
                    className="btn btn-dark"
                >
                    Create Invoice
                </Link>

            </div>

            {/* TABLE */}

            <div className="card shadow border-0 rounded-4">

                <div className="card-body">

                    {loading ? (

                        <h5>Loading...</h5>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-hover align-middle">

                                <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>
                                        <th>Invoice No</th>
                                        <th>Client</th>
                                        <th>Project</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Due Date</th>
                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {invoices.length > 0 ? (

                                        invoices.map((invoice) => (

                                            <tr key={invoice.id}>

                                                <td>{invoice.id}</td>

                                                <td>
                                                    {invoice.invoiceNumber}
                                                </td>

                                                <td>
                                                    {invoice.client?.companyName}
                                                </td>

                                                <td>
                                                    {invoice.project?.name}
                                                </td>

                                                <td>
                                                    ₹{invoice.totalAmount}
                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${invoice.status === "Paid"
                                                            ? "bg-success"
                                                            : invoice.status === "Overdue"
                                                                ? "bg-danger"
                                                                : "bg-warning text-dark"
                                                            }`}
                                                    >
                                                        {invoice.status}
                                                    </span>

                                                </td>

                                                <td>
                                                    {invoice.dueDate}
                                                </td>

                                                <td>

                                                    <div className="d-flex gap-2">

                                                        <Link
                                                            href={`/dashboard/invoices/view/${invoice.id}`}
                                                            className="btn btn-info btn-sm"
                                                        >
                                                            View
                                                        </Link>

                                                        <Link
                                                            href={`/dashboard/invoices/edit/${invoice.id}`}
                                                            className="btn btn-warning btn-sm"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={async () => {

                                                                const confirmDelete =
                                                                    window.confirm(
                                                                        "Delete this invoice?"
                                                                    );

                                                                if (!confirmDelete)
                                                                    return;

                                                                try {

                                                                    await axios.delete(
                                                                        `/api/invoices/${invoice.id}`
                                                                    );

                                                                    fetchInvoices();

                                                                } catch (error) {

                                                                    console.log(error);

                                                                    alert(
                                                                        "Failed to delete invoice"
                                                                    );
                                                                }
                                                            }}
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-center"
                                            >
                                                No Invoices Found
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
