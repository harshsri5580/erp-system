"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddInspectionPage() {

    const router = useRouter();

    const [projects, setProjects] =
        useState([]);

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({

            inspectionNumber:
                `INSP-${Date.now()}`,

            inspectionDate:
                new Date()
                    .toISOString()
                    .split("T")[0],

            inspectionType:
                "Quality",

            location: "",

            checklist: "",

            remarks: "",

            status: "Open",

            projectId: "",

            userId: "",

        });

    useEffect(() => {

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

            if (
                !formData.projectId
            ) {

                alert(
                    "Please select project"
                );

                return;

            }

            if (
                !formData.userId
            ) {

                alert(
                    "Please select inspector"
                );

                return;

            }

            try {

                setLoading(true);

                await axios.post(
                    "/api/inspections",
                    formData
                );

                alert(
                    "Inspection created successfully"
                );

                router.push(
                    "/dashboard/inspections"
                );

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to create inspection"
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

                        Add Inspection

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Inspection Number

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        formData.inspectionNumber
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

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

                                <label className="form-label">

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

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Inspection Type

                                </label>

                                <select
                                    name="inspectionType"
                                    className="form-select"
                                    value={
                                        formData.inspectionType
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="Quality">
                                        Quality
                                    </option>

                                    <option value="Safety">
                                        Safety
                                    </option>

                                    <option value="Material">
                                        Material
                                    </option>

                                    <option value="Site">
                                        Site
                                    </option>

                                    <option value="Electrical">
                                        Electrical
                                    </option>

                                    <option value="Civil">
                                        Civil
                                    </option>

                                </select>

                            </div>

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

                                    <option value="Open">
                                        Open
                                    </option>

                                    <option value="In Progress">
                                        In Progress
                                    </option>

                                    <option value="Closed">
                                        Closed
                                    </option>

                                    <option value="Passed">
                                        Passed
                                    </option>

                                    <option value="Failed">
                                        Failed
                                    </option>

                                </select>

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label">

                                    Location

                                </label>

                                <input
                                    type="text"
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

                                <label className="form-label">

                                    Checklist

                                </label>

                                <textarea
                                    rows="6"
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

                                <label className="form-label">

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
                            type="submit"
                            disabled={
                                loading
                            }
                            className="btn btn-primary"
                        >

                            {loading
                                ? "Saving..."
                                : "Save Inspection"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}