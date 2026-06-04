"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function MilestonesPage() {

    const [milestones, setMilestones] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const fetchMilestones =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/milestones"
                    );

                setMilestones(
                    response.data.milestones || []
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

    useEffect(() => {

        fetchMilestones();

    }, []);

    const handleDelete =
        async (id) => {

            const confirmDelete =
                confirm(
                    "Are you sure you want to delete this milestone?"
                );

            if (!confirmDelete)
                return;

            try {

                await axios.delete(
                    `/api/milestones/${id}`
                );

                alert(
                    "Milestone deleted successfully"
                );

                fetchMilestones();

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to delete milestone"
                );

            }

        };

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="page-title">
                    Milestones
                </h2>

                <Link
                    href="/dashboard/milestones/add"
                    className="btn btn-primary"
                >
                    Add Milestone
                </Link>

            </div>

            <div className="card shadow border-0">

                <div className="card-body">

                    {loading ? (

                        <div className="text-center py-5">

                            <div className="spinner-border text-primary"></div>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table className="table table-bordered table-hover">

                                <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>

                                        <th>Title</th>

                                        <th>Project</th>

                                        <th>Progress</th>

                                        <th>Status</th>

                                        <th>Target Date</th>

                                        <th width="280">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {milestones.length >
                                        0 ? (

                                        milestones.map(
                                            (
                                                milestone
                                            ) => (

                                                <tr
                                                    key={
                                                        milestone.id
                                                    }
                                                >

                                                    <td>
                                                        {
                                                            milestone.id
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            milestone.title
                                                        }
                                                    </td>

                                                    <td>
                                                        {
                                                            milestone
                                                                .project
                                                                ?.name
                                                        }
                                                    </td>

                                                    <td>

                                                        <div className="progress">

                                                            <div
                                                                className="progress-bar"
                                                                style={{
                                                                    width:
                                                                        `${milestone.percentage || 0}%`,
                                                                }}
                                                            >

                                                                {
                                                                    milestone.percentage || 0
                                                                }%

                                                            </div>

                                                        </div>

                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`badge ${milestone.status ===
                                                                "Completed"
                                                                ? "bg-success"
                                                                : milestone.status ===
                                                                    "Delayed"
                                                                    ? "bg-danger"
                                                                    : milestone.status ===
                                                                        "In Progress"
                                                                        ? "bg-primary"
                                                                        : "bg-warning text-dark"
                                                                }`}
                                                        >

                                                            {
                                                                milestone.status
                                                            }

                                                        </span>

                                                    </td>

                                                    <td>

                                                        {milestone.targetDate
                                                            ? new Date(
                                                                milestone.targetDate
                                                            ).toLocaleDateString()
                                                            : "-"}

                                                    </td>

                                                    <td>

                                                        <div className="d-flex gap-2">

                                                            <Link
                                                                href={`/dashboard/milestones/view/${milestone.id}`}
                                                                className="btn btn-info btn-sm text-white"
                                                            >
                                                                View
                                                            </Link>

                                                            <Link
                                                                href={`/dashboard/milestones/edit/${milestone.id}`}
                                                                className="btn btn-warning btn-sm"
                                                            >
                                                                Edit
                                                            </Link>

                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        milestone.id
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

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="text-center py-4"
                                            >

                                                No Milestones Found

                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </div>

    );

}