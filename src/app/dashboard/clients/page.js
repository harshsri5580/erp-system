"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

        const confirmDelete = confirm(
            "Are you sure you want to delete this client?"
        );

        if (!confirmDelete) return;

        try {

            await fetch(`/api/clients/${id}`, {
                method: "DELETE",
            });

            fetchClients();

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="container-fluid">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h3 className="page-title">
                        Clients Management
                    </h3>

                    <p className="page-subtitle">
                        Manage all company clients
                    </p>

                </div>

                <Link
                    href="/dashboard/clients/add"
                    className="btn btn-dark rounded-3 px-4"
                >
                    Add Client
                </Link>

            </div>

            {/* TABLE */}

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body">

                    <div className="table-responsive">

                        <table className="table align-middle">

                            <thead className="table-dark">

                                <tr>

                                    <th>ID</th>
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

                                            <td>{client.companyName}</td>

                                            <td>{client.ownerName}</td>

                                            <td>{client.email}</td>

                                            <td>{client.phone}</td>

                                            <td>

                                                <span
                                                    className={`badge ${client.status === "Active"
                                                        ? "bg-success"
                                                        : "bg-secondary"
                                                        }`}
                                                >
                                                    {client.status}
                                                </span>

                                            </td>

                                            <td>

                                                <div className="d-flex gap-2">

                                                    <Link
                                                        href={`/dashboard/clients/view/${client.id}`}
                                                        className="btn btn-info btn-sm text-white"
                                                    >
                                                        View
                                                    </Link>

                                                    <Link
                                                        href={`/dashboard/clients/edit/${client.id}`}
                                                        className="btn btn-warning btn-sm text-dark"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        onClick={() => deleteClient(client.id)}
                                                        className="btn btn-danger btn-sm"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="7"
                                            className="text-center py-4"
                                        >
                                            No Clients Found
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