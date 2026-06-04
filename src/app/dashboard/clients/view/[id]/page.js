"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ViewClientPage() {

    const { id } = useParams();

    const [client, setClient] = useState(null);

    useEffect(() => {
        fetchClient();
    }, []);

    const fetchClient = async () => {

        const res = await fetch(`/api/clients/${id}`);

        const data = await res.json();

        setClient(data.client);
    };

    if (!client) {

        return (
            <div className="p-4">
                Loading...
            </div>
        );
    }

    return (

        <div className="w-100">

            <div
                className="card shadow border-0 rounded-4 w-100"
                style={{
                    width: "100%",
                }}
            >
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">

                    <h3 className="mb-0">
                        Client Details
                    </h3>

                    <span
                        className={`badge ${client.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                            }`}
                    >
                        {client.status}
                    </span>

                </div>

                <div className="card-body">


                    <div className="row">

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Company Name
                            </h6>

                            <p className="fw-semibold">
                                {client.companyName}
                            </p>

                        </div>

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Owner Name
                            </h6>

                            <p className="fw-semibold">
                                {client.ownerName}
                            </p>

                        </div>

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Email
                            </h6>

                            <p className="fw-semibold">
                                {client.email}
                            </p>

                        </div>

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Phone
                            </h6>

                            <p className="fw-semibold">
                                {client.phone}
                            </p>

                        </div>

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                GST Number
                            </h6>

                            <p className="fw-semibold">
                                {client.gstNumber}
                            </p>

                        </div>

                        <div className="col-12 mb-4">

                            <h6 className="text-muted">
                                Address
                            </h6>

                            <p className="fw-semibold">
                                {client.address}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}