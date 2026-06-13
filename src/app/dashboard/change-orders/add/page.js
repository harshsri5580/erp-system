"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
    ArrowLeft,
    Plus,
} from "lucide-react";

export default function AddChangeOrderPage() {

    const router = useRouter();

    const [projects, setProjects] =
        useState([]);

    const [clients, setClients] =
        useState([]);

    const [users, setUsers] =
        useState([]);

    const [formData, setFormData] =
        useState({

            coNumber:
                `CO-${Date.now()}`,

            title: "",

            description: "",

            reason: "",

            oldAmount: "",

            newAmount: "",

            status: "Draft",

            approvedDate: "",

            projectId: "",

            clientId: "",

            userId: "",

        });

    useEffect(() => {

        fetchProjects();

        fetchClients();

        fetchUsers();

    }, []);

    const fetchProjects =
        async () => {

            const response =
                await axios.get(
                    "/api/projects"
                );

            setProjects(
                response.data.projects || []
            );

        };

    const handleProjectChange =
        (e) => {

            const selectedProjectId =
                e.target.value;

            const selectedProject =
                projects.find(
                    (project) =>
                        project.id ===
                        parseInt(
                            selectedProjectId
                        )
                );

            setFormData({

                ...formData,

                projectId:
                    selectedProjectId,

                oldAmount:
                    selectedProject?.budget || 0,

            });

        };
    const fetchClients =
        async () => {

            const response =
                await axios.get(
                    "/api/clients"
                );

            setClients(
                response.data.clients || []
            );

        };

    const fetchUsers =
        async () => {

            const response =
                await axios.get(
                    "/api/users"
                );

            setUsers(
                response.data.users || []
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

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const response =
                    await axios.post(
                        "/api/change-orders",
                        formData
                    );

                if (
                    response.data.success
                ) {

                    alert(
                        "Change Order Created Successfully"
                    );

                    router.push(
                        "/dashboard/change-orders"
                    );

                }

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to create Change Order"
                );

            }

        };

    const difference =
        Number(
            formData.newAmount || 0
        ) -
        Number(
            formData.oldAmount || 0
        );

    return (

        <div className="container-fluid px-4 py-3">

            <div
                className="card border-0 rounded-4"
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,0.06)",
                }}
            >

                <div className="card-body p-4 p-lg-5">

                    <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">

                        <div>

                            <h2
                                className="fw-bold mb-1"
                                style={{
                                    color: "#111827",
                                }}
                            >
                                Create Change Order
                            </h2>

                            <p
                                className="mb-0"
                                style={{
                                    color: "#6B7280",
                                }}
                            >
                                Create contract variation and scope change request
                            </p>

                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-secondary d-flex align-items-center gap-2"
                            onClick={() =>
                                router.push(
                                    "/dashboard/change-orders"
                                )
                            }
                        >
                            <ArrowLeft size={16} />
                            Back
                        </button>

                    </div>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    CO Number
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        formData.coNumber
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Project
                                </label>

                                <select
                                    name="projectId"
                                    className="form-select rounded-3"
                                    value={formData.projectId}
                                    onChange={
                                        handleProjectChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Project
                                    </option>

                                    {projects.map(
                                        (
                                            project
                                        ) => (

                                            <option
                                                key={
                                                    project.id
                                                }
                                                value={
                                                    project.id
                                                }
                                            >

                                                {
                                                    project.name
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Client
                                </label>

                                <select
                                    name="clientId"
                                    className="form-select rounded-3"
                                    value={
                                        formData.clientId
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Client
                                    </option>

                                    {clients.map(
                                        (
                                            client
                                        ) => (

                                            <option
                                                key={
                                                    client.id
                                                }
                                                value={
                                                    client.id
                                                }
                                            >

                                                {
                                                    client.companyName
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Raised By
                                </label>

                                <select
                                    name="userId"
                                    className="form-select rounded-3"
                                    value={
                                        formData.userId
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select User
                                    </option>

                                    {users.map(
                                        (
                                            user
                                        ) => (

                                            <option
                                                key={
                                                    user.id
                                                }
                                                value={
                                                    user.id
                                                }
                                            >

                                                {
                                                    user.name
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    className="form-control rounded-3"
                                    value={
                                        formData.title
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Description
                                </label>

                                <textarea
                                    rows="4"
                                    name="description"
                                    className="form-control rounded-3"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Reason
                                </label>

                                <textarea
                                    rows="4"
                                    name="reason"
                                    className="form-control rounded-3"
                                    value={
                                        formData.reason
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Old Amount
                                </label>

                                <input
                                    type="number"
                                    name="oldAmount"
                                    className="form-control rounded-3"
                                    value={formData.oldAmount}
                                    readOnly
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    New Amount
                                </label>

                                <input
                                    type="number"
                                    name="newAmount"
                                    className="form-control rounded-3"
                                    value={
                                        formData.newAmount
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Difference
                                </label>

                                <input
                                    type="text"
                                    className="form-control rounded-3 fw-bold text-success"
                                    value={`₹ ${difference}`}
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    className="form-select rounded-3"
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

                                    <option>
                                        Completed
                                    </option>

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Approved Date
                                </label>

                                <input
                                    type="date"
                                    name="approvedDate"
                                    className="form-control rounded-3"
                                    value={
                                        formData.approvedDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark px-4"
                        >
                            Create Change Order
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}