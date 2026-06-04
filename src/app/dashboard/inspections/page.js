"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function InspectionsPage() {

    const [inspections, setInspections] =
        useState([]);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        fetchInspections();

    }, []);

    const fetchInspections =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/inspections"
                    );

                setInspections(
                    response.data
                        .inspections || []
                );

            } catch (error) {

                console.log(error);

            }

        };

    const handleDelete =
        async (id) => {

            const confirmDelete =
                confirm(
                    "Delete this inspection?"
                );

            if (!confirmDelete)
                return;

            try {

                await axios.delete(
                    `/api/inspections/${id}`
                );

                fetchInspections();

            } catch (error) {

                console.log(error);

            }

        };

    const filteredData =
        inspections.filter(
            (item) =>
                item.inspectionNumber
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

        <div className="page-title">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>
                    Inspections
                </h2>

                <Link
                    href="/dashboard/inspections/add"
                    className="btn btn-primary"
                >
                    Add Inspection
                </Link>

            </div>

            <div className="card shadow">

                <div className="card-body">

                    <div className="row mb-3">

                        <div className="col-md-4">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
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

                                    <th>Inspection No</th>

                                    <th>Project</th>

                                    <th>Inspector</th>

                                    <th>Type</th>

                                    <th>Date</th>

                                    <th>Status</th>

                                    <th width="220">
                                        Actions
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredData.map(
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
                                                    item.inspectionNumber
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
                                                    item.inspectionType
                                                }
                                            </td>

                                            <td>
                                                {item.inspectionDate
                                                    ? new Date(
                                                        item.inspectionDate
                                                    ).toLocaleDateString()
                                                    : "-"}
                                            </td>

                                            <td>
                                                {
                                                    item.status
                                                }
                                            </td>

                                            <td>

                                                <div className="d-flex gap-2">

                                                    <Link
                                                        href={`/dashboard/inspections/view/${item.id}`}
                                                        className="btn btn-info btn-sm"
                                                    >
                                                        View
                                                    </Link>

                                                    <Link
                                                        href={`/dashboard/inspections/edit/${item.id}`}
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
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}