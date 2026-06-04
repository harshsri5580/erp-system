"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

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

                <div className="text-center mt-5">

                    Loading...

                </div>

            </div>

        );

    }

    if (!incident) {

        return (

            <div className="container-fluid">

                <div className="alert alert-danger">

                    Incident not found

                </div>

            </div>

        );

    }

    return (

        <div className="container-fluid">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">

                        Incident Details

                    </h2>

                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">

                                Incident Number

                            </label>

                            <div>

                                {incident.incidentNumber}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">

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

                            <label className="fw-bold">

                                Project

                            </label>

                            <div>

                                {incident.project?.name || "-"}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">

                                Reported By

                            </label>

                            <div>

                                {incident.user?.name || "-"}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">

                                Related Inspection

                            </label>

                            <div>

                                {incident.inspection
                                    ?.inspectionNumber || "-"}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">

                                Incident Type

                            </label>

                            <div>

                                {incident.incidentType || "-"}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">

                                Severity

                            </label>

                            <div>

                                <span
                                    className={`badge ${incident.severity ===
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

                            <label className="fw-bold">

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

                            <label className="fw-bold">

                                Title

                            </label>

                            <div>

                                {incident.title || "-"}

                            </div>

                        </div>

                        <div className="col-md-12 mb-3">

                            <label className="fw-bold">

                                Location

                            </label>

                            <div>

                                {incident.location || "-"}

                            </div>

                        </div>

                        <div className="col-md-12 mb-3">

                            <label className="fw-bold">

                                Description

                            </label>

                            <div
                                className="border rounded p-3 bg-light"
                                style={{
                                    whiteSpace:
                                        "pre-wrap",
                                }}
                            >

                                {incident.description || "-"}

                            </div>

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="fw-bold">

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

                            <label className="fw-bold">

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