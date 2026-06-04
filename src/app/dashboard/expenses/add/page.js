"use client";

import { useState } from "react";

import axios from "axios";

import { useRouter } from "next/navigation";

export default function AddExpensePage() {

    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

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
    // SUBMIT
    // ======================

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                const response =
                    await axios.post(
                        "/api/expenses",
                        formData
                    );

                alert(
                    response.data.message
                );

                router.push(
                    "/dashboard/expenses"
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

    return (

        <div className="container-fluid">

            <div className="card shadow border-0 rounded-4">

                {/* HEADER */}

                <div className="card-header bg-dark text-white">

                    <h3>
                        Add Expense
                    </h3>

                </div>

                {/* BODY */}

                <div className="card-body">

                    <form
                        onSubmit={handleSubmit}
                    >

                        <div className="row">

                            {/* TITLE */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Expense Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
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

                                <label className="form-label">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    className="form-select"
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

                            {/* DATE */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Expense Date
                                </label>

                                <input
                                    type="date"
                                    name="date"
                                    className="form-control"
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
                                ? "Creating..."
                                : "Create Expense"}

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}