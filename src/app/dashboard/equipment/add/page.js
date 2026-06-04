"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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

                alert(
                    "Equipment created successfully"
                );

                router.push(
                    "/dashboard/equipment"
                );

            } catch (error) {

                console.log(error);

                alert(
                    error?.response?.data?.message ||
                    "Failed to create equipment"
                );

            } finally {

                setLoading(false);

            }

        };

    return (

        <div className="container-fluid">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="mb-4">

                        Add Equipment

                    </h2>

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Equipment Code

                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={
                                        formData.equipmentCode
                                    }
                                    readOnly
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Equipment Name

                                </label>

                                <input
                                    type="text"
                                    name="equipmentName"
                                    className="form-control"
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

                                <label className="form-label">

                                    Category

                                </label>

                                <input
                                    type="text"
                                    name="category"
                                    className="form-control"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="e.g. Crane, JCB, Welding Machine, Tower Light"
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Brand

                                </label>

                                <input
                                    type="text"
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

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Model No

                                </label>

                                <input
                                    type="text"
                                    name="modelNo"
                                    className="form-control"
                                    value={
                                        formData.modelNo
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Serial Number

                                </label>

                                <input
                                    type="text"
                                    name="serialNumber"
                                    className="form-control"
                                    value={
                                        formData.serialNumber
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

                                    Location

                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    className="form-control"
                                    value={
                                        formData.location
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

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

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

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

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Purchase Date

                                </label>

                                <input
                                    type="date"
                                    name="purchaseDate"
                                    className="form-control"
                                    value={
                                        formData.purchaseDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Purchase Cost

                                </label>

                                <input
                                    type="number"
                                    name="purchaseCost"
                                    className="form-control"
                                    value={
                                        formData.purchaseCost
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Current Value

                                </label>

                                <input
                                    type="number"
                                    name="currentValue"
                                    className="form-control"
                                    value={
                                        formData.currentValue
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

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

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Last Maintenance

                                </label>

                                <input
                                    type="date"
                                    name="lastMaintenanceDate"
                                    className="form-control"
                                    value={
                                        formData.lastMaintenanceDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">

                                    Next Maintenance

                                </label>

                                <input
                                    type="date"
                                    name="nextMaintenanceDate"
                                    className="form-control"
                                    value={
                                        formData.nextMaintenanceDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

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

                            <div className="col-md-6 mb-3">

                                <label className="form-label">

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

                            <div className="col-md-12 mb-3">

                                <label className="form-label">

                                    Maintenance Remarks

                                </label>

                                <textarea
                                    rows="3"
                                    name="maintenanceRemarks"
                                    className="form-control"
                                    value={
                                        formData.maintenanceRemarks
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-12 mb-3">

                                <label className="form-label">

                                    General Remarks

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

                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >

                            {loading
                                ? "Saving..."
                                : "Save Equipment"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}