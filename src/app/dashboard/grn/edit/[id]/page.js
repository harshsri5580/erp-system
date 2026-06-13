"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
export default function EditGRNPage() {

    const params =
        useParams();

    const router =
        useRouter();

    const [loading, setLoading] =
        useState(false);

    const [grn, setGrn] =
        useState(null);

    const [formData, setFormData] =
        useState({

            receivedQty: "",

            remarks: "",

            status: "Received",

        });

    // ======================
    // FETCH GRN
    // ======================

    const fetchGRN =
        async () => {

            try {

                const response =
                    await axios.get(
                        `/api/grn/${params.id}`
                    );

                const data =
                    response.data.grn;

                setGrn(data);

                setFormData({

                    receivedQty:
                        data.receivedQty || "",

                    remarks:
                        data.remarks || "",

                    status:
                        data.status || "Received",

                });

            } catch (error) {

                console.log(error);

            }

        };

    useEffect(() => {

        if (params.id) {

            fetchGRN();

        }

    }, [params.id]);

    // ======================
    // HANDLE CHANGE
    // ======================

    const handleChange =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value,

            });

        };

    // ======================
    // UPDATE GRN
    // ======================

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                const response =
                    await axios.put(
                        `/api/grn/${params.id}`,
                        formData
                    );

                toast.success("GRN updated successfully");

                router.push(
                    "/dashboard/grn"
                );

            } catch (error) {

                console.log(error);

                toast.error(
                    error?.response?.data?.message ||
                    "Failed to update GRN"
                );

            } finally {

                setLoading(false);

            }

        };

    if (!grn) {

        return (

            <div className="container-fluid px-4 py-3">

                Loading...

            </div>

        );

    }

    return (

        <div className="container-fluid px-4 py-3">

            <div
                className="card border-0 rounded-4"
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
                }}
            >

                <div className="card-body border-bottom">
                    <h2
                        className="fw-bold mb-1"
                        style={{ color: "#111827" }}
                    >
                        Edit GRN
                    </h2>

                    <p
                        className="mb-0"
                        style={{ color: "#6B7280" }}
                    >
                        Update goods receipt details
                    </p>
                </div>

                <div className="card-body">

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    GRN Number

                                </label>

                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    value={
                                        grn.grnNumber
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Vendor

                                </label>

                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    value={
                                        grn.vendor
                                            ?.companyName || ""
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Project

                                </label>

                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    value={
                                        grn.project
                                            ?.name || ""
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Purchase Order

                                </label>

                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    value={
                                        grn.purchaseOrderId
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Ordered Qty

                                </label>

                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    value={
                                        grn.purchaseorder
                                            ?.quantity || 0
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Received Qty

                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    name="receivedQty"
                                    className="form-control rounded-3"
                                    value={
                                        formData.receivedQty
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Pending Qty

                                </label>

                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    value={
                                        grn.pendingQty || 0
                                    }
                                    readOnly
                                />

                            </div>

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

                                    <option value="Received">
                                        Received
                                    </option>

                                    <option value="Verified">
                                        Verified
                                    </option>

                                    <option value="Approved">
                                        Approved
                                    </option>

                                </select>

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Remarks

                                </label>

                                <textarea
                                    rows="4"
                                    name="remarks"
                                    className="form-control rounded-3"
                                    value={
                                        formData.remarks
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>

                        <div className="d-flex gap-2">

                            <button
                                type="submit"
                                className="btn btn-dark px-4"
                                disabled={loading}
                            >

                                {loading
                                    ? "Updating..."
                                    : "Update GRN"}

                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4"
                                onClick={() =>
                                    router.push(
                                        "/dashboard/grn"
                                    )
                                }
                            >

                                Cancel

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}