"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddInvoicePage() {

    const router = useRouter();

    const [clients, setClients] = useState([]);

    const [projects, setProjects] = useState([]);

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({

        // invoiceNumber: "",
        amount: "",
        gst: "",
        totalAmount: "",
        status: "Pending",
        issueDate:
            new Date()
                .toISOString()
                .split("T")[0],
        dueDate: "",
        notes: "",
        clientId: "",
        projectId: "",
    });

    const fetchClients = async () => {

        try {

            const response = await axios.get(
                "/api/clients"
            );

            setClients(response.data.clients);

        } catch (error) {

            console.log(error);
        }
    };

    const fetchProjects = async () => {

        try {

            const response = await axios.get(
                "/api/projects"
            );

            setProjects(response.data.projects);

        } catch (error) {

            console.log(error);
        }
    };

    useEffect(() => {

        fetchClients();

        fetchProjects();

        // const randomNumber =
        //     Math.floor(
        //         1000 + Math.random() * 9000
        //     );

        // const generatedInvoice =

        //     `INV-${new Date().getFullYear()}-${randomNumber}`;

        // setFormData((prev) => ({

        //     ...prev,

        //     invoiceNumber:
        //         generatedInvoice,

        // }));

    }, []);

    const handleChange = (e) => {

        const {
            name,
            value,
        } = e.target;

        const updatedData = {

            ...formData,

            [name]: value,
        };

        const amount =
            parseFloat(
                updatedData.amount || 0
            );

        const gst =
            parseFloat(
                updatedData.gst || 0
            );

        const gstAmount =
            (amount * gst) / 100;

        updatedData.totalAmount =
            (
                amount +
                gstAmount
            ).toFixed(2);

        setFormData(updatedData);
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response = await axios.post(
                "/api/invoices",
                formData
            );

            alert(response.data.message);

            router.push(
                "/dashboard/invoices"
            );

        } catch (error) {

            console.log(error);

            alert(
                error?.response?.data?.message ||
                "Something went wrong"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="container-fluid">

            <div className="card shadow border-0 rounded-4">

                <div className="card-header bg-dark text-white">

                    <h3>Create Invoice</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            {/* <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Invoice Number
                                </label>

                                <input
                                    type="text"
                                    name="invoiceNumber"
                                    className="form-control"
                                    value={formData.invoiceNumber}
                                    onChange={handleChange}
                                    readOnly
                                    required
                                />

                            </div> */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Client
                                </label>

                                <select
                                    name="clientId"
                                    className="form-select"
                                    value={formData.clientId}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Client
                                    </option>

                                    {clients.map((client) => (

                                        <option
                                            key={client.id}
                                            value={client.id}
                                        >
                                            {client.companyName}
                                        </option>

                                    ))}

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Project
                                </label>

                                <select
                                    name="projectId"
                                    className="form-select"
                                    value={formData.projectId}
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Project
                                    </option>

                                    {projects.map((project) => (

                                        <option
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.name}
                                        </option>

                                    ))}

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Amount
                                </label>

                                <input
                                    type="number"
                                    name="amount"
                                    className="form-control"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    GST
                                </label>

                                <select
                                    name="gst"
                                    className="form-select"
                                    value={formData.gst}
                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select GST
                                    </option>

                                    <option value="5">
                                        5%
                                    </option>

                                    <option value="12">
                                        12%
                                    </option>

                                    <option value="18">
                                        18%
                                    </option>

                                    <option value="28">
                                        28%
                                    </option>

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Total Amount
                                </label>

                                <input
                                    type="number"
                                    name="totalAmount"
                                    className="form-control"
                                    value={formData.totalAmount}
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Paid">
                                        Paid
                                    </option>

                                    <option value="Overdue">
                                        Overdue
                                    </option>

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Issue Date
                                </label>

                                <input
                                    type="date"
                                    name="issueDate"
                                    className="form-control"
                                    value={formData.issueDate}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Due Date
                                </label>

                                <input
                                    type="date"
                                    name="dueDate"
                                    className="form-control"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label">
                                    Notes
                                </label>

                                <textarea
                                    name="notes"
                                    rows="4"
                                    className="form-control"
                                    value={formData.notes}
                                    onChange={handleChange}
                                ></textarea>

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create Invoice"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}
