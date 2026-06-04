"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddDailyLogPage() {

    const router = useRouter();

    const [projects, setProjects] =
        useState([]);

    const [users, setUsers] =
        useState([]);

    const [formData, setFormData] =
        useState({

            logDate:
                new Date()
                    .toISOString()
                    .split("T")[0],

            workDone: "",

            labourCount: "",

            materialUsed: "",

            equipmentUsed: "",

            issues: "",

            remarks: "",

            status: "Open",

            projectId: "",

            userId: "",

        });

    // ======================
    // LOAD PROJECTS
    // ======================

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

    // ======================
    // LOAD USERS
    // ======================

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

    useEffect(() => {

        fetchProjects();

        fetchUsers();

    }, []);

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
                        "/api/daily-logs",
                        formData
                    );

                if (
                    response.data.success
                ) {

                    alert(
                        "Daily Log Created Successfully"
                    );

                    router.push(
                        "/dashboard/daily-logs"
                    );

                }

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to create daily log"
                );

            }

        };

    return (

        <div className="container-fluid">

            <div className="card shadow border-0">

                <div className="card-body">

                    <h2 className="mb-4 fw-bold">

                        Add Daily Log

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            {/* DATE */}

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Log Date

                                </label>

                                <input
                                    type="date"
                                    name="logDate"
                                    className="form-control"
                                    value={
                                        formData.logDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            {/* PROJECT */}

                            <div className="col-md-4 mb-3">

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

                            {/* USER */}

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Employee

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
                                        Select Employee
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

                                                {
                                                    user.name
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            {/* LABOUR */}

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Labour Count

                                </label>

                                <input
                                    type="number"
                                    name="labourCount"
                                    className="form-control"
                                    value={
                                        formData.labourCount
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

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

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Closed">
                                        Closed
                                    </option>

                                </select>

                            </div>

                            {/* WORK DONE */}

                            <div className="col-md-12 mb-3">

                                <label className="form-label">

                                    Work Done

                                </label>

                                <textarea
                                    rows="4"
                                    name="workDone"
                                    className="form-control"
                                    value={
                                        formData.workDone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            {/* MATERIAL */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Material Used

                                </label>

                                <textarea
                                    rows="3"
                                    name="materialUsed"
                                    className="form-control"
                                    value={
                                        formData.materialUsed
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            {/* EQUIPMENT */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Equipment Used

                                </label>

                                <textarea
                                    rows="3"
                                    name="equipmentUsed"
                                    className="form-control"
                                    value={
                                        formData.equipmentUsed
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            {/* ISSUES */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Issues

                                </label>

                                <textarea
                                    rows="3"
                                    name="issues"
                                    className="form-control"
                                    value={
                                        formData.issues
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            {/* REMARKS */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Remarks

                                </label>

                                <textarea
                                    rows="3"
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

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >

                            Save Daily Log

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}