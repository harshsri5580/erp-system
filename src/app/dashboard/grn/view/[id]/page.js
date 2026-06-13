"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function ViewGRNPage() {

    const params =
        useParams();

    const [grn, setGrn] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

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

                setGrn(
                    response.data.grn
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

    useEffect(() => {

        if (params.id) {

            fetchGRN();

        }

    }, [params.id]);

    if (loading) {

        return (

            <div className="container-fluid px-4 py-3">

                <div className="card border-0 shadow-sm rounded-4">

                    <div className="card-body">

                        Loading...

                    </div>

                </div>

            </div>

        );

    }

    if (!grn) {

        return (

            <div className="container-fluid px-4 py-3">

                <div className="card border-0 shadow-sm rounded-4">

                    <div className="card-body">

                        GRN not found

                    </div>

                </div>

            </div>

        );

    }

    return (

        <div className="container-fluid px-4 py-3">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2
                        className="fw-bold mb-1"
                        style={{ color: "#111827" }}
                    >
                        GRN Details
                    </h2>

                    <p
                        className="mb-0"
                        style={{ color: "#6B7280" }}
                    >
                        View goods receipt note information
                    </p>

                </div>

                <div className="d-flex gap-2">

                    <Link
                        href={`/dashboard/grn/edit/${grn.id}`}
                        className="btn btn-dark px-4 rounded-3"
                    >
                        Edit
                    </Link>

                    <Link
                        href="/dashboard/grn"
                        className="btn btn-outline-secondary px-4 rounded-3"
                    >
                        Back
                    </Link>

                </div>

            </div>

            {/* DETAILS */}

            <div
                className="card border-0 rounded-4"
                style={{
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
                }}
            >


                <div className="card-body">

                    <div
                        className="p-4 rounded-4 mb-4"
                        style={{
                            background: "#F8FAFC",
                            border: "1px solid #E5E7EB",
                        }}
                    >
                        <h6 className="fw-bold mb-0">
                            Goods Receipt Information
                        </h6>
                    </div>
                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">
                                GRN Number
                            </label>

                            <div>
                                {grn.grnNumber}
                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">
                                Status
                            </label>

                            <div>

                                <span
                                    className={`badge px-3 py-2 ${grn.status === "Approved"
                                        ? "bg-success"
                                        : grn.status === "Verified"
                                            ? "bg-primary"
                                            : "bg-warning text-dark"
                                        }`}
                                >

                                    {grn.status}

                                </span>

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">
                                Vendor
                            </label>

                            <div>

                                {
                                    grn.vendor
                                        ?.companyName
                                }

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">
                                Project
                            </label>

                            <div>

                                {
                                    grn.project
                                        ?.name
                                }

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">
                                Purchase Order ID
                            </label>

                            <div>

                                {
                                    grn.purchaseOrderId
                                }

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">
                                BOQ Item
                            </label>

                            <div>

                                {
                                    grn.purchaseorder
                                        ?.boq
                                        ?.itemName
                                }

                            </div>

                        </div>

                        <div className="col-md-4 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">
                                Ordered Qty
                            </label>

                            <div>

                                {
                                    grn.purchaseorder
                                        ?.quantity
                                }

                            </div>

                        </div>

                        <div className="col-md-4 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">
                                Received Qty
                            </label>

                            <div>

                                {
                                    grn.receivedQty
                                }

                            </div>

                        </div>

                        <div className="col-md-4 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">
                                Pending Qty
                            </label>

                            <div>

                                {
                                    grn.pendingQty
                                }

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">
                                Received Date
                            </label>

                            <div>

                                {new Date(
                                    grn.receivedDate
                                ).toLocaleDateString()}

                            </div>

                        </div>

                        <div className="col-md-12 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">
                                Remarks
                            </label>

                            <div
                                className="p-3 rounded-3 mt-2"
                                style={{
                                    background: "#F9FAFB",
                                    border: "1px solid #E5E7EB",
                                }}
                            >
                                {grn.remarks || "No remarks available"}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}