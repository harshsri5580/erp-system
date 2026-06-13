"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Building2 } from "lucide-react";
export default function SettingsPage() {

    const [loading, setLoading] =
        useState(false);

    const [fetching, setFetching] =
        useState(true);

    const [formData, setFormData] =
        useState({

            companyName: "",
            companyEmail: "",
            companyPhone: "",
            companyAddress: "",
            companyLogo: "",

            gstNumber: "",
            gstPercent: "",
            panNumber: "",

            currency: "INR",
            currencySymbol: "₹",

            invoicePrefix: "INV",
            poPrefix: "PO",
            grnPrefix: "GRN",

            smtpHost: "",
            smtpPort: "",
            smtpUser: "",
            smtpPassword: "",
            smtpSecure: false,

            timezone: "Asia/Kolkata",
        });

    // ======================
    // FETCH SETTINGS
    // ======================

    const fetchSettings =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/settings"
                    );

                if (
                    response.data.settings
                ) {

                    setFormData({

                        companyName:
                            response.data.settings
                                .companyName || "",

                        companyEmail:
                            response.data.settings
                                .companyEmail || "",

                        companyPhone:
                            response.data.settings
                                .companyPhone || "",

                        companyAddress:
                            response.data.settings
                                .companyAddress || "",

                        companyLogo:
                            response.data.settings
                                .companyLogo || "",

                        gstNumber:
                            response.data.settings
                                .gstNumber || "",

                        gstPercent:
                            response.data.settings
                                .gstPercent || "",

                        panNumber:
                            response.data.settings
                                .panNumber || "",

                        currency:
                            response.data.settings
                                .currency || "INR",

                        currencySymbol:
                            response.data.settings
                                .currencySymbol || "₹",

                        invoicePrefix:
                            response.data.settings
                                .invoicePrefix || "INV",

                        poPrefix:
                            response.data.settings
                                .poPrefix || "PO",

                        grnPrefix:
                            response.data.settings
                                .grnPrefix || "GRN",

                        smtpHost:
                            response.data.settings
                                .smtpHost || "",

                        smtpPort:
                            response.data.settings
                                .smtpPort || "",

                        smtpUser:
                            response.data.settings
                                .smtpUser || "",

                        smtpPassword:
                            response.data.settings
                                .smtpPassword || "",

                        smtpSecure:
                            response.data.settings
                                .smtpSecure || false,

                        timezone:
                            response.data.settings
                                .timezone ||
                            "Asia/Kolkata",
                    });
                }

            } catch (error) {

                console.log(error);

            } finally {

                setFetching(false);
            }
        };

    useEffect(() => {

        fetchSettings();

    }, []);

    // ======================
    // HANDLE CHANGE
    // ======================

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value,
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
                        "/api/settings",
                        formData
                    );

                toast.success(
                    response.data.message
                );
            } catch (error) {

                console.log(error);

                toast.error(
                    "Failed to save settings"
                );

            } finally {

                setLoading(false);
            }
        };

    if (fetching) {

        return (
            <div className="container-fluid">
                <div className="text-center py-5">
                    Loading Settings...
                </div>
            </div>
        );
    }

    return (

        <div className="container-fluid px-4 py-3">

            <div className="mb-4 pb-3 border-bottom">

                <h2
                    className="fw-bold mb-1"
                    style={{
                        color: "#111827",
                    }}
                >
                    System Settings
                </h2>

                <p
                    className="mb-0"
                    style={{
                        color: "#6B7280",
                    }}
                >
                    Configure company, tax, finance and email settings
                </p>

            </div>

            <div
                className="card border-0 rounded-4"
                style={{
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
                }}
            >



                {/* BODY */}

                <div className="card-body p-4 p-lg-5">

                    <form
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <div className="row">

                            {/* ========================= */}
                            {/* COMPANY INFORMATION */}
                            {/* ========================= */}

                            <div className="d-flex align-items-center gap-2 mb-4">

                                <Building2
                                    size={20}
                                    className="text-primary"
                                />

                                <h5
                                    className="fw-bold mb-0"
                                    style={{
                                        color: "#111827"
                                    }}
                                >
                                    Company Information
                                </h5>

                            </div>
                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Company Name
                                </label>

                                <input
                                    type="text"
                                    name="companyName"
                                    className="form-control rounded-3"
                                    value={
                                        formData.companyName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Company Email
                                </label>

                                <input
                                    type="email"
                                    name="companyEmail"
                                    className="form-control rounded-3"
                                    value={
                                        formData.companyEmail
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Company Phone
                                </label>

                                <input
                                    type="text"
                                    name="companyPhone"
                                    className="form-control rounded-3"
                                    value={
                                        formData.companyPhone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Company Logo URL
                                </label>

                                <input
                                    type="text"
                                    name="companyLogo"
                                    className="form-control rounded-3"
                                    value={
                                        formData.companyLogo
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-12 mb-4">

                                <label className="form-label fw-semibold text-dark">
                                    Company Address
                                </label>

                                <textarea
                                    name="companyAddress"
                                    className="form-control rounded-3"
                                    rows="3"
                                    value={
                                        formData.companyAddress
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            {/* ========================= */}
                            {/* TAX */}
                            {/* ========================= */}

                            <div className="col-12 mt-4">



                                <h5
                                    className="fw-bold mb-4"
                                    style={{
                                        color: "#111827",
                                    }}
                                >
                                    Tax Information
                                </h5>

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    GST Number
                                </label>

                                <input
                                    type="text"
                                    name="gstNumber"
                                    className="form-control rounded-3"
                                    value={
                                        formData.gstNumber
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    GST %
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    name="gstPercent"
                                    className="form-control rounded-3"
                                    value={
                                        formData.gstPercent
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    PAN Number
                                </label>

                                <input
                                    type="text"
                                    name="panNumber"
                                    className="form-control rounded-3"
                                    value={
                                        formData.panNumber
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            {/* ========================= */}
                            {/* CURRENCY */}
                            {/* ========================= */}

                            <div className="col-12 mt-4">



                                <h5
                                    className="fw-bold mb-4"
                                    style={{
                                        color: "#111827",
                                    }}
                                >
                                    Currency Settings
                                </h5>

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Currency
                                </label>

                                <input
                                    type="text"
                                    name="currency"
                                    className="form-control rounded-3"
                                    value={
                                        formData.currency
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Currency Symbol
                                </label>

                                <input
                                    type="text"
                                    name="currencySymbol"
                                    className="form-control rounded-3"
                                    value={
                                        formData.currencySymbol
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Timezone
                                </label>

                                <input
                                    type="text"
                                    name="timezone"
                                    className="form-control rounded-3"
                                    value={
                                        formData.timezone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            {/* ========================= */}
                            {/* PREFIX */}
                            {/* ========================= */}

                            <div className="col-12 mt-4">



                                <h5
                                    className="fw-bold mb-4"
                                    style={{
                                        color: "#111827",
                                    }}
                                >
                                    Numbering Settings
                                </h5>

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    Invoice Prefix
                                </label>

                                <input
                                    type="text"
                                    name="invoicePrefix"
                                    className="form-control rounded-3"
                                    value={
                                        formData.invoicePrefix
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    PO Prefix
                                </label>

                                <input
                                    type="text"
                                    name="poPrefix"
                                    className="form-control rounded-3"
                                    value={
                                        formData.poPrefix
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    GRN Prefix
                                </label>

                                <input
                                    type="text"
                                    name="grnPrefix"
                                    className="form-control rounded-3"
                                    value={
                                        formData.grnPrefix
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            {/* ========================= */}
                            {/* SMTP */}
                            {/* ========================= */}

                            <div className="col-12 mt-4">



                                <h5
                                    className="fw-bold mb-4"
                                    style={{
                                        color: "#111827",
                                    }}
                                >
                                    SMTP Settings
                                </h5>

                            </div>

                            <div className="col-md-3 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    SMTP Host
                                </label>

                                <input
                                    type="text"
                                    name="smtpHost"
                                    className="form-control rounded-3"
                                    value={
                                        formData.smtpHost
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-3 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    SMTP Port
                                </label>

                                <input
                                    type="number"
                                    name="smtpPort"
                                    className="form-control rounded-3"
                                    value={
                                        formData.smtpPort
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-3 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    SMTP User
                                </label>

                                <input
                                    type="text"
                                    name="smtpUser"
                                    className="form-control rounded-3"
                                    value={
                                        formData.smtpUser
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-3 mb-3">

                                <label className="form-label fw-semibold text-dark">
                                    SMTP Password
                                </label>

                                <input
                                    type="password"
                                    name="smtpPassword"
                                    className="form-control rounded-3"
                                    value={
                                        formData.smtpPassword
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-12 mb-4">

                                <div
                                    className="form-check p-3 rounded-3"
                                    style={{
                                        background: "#F9FAFB",
                                    }}
                                >

                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        name="smtpSecure"
                                        checked={
                                            formData.smtpSecure
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    />

                                    <label className="form-check-label">
                                        Enable SSL / TLS
                                    </label>

                                </div>

                            </div>

                        </div>

                        <div className="mt-4">

                            <button
                                type="submit"
                                className="btn btn-dark px-4 py-2"
                                disabled={loading}
                            >

                                {loading
                                    ? "Saving..."
                                    : "Save Settings"}

                            </button>
                        </div>
                    </form>

                </div>

            </div >

        </div >
    );
}