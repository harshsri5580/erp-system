"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditClientPage() {

    const { id } = useParams();

    const router = useRouter();

    const [formData, setFormData] = useState({
        companyName: "",
        ownerName: "",
        email: "",
        phone: "",
        gstNumber: "",
        address: "",
        status: "",
    });

    useEffect(() => {
        fetchClient();
    }, []);

    const fetchClient = async () => {

        const res = await fetch(`/api/clients/${id}`);

        const data = await res.json();

        setFormData(data.client);
    };

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await fetch(`/api/clients/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify(formData),

        });

        router.push("/dashboard/clients");
    };

    return (

        <div className="container-fluid">

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-4">

                    <h2 className="fw-bold mb-4">
                        Edit Client
                    </h2>

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label>Company Name</label>

                                <input
                                    type="text"
                                    name="companyName"
                                    className="form-control"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Owner Name</label>

                                <input
                                    type="text"
                                    name="ownerName"
                                    className="form-control"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Email</label>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Phone</label>

                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>GST Number</label>

                                <input
                                    type="text"
                                    name="gstNumber"
                                    className="form-control"
                                    value={formData.gstNumber}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label>Status</label>

                                <select
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>

                            </div>

                            <div className="col-12 mb-3">

                                <label>Address</label>

                                <textarea
                                    name="address"
                                    rows="4"
                                    className="form-control"
                                    value={formData.address}
                                    onChange={handleChange}
                                ></textarea>

                            </div>

                        </div>

                        <button className="btn btn-dark">
                            Update Client
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}