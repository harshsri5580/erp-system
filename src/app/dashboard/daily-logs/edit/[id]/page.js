"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

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

                toast.error(
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

                setLoading(true);

                const response =
                    await axios.put(
                        `/api/daily-logs/${id}`,
                        formData
                    );

                if (
                    response.data.success
                ) {

                    toast.success(
                        "Daily Log Updated Successfully"
                    );

                    setTimeout(() => {

                        router.push(
                            "/dashboard/daily-logs"
                        );

                    }, 1000);

                }

            } catch (error) {

                console.log(error);

                toast.error(
                    "Failed to update daily log"
                );

            } finally {

                setLoading(false);

            }

        };

    if (loading) {

        return (

            <div className="container-fluid px-4 py-3">
                <div className="card border-0 rounded-4">
                    <div className="card-body text-center py-5">
                        Loading Daily Log...
                    </div>
                </div>
            </div>

        );

    }

    return (

        <div className="container-fluid px-4 py-3">

            <div
                className="card border-0 rounded-4"
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
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
                                Edit Daily Log
                            </h2>

                            <p
                                className="mb-0"
                                style={{
                                    color: "#6B7280",
                                }}
                            >
                                Update project daily activity report
                            </p>

                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() =>
                                router.push(
                                    "/dashboard/daily-logs"
                                )
                            }
                        >
                            <ArrowLeft size={16} />
                        </button>

                    </div>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Log Date

                                </label>

                                <input
                                    type="date"
                                    name="logDate"
                                    className="form-control rounded-3"
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

                                <label className="form-label fw-semibold text-dark">

                                    Project

                                </label>

                                <select
                                    name="projectId"
                                    className="form-select rounded-3"
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

                                <label className="form-label fw-semibold text-dark">

                                    Employee

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

                                <label className="form-label fw-semibold text-dark">

                                    Labour Count

                                </label>

                                <input
                                    type="number"
                                    name="labourCount"
                                    className="form-control rounded-3"
                                    value={
                                        formData.labourCount
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

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

                                <label className="form-label fw-semibold text-dark">

                                    Work Done

                                </label>

                                <textarea
                                    rows="4"
                                    name="workDone"
                                    className="form-control rounded-3"
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

                                <label className="form-label fw-semibold text-dark">

                                    Material Used

                                </label>

                                <textarea
                                    rows="3"
                                    name="materialUsed"
                                    className="form-control rounded-3"
                                    value={
                                        formData.materialUsed
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Equipment Used

                                </label>

                                <textarea
                                    rows="3"
                                    name="equipmentUsed"
                                    className="form-control rounded-3"
                                    value={
                                        formData.equipmentUsed
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Issues

                                </label>

                                <textarea
                                    rows="3"
                                    name="issues"
                                    className="form-control rounded-3"
                                    value={
                                        formData.issues
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Remarks

                                </label>

                                <textarea
                                    rows="3"
                                    name="remarks"
                                    className="form-control rounded-3"
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
                            className="btn btn-dark px-4"
                        >

                            Update Daily Log

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}