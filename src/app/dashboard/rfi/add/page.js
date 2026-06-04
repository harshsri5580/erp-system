"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddRFIPage() {

    const router = useRouter();

    const [projects, setProjects] =
        useState([]);

    const [users, setUsers] =
        useState([]);

    const [formData, setFormData] =
        useState({

            rfiNumber:
                `RFI-${Date.now()}`,

            title: "",

            description: "",

            priority: "Medium",

            status: "Open",

            dueDate: "",

            projectId: "",

            userId: "",

        });

    // ======================
    // LOAD DATA
    // ======================

    useEffect(() => {

        fetchProjects();

        fetchUsers();

    }, []);

    const fetchProjects =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/projects"
                    );

                setProjects(
                    response.data.projects || []
                );

            } catch (error) {

                console.log(error);

            }

        };

    const fetchUsers =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/users"
                    );

                setUsers(
                    response.data.users || []
                );

            } catch (error) {

                console.log(error);

            }

        };

    // ======================
    // HANDLE CHANGE
    // ======================

    const handleChange =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value,

            });

        };

    // ======================
    // SUBMIT
    // ======================

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const response =
                    await axios.post(
                        "/api/rfi",
                        formData
                    );

                if (
                    response.data.success
                ) {

                    alert(
                        "RFI Created Successfully"
                    );

                    router.push(
                        "/dashboard/rfi"
                    );

                }

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to create RFI"
                );

            }

        };

    return (

        <div className="container-fluid">

            <div className="card shadow border-0">

                <div className="card-body">

                    <h2 className="fw-bold mb-4">

                        Create RFI

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            {/* RFI NUMBER */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    RFI Number

                                </label>

                                <input
                                    type="text"
                                    name="rfiNumber"
                                    className="form-control"
                                    value={
                                        formData.rfiNumber
                                    }
                                    readOnly
                                />

                            </div>

                            {/* PROJECT */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Project

                                </label>

                                <select
                                    name="projectId"
                                    className="form-select"
                                    value={
                                        formData.projectId
                                    }
                                    onChange={
                                        handleChange
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

                            {/* TITLE */}

                            <div className="col-md-12 mb-3">

                                <label className="form-label">

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

                            {/* DESCRIPTION */}

                            <div className="col-md-12 mb-3">

                                <label className="form-label">

                                    Description

                                </label>

                                <textarea
                                    rows="5"
                                    name="description"
                                    className="form-control"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            {/* PRIORITY */}

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Priority

                                </label>

                                <select
                                    name="priority"
                                    className="form-select"
                                    value={
                                        formData.priority
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="Low">
                                        Low
                                    </option>

                                    <option value="Medium">
                                        Medium
                                    </option>

                                    <option value="High">
                                        High
                                    </option>

                                    <option value="Critical">
                                        Critical
                                    </option>

                                </select>

                            </div>

                            {/* STATUS */}

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

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

                                    <option value="Open">
                                        Open
                                    </option>

                                    <option value="In Review">
                                        In Review
                                    </option>

                                    <option value="Answered">
                                        Answered
                                    </option>

                                    <option value="Closed">
                                        Closed
                                    </option>

                                </select>

                            </div>

                            {/* DUE DATE */}

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Due Date

                                </label>

                                <input
                                    type="date"
                                    name="dueDate"
                                    className="form-control"
                                    value={
                                        formData.dueDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            {/* RAISED BY */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

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
                                        (user) => (

                                            <option
                                                key={
                                                    user.id
                                                }
                                                value={
                                                    user.id
                                                }
                                            >

                                                {user.name}

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark"
                        >

                            Create RFI

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}