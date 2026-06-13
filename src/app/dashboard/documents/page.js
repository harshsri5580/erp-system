"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

import {
    Plus,
    Eye,
    Pencil,
    Trash2,
    Search,
    FileText,
} from "lucide-react";

export default function DocumentsPage() {

    const [documents, setDocuments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    useEffect(() => {

        fetchDocuments();

    }, []);

    const fetchDocuments =
        async () => {

            try {

                const res =
                    await fetch(
                        "/api/documents"
                    );

                const data =
                    await res.json();

                setDocuments(
                    data.documents || []
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

    const deleteDocument =
        async (id) => {

            const result =
                await Swal.fire({

                    title:
                        "Delete Document?",

                    text:
                        "This document will be permanently removed.",

                    icon: "warning",

                    showCancelButton: true,

                    confirmButtonText:
                        "Delete",

                    cancelButtonText:
                        "Cancel",

                    confirmButtonColor:
                        "#dc3545",

                });

            if (!result.isConfirmed)
                return;

            try {

                await fetch(
                    `/api/documents/${id}`,
                    {
                        method:
                            "DELETE",
                    }
                );

                toast.success(
                    "Document deleted successfully"
                );

                fetchDocuments();

            } catch (error) {

                console.log(error);

                toast.error(
                    "Failed to delete document"
                );

            }

        };

    const filteredDocuments =
        documents.filter(
            (doc) =>
                doc.title
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (

        <div className="container-fluid px-4 py-3">

            {/* Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2
                        className="fw-bold mb-1"
                        style={{
                            color: "#111827",
                        }}
                    >
                        Documents
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#6B7280",
                        }}
                    >
                        Manage project documents and files
                    </p>

                </div>

                <Link
                    href="/dashboard/documents/add"
                    className="btn btn-dark rounded-3 px-4 d-flex align-items-center gap-2"
                >
                    <>
                        <Plus size={18} />
                        Add Document
                    </>
                </Link>

            </div>

            {/* Card */}

            <div
                className="card border-0 rounded-4"
                style={{
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
                }}
            >

                <div className="card-body">

                    {/* Search */}

                    <div className="mb-4 position-relative">

                        <Search
                            size={18}
                            style={{
                                position: "absolute",
                                left: "14px",
                                top: "12px",
                                color: "#9CA3AF",
                            }}
                        />

                        <input
                            type="text"
                            className="form-control rounded-3 ps-5"
                            placeholder="Search documents..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* Table */}

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead
                                style={{
                                    background: "#F9FAFB",
                                }}
                            >

                                <tr>

                                    <th>ID</th>

                                    <th>Title</th>

                                    <th>Category</th>

                                    <th>Project</th>

                                    <th>Created</th>

                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {loading ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center"
                                        >
                                            Loading Documents...
                                        </td>

                                    </tr>

                                ) : filteredDocuments.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center"
                                        >
                                            <div className="py-5 text-center">

                                                <FileText
                                                    size={50}
                                                    className="mb-3 text-secondary"
                                                />

                                                <div className="fw-semibold">
                                                    No Documents Found
                                                </div>

                                                <div className="text-muted">
                                                    Upload your first document
                                                </div>

                                            </div>
                                        </td>

                                    </tr>

                                ) : (

                                    filteredDocuments.map(
                                        (doc) => (

                                            <tr
                                                key={doc.id}
                                            >

                                                <td>
                                                    {doc.id}
                                                </td>

                                                <td>
                                                    {doc.title}
                                                </td>

                                                <td>

                                                    <span
                                                        className="
    badge
    bg-light
    text-dark
    border
    px-3
    py-2
  "
                                                    >
                                                        {doc.category}
                                                    </span>

                                                </td>

                                                <td>
                                                    {
                                                        doc.project
                                                            ?.name
                                                    }
                                                </td>

                                                <td>
                                                    {new Date(
                                                        doc.createdAt
                                                    ).toLocaleDateString()}
                                                </td>

                                                <td>

                                                    <div className="d-flex gap-2">

                                                        <Link
                                                            href={`/dashboard/documents/view/${doc.id}`}
                                                            className="btn btn-outline-info btn-sm d-flex align-items-center gap-1"
                                                        >
                                                            <>
                                                                <Eye size={14} />
                                                                View
                                                            </>
                                                        </Link>

                                                        <Link
                                                            href={`/dashboard/documents/edit/${doc.id}`}
                                                            className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
                                                        >
                                                            <>
                                                                <Pencil size={14} />
                                                                Edit
                                                            </>
                                                        </Link>

                                                        <button
                                                            className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                                                            onClick={() =>
                                                                deleteDocument(
                                                                    doc.id
                                                                )
                                                            }
                                                        >
                                                            <>
                                                                <Trash2 size={14} />
                                                                Delete
                                                            </>
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}