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

            <div className="container-fluid">

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

            <div className="container-fluid">

                <div className="card border-0 shadow-sm rounded-4">

                    <div className="card-body">

                        GRN not found

                    </div>

                </div>

            </div>

        );

    }

    return (

        <div className="container-fluid">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">
                        GRN Details
                    </h2>

                    <p className="text-muted">
                        View Goods Receipt Note
                    </p>

                </div>

                <div className="d-flex gap-2">

                    <Link
                        href={`/dashboard/grn/edit/${grn.id}`}
                        className="btn btn-warning"
                    >
                        Edit
                    </Link>

                    <Link
                        href="/dashboard/grn"
                        className="btn btn-secondary"
                    >
                        Back
                    </Link>

                </div>

            </div>

            {/* DETAILS */}

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">
                                GRN Number
                            </label>

                            <div>
                                {grn.grnNumber}
                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">
                                Status
                            </label>

                            <div>

                                <span className="badge bg-success">

                                    {grn.status}

                                </span>

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">
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

                            <label className="fw-bold">
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

                            <label className="fw-bold">
                                Purchase Order ID
                            </label>

                            <div>

                                {
                                    grn.purchaseOrderId
                                }

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">
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

                            <label className="fw-bold">
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

                            <label className="fw-bold">
                                Received Qty
                            </label>

                            <div>

                                {
                                    grn.receivedQty
                                }

                            </div>

                        </div>

                        <div className="col-md-4 mb-3">

                            <label className="fw-bold">
                                Pending Qty
                            </label>

                            <div>

                                {
                                    grn.pendingQty
                                }

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">
                                Received Date
                            </label>

                            <div>

                                {new Date(
                                    grn.receivedDate
                                ).toLocaleDateString()}

                            </div>

                        </div>

                        <div className="col-md-12 mb-3">

                            <label className="fw-bold">
                                Remarks
                            </label>

                            <div>

                                {
                                    grn.remarks ||
                                    "-"
                                }

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}