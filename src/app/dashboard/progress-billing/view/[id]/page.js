"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ViewProgressBillingPage() {

    const params = useParams();

    const [billing, setBilling] =
        useState(null);

    useEffect(() => {

        fetchBilling();

    }, []);

    const fetchBilling =
        async () => {

            try {

                const response =
                    await axios.get(
                        `/api/progress-billing/${params.id}`
                    );

                setBilling(
                    response.data.progressBilling
                );

            } catch (error) {

                console.log(error);

            }

        };

    if (!billing) {

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
                        Progress Billing Details
                    </h2>

                    <table className="table table-bordered">

                        <tbody>

                            <tr>
                                <th>Billing Number</th>
                                <td>{billing.billingNumber}</td>
                            </tr>

                            <tr>
                                <th>Project</th>
                                <td>{billing.project?.name}</td>
                            </tr>

                            <tr>
                                <th>Client</th>
                                <td>{billing.client?.companyName}</td>
                            </tr>

                            <tr>
                                <th>Milestone</th>
                                <td>{billing.milestone?.title}</td>
                            </tr>

                            <tr>
                                <th>Raised By</th>
                                <td>{billing.user?.name}</td>
                            </tr>

                            <tr>
                                <th>Contract Amount</th>
                                <td>₹ {billing.contractAmount}</td>
                            </tr>

                            <tr>
                                <th>Previous Billed</th>
                                <td>₹ {billing.previousBilled}</td>
                            </tr>

                            <tr>
                                <th>Current Bill</th>
                                <td>₹ {billing.currentBillAmount}</td>
                            </tr>

                            <tr>
                                <th>Total Billed</th>
                                <td>₹ {billing.totalBilled}</td>
                            </tr>

                            <tr>
                                <th>Balance Amount</th>
                                <td>₹ {billing.balanceAmount}</td>
                            </tr>

                            <tr>
                                <th>% Complete</th>
                                <td>{billing.percentageComplete}%</td>
                            </tr>

                            <tr>
                                <th>Status</th>
                                <td>{billing.status}</td>
                            </tr>

                            <tr>
                                <th>Billing Date</th>
                                <td>
                                    {billing.billingDate
                                        ? new Date(
                                            billing.billingDate
                                        ).toLocaleDateString()
                                        : "-"}
                                </td>
                            </tr>

                            <tr>
                                <th>Remarks</th>
                                <td>{billing.remarks}</td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}