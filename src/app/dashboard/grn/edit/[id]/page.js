"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

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

                alert(
                    response.data.message
                );

                router.push(
                    "/dashboard/grn"
                );

            } catch (error) {

                console.log(error);

                alert(
                    error?.response?.data
                        ?.message ||
                    "Failed to update GRN"
                );

            } finally {

                setLoading(false);

            }

        };

    if (!grn) {

        return (

            <div className="container-fluid">

                Loading...

            </div>

        );

    }

    return (

        <div className="container-fluid">

            <div className="card border-0 shadow rounded-4">

                <div className="card-header bg-warning">

                    <h3 className="mb-0">

                        Edit GRN

                    </h3>

                </div>

                <div className="card-body">

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    GRN Number

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        grn.grnNumber
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Vendor

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        grn.vendor
                                            ?.companyName || ""
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Project

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        grn.project
                                            ?.name || ""
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Purchase Order

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        grn.purchaseOrderId
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Ordered Qty

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        grn.purchaseorder
                                            ?.quantity || 0
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Received Qty

                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    name="receivedQty"
                                    className="form-control"
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

                                <label className="form-label">

                                    Pending Qty

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        grn.pendingQty || 0
                                    }
                                    readOnly
                                />

                            </div>

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

                                <label className="form-label">

                                    Remarks

                                </label>

                                <textarea
                                    rows="4"
                                    name="remarks"
                                    className="form-control"
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
                                className="btn btn-warning"
                                disabled={loading}
                            >

                                {loading
                                    ? "Updating..."
                                    : "Update GRN"}

                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
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