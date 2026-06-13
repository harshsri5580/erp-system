"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
    ClipboardCheck,
    ArrowLeft,
    Pencil,
    Calendar,
    User,
    MapPin,
    ShieldCheck,
} from "lucide-react";
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

                <div className="text-center py-5">
                    <div
                        className="spinner-border text-dark"
                        role="status"
                    />
                </div>

            </div>

        );

    }

    if (!inspection) {

        return (

            <div className="container-fluid">
                <div
                    className="card border-0 rounded-4"
                    style={{
                        boxShadow:
                            "0 10px 30px rgba(0,0,0,.06)",
                    }}
                >
                    <div className="card-body text-center py-5">

                        <ClipboardCheck
                            size={50}
                            className="text-danger mb-3"
                        />

                        <h5>
                            Inspection Not Found
                        </h5>

                    </div>
                </div>

            </div>

        );

    }

    return (

        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2
                        className="fw-bold mb-1"
                        style={{
                            color: "#111827",
                        }}
                    >
                        Inspection Details
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#6B7280",
                        }}
                    >
                        View complete inspection information
                    </p>

                </div>

                <div className="d-flex gap-2">

                    <Link
                        href={`/dashboard/inspections/edit/${inspection.id}`}
                        className="btn btn-dark rounded-3 d-flex align-items-center gap-2"
                    >
                        <Pencil size={16} />
                        Edit
                    </Link>

                    <Link
                        href="/dashboard/inspections"
                        className="btn btn-outline-secondary rounded-3 d-flex align-items-center gap-2"
                    >
                        <ArrowLeft size={16} />
                        Back
                    </Link>

                </div>

            </div>
            <div
                className="card border-0 rounded-4"
                style={{
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
                }}
            >

                <div className="card-body p-4 p-lg-5">
                    <div className="row mb-4">

                        <div className="col-md-4">

                            <div
                                className="p-4 rounded-4"
                                style={{
                                    background: "#F8FAFC",
                                }}
                            >

                                <Calendar
                                    size={22}
                                    className="text-primary mb-2"
                                />

                                <div className="text-muted small">
                                    Inspection Date
                                </div>

                                <h6 className="fw-bold mb-0">

                                    {inspection.inspectionDate
                                        ? new Date(
                                            inspection.inspectionDate
                                        ).toLocaleDateString()
                                        : "-"}

                                </h6>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div
                                className="p-4 rounded-4"
                                style={{
                                    background: "#F8FAFC",
                                }}
                            >

                                <User
                                    size={22}
                                    className="text-success mb-2"
                                />

                                <div className="text-muted small">
                                    Inspector
                                </div>

                                <h6 className="fw-bold mb-0">
                                    {inspection.user?.name || "-"}
                                </h6>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div
                                className="p-4 rounded-4"
                                style={{
                                    background: "#F8FAFC",
                                }}
                            >

                                <MapPin
                                    size={22}
                                    className="text-danger mb-2"
                                />

                                <div className="text-muted small">
                                    Location
                                </div>

                                <h6 className="fw-bold mb-0">
                                    {inspection.location || "-"}
                                </h6>

                            </div>

                        </div>

                    </div>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Inspection Number

                            </label>

                            <div
                                className="fw-bold"
                                style={{
                                    color: "#2563EB",
                                }}
                            >
                                {inspection.inspectionNumber}
                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

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

                            <label className="fw-semibold text-muted small text-uppercase">

                                Project

                            </label>

                            <div>

                                {inspection.project?.name}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Inspector

                            </label>

                            <div>

                                {inspection.user?.name}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Inspection Type

                            </label>

                            <div>

                                {inspection.inspectionType}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Status

                            </label>

                            <div>

                                <span
                                    className={`badge px-3 py-2 ${inspection.status === "Passed"
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

                            <label className="fw-semibold text-muted small text-uppercase">

                                Location

                            </label>

                            <div>

                                {inspection.location || "-"}

                            </div>

                        </div>

                        <div className="col-md-12 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Checklist

                            </label>

                            <div
                                className="border rounded-4 p-4"
                                style={{
                                    background: "#F8FAFC",
                                }}
                            >

                                {inspection.checklist || "-"}

                            </div>

                        </div>

                        <div className="col-md-12 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

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

                            <label className="fw-semibold text-muted small text-uppercase">

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

                            <label className="fw-semibold text-muted small text-uppercase">

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