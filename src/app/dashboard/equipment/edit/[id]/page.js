"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
    useParams,
    useRouter,
} from "next/navigation";

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

                alert(
                    "Equipment updated successfully"
                );

                router.push(
                    "/dashboard/equipment"
                );

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to update equipment"
                );

            } finally {

                setLoading(false);

            }

        };

    return (

        <div className="container-fluid">

            <div className="card">

                <div className="card-body">

                    <h2 className="mb-4">

                        Edit Equipment

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        {/* Equipment Code */}

                        <div className="mb-3">

                            <label>

                                Equipment Code

                            </label>

                            <input
                                className="form-control"
                                value={
                                    formData.equipmentCode
                                }
                                readOnly
                            />

                        </div>

                        {/* Equipment Name */}

                        <div className="mb-3">

                            <label>

                                Equipment Name

                            </label>

                            <input
                                name="equipmentName"
                                className="form-control"
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

                            <label>

                                Category

                            </label>

                            <input
                                name="category"
                                className="form-control"
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

                            <label>

                                Brand

                            </label>

                            <input
                                name="brand"
                                className="form-control"
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

                            <label>

                                Status

                            </label>

                            <select
                                name="status"
                                className="form-select"
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

                            <label>

                                Project

                            </label>

                            <select
                                name="projectId"
                                className="form-select"
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

                            <label>

                                Assigned User

                            </label>

                            <select
                                name="userId"
                                className="form-select"
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

                            <label>

                                Usage Hours

                            </label>

                            <input
                                type="number"
                                name="totalUsageHours"
                                className="form-control"
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

                            <label>

                                Maintenance Cost

                            </label>

                            <input
                                type="number"
                                name="maintenanceCost"
                                className="form-control"
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

                            <label>

                                Remarks

                            </label>

                            <textarea
                                rows="4"
                                name="remarks"
                                className="form-control"
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
                                : "Update Equipment"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}