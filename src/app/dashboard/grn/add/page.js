"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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

                alert(
                    response.data.message
                );

                router.push(
                    "/dashboard/grn"
                );

            } catch (error) {

                console.log(error);

                alert(
                    error?.response?.data
                        ?.message ||
                    "Failed to create GRN"
                );

            } finally {

                setLoading(false);

            }

        };

    return (

        <div className="container-fluid">

            <div className="card border-0 shadow rounded-4">

                {/* HEADER */}

                <div className="card-header bg-dark text-white">

                    <h3 className="mb-0">
                        Create GRN
                    </h3>

                </div>

                {/* BODY */}

                <div className="card-body">

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            {/* PURCHASE ORDER */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Purchase Order
                                </label>

                                <select
                                    className="form-select"
                                    value={
                                        formData.purchaseOrderId
                                    }
                                    onChange={
                                        handlePOChange
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Purchase Order
                                    </option>

                                    {purchaseOrders.map(
                                        (po) => (

                                            <option
                                                key={po.id}
                                                value={po.id}
                                            >

                                                {po.poNumber ||
                                                    `PO-${po.id}`}

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            {/* RECEIVED QTY */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Received Quantity
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    name="receivedQty"
                                    className="form-control"
                                    value={
                                        formData.receivedQty
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                />

                            </div>

                            {/* AUTO DETAILS */}

                            {selectedPO && (

                                <>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Vendor
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                                selectedPO.vendor
                                                    ?.companyName ||
                                                ""
                                            }
                                            readOnly
                                        />

                                    </div>

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Project
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                                selectedPO.project
                                                    ?.name || ""
                                            }
                                            readOnly
                                        />

                                    </div>

                                    <div className="col-md-4 mb-3">

                                        <label className="form-label">
                                            Ordered Qty
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                                selectedPO.quantity || 0
                                            }
                                            readOnly
                                        />

                                    </div>

                                    <div className="col-md-4 mb-3">

                                        <label className="form-label">
                                            Received Qty
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                                selectedPO.receivedQty || 0
                                            }
                                            readOnly
                                        />

                                    </div>

                                    <div className="col-md-4 mb-3">

                                        <label className="form-label">
                                            Pending Qty
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                                selectedPO.pendingQty || 0
                                            }
                                            readOnly
                                        />

                                    </div>

                                    <div className="col-md-12 mb-3">

                                        <label className="form-label">
                                            BOQ Item
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={
                                                selectedPO.boq
                                                    ?.itemName || ""
                                            }
                                            readOnly
                                        />

                                    </div>

                                </>

                            )}

                            {/* REMARKS */}

                            <div className="col-md-12 mb-3">

                                <label className="form-label">
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

                        </div>

                        {/* BUTTON */}

                        <button
                            type="submit"
                            className="btn btn-dark"
                            disabled={loading}
                        >

                            {loading
                                ? "Creating..."
                                : "Create GRN"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}