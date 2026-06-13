"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
    ShieldAlert,
    Save,
    ArrowLeft,
} from "lucide-react";

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

                toast.error("Please select project");

                return;

            }

            if (
                !formData.userId
            ) {

                toast.error("Please select reporter");

                return;

            }

            if (
                !formData.title
            ) {

                toast.error("Please enter incident title");

                return;

            }

            try {

                setLoading(true);

                await axios.post(
                    "/api/incidents",
                    formData
                );

                toast.success(
                    "Incident created successfully"
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
                    "Failed to create incident"
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
                                    Incident Report
                                </h2>

                                <p
                                    className="mb-0"
                                    style={{
                                        color: "#6B7280",
                                    }}
                                >
                                    Create and record a new incident
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

                                <label className="form-label">

                                    Incident Number

                                </label>

                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    style={{
                                        background: "#F8FAFC",
                                        fontWeight: "600",
                                    }}
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
                                    className="form-select rounded-3"
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
                                    className="form-select rounded-3"
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

                        <div className="d-flex gap-2 mt-4">

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-dark px-4 rounded-3 d-flex align-items-center gap-2"
                            >

                                <Save size={16} />

                                {loading
                                    ? "Saving..."
                                    : "Save Incident"}

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