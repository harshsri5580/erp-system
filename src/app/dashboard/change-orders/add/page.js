"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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

        <div className="container-fluid">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">

                        Create Change Order

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>
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

                                <label>
                                    Project
                                </label>

                                <select
                                    name="projectId"
                                    className="form-select"
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

                                <label>
                                    Client
                                </label>

                                <select
                                    name="clientId"
                                    className="form-select"
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

                                <label>
                                    Raised By
                                </label>

                                <select
                                    name="userId"
                                    className="form-select"
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

                                <label>
                                    Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
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

                                <label>
                                    Description
                                </label>

                                <textarea
                                    rows="4"
                                    name="description"
                                    className="form-control"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <label>
                                    Reason
                                </label>

                                <textarea
                                    rows="4"
                                    name="reason"
                                    className="form-control"
                                    value={
                                        formData.reason
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label>
                                    Old Amount
                                </label>

                                <input
                                    type="number"
                                    name="oldAmount"
                                    className="form-control"
                                    value={formData.oldAmount}
                                    readOnly
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label>
                                    New Amount
                                </label>

                                <input
                                    type="number"
                                    name="newAmount"
                                    className="form-control"
                                    value={
                                        formData.newAmount
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label>
                                    Difference
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={difference}
                                    readOnly
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

                                    <option>
                                        Completed
                                    </option>

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>
                                    Approved Date
                                </label>

                                <input
                                    type="date"
                                    name="approvedDate"
                                    className="form-control"
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
                            className="btn btn-dark"
                        >

                            Create Change Order

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}