"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditDocumentPage() {

    const params =
        useParams();

    const router =
        useRouter();

    const [loading, setLoading] =
        useState(false);

    const [projects, setProjects] =
        useState([]);

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

        fetchDocument();

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

    const fetchDocument =
        async () => {

            try {

                const res =
                    await fetch(
                        `/api/documents/${params.id}`
                    );

                const data =
                    await res.json();

                const doc =
                    data.document;

                setFormData({

                    title:
                        doc.title || "",

                    category:
                        doc.category || "",

                    remarks:
                        doc.remarks || "",

                    projectId:
                        doc.projectId
                            ?.toString() || "",

                    file: null,

                });

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
                        `/api/documents/${params.id}`,
                        {
                            method:
                                "PUT",
                            body:
                                payload,
                        }
                    );

                const data =
                    await res.json();

                if (
                    data.success
                ) {

                    alert(
                        "Document updated successfully"
                    );

                    router.push(
                        "/dashboard/documents"
                    );

                } else {

                    alert(
                        data.message ||
                        "Failed to update document"
                    );

                }

            } catch (error) {

                console.log(error);

                alert(
                    "Something went wrong"
                );

            } finally {

                setLoading(false);

            }

        };

    return (

        <div className="container-fluid p-4">

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-header bg-warning">

                    <h3 className="mb-0">
                        Edit Document
                    </h3>

                </div>

                <div className="card-body">

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            {/* Title */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Document Title
                                </label>

                                <input
                                    type="text"
                                    required
                                    className="form-control"
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

                                <label className="form-label">
                                    Category
                                </label>

                                <select
                                    required
                                    className="form-select"
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

                                <label className="form-label">
                                    Project
                                </label>

                                <select
                                    className="form-select"
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

                            {/* Replace File */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Replace File
                                </label>

                                <input
                                    type="file"
                                    className="form-control"
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

                                <label className="form-label">
                                    Remarks
                                </label>

                                <textarea
                                    rows="4"
                                    className="form-control"
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

                        <div className="d-flex gap-2">

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn btn-warning"
                            >

                                {loading
                                    ? "Updating..."
                                    : "Update Document"}

                            </button>

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() =>
                                    router.push(
                                        "/dashboard/documents"
                                    )
                                }
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}