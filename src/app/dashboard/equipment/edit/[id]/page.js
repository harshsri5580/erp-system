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

import toast from "react-hot-toast";

export default function EditEquipmentPage() {

    const params =
        useParams();

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

            equipmentCode: "",

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

            totalUsageHours: "",

            lastMaintenanceDate: "",

            nextMaintenanceDate: "",

            maintenanceCost: "",

            maintenanceRemarks: "",

            status: "",

            remarks: "",

        });

    useEffect(() => {

        fetchEquipment();

        loadProjects();

        loadUsers();

    }, []);

    const loadProjects =
        async () => {

            const res =
                await axios.get(
                    "/api/projects"
                );

            setProjects(
                res.data.projects || []
            );

        };

    const loadUsers =
        async () => {

            const res =
                await axios.get(
                    "/api/users"
                );

            setUsers(
                res.data.users || []
            );

        };

    const fetchEquipment =
        async () => {

            try {

                const res =
                    await axios.get(
                        `/api/equipment/${params.id}`
                    );

                const item =
                    res.data.equipment;

                setFormData({

                    equipmentCode:
                        item.equipmentCode || "",

                    equipmentName:
                        item.equipmentName || "",

                    category:
                        item.category || "",

                    brand:
                        item.brand || "",

                    modelNo:
                        item.modelNo || "",

                    serialNumber:
                        item.serialNumber || "",

                    projectId:
                        item.projectId?.toString() || "",

                    userId:
                        item.userId?.toString() || "",

                    location:
                        item.location || "",

                    purchaseDate:
                        item.purchaseDate
                            ? item.purchaseDate
                                .split("T")[0]
                            : "",

                    purchaseCost:
                        item.purchaseCost || "",

                    currentValue:
                        item.currentValue || "",

                    totalUsageHours:
                        item.totalUsageHours || "",

                    lastMaintenanceDate:
                        item.lastMaintenanceDate
                            ? item.lastMaintenanceDate
                                .split("T")[0]
                            : "",

                    nextMaintenanceDate:
                        item.nextMaintenanceDate
                            ? item.nextMaintenanceDate
                                .split("T")[0]
                            : "",

                    maintenanceCost:
                        item.maintenanceCost || "",

                    maintenanceRemarks:
                        item.maintenanceRemarks || "",

                    status:
                        item.status || "",

                    remarks:
                        item.remarks || "",

                });

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

                await axios.put(
                    `/api/equipment/${params.id}`,
                    formData
                );

                toast.success(
                    "Equipment updated successfully"
                );

                setTimeout(() => {

                    router.push(
                        "/dashboard/equipment"
                    );

                }, 1000);

            } catch (error) {

                console.log(error);

                toast.error(
                    "Failed to update equipment"
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

                <div className="card-body p-4 p-lg-5">

                    <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">

                        <div>

                            <h2
                                className="fw-bold mb-1"
                                style={{
                                    color: "#111827",
                                }}
                            >
                                Edit Equipment
                            </h2>

                            <p
                                className="mb-0"
                                style={{
                                    color: "#6B7280",
                                }}
                            >
                                Update equipment information
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

                        {/* Equipment Code */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold text-dark">

                                Equipment Code

                            </label>

                            <input
                                className="form-control rounded-3"
                                value={
                                    formData.equipmentCode
                                }
                                readOnly
                            />

                        </div>

                        {/* Equipment Name */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold text-dark">

                                Equipment Name

                            </label>

                            <input
                                name="equipmentName"
                                className="form-control rounded-3"
                                value={
                                    formData.equipmentName
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>

                        {/* Category */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold text-dark">

                                Category

                            </label>

                            <input
                                name="category"
                                className="form-control rounded-3"
                                value={
                                    formData.category
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>

                        {/* Brand */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold text-dark">

                                Brand

                            </label>

                            <input
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

                        {/* Status */}

                        <div className="mb-3">

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

                        {/* Project */}

                        <div className="mb-3">

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

                        {/* User */}

                        <div className="mb-3">

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

                        {/* Usage Hours */}

                        <div className="mb-3">

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

                        {/* Maintenance Cost */}

                        <div className="mb-3">

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

                        {/* Remarks */}

                        <div className="mb-3">

                            <label className="form-label fw-semibold text-dark">

                                Remarks

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

                        <button
                            className="btn btn-primary"
                            disabled={loading}
                        >

                            {loading
                                ? "Updating..."
                                : "Save Changes"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}