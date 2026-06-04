"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddProgressBillingPage() {

    const router = useRouter();

    const [projects, setProjects] =
        useState([]);

    const [milestones, setMilestones] =
        useState([]);

    const [users, setUsers] =
        useState([]);

    const [formData, setFormData] =
        useState({

            billingNumber:
                `PB-${Date.now()}`,

            billingDate: "",

            contractAmount: "",

            previousBilled: 0,

            currentBillAmount: 0,

            percentageComplete: 0,

            remarks: "",

            status: "Draft",

            projectId: "",

            clientId: "",

            milestoneId: "",

            userId: "",

        });

    useEffect(() => {

        loadProjects();

        loadMilestones();

        loadUsers();


    }, []);

    const loadProjects =
        async () => {

            const res =
                await axios.get(
                    "/api/projects"
                );

            setProjects(
                res.data.projects || []
            );

        };

    const loadMilestones =
        async () => {

            const res =
                await axios.get(
                    "/api/milestones"
                );

            setMilestones(
                res.data.milestones || []
            );

        };

    const loadUsers =
        async () => {

            const res =
                await axios.get(
                    "/api/users"
                );

            setUsers(
                res.data.users || []
            );

        };
    const getPreviousBilling =
        async (projectId) => {

            try {

                const res =
                    await axios.get(
                        `/api/progress-billing?projectId=${projectId}`
                    );

                const billings =
                    res.data.progressBillings || [];

                const total =
                    billings.reduce(
                        (sum, item) =>
                            sum +
                            Number(
                                item.currentBillAmount || 0
                            ),
                        0
                    );

                return total;

            } catch (error) {

                console.log(error);

                return 0;

            }

        };
    const handleProjectChange =
        async (e) => {

            const projectId =
                e.target.value;

            const project =
                projects.find(
                    (p) =>
                        p.id ===
                        parseInt(
                            projectId
                        )
                );

            const previousBilled =
                await getPreviousBilling(
                    projectId
                );

            setFormData((prev) => ({

                ...prev,

                projectId,

                clientId:
                    project?.clientId,

                contractAmount:
                    project?.budget || 0,

                previousBilled,

            }));

        };

    const handleChange =
        (e) => {

            setFormData((prev) => ({

                ...prev,

                [e.target.name]:
                    e.target.value,

            }));

        };

    const totalBilled =
        Number(
            formData.previousBilled
        ) +
        Number(
            formData.currentBillAmount
        );

    const balanceAmount =
        Number(
            formData.contractAmount
        ) - totalBilled;

    const handleSubmit =
        async (e) => {

            e.preventDefault();
            console.log(formData);
            try {

                await axios.post(
                    "/api/progress-billing",
                    formData
                );

                alert(
                    "Progress Billing Created"
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

            <div className="card">

                <div className="card-body">

                    <h2 className="mb-4">

                        Add Progress Billing

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">
                                <label>Billing Number</label>
                                <input
                                    className="form-control"
                                    value={formData.billingNumber}
                                    readOnly
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Billing Date</label>
                                <input
                                    type="date"
                                    name="billingDate"
                                    className="form-control"
                                    value={formData.billingDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Project</label>
                                <select
                                    className="form-select"
                                    value={formData.projectId}
                                    onChange={handleProjectChange}
                                >
                                    <option value="">
                                        Select Project
                                    </option>

                                    {projects.map((project) => (
                                        <option
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Milestone</label>
                                <select
                                    name="milestoneId"
                                    className="form-select"
                                    value={formData.milestoneId}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Milestone
                                    </option>

                                    {milestones.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.title}
                                        </option>
                                    ))}
                                </select>

                                {/* <pre>
                                    {JSON.stringify(formData, null, 2)}
                                </pre> */}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>User</label>
                                <select
                                    name="userId"
                                    className="form-select"
                                    value={formData.userId}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select User
                                    </option>

                                    {users.map((user) => (
                                        <option
                                            key={user.id}
                                            value={user.id}
                                        >
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Contract Amount</label>
                                <input
                                    className="form-control"
                                    value={formData.contractAmount}
                                    readOnly
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Previous Billed</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={formData.previousBilled}
                                    readOnly
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Current Bill Amount</label>
                                <input
                                    type="number"
                                    name="currentBillAmount"
                                    className="form-control"
                                    value={formData.currentBillAmount}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Total Billed</label>
                                <input
                                    className="form-control"
                                    value={totalBilled}
                                    readOnly
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Balance Amount</label>
                                <input
                                    className="form-control"
                                    value={balanceAmount}
                                    readOnly
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Percentage Complete</label>
                                <input
                                    type="number"
                                    name="percentageComplete"
                                    className="form-control"
                                    value={formData.percentageComplete}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label>Status</label>
                                <select
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option>Draft</option>
                                    <option>Submitted</option>
                                    <option>Approved</option>
                                    <option>Rejected</option>
                                </select>
                            </div>

                            <div className="col-md-12 mb-3">
                                <label>Remarks</label>
                                <textarea
                                    rows="4"
                                    name="remarks"
                                    className="form-control"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <button
                            className="btn btn-dark"
                        >

                            Save Billing

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}