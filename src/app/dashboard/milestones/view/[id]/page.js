"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ViewMilestonePage() {

    const params = useParams();

    const [milestone, setMilestone] =
        useState(null);

    useEffect(() => {

        fetchMilestone();

    }, []);

    const fetchMilestone =
        async () => {

            try {

                const response =
                    await axios.get(
                        `/api/milestones/${params.id}`
                    );

                setMilestone(
                    response.data.milestone
                );

            } catch (error) {

                console.log(error);

            }

        };

    if (!milestone) {

        return (
            <div className="text-center mt-5">
                Loading...
            </div>
        );

    }

    return (

        <div className="container-fluid">

            <div className="card shadow border-0">

                <div className="card-body">

                    <h2 className="fw-bold mb-4">

                        Milestone Details

                    </h2>

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>Project</th>
                                <td>
                                    {
                                        milestone.project
                                            ?.name
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Title</th>
                                <td>
                                    {
                                        milestone.title
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Description</th>
                                <td>
                                    {
                                        milestone.description
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Status</th>
                                <td>
                                    {
                                        milestone.status
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Progress</th>
                                <td>

                                    <div className="progress">

                                        <div
                                            className="progress-bar"
                                            style={{
                                                width:
                                                    `${milestone.percentage}%`,
                                            }}
                                        >

                                            {
                                                milestone.percentage
                                            }%

                                        </div>

                                    </div>

                                </td>
                            </tr>

                            <tr>
                                <th>Target Date</th>
                                <td>

                                    {milestone.targetDate
                                        ? new Date(
                                            milestone.targetDate
                                        ).toLocaleDateString()
                                        : "-"}

                                </td>
                            </tr>

                            <tr>
                                <th>Completed Date</th>
                                <td>

                                    {milestone.completedDate
                                        ? new Date(
                                            milestone.completedDate
                                        ).toLocaleDateString()
                                        : "-"}

                                </td>
                            </tr>

                            <tr>
                                <th>Created At</th>
                                <td>

                                    {new Date(
                                        milestone.createdAt
                                    ).toLocaleString()}

                                </td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}