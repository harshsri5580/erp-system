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
    Building2,
} from "lucide-react";

export default function ClientsPage() {

    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {

        try {

            const res = await fetch("/api/clients");

            const data = await res.json();

            setClients(data.clients || []);

        } catch (error) {

            console.log(error);

        }
    };

    const deleteClient = async (id) => {

        const result =
            await Swal.fire({

                title: "Delete Client?",

                text:
                    "This client record will be permanently removed.",

                icon: "warning",

                showCancelButton: true,

                confirmButtonText:
                    "Yes, Delete",

                cancelButtonText:
                    "Cancel",

                reverseButtons: true,

                confirmButtonColor:
                    "#dc3545",

                cancelButtonColor:
                    "#6c757d",

                customClass: {
                    popup: "rounded-4",
                },

            });

        if (!result.isConfirmed)
            return;

        try {

            await fetch(
                `/api/clients/${id}`,
                {
                    method: "DELETE",
                }
            );

            toast.success(
                "Client deleted successfully"
            );

            fetchClients();

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to delete client"
            );

        }

    };
    return (

        <div className="container-fluid px-4 py-3">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>

                    <h2
                        className="fw-bold mb-1"
                        style={{
                            color: "#111827",
                        }}
                    >
                        Clients Management
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#6B7280",
                        }}
                    >
                        Manage all company clients and contacts
                    </p>

                </div>

                <Link
                    href="/dashboard/clients/add"
                    className="btn btn-dark rounded-3 px-4 d-flex align-items-center gap-2"
                >
                    <>
                        <Plus size={18} />
                        Add Client
                    </>
                </Link>

            </div>

            {/* TABLE */}

            <div
                className="card border-0 rounded-4"
                style={{
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,0.06)",
                }}
            >

                <div className="card-body p-4">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead
                                style={{
                                    background: "#F9FAFB",
                                }}
                            >

                                <tr>

                                    <th className="fw-semibold text-secondary">
                                        ID
                                    </th>
                                    <th>Company</th>
                                    <th>Owner</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {clients.length > 0 ? (

                                    clients.map((client) => (

                                        <tr key={client.id}>

                                            <td>{client.id}</td>

                                            <td className="fw-semibold">
                                                {client.companyName}
                                            </td>

                                            <td>{client.ownerName}</td>

                                            <td>{client.email}</td>

                                            <td>{client.phone}</td>

                                            <td>

                                                <span
                                                    className={`badge rounded-pill px-3 py-2 ${client.status === "Active"
                                                        ? "bg-success"
                                                        : "bg-secondary"
                                                        }`}
                                                >
                                                    {client.status}
                                                </span>

                                            </td>

                                            <td>

                                                <div className="d-flex gap-2 flex-wrap">

                                                    <Link
                                                        href={`/dashboard/clients/view/${client.id}`}
                                                        className="btn btn-outline-info btn-sm d-flex align-items-center gap-1"
                                                    >
                                                        <>
                                                            <Eye size={14} />
                                                            View
                                                        </>
                                                    </Link>

                                                    <Link
                                                        href={`/dashboard/clients/edit/${client.id}`}
                                                        className="btn btn-warning btn-sm text-dark d-flex align-items-center gap-1"
                                                    >
                                                        <>
                                                            <Pencil size={14} />
                                                            Edit
                                                        </>
                                                    </Link>

                                                    <button
                                                        onClick={() => deleteClient(client.id)}
                                                        className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                                                    >
                                                        <>
                                                            <Trash2 size={14} />
                                                            Delete
                                                        </>
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center py-5"
                                        >

                                            <Building2
                                                size={45}
                                                className="mb-3 text-secondary"
                                            />

                                            <div className="fw-semibold">
                                                No Clients Found
                                            </div>

                                            <div className="text-muted">
                                                Create your first client record
                                            </div>

                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    );
}