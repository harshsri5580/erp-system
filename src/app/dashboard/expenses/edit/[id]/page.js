"use client";

import { useEffect, useState } from "react";

import axios from "axios";
import { Receipt, FileText } from "lucide-react";
import toast from "react-hot-toast";
import {
    useParams,
    useRouter,
} from "next/navigation";

export default function EditExpensePage() {

    const { id } = useParams();

    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    const [fetching, setFetching] =
        useState(true);

    const [formData, setFormData] =
        useState({

            title: "",

            category: "Material",

            amount: "",

            date: "",

            status: "Paid",

            notes: "",

        });

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

                const expense =
                    response.data.expense;

                setFormData({

                    title:
                        expense.title,

                    category:
                        expense.category,

                    amount:
                        expense.amount,

                    date:
                        expense.date,

                    status:
                        expense.status,

                    notes:
                        expense.notes || "",

                });

            } catch (error) {

                console.log(error);

            } finally {

                setFetching(false);
            }
        };

    useEffect(() => {

        fetchExpense();

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
    // UPDATE EXPENSE
    // ======================

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                const response =
                    await axios.put(
                        `/api/expenses/${id}`,
                        formData
                    );

                toast.success(
                    response.data.message ||
                    "Expense updated successfully"
                );

                setTimeout(() => {
                    router.push(
                        "/dashboard/expenses"
                    );
                }, 1000);
            } catch (error) {

                console.log(error);

                toast.error(
                    error?.response?.data?.message ||
                    "Something went wrong"
                );

            } finally {

                setLoading(false);
            }
        };

    if (fetching) {
        return (
            <div className="container-fluid px-4 py-5 text-center">
                <h5 className="text-muted">
                    Loading Expense...
                </h5>
            </div>
        );
    }

    return (

        <div className="container-fluid px-4 py-3">

            <div className="mb-4 pb-3 border-bottom">

                <h2
                    className="fw-bold mb-1"
                    style={{
                        color: "#111827",
                    }}
                >
                    Edit Expense
                </h2>

                <p
                    className="mb-0"
                    style={{
                        color: "#6B7280",
                    }}
                >
                    Update expense information and payment details
                </p>

            </div>

            <div
                className="card border-0 rounded-4"
                style={{
                    maxWidth: "1000px",
                    margin: "0 auto",
                    boxShadow: "0 10px 30px rgba(0,0,0,.06)",
                }}
            >

                {/* HEADER */}



                {/* BODY */}

                <div className="card-body">

                    <form
                        onSubmit={handleSubmit}
                    >

                        <div className="row">

                            {/* TITLE */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Expense Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    className="form-control rounded-3"
                                    value={
                                        formData.title
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            {/* CATEGORY */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    className="form-select rounded-3"
                                    value={
                                        formData.category
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="Material">
                                        Material
                                    </option>

                                    <option value="Salary">
                                        Salary
                                    </option>

                                    <option value="Transport">
                                        Transport
                                    </option>

                                    <option value="Office">
                                        Office
                                    </option>

                                    <option value="Fuel">
                                        Fuel
                                    </option>

                                </select>

                            </div>

                            {/* AMOUNT */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    name="amount"
                                    className="form-control rounded-3"
                                    value={
                                        formData.amount
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            {/* DATE */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Expense Date
                                </label>

                                <input
                                    type="date"
                                    name="date"
                                    className="form-control rounded-3"
                                    value={
                                        formData.date
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            {/* STATUS */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    className="form-select rounded-3"
                                    value={
                                        formData.status
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="Paid">
                                        Paid
                                    </option>

                                    <option value="Pending">
                                        Pending
                                    </option>

                                </select>

                            </div>

                            {/* NOTES */}

                            <div className="col-md-12 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Notes
                                </label>

                                <textarea
                                    name="notes"
                                    rows="4"
                                    className="form-control rounded-3"
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

                        <div className="d-flex gap-2">

                            <button
                                type="submit"
                                className="btn btn-dark px-4 rounded-3"
                                disabled={loading}
                            >
                                {loading
                                    ? "Updating..."
                                    : "Update Expense"}
                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4 rounded-3"
                                onClick={() =>
                                    router.push(
                                        "/dashboard/expenses"
                                    )
                                }
                            >
                                Back
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}