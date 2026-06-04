"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ViewDocumentPage() {

    const params =
        useParams();

    const [document, setDocument] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchDocument();

    }, []);

    const fetchDocument =
        async () => {

            try {

                const res =
                    await fetch(
                        `/api/documents/${params.id}`
                    );

                const data =
                    await res.json();

                setDocument(
                    data.document
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

    if (loading) {

        return (

            <div className="container-fluid p-4">

                Loading...

            </div>

        );

    }

    if (!document) {

        return (

            <div className="container-fluid p-4">

                Document not found

            </div>

        );

    }

    return (

        <div className="container-fluid p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="page-title">
                        View Document
                    </h2>

                    <p className="page-subtitle">
                        Document details
                    </p>

                </div>

                <div className="d-flex gap-2">

                    <Link
                        href={`/dashboard/documents/edit/${document.id}`}
                        className="btn btn-warning"
                    >
                        Edit
                    </Link>

                    <Link
                        href="/dashboard/documents"
                        className="btn btn-secondary"
                    >
                        Back
                    </Link>

                </div>

            </div>

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body">

                    <div className="row g-4">

                        <div className="col-md-6">

                            <label className="fw-bold">
                                Title
                            </label>

                            <div>
                                {document.title}
                            </div>

                        </div>

                        <div className="col-md-6">

                            <label className="fw-bold">
                                Category
                            </label>

                            <div>
                                {document.category}
                            </div>

                        </div>

                        <div className="col-md-6">

                            <label className="fw-bold">
                                Project
                            </label>

                            <div>
                                {
                                    document.project
                                        ?.name
                                }
                            </div>

                        </div>

                        <div className="col-md-6">

                            <label className="fw-bold">
                                File Type
                            </label>

                            <div>
                                {
                                    document.fileType
                                }
                            </div>

                        </div>

                        <div className="col-12">

                            <label className="fw-bold">
                                Remarks
                            </label>

                            <div>
                                {
                                    document.remarks
                                }
                            </div>

                        </div>

                        <div className="col-12">

                            <label className="fw-bold">
                                File
                            </label>

                            <div className="mt-2">

                                <a
                                    href={
                                        document.fileUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-primary"
                                >
                                    Open File
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}