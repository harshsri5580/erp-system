"use client";

import { useEffect, useState } from "react";
import {
    useParams,
    useRouter,
} from "next/navigation";

import {
    ArrowLeft,
    Building2,
} from "lucide-react";

export default function ViewClientPage() {

    const { id } = useParams();
    const router = useRouter();

    const [client, setClient] = useState(null);

    useEffect(() => {
        if (id) {
            fetchClient();
        }
    }, [id]);

    const fetchClient = async () => {

        const res = await fetch(`/api/clients/${id}`);

        const data = await res.json();

        setClient(data.client);
    };

    if (!client) {

        return (
            <div className="container-fluid px-4 py-3">
                <div className="card border-0 rounded-4">
                    <div className="card-body text-center py-5">
                        Loading Client Details...
                    </div>
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
                        Client Details
                    </h2>

                    <p
                        className="mb-0"
                        style={{
                            color: "#6B7280",
                        }}
                    >
                        View client information
                    </p>

                </div>

                <div className="d-flex align-items-center gap-2">

                    <span
                        className={`badge rounded-pill px-3 py-2 ${client.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                            }`}
                    >
                        {client.status}
                    </span>

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                            router.push("/dashboard/clients")
                        }
                    >
                        <ArrowLeft size={16} />
                    </button>

                </div>

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