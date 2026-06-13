"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    useParams,
    useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

import {
    ClipboardCheck,
    Save,
    ArrowLeft,
    MapPin,
} from "lucide-react";

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

                toast.success(
                    "Inspection updated successfully"
                );

                setTimeout(() => {

                    router.push(
                        "/dashboard/inspections"
                    );

                }, 1000);

            } catch (error) {

                console.log(error);

                toast.error(
                    error?.response?.data?.message ||
                    "Failed to update inspection"
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
                    maxWidth: "1200px",
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
                                    Edit Inspection
                                </h2>

                                <p
                                    className="mb-0"
                                    style={{
                                        color: "#6B7280",
                                    }}
                                >
                                    Update inspection information and records
                                </p>

                            </div>

                            <ClipboardCheck
                                size={36}
                                color="#2563EB"
                            />

                        </div>

                    </div>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >
                        <div
                            className="p-4 rounded-4 mb-4"
                            style={{
                                background: "#F8FAFC",
                                border:
                                    "1px solid #E5E7EB",
                            }}
                        >

                            <h5
                                className="fw-bold mb-0"
                                style={{
                                    color: "#111827",
                                }}
                            >
                                Inspection Information
                            </h5>

                        </div>
                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Inspection Number
                                </label>

                                <input
                                    className="form-control rounded-3"
                                    style={{
                                        background: "#F8FAFC",
                                        fontWeight: "600",
                                    }}
                                    value={
                                        formData.inspectionNumber
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Inspection Date
                                </label>

                                <input
                                    type="date"
                                    name="inspectionDate"
                                    className="form-control rounded-3"
                                    value={
                                        formData.inspectionDate
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

                                <label className="form-label fw-semibold text-dark">
                                    Inspector
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

                                <label className="form-label fw-semibold text-dark">
                                    Inspection Type
                                </label>

                                <select
                                    name="inspectionType"
                                    className="form-select rounded-3"
                                    value={formData.inspectionType}
                                    onChange={handleChange}
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

                                <label className="form-label fw-semibold text-dark">
                                    Location
                                </label>

                                <div className="position-relative">

                                    <MapPin
                                        size={18}
                                        style={{
                                            position: "absolute",
                                            left: "14px",
                                            top: "12px",
                                            color: "#6B7280",
                                        }}
                                    />

                                    <input
                                        name="location"
                                        className="form-control rounded-3 ps-5"
                                        value={formData.location}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Checklist
                                </label>

                                <textarea
                                    rows="5"
                                    name="checklist"
                                    className="form-control rounded-3"
                                    value={
                                        formData.checklist
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Remarks
                                </label>

                                <textarea
                                    rows="4"
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

                        <div className="d-flex gap-2 mt-4">

                            <button
                                className="btn btn-dark px-4 rounded-3 d-flex align-items-center gap-2"
                                disabled={loading}
                            >

                                <Save size={16} />

                                {loading
                                    ? "Updating..."
                                    : "Update Inspection"}

                            </button>

                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4 rounded-3 d-flex align-items-center gap-2"
                                onClick={() =>
                                    router.push(
                                        "/dashboard/inspections"
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