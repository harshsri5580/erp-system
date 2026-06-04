"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    useParams,
    useRouter,
} from "next/navigation";

export default function EditInspectionPage() {

    const params =
        useParams();

    const router =
        useRouter();

    const [projects, setProjects] =
        useState([]);

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({

            inspectionNumber: "",

            inspectionDate: "",

            inspectionType: "",

            location: "",

            checklist: "",

            remarks: "",

            status: "",

            projectId: "",

            userId: "",

        });

    useEffect(() => {

        fetchInspection();

        loadProjects();

        loadUsers();

    }, []);

    const loadProjects =
        async () => {

            try {

                const res =
                    await axios.get(
                        "/api/projects"
                    );

                setProjects(
                    res.data.projects || []
                );

            } catch (error) {

                console.log(error);

            }

        };

    const loadUsers =
        async () => {

            try {

                const res =
                    await axios.get(
                        "/api/users"
                    );

                setUsers(
                    res.data.users || []
                );

            } catch (error) {

                console.log(error);

            }

        };

    const fetchInspection =
        async () => {

            try {

                const res =
                    await axios.get(
                        `/api/inspections/${params.id}`
                    );

                const item =
                    res.data.inspection;

                setFormData({

                    inspectionNumber:
                        item.inspectionNumber || "",

                    inspectionDate:
                        item.inspectionDate
                            ? item.inspectionDate
                                .split("T")[0]
                            : "",

                    inspectionType:
                        item.inspectionType || "",

                    location:
                        item.location || "",

                    checklist:
                        item.checklist || "",

                    remarks:
                        item.remarks || "",

                    status:
                        item.status || "",

                    projectId:
                        item.projectId?.toString() || "",

                    userId:
                        item.userId?.toString() || "",

                });

            } catch (error) {

                console.log(error);

            }

        };

    const handleChange =
        (e) => {

            setFormData((prev) => ({

                ...prev,

                [e.target.name]:
                    e.target.value,

            }));

        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                await axios.put(
                    `/api/inspections/${params.id}`,
                    formData
                );

                alert(
                    "Inspection updated successfully"
                );

                router.push(
                    "/dashboard/inspections"
                );

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to update inspection"
                );

            } finally {

                setLoading(false);

            }

        };

    return (

        <div className="container-fluid">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">

                        Edit Inspection

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>
                                    Inspection Number
                                </label>

                                <input
                                    className="form-control"
                                    value={
                                        formData.inspectionNumber
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>
                                    Inspection Date
                                </label>

                                <input
                                    type="date"
                                    name="inspectionDate"
                                    className="form-control"
                                    value={
                                        formData.inspectionDate
                                    }
                                    onChange={
                                        handleChange
                                    }
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

                                    <option value="">
                                        Select Project
                                    </option>

                                    {projects.map(
                                        (project) => (

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
                                    Inspector
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
                                >

                                    <option value="">
                                        Select Inspector
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

                            <div className="col-md-6 mb-3">

                                <label>
                                    Inspection Type
                                </label>

                                <input
                                    name="inspectionType"
                                    className="form-control"
                                    value={
                                        formData.inspectionType
                                    }
                                    onChange={
                                        handleChange
                                    }
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
                                        Open
                                    </option>

                                    <option>
                                        In Progress
                                    </option>

                                    <option>
                                        Closed
                                    </option>

                                    <option>
                                        Passed
                                    </option>

                                    <option>
                                        Failed
                                    </option>

                                </select>

                            </div>

                            <div className="col-md-12 mb-3">

                                <label>
                                    Location
                                </label>

                                <input
                                    name="location"
                                    className="form-control"
                                    value={
                                        formData.location
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <label>
                                    Checklist
                                </label>

                                <textarea
                                    rows="5"
                                    name="checklist"
                                    className="form-control"
                                    value={
                                        formData.checklist
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <label>
                                    Remarks
                                </label>

                                <textarea
                                    rows="4"
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
                            className="btn btn-primary"
                            disabled={loading}
                        >

                            {loading
                                ? "Updating..."
                                : "Update Inspection"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}