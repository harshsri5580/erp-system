"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    useParams,
    useRouter,
} from "next/navigation";

export default function EditProgressBillingPage() {

    const params = useParams();

    const router = useRouter();

    const [projects, setProjects] =
        useState([]);

    const [milestones, setMilestones] =
        useState([]);

    const [users, setUsers] =
        useState([]);

    const [formData, setFormData] =
        useState({

            billingNumber: "",

            billingDate: "",

            contractAmount: "",

            previousBilled: "",

            currentBillAmount: "",

            percentageComplete: "",

            remarks: "",

            status: "",

            projectId: "",

            clientId: "",

            milestoneId: "",

            userId: "",

        });

    useEffect(() => {

        fetchBilling();

        fetchProjects();

        fetchMilestones();

        fetchUsers();

    }, []);

    const fetchBilling =
        async () => {

            const response =
                await axios.get(
                    `/api/progress-billing/${params.id}`
                );

            const data =
                response.data.progressBilling;

            setFormData({

                billingNumber:
                    data.billingNumber || "",

                billingDate:
                    data.billingDate
                        ? data.billingDate.split("T")[0]
                        : "",

                contractAmount:
                    data.contractAmount || "",

                previousBilled:
                    data.previousBilled || "",

                currentBillAmount:
                    data.currentBillAmount || "",

                percentageComplete:
                    data.percentageComplete || "",

                remarks:
                    data.remarks || "",

                status:
                    data.status || "",

                projectId:
                    data.projectId || "",

                clientId:
                    data.clientId || "",

                milestoneId:
                    data.milestoneId || "",

                userId:
                    data.userId || "",

            });

        };

    const fetchProjects =
        async () => {

            const res =
                await axios.get(
                    "/api/projects"
                );

            setProjects(
                res.data.projects || []
            );

        };

    const fetchMilestones =
        async () => {

            const res =
                await axios.get(
                    "/api/milestones"
                );

            setMilestones(
                res.data.milestones || []
            );

        };

    const fetchUsers =
        async () => {

            const res =
                await axios.get(
                    "/api/users"
                );

            setUsers(
                res.data.users || []
            );

        };

    const handleChange =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value,

            });

        };

    const totalBilled =
        Number(
            formData.previousBilled || 0
        ) +
        Number(
            formData.currentBillAmount || 0
        );

    const balanceAmount =
        Number(
            formData.contractAmount || 0
        ) -
        totalBilled;

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                await axios.put(
                    `/api/progress-billing/${params.id}`,
                    formData
                );

                alert(
                    "Progress Billing Updated"
                );

                router.push(
                    "/dashboard/progress-billing"
                );

            } catch (error) {

                console.log(error);

            }

        };

    return (

        <div className="container-fluid">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">

                        Edit Progress Billing

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>
                                    Billing Number
                                </label>

                                <input
                                    className="form-control"
                                    value={
                                        formData.billingNumber
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>
                                    Billing Date
                                </label>

                                <input
                                    type="date"
                                    name="billingDate"
                                    className="form-control"
                                    value={
                                        formData.billingDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>
                                    Contract Amount
                                </label>

                                <input
                                    className="form-control"
                                    value={
                                        formData.contractAmount
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>
                                    Previous Billed
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={formData.previousBilled}
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>
                                    Current Bill
                                </label>

                                <input
                                    type="number"
                                    name="currentBillAmount"
                                    className="form-control"
                                    value={
                                        formData.currentBillAmount
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>
                                    % Complete
                                </label>

                                <input
                                    type="number"
                                    name="percentageComplete"
                                    className="form-control"
                                    value={
                                        formData.percentageComplete
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>
                                    Total Billed
                                </label>

                                <input
                                    className="form-control"
                                    value={totalBilled}
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>
                                    Balance Amount
                                </label>

                                <input
                                    className="form-control"
                                    value={balanceAmount}
                                    readOnly
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <label>
                                    Remarks
                                </label>

                                <textarea
                                    rows="4"
                                    name="remarks"
                                    className="form-control"
                                    value={
                                        formData.remarks
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>
                                    Status
                                </label>

                                <select
                                    name="status"
                                    className="form-select"
                                    value={
                                        formData.status
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option>
                                        Draft
                                    </option>

                                    <option>
                                        Submitted
                                    </option>

                                    <option>
                                        Approved
                                    </option>

                                    <option>
                                        Rejected
                                    </option>

                                </select>

                            </div>

                        </div>

                        <button
                            className="btn btn-dark"
                        >
                            Update Billing
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}