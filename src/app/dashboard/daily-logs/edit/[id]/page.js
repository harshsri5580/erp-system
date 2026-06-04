"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function EditDailyLogPage() {

    const router = useRouter();

    const params = useParams();

    const id = params.id;

    const [loading, setLoading] =
        useState(true);

    const [projects, setProjects] =
        useState([]);

    const [users, setUsers] =
        useState([]);

    const [formData, setFormData] =
        useState({

            logDate: "",

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

    // ======================
    // LOAD DAILY LOG
    // ======================

    const fetchDailyLog =
        async () => {

            try {

                const response =
                    await axios.get(
                        `/api/daily-logs/${id}`
                    );

                const log =
                    response.data.dailyLog;

                setFormData({

                    logDate:
                        new Date(
                            log.logDate
                        )
                            .toISOString()
                            .split("T")[0],

                    workDone:
                        log.workDone || "",

                    labourCount:
                        log.labourCount || "",

                    materialUsed:
                        log.materialUsed || "",

                    equipmentUsed:
                        log.equipmentUsed || "",

                    issues:
                        log.issues || "",

                    remarks:
                        log.remarks || "",

                    status:
                        log.status || "Open",

                    projectId:
                        log.projectId || "",

                    userId:
                        log.userId || "",

                });

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to load daily log"
                );

            } finally {

                setLoading(false);

            }

        };

    useEffect(() => {

        if (id) {

            fetchProjects();

            fetchUsers();

            fetchDailyLog();

        }

    }, [id]);

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
    // UPDATE
    // ======================

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                const response =
                    await axios.put(
                        `/api/daily-logs/${id}`,
                        formData
                    );

                if (
                    response.data.success
                ) {

                    alert(
                        "Daily Log Updated Successfully"
                    );

                    router.push(
                        "/dashboard/daily-logs"
                    );

                }

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to update daily log"
                );

            }

        };

    if (loading) {

        return (

            <div className="text-center py-5">

                <div className="spinner-border text-primary"></div>

            </div>

        );

    }

    return (

        <div className="container-fluid">

            <div className="card shadow border-0">

                <div className="card-body">

                    <h2 className="mb-4 fw-bold">

                        Edit Daily Log

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

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

                            Update Daily Log

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}