"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    useParams,
    useRouter,
} from "next/navigation";

import {
    ArrowLeft,
} from "lucide-react";

export default function ViewChangeOrderPage() {

    const params = useParams();
    const router = useRouter();

    const [changeOrder, setChangeOrder] =
        useState(null);

    useEffect(() => {

        if (params?.id) {
            fetchChangeOrder();
        }

    }, [params?.id]);
    const fetchChangeOrder =
        async () => {

            try {

                const response =
                    await axios.get(
                        `/api/change-orders/${params.id}`
                    );

                setChangeOrder(
                    response.data.changeOrder
                );

            } catch (error) {

                console.log(error);

            }

        };

    if (!changeOrder) {

        return (
            <div className="container-fluid px-4 py-3">
                <div className="card border-0 rounded-4">
                    <div className="card-body text-center py-5">
                        Loading Change Order...
                    </div>
                </div>
            </div>
        );

    }

    return (

        <div className="container-fluid px-4 py-3">

            <div
                className="card border-0 rounded-4"
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,0.06)",
                }}
            >

                <div className="card-body p-4 p-lg-5">

                    <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">

                        <div>

                            <h2
                                className="fw-bold mb-1"
                                style={{
                                    color: "#111827",
                                }}
                            >
                                Change Order Details
                            </h2>

                            <p
                                className="mb-0"
                                style={{
                                    color: "#6B7280",
                                }}
                            >
                                View contract variation details
                            </p>

                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-secondary d-flex align-items-center gap-2"
                            onClick={() =>
                                router.push(
                                    "/dashboard/change-orders"
                                )
                            }
                        >
                            <ArrowLeft size={16} />
                            Back
                        </button>

                    </div>

                    <div className="row g-4">

                        <div className="col-md-6">
                            <div className="border rounded-4 p-3 h-100">
                                <small className="text-muted">
                                    CO Number
                                </small>

                                <h5 className="fw-bold mb-0">
                                    {changeOrder.coNumber}
                                </h5>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="border rounded-4 p-3 h-100">
                                <small className="text-muted">
                                    Project
                                </small>

                                <h5 className="fw-bold mb-0">
                                    {changeOrder.project?.name}
                                </h5>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="border rounded-4 p-3 h-100">
                                <small className="text-muted">
                                    Client
                                </small>

                                <h5 className="mb-0">
                                    {changeOrder.client?.companyName}
                                </h5>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="border rounded-4 p-3 h-100">
                                <small className="text-muted">
                                    Raised By
                                </small>

                                <h5 className="mb-0">
                                    {changeOrder.user?.name}
                                </h5>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="border rounded-4 p-3">
                                <small className="text-muted">
                                    Title
                                </small>

                                <h5 className="fw-bold mb-0">
                                    {changeOrder.title}
                                </h5>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="border rounded-4 p-3">
                                <small className="text-muted">
                                    Old Amount
                                </small>

                                <h4 className="text-danger fw-bold mb-0">
                                    ₹{changeOrder.oldAmount}
                                </h4>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="border rounded-4 p-3">
                                <small className="text-muted">
                                    New Amount
                                </small>

                                <h4 className="text-primary fw-bold mb-0">
                                    ₹{changeOrder.newAmount}
                                </h4>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="border rounded-4 p-3">
                                <small className="text-muted">
                                    Difference
                                </small>

                                <h4 className="text-success fw-bold mb-0">
                                    ₹{changeOrder.differenceAmount}
                                </h4>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="border rounded-4 p-3">
                                <small className="text-muted">
                                    Status
                                </small>

                                <div className="mt-2">
                                    <span
                                        className={`badge px-3 py-2 ${changeOrder.status === "Approved"
                                            ? "bg-success"
                                            : changeOrder.status === "Rejected"
                                                ? "bg-danger"
                                                : changeOrder.status === "Submitted"
                                                    ? "bg-warning text-dark"
                                                    : "bg-secondary"
                                            }`}
                                    >
                                        {changeOrder.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="border rounded-4 p-3">
                                <small className="text-muted">
                                    Approved Date
                                </small>

                                <h6 className="mb-0 mt-2">
                                    {changeOrder.approvedDate
                                        ? new Date(
                                            changeOrder.approvedDate
                                        ).toLocaleDateString()
                                        : "-"}
                                </h6>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="border rounded-4 p-4">
                                <small className="text-muted">
                                    Description
                                </small>

                                <p className="mb-0 mt-2">
                                    {changeOrder.description ||
                                        "No description available"}
                                </p>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="border rounded-4 p-4">
                                <small className="text-muted">
                                    Reason
                                </small>

                                <p className="mb-0 mt-2">
                                    {changeOrder.reason ||
                                        "No reason provided"}
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}