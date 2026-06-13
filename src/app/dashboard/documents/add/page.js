"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function AddDocumentPage() {

    const router =
        useRouter();

    const [projects, setProjects] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({

            title: "",

            category: "",

            remarks: "",

            projectId: "",

            file: null,

        });

    useEffect(() => {

        fetchProjects();

    }, []);

    const fetchProjects =
        async () => {

            try {

                const res =
                    await fetch(
                        "/api/projects"
                    );

                const data =
                    await res.json();

                setProjects(
                    data.projects || []
                );

            } catch (error) {

                console.log(error);

            }

        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                const payload =
                    new FormData();

                payload.append(
                    "title",
                    formData.title
                );

                payload.append(
                    "category",
                    formData.category
                );

                payload.append(
                    "remarks",
                    formData.remarks
                );

                payload.append(
                    "projectId",
                    formData.projectId
                );

                if (
                    formData.file
                ) {

                    payload.append(
                        "file",
                        formData.file
                    );

                }

                const res =
                    await fetch(
                        "/api/documents",
                        {
                            method:
                                "POST",
                            body:
                                payload,
                        }
                    );

                const data =
                    await res.json();

                if (
                    data.success
                ) {

                    toast.success(
                        "Document uploaded successfully"
                    );

                    setTimeout(() => {

                        router.push(
                            "/dashboard/documents"
                        );

                    }, 1000);

                } else {

                    toast.error(
                        data.message ||
                        "Failed to upload document"
                    );

                }

            } catch (error) {

                console.log(error);

                toast.error(
                    "Something went wrong"
                );

            } finally {

                setLoading(false);

            }

        };

    return (

        <div className="container-fluid px-4 py-3">

            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">

                <div>

                    <h2
                        className="fw-bold mb-1"
                        style={{
                            color: "#111827",
                        }}
                    >
                        Add Document
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#6B7280",
                        }}
                    >
                        Upload and manage project documents
                    </p>

                </div>

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() =>
                        router.push(
                            "/dashboard/documents"
                        )
                    }
                >
                    <ArrowLeft size={16} />
                </button>

            </div>

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

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            {/* Title */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Document Title
                                </label>

                                <input
                                    type="text"
                                    required
                                    className="form-control rounded-3"
                                    value={
                                        formData.title
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            title:
                                                e.target.value,
                                        })
                                    }
                                />

                            </div>

                            {/* Category */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Category
                                </label>

                                <select
                                    required
                                    className="form-select rounded-3"
                                    value={
                                        formData.category
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            category:
                                                e.target.value,
                                        })
                                    }
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    <option value="Contract">
                                        Contract
                                    </option>

                                    <option value="BOQ">
                                        BOQ
                                    </option>

                                    <option value="Drawing">
                                        Drawing
                                    </option>

                                    <option value="Invoice">
                                        Invoice
                                    </option>

                                    <option value="Purchase Order">
                                        Purchase Order
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>

                            {/* Project */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Project
                                </label>

                                <select
                                    className="form-select rounded-3"
                                    value={
                                        formData.projectId
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            projectId:
                                                e.target.value,
                                        })
                                    }
                                >

                                    <option value="">
                                        Select Project
                                    </option>

                                    {projects.map(
                                        (project) => (

                                            <option
                                                key={project.id}
                                                value={project.id}
                                            >
                                                {project.name}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            {/* File Upload */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Upload File
                                </label>

                                <input
                                    type="file"
                                    className="form-control rounded-3"
                                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            file:
                                                e.target.files[0],
                                        })
                                    }
                                />

                            </div>

                            {/* Remarks */}

                            <div className="col-12 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Remarks
                                </label>

                                <textarea
                                    rows="5"
                                    className="form-control rounded-3"
                                    placeholder="Document notes or remarks..."
                                    value={
                                        formData.remarks
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            remarks:
                                                e.target.value,
                                        })
                                    }
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-dark px-4"
                        >

                            {loading
                                ? "Uploading..."
                                : "Save Document"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}