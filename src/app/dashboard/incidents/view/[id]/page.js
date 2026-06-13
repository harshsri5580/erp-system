"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Link from "next/link";

import {
    ShieldAlert,
    ArrowLeft,
    Pencil,
    Calendar,
    User,
    MapPin,
    AlertTriangle,
} from "lucide-react";
export default function ViewIncidentPage() {

    const params =
        useParams();

    const [incident, setIncident] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchIncident();

    }, []);

    const fetchIncident =
        async () => {

            try {

                const res =
                    await axios.get(
                        `/api/incidents/${params.id}`
                    );

                setIncident(
                    res.data.incident
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

    if (!incident) {

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

                        <AlertTriangle
                            size={50}
                            className="text-danger mb-3"
                        />

                        <h5>
                            Incident Not Found
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
                        Incident Details
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#6B7280",
                        }}
                    >
                        View complete incident information
                    </p>

                </div>

                <div className="d-flex gap-2">

                    <Link
                        href={`/dashboard/incidents/edit/${incident.id}`}
                        className="btn btn-dark rounded-3 d-flex align-items-center gap-2"
                    >
                        <Pencil size={16} />
                        Edit
                    </Link>

                    <Link
                        href="/dashboard/incidents"
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
                                className="p-4 rounded-4 h-100"
                                style={{
                                    background: "#F8FAFC",
                                }}
                            >

                                <Calendar
                                    size={22}
                                    className="mb-2 text-primary"
                                />

                                <div className="text-muted small">
                                    Incident Date
                                </div>

                                <h6 className="fw-bold mb-0">

                                    {incident.incidentDate
                                        ? new Date(
                                            incident.incidentDate
                                        ).toLocaleDateString()
                                        : "-"}

                                </h6>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div
                                className="p-4 rounded-4 h-100"
                                style={{
                                    background: "#F8FAFC",
                                }}
                            >

                                <User
                                    size={22}
                                    className="mb-2 text-success"
                                />

                                <div className="text-muted small">
                                    Reported By
                                </div>

                                <h6 className="fw-bold mb-0">
                                    {incident.user?.name || "-"}
                                </h6>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div
                                className="p-4 rounded-4 h-100"
                                style={{
                                    background: "#F8FAFC",
                                }}
                            >

                                <MapPin
                                    size={22}
                                    className="mb-2 text-danger"
                                />

                                <div className="text-muted small">
                                    Location
                                </div>

                                <h6 className="fw-bold mb-0">
                                    {incident.location || "-"}
                                </h6>

                            </div>

                        </div>

                    </div>
                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Incident Number

                            </label>

                            <div>

                                {incident.incidentNumber}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Incident Date

                            </label>

                            <div>

                                {incident.incidentDate
                                    ? new Date(
                                        incident.incidentDate
                                    ).toLocaleDateString()
                                    : "-"}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Project

                            </label>

                            <div>

                                {incident.project?.name || "-"}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Reported By

                            </label>

                            <div>

                                {incident.user?.name || "-"}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Related Inspection

                            </label>

                            <div>

                                {incident.inspection
                                    ?.inspectionNumber || "-"}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Incident Type

                            </label>

                            <div>

                                {incident.incidentType || "-"}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Severity

                            </label>

                            <div>

                                <span
                                    className={`badge px-3 py-2 ${incident.severity ===
                                        "Critical"
                                        ? "bg-danger"
                                        : incident.severity ===
                                            "High"
                                            ? "bg-warning text-dark"
                                            : incident.severity ===
                                                "Medium"
                                                ? "bg-info"
                                                : "bg-success"
                                        }`}
                                >

                                    {incident.severity}

                                </span>

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Status

                            </label>

                            <div>

                                <span
                                    className={`badge ${incident.status ===
                                        "Closed"
                                        ? "bg-success"
                                        : incident.status ===
                                            "In Progress"
                                            ? "bg-warning text-dark"
                                            : "bg-danger"
                                        }`}
                                >

                                    {incident.status}

                                </span>

                            </div>

                        </div>

                        <div className="col-md-12 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Title

                            </label>

                            <div>

                                {incident.title || "-"}

                            </div>

                        </div>

                        <div className="col-md-12 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Location

                            </label>

                            <div>

                                {incident.location || "-"}

                            </div>

                        </div>

                        <div className="col-md-12 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Description

                            </label>

                            <div
                                className="border rounded p-3 bg-light"
                                style={{
                                    whiteSpace:
                                        "pre-wrap",
                                    background: "#F8FAFC",
                                }}
                            >

                                {incident.description || "-"}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Created At

                            </label>

                            <div>

                                {incident.createdAt
                                    ? new Date(
                                        incident.createdAt
                                    ).toLocaleString()
                                    : "-"}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-semibold text-muted small text-uppercase">

                                Last Updated

                            </label>

                            <div>

                                {incident.updatedAt
                                    ? new Date(
                                        incident.updatedAt
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