"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import {
    useParams,
    useRouter,
} from "next/navigation";

export default function EditPaymentPage() {

    const { id } = useParams();

    const router = useRouter();

    const [invoices, setInvoices] =
        useState([]);

    const [clients, setClients] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [fetching, setFetching] =
        useState(true);

    const [formData, setFormData] =
        useState({

            invoiceId: "",

            clientId: "",

            amount: "",

            paymentMethod: "Cash",

            paymentDate: "",

            status: "Completed",

            notes: "",

        });

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

                const payment =
                    response.data.payment;

                setFormData({

                    invoiceId:
                        payment.invoiceId,

                    clientId:
                        payment.clientId,

                    amount:
                        payment.amount,

                    paymentMethod:
                        payment.paymentMethod,

                    paymentDate:
                        payment.paymentDate,

                    status:
                        payment.status,

                    notes:
                        payment.notes || "",

                });

            } catch (error) {

                console.log(error);

            } finally {

                setFetching(false);
            }
        };

    // ======================
    // FETCH INVOICES
    // ======================

    const fetchInvoices =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/invoices"
                    );

                setInvoices(
                    response.data.invoices
                );

            } catch (error) {

                console.log(error);
            }
        };

    // ======================
    // FETCH CLIENTS
    // ======================

    const fetchClients =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/clients"
                    );

                setClients(
                    response.data.clients
                );

            } catch (error) {

                console.log(error);
            }
        };

    useEffect(() => {

        fetchPayment();

        fetchInvoices();

        fetchClients();

    }, []);

    // ======================
    // HANDLE CHANGE
    // ======================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]:
                e.target.value,

        });
    };

    // ======================
    // UPDATE PAYMENT
    // ======================

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                const response =
                    await axios.put(
                        `/api/payments/${id}`,
                        formData
                    );

                alert(
                    response.data.message
                );

                router.push(
                    "/dashboard/payments"
                );

            } catch (error) {

                console.log(error);

                alert(
                    error?.response?.data
                        ?.message ||
                    "Something went wrong"
                );

            } finally {

                setLoading(false);
            }
        };

    if (fetching) {

        return (
            <h4>
                Loading...
            </h4>
        );
    }

    return (

        <div className="container-fluid">

            <div className="card shadow border-0 rounded-4">

                {/* HEADER */}

                <div className="card-header bg-dark text-white">

                    <h3>
                        Edit Payment
                    </h3>

                </div>

                {/* BODY */}

                <div className="card-body">

                    <form
                        onSubmit={handleSubmit}
                    >

                        <div className="row">

                            {/* INVOICE */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Invoice
                                </label>

                                <select
                                    name="invoiceId"
                                    className="form-select"
                                    value={
                                        formData.invoiceId
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Invoice
                                    </option>

                                    {invoices.map(
                                        (invoice) => (

                                            <option
                                                key={
                                                    invoice.id
                                                }
                                                value={
                                                    invoice.id
                                                }
                                            >
                                                {
                                                    invoice.invoiceNumber
                                                }
                                            </option>
                                        )
                                    )}

                                </select>

                            </div>

                            {/* CLIENT */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Client
                                </label>

                                <select
                                    name="clientId"
                                    className="form-select"
                                    value={
                                        formData.clientId
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Client
                                    </option>

                                    {clients.map(
                                        (client) => (

                                            <option
                                                key={
                                                    client.id
                                                }
                                                value={
                                                    client.id
                                                }
                                            >
                                                {
                                                    client.companyName
                                                }
                                            </option>
                                        )
                                    )}

                                </select>

                            </div>

                            {/* AMOUNT */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    name="amount"
                                    className="form-control"
                                    value={
                                        formData.amount
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            {/* PAYMENT METHOD */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Payment Method
                                </label>

                                <select
                                    name="paymentMethod"
                                    className="form-select"
                                    value={
                                        formData.paymentMethod
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="Cash">
                                        Cash
                                    </option>

                                    <option value="Bank Transfer">
                                        Bank Transfer
                                    </option>

                                    <option value="UPI">
                                        UPI
                                    </option>

                                    <option value="Cheque">
                                        Cheque
                                    </option>

                                </select>

                            </div>

                            {/* PAYMENT DATE */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Payment Date
                                </label>

                                <input
                                    type="date"
                                    name="paymentDate"
                                    className="form-control"
                                    value={
                                        formData.paymentDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            {/* STATUS */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    className="form-select"
                                    value={
                                        formData.status
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="Completed">
                                        Completed
                                    </option>

                                    <option value="Pending">
                                        Pending
                                    </option>

                                </select>

                            </div>

                            {/* NOTES */}

                            <div className="col-md-12 mb-3">

                                <label className="form-label">
                                    Notes
                                </label>

                                <textarea
                                    name="notes"
                                    rows="4"
                                    className="form-control"
                                    value={
                                        formData.notes
                                    }
                                    onChange={
                                        handleChange
                                    }
                                ></textarea>

                            </div>

                        </div>

                        {/* BUTTON */}

                        <button
                            type="submit"
                            className="btn btn-dark"
                            disabled={loading}
                        >

                            {loading
                                ? "Updating..."
                                : "Update Payment"}

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}