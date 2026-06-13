"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
    ArrowLeft,
} from "lucide-react";

import toast from "react-hot-toast";

export default function AddEquipmentPage() {

    const router =
        useRouter();

    const [projects, setProjects] =
        useState([]);

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({

            equipmentCode:
                `EQ-${Date.now()}`,

            equipmentName: "",

            category: "",

            brand: "",

            modelNo: "",

            serialNumber: "",

            projectId: "",

            userId: "",

            location: "",

            purchaseDate: "",

            purchaseCost: "",

            currentValue: "",

            totalUsageHours: 0,

            lastMaintenanceDate: "",

            nextMaintenanceDate: "",

            maintenanceCost: 0,

            maintenanceRemarks: "",

            status: "Available",

            remarks: "",

        });

    useEffect(() => {

        loadProjects();

        loadUsers();

    }, []);

    const loadProjects =
        async () => {

            try {

                const res =
                    await axios.get(
                        "/api/projects"
                    );

                setProjects(
                    res.data.projects || []
                );

            } catch (error) {

                console.log(error);

            }

        };

    const loadUsers =
        async () => {

            try {

                const res =
                    await axios.get(
                        "/api/users"
                    );

                setUsers(
                    res.data.users || []
                );

            } catch (error) {

                console.log(error);

            }

        };

    const handleChange =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value,

            });

        };

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                await axios.post(
                    "/api/equipment",
                    formData
                );

                toast.success(
                    "Equipment created successfully"
                );

                setTimeout(() => {

                    router.push(
                        "/dashboard/equipment"
                    );

                }, 1000);

            } catch (error) {

                console.log(error);

                toast.error(
                    error?.response?.data?.message ||
                    "Failed to create equipment"
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
                    maxWidth: "1200px",
                    margin: "0 auto",
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
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
                                Add Equipment
                            </h2>

                            <p
                                className="mb-0"
                                style={{
                                    color: "#6B7280",
                                }}
                            >
                                Register and manage company equipment
                            </p>

                        </div>

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() =>
                                router.push(
                                    "/dashboard/equipment"
                                )
                            }
                        >
                            <ArrowLeft size={16} />
                        </button>

                    </div>
                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Equipment Code

                                </label>

                                <input
                                    type="text"
                                    className="form-control rounded-3"
                                    value={
                                        formData.equipmentCode
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Equipment Name

                                </label>

                                <input
                                    type="text"
                                    name="equipmentName"
                                    className="form-control rounded-3"
                                    value={
                                        formData.equipmentName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Category

                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    className="form-control rounded-3"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="e.g. Crane, JCB, Welding Machine, Tower Light"
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Brand

                                </label>

                                <input
                                    type="text"
                                    name="brand"
                                    className="form-control rounded-3"
                                    value={
                                        formData.brand
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Model No

                                </label>

                                <input
                                    type="text"
                                    name="modelNo"
                                    className="form-control rounded-3"
                                    value={
                                        formData.modelNo
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Serial Number

                                </label>

                                <input
                                    type="text"
                                    name="serialNumber"
                                    className="form-control rounded-3"
                                    value={
                                        formData.serialNumber
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Location

                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    className="form-control rounded-3"
                                    value={
                                        formData.location
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Project

                                </label>

                                <select
                                    name="projectId"
                                    className="form-select rounded-3"
                                    value={
                                        formData.projectId
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="">
                                        Select Project
                                    </option>

                                    {projects.map(
                                        (item) => (

                                            <option
                                                key={
                                                    item.id
                                                }
                                                value={
                                                    item.id
                                                }
                                            >

                                                {
                                                    item.name
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Assigned User

                                </label>

                                <select
                                    name="userId"
                                    className="form-select rounded-3"
                                    value={
                                        formData.userId
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option value="">
                                        Select User
                                    </option>

                                    {users.map(
                                        (item) => (

                                            <option
                                                key={
                                                    item.id
                                                }
                                                value={
                                                    item.id
                                                }
                                            >

                                                {
                                                    item.name
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Purchase Date

                                </label>

                                <input
                                    type="date"
                                    name="purchaseDate"
                                    className="form-control rounded-3"
                                    value={
                                        formData.purchaseDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Purchase Cost

                                </label>

                                <input
                                    type="number"
                                    name="purchaseCost"
                                    className="form-control rounded-3"
                                    value={
                                        formData.purchaseCost
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Current Value

                                </label>

                                <input
                                    type="number"
                                    name="currentValue"
                                    className="form-control rounded-3"
                                    value={
                                        formData.currentValue
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Usage Hours

                                </label>

                                <input
                                    type="number"
                                    name="totalUsageHours"
                                    className="form-control rounded-3"
                                    value={
                                        formData.totalUsageHours
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Last Maintenance

                                </label>

                                <input
                                    type="date"
                                    name="lastMaintenanceDate"
                                    className="form-control rounded-3"
                                    value={
                                        formData.lastMaintenanceDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Next Maintenance

                                </label>

                                <input
                                    type="date"
                                    name="nextMaintenanceDate"
                                    className="form-control rounded-3"
                                    value={
                                        formData.nextMaintenanceDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Maintenance Cost

                                </label>

                                <input
                                    type="number"
                                    name="maintenanceCost"
                                    className="form-control rounded-3"
                                    value={
                                        formData.maintenanceCost
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Status

                                </label>

                                <select
                                    name="status"
                                    className="form-select rounded-3"
                                    value={
                                        formData.status
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >

                                    <option>
                                        Available
                                    </option>

                                    <option>
                                        In Use
                                    </option>

                                    <option>
                                        Under Maintenance
                                    </option>

                                    <option>
                                        Retired
                                    </option>

                                </select>

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    Maintenance Remarks

                                </label>

                                <textarea
                                    rows="3"
                                    name="maintenanceRemarks"
                                    className="form-control rounded-3"
                                    value={
                                        formData.maintenanceRemarks
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label fw-semibold text-dark">

                                    General Remarks

                                </label>

                                <textarea
                                    rows="5"
                                    name="remarks"
                                    className="form-control rounded-3"
                                    value={
                                        formData.remarks
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>

                        <button
                            type="submit"
                            className="btn btn-dark px-4"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating..."
                                : "Create Equipment"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}