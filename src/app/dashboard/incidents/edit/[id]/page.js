"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    useParams,
    useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

import {
    ShieldAlert,
    Save,
    ArrowLeft,
} from "lucide-react";

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

                toast.success(
                    "Incident updated successfully"
                );

                setTimeout(() => {

                    router.push(
                        "/dashboard/incidents"
                    );

                }, 1000);

            } catch (error) {

                console.log(error);

                toast.error(
                    error?.response?.data?.message ||
                    "Failed to update incident"
                );

            } finally {

                setLoading(false);

            }

        };

    return (

        <div className="container-fluid">

            <div
                className="card border-0 rounded-4"
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
                }}
            >

                <div className="card-body p-4 p-lg-5">

                    <div className="mb-4 pb-3 border-bottom">

                        <div className="d-flex justify-content-between align-items-center">

                            <div>

                                <h2
                                    className="fw-bold mb-1"
                                    style={{
                                        color: "#111827",
                                    }}
                                >
                                    Edit Incident
                                </h2>

                                <p
                                    className="mb-0"
                                    style={{
                                        color: "#6B7280",
                                    }}
                                >
                                    Update incident details and status
                                </p>

                            </div>

                            <ShieldAlert
                                size={34}
                                color="#DC2626"
                            />

                        </div>

                    </div>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Incident Number
                                </label>

                                <input
                                    className="form-control rounded-3"
                                    value={
                                        formData.incidentNumber
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Incident Date
                                </label>

                                <input
                                    type="date"
                                    name="incidentDate"
                                    className="form-control rounded-3"
                                    value={
                                        formData.incidentDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

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

                                <label className="form-label fw-semibold text-dark">
                                    Reported By
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

                                <label className="form-label fw-semibold text-dark">
                                    Related Inspection
                                </label>

                                <select
                                    name="inspectionId"
                                    className="form-select rounded-3"
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

                                <label className="form-label fw-semibold text-dark">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    className="form-control rounded-3"
                                    value={
                                        formData.title
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Description
                                </label>

                                <textarea
                                    rows="5"
                                    name="description"
                                    className="form-control rounded-3"
                                    value={
                                        formData.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Incident Type
                                </label>

                                <input
                                    type="text"
                                    name="incidentType"
                                    className="form-control rounded-3"
                                    value={
                                        formData.incidentType
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Severity
                                </label>

                                <select
                                    name="severity"
                                    className="form-select rounded-3"
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
                                    <option>Open</option>
                                    <option>In Progress</option>
                                    <option>Closed</option>
                                </select>

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    className="form-control rounded-3"
                                    value={
                                        formData.location
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>

                        <div className="d-flex gap-2 mt-4">

                            <button
                                className="btn btn-dark px-4 rounded-3 d-flex align-items-center gap-2"
                                disabled={loading}
                            >

                                <Save size={16} />

                                {loading
                                    ? "Updating..."
                                    : "Update Incident"}

                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4 rounded-3 d-flex align-items-center gap-2"
                                onClick={() =>
                                    router.push(
                                        "/dashboard/incidents"
                                    )
                                }
                            >

                                <ArrowLeft size={16} />

                                Back

                            </button>

                        </div>
                    </form>

                </div>

            </div>

        </div>

    );

}