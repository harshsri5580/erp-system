"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function EditMilestonePage() {

    const router = useRouter();
    const params = useParams();

    const [projects, setProjects] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

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

    const fetchMilestone =
        async () => {

            try {

                const response =
                    await axios.get(
                        `/api/milestones/${params.id}`
                    );

                const milestone =
                    response.data.milestone;

                setFormData({

                    projectId:
                        milestone.projectId,

                    title:
                        milestone.title,

                    description:
                        milestone.description || "",

                    percentage:
                        milestone.percentage || 0,

                    targetDate:
                        milestone.targetDate
                            ? milestone.targetDate
                                .split("T")[0]
                            : "",

                    completedDate:
                        milestone.completedDate
                            ? milestone.completedDate
                                .split("T")[0]
                            : "",

                    status:
                        milestone.status,

                });

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

    useEffect(() => {

        fetchProjects();

        fetchMilestone();

    }, []);

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
                    await axios.put(
                        `/api/milestones/${params.id}`,
                        formData
                    );

                if (
                    response.data.success
                ) {

                    alert(
                        "Milestone updated successfully"
                    );

                    router.push(
                        "/dashboard/milestones"
                    );

                }

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to update milestone"
                );

            }

        };

    if (loading) {

        return (
            <div className="text-center mt-5">
                Loading...
            </div>
        );

    }

    return (

        <div className="container-fluid">

            <div className="card shadow border-0">

                <div className="card-body">

                    <h2 className="fw-bold mb-4">

                        Edit Milestone

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>
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
                                >

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
                                        Pending
                                    </option>

                                    <option>
                                        In Progress
                                    </option>

                                    <option>
                                        Completed
                                    </option>

                                    <option>
                                        Delayed
                                    </option>

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

                            <div className="col-md-6 mb-3">

                                <label>
                                    Progress %
                                </label>

                                <input
                                    type="range"
                                    min="0"
                                    max="100"
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

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>
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

                            <div className="col-md-6 mb-3">

                                <label>
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

                            Update Milestone

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}