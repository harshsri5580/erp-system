"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ProgressBillingPage() {

    const [billings, setBillings] =
        useState([]);

    useEffect(() => {

        fetchBillings();

    }, []);

    const fetchBillings =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/progress-billing"
                    );

                setBillings(
                    response.data.progressBillings || []
                );

            } catch (error) {

                console.log(error);

            }

        };

    const handleDelete =
        async (id) => {

            if (
                !confirm(
                    "Delete Progress Billing?"
                )
            )
                return;

            try {

                await axios.delete(
                    `/api/progress-billing/${id}`
                );

                fetchBillings();

            } catch (error) {

                console.log(error);

            }

        };

    return (

        <div className="container-fluid">

            <div className="d-flex justify-content-between mb-4">

                <h2 className="page-title">
                    Progress Billing
                </h2>

                <Link
                    href="/dashboard/progress-billing/add"
                    className="btn btn-dark"
                >

                    Add Billing

                </Link>

            </div>

            <div className="card">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table table-bordered">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Billing No</th>

                                    <th>Project</th>

                                    <th>Milestone</th>

                                    <th>Current Bill</th>

                                    <th>Total Billed</th>

                                    <th>Balance</th>

                                    <th>Status</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {billings.map(
                                    (item) => (

                                        <tr
                                            key={item.id}
                                        >

                                            <td>
                                                {item.id}
                                            </td>

                                            <td>
                                                {
                                                    item.billingNumber
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.project?.name
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.milestone?.title
                                                }
                                            </td>

                                            <td>
                                                ₹
                                                {
                                                    item.currentBillAmount
                                                }
                                            </td>

                                            <td>
                                                ₹
                                                {
                                                    item.totalBilled
                                                }
                                            </td>

                                            <td>
                                                ₹
                                                {
                                                    item.balanceAmount
                                                }
                                            </td>

                                            <td>
                                                {
                                                    item.status
                                                }
                                            </td>

                                            <td>

                                                <div className="d-flex gap-2">

                                                    <Link
                                                        href={`/dashboard/progress-billing/view/${item.id}`}
                                                        className="btn btn-info btn-sm"
                                                    >
                                                        View
                                                    </Link>

                                                    <Link
                                                        href={`/dashboard/progress-billing/edit/${item.id}`}
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