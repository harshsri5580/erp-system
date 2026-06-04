"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    useParams,
    useRouter,
} from "next/navigation";

export default function EditIncidentPage() {

    const params =
        useParams();

    const router =
        useRouter();

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

            incidentNumber: "",

            incidentDate: "",

            title: "",

            description: "",

            incidentType: "",

            severity: "",

            location: "",

            status: "",

            projectId: "",

            userId: "",

            inspectionId: "",

        });

    useEffect(() => {

        fetchIncident();

        loadProjects();

        loadUsers();

        loadInspections();

    }, []);

    const loadProjects =
        async () => {

            const res =
                await axios.get(
                    "/api/projects"
                );

            setProjects(
                res.data.projects || []
            );

        };

    const loadUsers =
        async () => {

            const res =
                await axios.get(
                    "/api/users"
                );

            setUsers(
                res.data.users || []
            );

        };

    const loadInspections =
        async () => {

            const res =
                await axios.get(
                    "/api/inspections"
                );

            setInspections(
                res.data.inspections || []
            );

        };

    const fetchIncident =
        async () => {

            try {

                const res =
                    await axios.get(
                        `/api/incidents/${params.id}`
                    );

                const item =
                    res.data.incident;

                setFormData({

                    incidentNumber:
                        item.incidentNumber || "",

                    incidentDate:
                        item.incidentDate
                            ? item.incidentDate
                                .split("T")[0]
                            : "",

                    title:
                        item.title || "",

                    description:
                        item.description || "",

                    incidentType:
                        item.incidentType || "",

                    severity:
                        item.severity || "",

                    location:
                        item.location || "",

                    status:
                        item.status || "",

                    projectId:
                        item.projectId?.toString() || "",

                    userId:
                        item.userId?.toString() || "",

                    inspectionId:
                        item.inspectionId?.toString() || "",

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
                    `/api/incidents/${params.id}`,
                    formData
                );

                alert(
                    "Incident updated successfully"
                );

                router.push(
                    "/dashboard/incidents"
                );

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to update incident"
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

                        Edit Incident

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>
                                    Incident Number
                                </label>

                                <input
                                    className="form-control"
                                    value={
                                        formData.incidentNumber
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>
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
                                        (item) => (

                                            <option
                                                key={
                                                    item.id
                                                }
                                                value={
                                                    item.id
                                                }
                                            >
                                                {item.name}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>
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
                                        (item) => (

                                            <option
                                                key={
                                                    item.id
                                                }
                                                value={
                                                    item.id
                                                }
                                            >
                                                {item.name}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            <div className="col-md-12 mb-3">

                                <label>
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
                                        (item) => (

                                            <option
                                                key={
                                                    item.id
                                                }
                                                value={
                                                    item.id
                                                }
                                            >
                                                {item.inspectionNumber}
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

                                <label>
                                    Incident Type
                                </label>

                                <input
                                    type="text"
                                    name="incidentType"
                                    className="form-control"
                                    value={
                                        formData.incidentType
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label>
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
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Critical</option>
                                </select>

                            </div>

                            <div className="col-md-4 mb-3">

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
                                    <option>Open</option>
                                    <option>In Progress</option>
                                    <option>Closed</option>
                                </select>

                            </div>

                            <div className="col-md-12 mb-3">

                                <label>
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
                            className="btn btn-primary"
                            disabled={loading}
                        >

                            {loading
                                ? "Updating..."
                                : "Update Incident"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}