"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ViewChangeOrderPage() {

    const params = useParams();

    const [changeOrder, setChangeOrder] =
        useState(null);

    useEffect(() => {

        fetchChangeOrder();

    }, []);

    const fetchChangeOrder =
        async () => {

            try {

                const response =
                    await axios.get(
                        `/api/change-orders/${params.id}`
                    );

                setChangeOrder(
                    response.data.changeOrder
                );

            } catch (error) {

                console.log(error);

            }

        };

    if (!changeOrder) {

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

                        Change Order Details

                    </h2>

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>CO Number</th>
                                <td>
                                    {changeOrder.coNumber}
                                </td>
                            </tr>

                            <tr>
                                <th>Project</th>
                                <td>
                                    {
                                        changeOrder.project
                                            ?.name
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Client</th>
                                <td>
                                    {
                                        changeOrder.client
                                            ?.companyName
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Raised By</th>
                                <td>
                                    {
                                        changeOrder.user
                                            ?.name
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Title</th>
                                <td>
                                    {changeOrder.title}
                                </td>
                            </tr>

                            <tr>
                                <th>Description</th>
                                <td>
                                    {
                                        changeOrder.description
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Reason</th>
                                <td>
                                    {
                                        changeOrder.reason
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Old Amount</th>
                                <td>
                                    ₹
                                    {changeOrder.oldAmount}
                                </td>
                            </tr>

                            <tr>
                                <th>New Amount</th>
                                <td>
                                    ₹
                                    {changeOrder.newAmount}
                                </td>
                            </tr>

                            <tr>
                                <th>Difference</th>
                                <td>
                                    ₹
                                    {
                                        changeOrder.differenceAmount
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Status</th>
                                <td>
                                    {
                                        changeOrder.status
                                    }
                                </td>
                            </tr>

                            <tr>
                                <th>Approved Date</th>
                                <td>

                                    {changeOrder.approvedDate
                                        ? new Date(
                                            changeOrder.approvedDate
                                        ).toLocaleDateString()
                                        : "-"}

                                </td>
                            </tr>

                            <tr>
                                <th>Created At</th>
                                <td>

                                    {new Date(
                                        changeOrder.createdAt
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