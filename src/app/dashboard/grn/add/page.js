"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PackageCheck } from "lucide-react";
import toast from "react-hot-toast";
export default function AddGRNPage() {

    const router =
        useRouter();

    const [loading, setLoading] =
        useState(false);

    const [purchaseOrders, setPurchaseOrders] =
        useState([]);

    const [selectedPO, setSelectedPO] =
        useState(null);

    const [formData, setFormData] =
        useState({

            purchaseOrderId: "",

            receivedQty: "",

            remarks: "",

        });

    // ======================
    // FETCH PURCHASE ORDERS
    // ======================

    const fetchPurchaseOrders =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/purchase-orders"
                    );

                setPurchaseOrders(
                    response.data
                        .purchaseOrders || []
                );

            } catch (error) {

                console.log(error);

            }

        };

    useEffect(() => {

        fetchPurchaseOrders();

    }, []);

    // ======================
    // HANDLE PO CHANGE
    // ======================

    const handlePOChange =
        (e) => {

            const poId =
                e.target.value;

            const po =
                purchaseOrders.find(
                    (item) =>
                        item.id ===
                        parseInt(poId)
                );

            setSelectedPO(po);

            setFormData({

                ...formData,

                purchaseOrderId:
                    poId,

            });

        };

    // ======================
    // HANDLE CHANGE
    // ======================

    const handleChange =
        (e) => {

            setFormData({

                ...formData,

                [e.target.name]:
                    e.target.value,

            });

        };

    // ======================
    // HANDLE SUBMIT
    // ======================

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            try {

                setLoading(true);

                const response =
                    await axios.post(
                        "/api/grn",
                        formData
                    );

                toast.success(
                    "GRN created successfully"
                );
                setTimeout(() => {
                    router.push("/dashboard/grn");
                }, 1200);

            } catch (error) {

                console.log(error);

                toast.error(
                    error?.response?.data?.message ||
                    "Failed to create GRN"
                );

            } finally {

                setLoading(false);

            }

        };

    return (

        <div className="container-fluid px-4 py-3">

            <div className="mb-4 pb-3 border-bottom">

                <h2
                    className="fw-bold mb-1"
                    style={{
                        color: "#111827",
                    }}
                >
                    Create GRN
                </h2>

                <p
                    className="mb-0"
                    style={{
                        color: "#6B7280",
                    }}
                >
                    Record received materials from purchase orders
                </p>

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

                {/* HEADER */}


                {/* BODY */}

                <div className="card-body">

                    <div className="col-12 mb-3">

                        <div
                            className="p-3 rounded-4"
                            style={{
                                background: "#F8FAFC",
                                border: "1px solid #E5E7EB",
                            }}
                        >

                            <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
                                <PackageCheck size={18} />
                                GRN Information
                            </h6>

                        </div>

                    </div>
                    {/* AUTO DETAILS */}


                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-12 mb-4">

                                <label className="form-label fw-semibold text-dark">
                                    Purchase Order
                                </label>

                                <select
                                    name="purchaseOrderId"
                                    className="form-select rounded-3"
                                    value={formData.purchaseOrderId}
                                    onChange={handlePOChange}
                                    required
                                >

                                    <option value="">
                                        Select Purchase Order
                                    </option>

                                    {purchaseOrders.map((po) => (

                                        <option
                                            key={po.id}
                                            value={po.id}
                                        >
                                            PO-{po.id} | {po.vendor?.companyName}
                                        </option>

                                    ))}

                                </select>

                            </div>
                            {selectedPO && (
                                <div className="col-12">

                                    <div
                                        className="p-4 rounded-4 mb-4"
                                        style={{
                                            background: "#F9FAFB",
                                            border: "1px solid #E5E7EB",
                                        }}
                                    >

                                        <h6 className="fw-bold mb-4">
                                            Purchase Order Details
                                        </h6>

                                        <div className="row">

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold text-dark">
                                                    Vendor
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control rounded-3"
                                                    value={
                                                        selectedPO.vendor?.companyName || ""
                                                    }
                                                    readOnly
                                                />
                                            </div>

                                            <div className="col-md-6 mb-3">
                                                <label className="form-label fw-semibold text-dark">
                                                    Project
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control rounded-3"
                                                    value={
                                                        selectedPO.project?.name || ""
                                                    }
                                                    readOnly
                                                />
                                            </div>

                                            <div className="col-md-4 mb-3">
                                                <label className="form-label fw-semibold text-dark">
                                                    Ordered Qty
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control rounded-3"
                                                    value={
                                                        selectedPO.quantity || 0
                                                    }
                                                    readOnly
                                                />
                                            </div>

                                            <div className="col-md-4 mb-3">
                                                <label className="form-label fw-semibold text-dark">
                                                    Received Qty
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control rounded-3"
                                                    value={
                                                        selectedPO.receivedQty || 0
                                                    }
                                                    readOnly
                                                />
                                            </div>

                                            <div className="col-md-4 mb-3">
                                                <label className="form-label fw-semibold text-dark">
                                                    Pending Qty
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control rounded-3"
                                                    value={
                                                        selectedPO.pendingQty || 0
                                                    }
                                                    readOnly
                                                />
                                            </div>

                                            <div className="col-md-12 mb-3">
                                                <label className="form-label fw-semibold text-dark">
                                                    BOQ Item
                                                </label>

                                                <input
                                                    type="text"
                                                    className="form-control rounded-3"
                                                    value={
                                                        selectedPO.boq?.itemName || ""
                                                    }
                                                    readOnly
                                                />
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            )}
                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Received Quantity
                                </label>

                                <input
                                    type="number"
                                    name="receivedQty"
                                    className="form-control rounded-3"
                                    value={formData.receivedQty}
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                            {/* REMARKS */}

                            <div className="col-md-12 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Remarks
                                </label>

                                <textarea
                                    rows="4"
                                    name="remarks"
                                    className="form-control rounded-3"
                                    value={formData.remarks}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        {/* BUTTON */}

                        <button
                            type="submit"
                            className="btn btn-dark px-4 rounded-3"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create GRN"}
                        </button>

                    </form>

                </div>

            </div >

        </div >



    );

}