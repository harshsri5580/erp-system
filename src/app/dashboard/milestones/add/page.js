"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddMilestonePage() {

    const router = useRouter();

    const [projects, setProjects] =
        useState([]);

    const [formData, setFormData] =
        useState({

            projectId: "",

            title: "",

            description: "",

            percentage: 0,

            targetDate: "",

            completedDate: "",

            status: "Pending",

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

    useEffect(() => {

        fetchProjects();

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
                        "/api/milestones",
                        formData
                    );

                if (
                    response.data.success
                ) {

                    alert(
                        "Milestone created successfully"
                    );

                    router.push(
                        "/dashboard/milestones"
                    );

                }

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to create milestone"
                );

            }

        };

    return (

        <div className="container-fluid">

            <div className="card shadow border-0">

                <div className="card-body">

                    <h2 className="fw-bold mb-4">

                        Add Milestone

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

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

                            {/* STATUS */}

                            <div className="col-md-6 mb-3">

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

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Completed">
                                        Completed
                                    </option>

                                    <option value="Delayed">
                                        Delayed
                                    </option>

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

                            {/* PROGRESS */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Progress %

                                </label>

                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    step="5"
                                    name="percentage"
                                    className="form-range"
                                    value={
                                        formData.percentage
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <div className="fw-bold">

                                    {
                                        formData.percentage
                                    }%

                                </div>

                                <div className="progress mt-2">

                                    <div
                                        className="progress-bar"
                                        style={{
                                            width:
                                                `${formData.percentage}%`,
                                        }}
                                    >

                                        {
                                            formData.percentage
                                        }%

                                    </div>

                                </div>

                            </div>

                            {/* TARGET DATE */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Target Date

                                </label>

                                <input
                                    type="date"
                                    name="targetDate"
                                    className="form-control"
                                    value={
                                        formData.targetDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            {/* COMPLETED DATE */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Completed Date

                                </label>

                                <input
                                    type="date"
                                    name="completedDate"
                                    className="form-control"
                                    value={
                                        formData.completedDate
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

                            Save Milestone

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}