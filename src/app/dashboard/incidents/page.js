"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function IncidentsPage() {

    const [incidents, setIncidents] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        fetchIncidents();

    }, []);

    const fetchIncidents =
        async () => {

            try {

                const res =
                    await axios.get(
                        "/api/incidents"
                    );

                setIncidents(
                    res.data.incidents || []
                );

            } catch (error) {

                console.log(error);

            }

        };

    const handleDelete =
        async (id) => {

            const confirmDelete =
                confirm(
                    "Delete this incident?"
                );

            if (!confirmDelete)
                return;

            try {

                await axios.delete(
                    `/api/incidents/${id}`
                );

                fetchIncidents();

            } catch (error) {

                console.log(error);

            }

        };

    const filteredIncidents =
        incidents.filter(
            (item) =>
                item.incidentNumber
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.title
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.project?.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.user?.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||
                item.status
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="page-title">
                    Incidents
                </h2>

                <Link
                    href="/dashboard/incidents/add"
                    className="btn btn-primary"
                >

                    Add Incident

                </Link>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <div className="row mb-3">

                        <div className="col-md-4">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search Incident..."
                                value={
                                    search
                                }
                                onChange={(e) =>
                                    setSearch(
                                        e.target
                                            .value
                                    )
                                }
                            />

                        </div>

                    </div>

                    <div className="table-responsive">

                        <table className="table table-bordered table-hover">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Incident No</th>

                                    <th>Title</th>

                                    <th>Project</th>

                                    <th>Reported By</th>

                                    <th>Type</th>

                                    <th>Severity</th>

                                    <th>Status</th>

                                    <th width="250">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredIncidents
                                    .length ===
                                    0 ? (

                                    <tr>

                                        <td
                                            colSpan="9"
                                            className="text-center"
                                        >

                                            No incidents found

                                        </td>

                                    </tr>

                                ) : (

                                    filteredIncidents.map(
                                        (
                                            item
                                        ) => (

                                            <tr
                                                key={
                                                    item.id
                                                }
                                            >

                                                <td>
                                                    {
                                                        item.id
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        item.incidentNumber
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        item.title
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        item
                                                            .project
                                                            ?.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        item
                                                            .user
                                                            ?.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        item.incidentType
                                                    }
                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${item.severity ===
                                                            "High"
                                                            ? "bg-danger"
                                                            : item.severity ===
                                                                "Medium"
                                                                ? "bg-warning text-dark"
                                                                : "bg-success"
                                                            }`}
                                                    >

                                                        {
                                                            item.severity
                                                        }

                                                    </span>

                                                </td>

                                                <td>

                                                    <span
                                                        className={`badge ${item.status ===
                                                            "Closed"
                                                            ? "bg-success"
                                                            : item.status ===
                                                                "In Progress"
                                                                ? "bg-warning text-dark"
                                                                : "bg-danger"
                                                            }`}
                                                    >

                                                        {
                                                            item.status
                                                        }

                                                    </span>

                                                </td>

                                                <td>

                                                    <div className="d-flex gap-2">

                                                        <Link
                                                            href={`/dashboard/incidents/view/${item.id}`}
                                                            className="btn btn-info btn-sm"
                                                        >

                                                            View

                                                        </Link>

                                                        <Link
                                                            href={`/dashboard/incidents/edit/${item.id}`}
                                                            className="btn btn-warning btn-sm"
                                                        >

                                                            Edit

                                                        </Link>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                        >

                                                            Delete

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}