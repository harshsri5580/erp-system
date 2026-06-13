"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
    ArrowLeft,
    Pencil,
    FileText,
    FolderOpen,
} from "lucide-react";
import Link from "next/link";

export default function ViewDocumentPage() {

    const params =
        useParams();
    const router = useRouter();
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
            <div className="container-fluid p-4 text-center">
                <div className="py-5">
                    Loading Document...
                </div>
            </div>
        );

    }

    if (!document) {

        return (
            <div className="container-fluid p-4 text-center">
                <div className="py-5">
                    <h4>Document Not Found</h4>
                </div>
            </div>
        );

    }

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
                        Document Details
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#6B7280",
                        }}
                    >
                        View document information
                    </p>

                </div>

                <div className="d-flex gap-2">

                    <Link
                        href={`/dashboard/documents/edit/${document.id}`}
                        className="btn btn-dark d-flex align-items-center gap-2"
                    >
                        <Pencil size={16} />
                        Edit
                    </Link>

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

            </div>

            <div
                className="card border-0 rounded-4"
                style={{
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
                }}
            >

                <div className="card-body">

                    <div className="row g-4">

                        <div className="col-md-6">

                            <label
                                className="fw-semibold mb-2"
                                style={{
                                    color: "#6B7280",
                                }}
                            >
                                Title
                            </label>

                            <div className="fw-bold fs-5">
                                {document.title}
                            </div>

                        </div>

                        <div className="col-md-6">

                            <label
                                className="fw-semibold mb-2"
                                style={{
                                    color: "#6B7280",
                                }}
                            >
                                Category
                            </label>

                            <div>
                                {document.category}
                            </div>

                        </div>

                        <div className="col-md-6">

                            <label
                                className="fw-semibold mb-2"
                                style={{
                                    color: "#6B7280",
                                }}
                            >
                                Project
                            </label>

                            <div className="d-flex align-items-center gap-2">

                                <FolderOpen size={16} />

                                {document.project?.name || "-"}

                            </div>

                        </div>

                        <div className="col-md-6">

                            <label
                                className="fw-semibold mb-2"
                                style={{
                                    color: "#6B7280",
                                }}
                            >
                                File Type
                            </label>

                            <span className="badge bg-primary">
                                {document.fileType}
                            </span>

                        </div>

                        <div className="col-12">

                            <label
                                className="fw-semibold mb-2"
                                style={{
                                    color: "#6B7280",
                                }}
                            >
                                Remarks
                            </label>

                            <div
                                className="p-3 rounded-3"
                                style={{
                                    background: "#F9FAFB",
                                }}
                            >
                                {document.remarks || "-"}
                            </div>

                        </div>

                        <div className="col-12">

                            <label
                                className="fw-semibold mb-2"
                                style={{
                                    color: "#6B7280",
                                }}
                            >
                                File
                            </label>

                            <div className="mt-2">

                                <a
                                    href={
                                        document.fileUrl
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-dark d-inline-flex align-items-center gap-2"
                                >
                                    <>
                                        <FileText size={16} />
                                        Open File
                                    </>
                                </a>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}