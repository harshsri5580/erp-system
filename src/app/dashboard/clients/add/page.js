"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddClientPage() {

    const router = useRouter();

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

            await fetch("/api/clients", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),

            });

            router.push("/dashboard/clients");

        } catch (error) {

            console.log(error);

        }
    };

    return (

        <div className="w-100">

            <div className="card border-0 shadow-sm rounded-4 w-100">

                <div className="card-body p-4">

                    <h2 className="fw-bold mb-4">
                        Add Client
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Company Name
                                </label>

                                <input
                                    type="text"
                                    name="companyName"
                                    className="form-control"
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Owner Name
                                </label>

                                <input
                                    type="text"
                                    name="ownerName"
                                    className="form-control"
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    GST Number
                                </label>

                                <input
                                    type="text"
                                    name="gstNumber"
                                    className="form-control"
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    className="form-select"
                                    onChange={handleChange}
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>

                            </div>

                            <div className="col-12 mb-3">

                                <label className="form-label">
                                    Address
                                </label>

                                <textarea
                                    name="address"
                                    rows="4"
                                    className="form-control"
                                    onChange={handleChange}
                                ></textarea>

                            </div>

                        </div>

                        <button className="btn btn-dark px-4">
                            Save Client
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}