"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ViewInvoicePage() {

    const { id } = useParams();

    const [invoice, setInvoice] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const fetchInvoice = async () => {

        try {

            const response = await axios.get(
                `/api/invoices/${id}`
            );

            setInvoice(response.data.invoice);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        fetchInvoice();

    }, []);

    if (loading) {

        return <h3>Loading...</h3>;
    }

    if (!invoice) {

        return <h3>Invoice not found</h3>;
    }

    return (

        <div className="container-fluid">

            <div className="card shadow border-0 rounded-4">

                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">

                    <h3>
                        Invoice Details
                    </h3>

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

                </div>

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Invoice Number
                            </h6>

                            <h5>
                                {invoice.invoiceNumber}
                            </h5>

                        </div>

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Client
                            </h6>

                            <h5>
                                {invoice.client?.companyName}
                            </h5>

                        </div>

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Project
                            </h6>

                            <h5>
                                {invoice.project?.name}
                            </h5>

                        </div>

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Amount
                            </h6>

                            <h5>
                                ₹{invoice.amount}
                            </h5>

                        </div>

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                GST
                            </h6>

                            <h5>
                                ₹{invoice.gst || 0}
                            </h5>

                        </div>

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Total Amount
                            </h6>

                            <h4 className="fw-bold">
                                ₹{invoice.totalAmount}
                            </h4>

                        </div>

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Issue Date
                            </h6>

                            <p>
                                {invoice.issueDate}
                            </p>

                        </div>

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Due Date
                            </h6>

                            <p>
                                {invoice.dueDate}
                            </p>

                        </div>

                        <div className="col-md-12 mb-4">

                            <h6 className="text-muted">
                                Notes
                            </h6>

                            <p>
                                {invoice.notes ||
                                    "No notes available"}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}
