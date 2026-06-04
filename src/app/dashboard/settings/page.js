"use client";

import { useEffect, useState } from "react";
import axios from "axios";

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

                alert(
                    response.data.message
                );

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to save settings"
                );

            } finally {

                setLoading(false);
            }
        };

    if (fetching) {

        return (
            <div className="container-fluid">
                <div className="alert alert-info">
                    Loading Settings...
                </div>
            </div>
        );
    }

    return (

        <div className="container-fluid">

            <div className="card shadow border-0 rounded-4">

                {/* HEADER */}

                <div className="card-header bg-dark text-white">

                    <h3>
                        Settings
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

                            {/* ========================= */}
                            {/* COMPANY INFORMATION */}
                            {/* ========================= */}

                            <div className="col-12">

                                <h5 className="mb-3">
                                    Company Information
                                </h5>

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Company Name
                                </label>

                                <input
                                    type="text"
                                    name="companyName"
                                    className="form-control"
                                    value={
                                        formData.companyName
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Company Email
                                </label>

                                <input
                                    type="email"
                                    name="companyEmail"
                                    className="form-control"
                                    value={
                                        formData.companyEmail
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Company Phone
                                </label>

                                <input
                                    type="text"
                                    name="companyPhone"
                                    className="form-control"
                                    value={
                                        formData.companyPhone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Company Logo URL
                                </label>

                                <input
                                    type="text"
                                    name="companyLogo"
                                    className="form-control"
                                    value={
                                        formData.companyLogo
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-12 mb-4">

                                <label className="form-label">
                                    Company Address
                                </label>

                                <textarea
                                    name="companyAddress"
                                    className="form-control"
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

                            <div className="col-12">

                                <hr />

                                <h5 className="mb-3">
                                    Tax Information
                                </h5>

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    GST Number
                                </label>

                                <input
                                    type="text"
                                    name="gstNumber"
                                    className="form-control"
                                    value={
                                        formData.gstNumber
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    GST %
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    name="gstPercent"
                                    className="form-control"
                                    value={
                                        formData.gstPercent
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    PAN Number
                                </label>

                                <input
                                    type="text"
                                    name="panNumber"
                                    className="form-control"
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

                            <div className="col-12">

                                <hr />

                                <h5 className="mb-3">
                                    Currency Settings
                                </h5>

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    Currency
                                </label>

                                <input
                                    type="text"
                                    name="currency"
                                    className="form-control"
                                    value={
                                        formData.currency
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    Currency Symbol
                                </label>

                                <input
                                    type="text"
                                    name="currencySymbol"
                                    className="form-control"
                                    value={
                                        formData.currencySymbol
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    Timezone
                                </label>

                                <input
                                    type="text"
                                    name="timezone"
                                    className="form-control"
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

                            <div className="col-12">

                                <hr />

                                <h5 className="mb-3">
                                    Numbering Settings
                                </h5>

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    Invoice Prefix
                                </label>

                                <input
                                    type="text"
                                    name="invoicePrefix"
                                    className="form-control"
                                    value={
                                        formData.invoicePrefix
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    PO Prefix
                                </label>

                                <input
                                    type="text"
                                    name="poPrefix"
                                    className="form-control"
                                    value={
                                        formData.poPrefix
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    GRN Prefix
                                </label>

                                <input
                                    type="text"
                                    name="grnPrefix"
                                    className="form-control"
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

                            <div className="col-12">

                                <hr />

                                <h5 className="mb-3">
                                    SMTP Settings
                                </h5>

                            </div>

                            <div className="col-md-3 mb-3">

                                <label className="form-label">
                                    SMTP Host
                                </label>

                                <input
                                    type="text"
                                    name="smtpHost"
                                    className="form-control"
                                    value={
                                        formData.smtpHost
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-3 mb-3">

                                <label className="form-label">
                                    SMTP Port
                                </label>

                                <input
                                    type="number"
                                    name="smtpPort"
                                    className="form-control"
                                    value={
                                        formData.smtpPort
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-3 mb-3">

                                <label className="form-label">
                                    SMTP User
                                </label>

                                <input
                                    type="text"
                                    name="smtpUser"
                                    className="form-control"
                                    value={
                                        formData.smtpUser
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-3 mb-3">

                                <label className="form-label">
                                    SMTP Password
                                </label>

                                <input
                                    type="password"
                                    name="smtpPassword"
                                    className="form-control"
                                    value={
                                        formData.smtpPassword
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                            <div className="col-md-12 mb-4">

                                <div className="form-check">

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

                        <button
                            type="submit"
                            className="btn btn-dark"
                            disabled={loading}
                        >

                            {loading
                                ? "Saving..."
                                : "Save Settings"}

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}