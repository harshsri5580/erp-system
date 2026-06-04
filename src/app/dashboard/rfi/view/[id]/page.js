"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ViewRFIPage() {

    const params = useParams();

    const [rfi, setRfi] =
        useState(null);

    useEffect(() => {

        fetchRFI();

    }, []);

    const fetchRFI =
        async () => {

            const response =
                await axios.get(
                    `/api/rfi/${params.id}`
                );

            setRfi(
                response.data.rfi
            );

        };

    if (!rfi) {

        return (
            <div className="text-center mt-5">
                Loading...
            </div>
        );

    }

    return (

        <div className="container-fluid">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">

                        RFI Details

                    </h2>

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>RFI No</th>
                                <td>
                                    {rfi.rfiNumber}
                                </td>
                            </tr>

                            <tr>
                                <th>Project</th>
                                <td>
                                    {
                                        rfi.project
                                            ?.name
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Raised By</th>
                                <td>
                                    {
                                        rfi.user
                                            ?.name
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Title</th>
                                <td>
                                    {rfi.title}
                                </td>
                            </tr>

                            <tr>
                                <th>Description</th>
                                <td>
                                    {
                                        rfi.description
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Response</th>
                                <td>
                                    {
                                        rfi.response ||
                                        "-"
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Priority</th>
                                <td>
                                    {
                                        rfi.priority
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Status</th>
                                <td>
                                    {rfi.status}
                                </td>
                            </tr>

                            <tr>
                                <th>Due Date</th>
                                <td>

                                    {rfi.dueDate
                                        ? new Date(
                                            rfi.dueDate
                                        ).toLocaleDateString()
                                        : "-"}

                                </td>
                            </tr>

                            <tr>
                                <th>Closed Date</th>
                                <td>

                                    {rfi.closedDate
                                        ? new Date(
                                            rfi.closedDate
                                        ).toLocaleDateString()
                                        : "-"}

                                </td>
                            </tr>

                            <tr>
                                <th>Created</th>
                                <td>

                                    {new Date(
                                        rfi.createdAt
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