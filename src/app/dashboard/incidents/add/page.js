"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddIncidentPage() {

    const router = useRouter();

    const [projects, setProjects] =
        useState([]);

    const [users, setUsers] =
        useState([]);

    const [inspections, setInspections] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({

            incidentNumber:
                `INC-${Date.now()}`,

            incidentDate:
                new Date()
                    .toISOString()
                    .split("T")[0],

            title: "",

            description: "",

            incidentType:
                "Safety",

            severity:
                "Medium",

            location: "",

            status:
                "Open",

            projectId: "",

            userId: "",

            inspectionId: "",

        });

    useEffect(() => {

        loadProjects();

        loadUsers();

        loadInspections();

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

    const loadInspections =
        async () => {

            try {

                const res =
                    await axios.get(
                        "/api/inspections"
                    );

                setInspections(
                    res.data.inspections || []
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
                    "Please select reporter"
                );

                return;

            }

            if (
                !formData.title
            ) {

                alert(
                    "Please enter incident title"
                );

                return;

            }

            try {

                setLoading(true);

                await axios.post(
                    "/api/incidents",
                    formData
                );

                alert(
                    "Incident created successfully"
                );

                router.push(
                    "/dashboard/incidents"
                );

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to create incident"
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

                        Add Incident

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Incident Number

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        formData.incidentNumber
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Incident Date

                                </label>

                                <input
                                    type="date"
                                    name="incidentDate"
                                    className="form-control"
                                    value={
                                        formData.incidentDate
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
                                            item
                                        ) => (

                                            <option
                                                key={
                                                    item.id
                                                }
                                                value={
                                                    item.id
                                                }
                                            >

                                                {
                                                    item.name
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Reported By

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
                                        Select User
                                    </option>

                                    {users.map(
                                        (
                                            item
                                        ) => (

                                            <option
                                                key={
                                                    item.id
                                                }
                                                value={
                                                    item.id
                                                }
                                            >

                                                {
                                                    item.name
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label">

                                    Related Inspection

                                </label>

                                <select
                                    name="inspectionId"
                                    className="form-select"
                                    value={
                                        formData.inspectionId
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="">
                                        No Inspection
                                    </option>

                                    {inspections.map(
                                        (
                                            item
                                        ) => (

                                            <option
                                                key={
                                                    item.id
                                                }
                                                value={
                                                    item.id
                                                }
                                            >

                                                {
                                                    item.inspectionNumber
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label">

                                    Incident Title

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
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Incident Type

                                </label>

                                <select
                                    name="incidentType"
                                    className="form-select"
                                    value={
                                        formData.incidentType
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="Safety">
                                        Safety
                                    </option>

                                    <option value="Quality">
                                        Quality
                                    </option>

                                    <option value="Material">
                                        Material
                                    </option>

                                    <option value="Equipment">
                                        Equipment
                                    </option>

                                </select>

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Severity

                                </label>

                                <select
                                    name="severity"
                                    className="form-select"
                                    value={
                                        formData.severity
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
                                : "Save Incident"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}