"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

            if (
                !confirm(
                    "Delete document?"
                )
            ) {
                return;
            }

            try {

                await fetch(
                    `/api/documents/${id}`,
                    {
                        method:
                            "DELETE",
                    }
                );

                fetchDocuments();

            } catch (error) {

                console.log(error);

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

        <div className="container-fluid p-4">

            {/* Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="page-title">
                        Documents
                    </h2>

                    <p className="page-subtitle">
                        Manage project documents
                    </p>

                </div>

                <Link
                    href="/dashboard/documents/add"
                    className="btn btn-primary"
                >
                    Add Document
                </Link>

            </div>

            {/* Card */}

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body">

                    {/* Search */}

                    <div className="mb-3">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search document..."
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

                        <table className="table align-middle">

                            <thead className="table-dark">

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
                                            Loading...
                                        </td>

                                    </tr>

                                ) : filteredDocuments.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center"
                                        >
                                            No Documents Found
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
                                                    {doc.category}
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
                                                            className="btn btn-info btn-sm"
                                                        >
                                                            View
                                                        </Link>

                                                        <Link
                                                            href={`/dashboard/documents/edit/${doc.id}`}
                                                            className="btn btn-warning btn-sm"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() =>
                                                                deleteDocument(
                                                                    doc.id
                                                                )
                                                            }
                                                        >
                                                            Delete
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