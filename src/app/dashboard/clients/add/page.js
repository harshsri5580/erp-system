"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function AddClientPage() {

    const router = useRouter();
    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] = useState({
        companyName: "",
        ownerName: "",
        email: "",
        phone: "",
        gstNumber: "",
        address: "",
        status: "Active",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await fetch("/api/clients", {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify(formData),
            });

            toast.success(
                "Client created successfully"
            );

            setTimeout(() => {
                router.push(
                    "/dashboard/clients"
                );
            }, 1000);

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to create client"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="container-fluid px-4 py-3">

            <div
                className="card border-0 rounded-4"
                style={{
                    maxWidth: "1000px",
                    margin: "0 auto",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
                }}
            >

                <div className="card-body p-4">

                    <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">

                        <div>
                            <h2
                                className="fw-bold mb-1"
                                style={{ color: "#111827" }}
                            >
                                Add Client
                            </h2>

                            <p
                                className="mb-0"
                                style={{ color: "#6B7280" }}
                            >
                                Create new client profile
                            </p>
                        </div>

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

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Company Name
                                </label>

                                <input
                                    type="text"
                                    name="companyName"
                                    className="form-control rounded-3"
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Owner Name
                                </label>

                                <input
                                    type="text"
                                    name="ownerName"
                                    className="form-control rounded-3"
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control rounded-3"
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control rounded-3"
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    GST Number
                                </label>

                                <input
                                    type="text"
                                    name="gstNumber"
                                    className="form-control rounded-3"
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    className="form-select rounded-3"
                                    onChange={handleChange}
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>

                            </div>

                            <div className="col-12 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    rows="4"
                                    className="form-control rounded-3"
                                    onChange={handleChange}
                                ></textarea>

                            </div>

                        </div>

                        <button
                            className="btn btn-dark px-4"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : "Save Client"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}