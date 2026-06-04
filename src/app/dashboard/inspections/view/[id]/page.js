"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ViewInspectionPage() {

    const params =
        useParams();

    const [inspection, setInspection] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchInspection();

    }, []);

    const fetchInspection =
        async () => {

            try {

                const response =
                    await axios.get(
                        `/api/inspections/${params.id}`
                    );

                setInspection(
                    response.data.inspection
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

    if (loading) {

        return (

            <div className="container-fluid">

                <div className="text-center mt-5">

                    Loading...

                </div>

            </div>

        );

    }

    if (!inspection) {

        return (

            <div className="container-fluid">

                <div className="alert alert-danger">

                    Inspection not found

                </div>

            </div>

        );

    }

    return (

        <div className="container-fluid">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">

                        Inspection Details

                    </h2>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">

                                Inspection Number

                            </label>

                            <div>

                                {inspection.inspectionNumber}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">

                                Inspection Date

                            </label>

                            <div>

                                {inspection.inspectionDate
                                    ? new Date(
                                        inspection.inspectionDate
                                    ).toLocaleDateString()
                                    : "-"}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">

                                Project

                            </label>

                            <div>

                                {inspection.project?.name}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">

                                Inspector

                            </label>

                            <div>

                                {inspection.user?.name}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">

                                Inspection Type

                            </label>

                            <div>

                                {inspection.inspectionType}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">

                                Status

                            </label>

                            <div>

                                <span
                                    className={`badge ${inspection.status === "Passed"
                                        ? "bg-success"
                                        : inspection.status === "Failed"
                                            ? "bg-danger"
                                            : inspection.status === "Closed"
                                                ? "bg-secondary"
                                                : "bg-warning text-dark"
                                        }`}
                                >

                                    {inspection.status}

                                </span>

                            </div>

                        </div>

                        <div className="col-md-12 mb-3">

                            <label className="fw-bold">

                                Location

                            </label>

                            <div>

                                {inspection.location || "-"}

                            </div>

                        </div>

                        <div className="col-md-12 mb-3">

                            <label className="fw-bold">

                                Checklist

                            </label>

                            <div
                                className="border rounded p-3 bg-light"
                                style={{
                                    whiteSpace:
                                        "pre-wrap",
                                }}
                            >

                                {inspection.checklist || "-"}

                            </div>

                        </div>

                        <div className="col-md-12 mb-3">

                            <label className="fw-bold">

                                Remarks

                            </label>

                            <div
                                className="border rounded p-3 bg-light"
                                style={{
                                    whiteSpace:
                                        "pre-wrap",
                                }}
                            >

                                {inspection.remarks || "-"}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">

                                Created At

                            </label>

                            <div>

                                {inspection.createdAt
                                    ? new Date(
                                        inspection.createdAt
                                    ).toLocaleString()
                                    : "-"}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">

                                Last Updated

                            </label>

                            <div>

                                {inspection.updatedAt
                                    ? new Date(
                                        inspection.updatedAt
                                    ).toLocaleString()
                                    : "-"}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}