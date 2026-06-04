"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function EditRFIPage() {

    const params = useParams();
    const router = useRouter();

    const [projects, setProjects] =
        useState([]);

    const [users, setUsers] =
        useState([]);

    const [formData, setFormData] =
        useState({

            rfiNumber: "",

            title: "",

            description: "",

            response: "",

            priority: "Medium",

            status: "Open",

            dueDate: "",

            closedDate: "",

            projectId: "",

            userId: "",

        });

    useEffect(() => {

        fetchProjects();

        fetchUsers();

        fetchRFI();

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

    const fetchRFI =
        async () => {

            const response =
                await axios.get(
                    `/api/rfi/${params.id}`
                );

            const rfi =
                response.data.rfi;

            setFormData({

                rfiNumber:
                    rfi.rfiNumber || "",

                title:
                    rfi.title || "",

                description:
                    rfi.description || "",

                response:
                    rfi.response || "",

                priority:
                    rfi.priority || "Medium",

                status:
                    rfi.status || "Open",

                dueDate:
                    rfi.dueDate
                        ? rfi.dueDate
                            .split("T")[0]
                        : "",

                closedDate:
                    rfi.closedDate
                        ? rfi.closedDate
                            .split("T")[0]
                        : "",

                projectId:
                    rfi.projectId,

                userId:
                    rfi.userId,

            });

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
                    await axios.put(
                        `/api/rfi/${params.id}`,
                        formData
                    );

                if (
                    response.data.success
                ) {

                    alert(
                        "RFI Updated Successfully"
                    );

                    router.push(
                        "/dashboard/rfi"
                    );

                }

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to update RFI"
                );

            }

        };

    return (

        <div className="container-fluid">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">
                        Edit RFI
                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>
                                    RFI Number
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        formData.rfiNumber
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

                            <div className="col-md-12 mb-3">

                                <label>
                                    Response
                                </label>

                                <textarea
                                    rows="4"
                                    name="response"
                                    className="form-control"
                                    value={
                                        formData.response
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-3 mb-3">

                                <label>
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

                                    <option>
                                        Low
                                    </option>

                                    <option>
                                        Medium
                                    </option>

                                    <option>
                                        High
                                    </option>

                                    <option>
                                        Critical
                                    </option>

                                </select>

                            </div>

                            <div className="col-md-3 mb-3">

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
                                        Open
                                    </option>

                                    <option>
                                        In Review
                                    </option>

                                    <option>
                                        Answered
                                    </option>

                                    <option>
                                        Closed
                                    </option>

                                </select>

                            </div>

                            <div className="col-md-3 mb-3">

                                <label>
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

                            <div className="col-md-3 mb-3">

                                <label>
                                    Closed Date
                                </label>

                                <input
                                    type="date"
                                    name="closedDate"
                                    className="form-control"
                                    value={
                                        formData.closedDate
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

                            Update RFI

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}