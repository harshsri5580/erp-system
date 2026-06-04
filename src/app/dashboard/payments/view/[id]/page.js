"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import { useParams } from "next/navigation";

export default function ViewPaymentPage() {

    const { id } = useParams();

    const [payment, setPayment] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    // ======================
    // FETCH PAYMENT
    // ======================

    const fetchPayment =
        async () => {

            try {

                const response =
                    await axios.get(
                        `/api/payments/${id}`
                    );

                setPayment(
                    response.data.payment
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);
            }
        };

    useEffect(() => {

        fetchPayment();

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
    // NO PAYMENT
    // ======================

    if (!payment) {

        return (
            <h4>
                Payment not found
            </h4>
        );
    }

    return (

        <div className="container-fluid">

            <div className="card shadow border-0 rounded-4">

                {/* HEADER */}

                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">

                    <h3 className="mb-0">
                        Payment Details
                    </h3>

                    <span
                        className={`badge ${payment.status === "Completed"
                            ? "bg-success"
                            : "bg-warning text-dark"
                            }`}
                    >
                        {payment.status}
                    </span>

                </div>

                {/* BODY */}

                <div className="card-body">

                    <div className="row">

                        {/* INVOICE */}

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Invoice Number
                            </h6>

                            <h5>
                                {
                                    payment.invoice
                                        ?.invoiceNumber
                                }
                            </h5>

                        </div>

                        {/* CLIENT */}

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Client
                            </h6>

                            <h5>
                                {
                                    payment.client
                                        ?.companyName
                                }
                            </h5>

                        </div>

                        {/* AMOUNT */}

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Amount
                            </h6>

                            <h4 className="text-success fw-bold">
                                ₹{payment.amount}
                            </h4>

                        </div>

                        {/* METHOD */}

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Payment Method
                            </h6>

                            <h5>
                                {
                                    payment.paymentMethod
                                }
                            </h5>

                        </div>

                        {/* DATE */}

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Payment Date
                            </h6>

                            <h5>
                                {
                                    payment.paymentDate
                                }
                            </h5>

                        </div>

                        {/* STATUS */}

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Status
                            </h6>

                            <span
                                className={`badge fs-6 ${payment.status === "Completed"
                                    ? "bg-success"
                                    : "bg-warning text-dark"
                                    }`}
                            >
                                {payment.status}
                            </span>

                        </div>

                        {/* NOTES */}

                        <div className="col-md-12 mb-4">

                            <h6 className="text-muted">
                                Notes
                            </h6>

                            <p>

                                {payment.notes ||

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
                                    payment.createdAt
                                ).toLocaleString()}

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}