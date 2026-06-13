"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Eye, EyeOff, Building2 } from "lucide-react";

export default function RegisterPage() {

    const [showPassword, setShowPassword] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            companyName: "",
            ownerName: "",
            email: "",
            password: "",
            phone: "",
            address: "",
        });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const response =
                await axios.post(
                    "/api/auth/register",
                    formData
                );

            if (
                response.data.success
            ) {

                alert(
                    "Company Registered Successfully"
                );

                window.location.href =
                    "/login";

            } else {

                alert(
                    response.data.message
                );

            }

        } catch (error) {

            console.log(error);

            alert(
                error?.response?.data
                    ?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div
            className="
        min-vh-100
        d-flex
        align-items-center
        justify-content-center
      "
            style={{
                background:
                    "linear-gradient(135deg,#0f172a,#111827,#1e293b)",
            }}
        >

            <div className="container">

                {/* HEADER */}

                <div className="d-flex justify-content-between align-items-center mb-5">

                    <Link
                        href="/"
                        style={{
                            textDecoration:
                                "none",
                        }}
                    >
                        <h2
                            className="fw-bold m-0"
                            style={{
                                color: "#fff",
                            }}
                        >
                            CON
                            <span
                                style={{
                                    color:
                                        "#3b82f6",
                                }}
                            >
                                SERP
                            </span>
                        </h2>
                    </Link>

                    <Link
                        href="/login"
                        className="
              btn
              btn-outline-light
            "
                    >
                        Login
                    </Link>

                </div>

                <div className="row justify-content-center">

                    <div className="col-lg-8">

                        <div
                            className="
                card
                border-0
                shadow-lg
              "
                            style={{
                                background:
                                    "rgba(255,255,255,0.06)",
                                backdropFilter:
                                    "blur(20px)",
                                borderRadius:
                                    "25px",
                            }}
                        >

                            <div className="card-body p-5">

                                <div className="text-center mb-5">

                                    <div
                                        className="
                      d-inline-flex
                      align-items-center
                      justify-content-center
                      rounded-circle
                      bg-primary
                      bg-opacity-25
                      mb-3
                    "
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                        }}
                                    >
                                        <Building2
                                            size={32}
                                            color="#fff"
                                        />
                                    </div>

                                    <h2 className="text-white fw-bold">

                                        Register Company

                                    </h2>

                                    <p className="text-light">

                                        Create your ERP account

                                    </p>

                                </div>

                                <form
                                    onSubmit={
                                        handleSubmit
                                    }
                                >

                                    <div className="row">

                                        {/* COMPANY */}

                                        <div className="col-md-6 mb-4">

                                            <label className="text-light mb-2">

                                                Company Name

                                            </label>

                                            <input
                                                type="text"
                                                name="companyName"
                                                className="form-control form-control-lg"
                                                value={
                                                    formData.companyName
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>

                                        {/* OWNER */}

                                        <div className="col-md-6 mb-4">

                                            <label className="text-light mb-2">

                                                Owner Name

                                            </label>

                                            <input
                                                type="text"
                                                name="ownerName"
                                                className="form-control form-control-lg"
                                                value={
                                                    formData.ownerName
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>

                                        {/* EMAIL */}

                                        <div className="col-md-6 mb-4">

                                            <label className="text-light mb-2">

                                                Email

                                            </label>

                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control form-control-lg"
                                                value={
                                                    formData.email
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                                required
                                            />

                                        </div>

                                        {/* PHONE */}

                                        <div className="col-md-6 mb-4">

                                            <label className="text-light mb-2">

                                                Phone

                                            </label>

                                            <input
                                                type="text"
                                                name="phone"
                                                className="form-control form-control-lg"
                                                value={
                                                    formData.phone
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                            />

                                        </div>

                                        {/* ADDRESS */}

                                        <div className="col-12 mb-4">

                                            <label className="text-light mb-2">

                                                Address

                                            </label>

                                            <textarea
                                                rows="3"
                                                name="address"
                                                className="form-control"
                                                value={
                                                    formData.address
                                                }
                                                onChange={
                                                    handleChange
                                                }
                                            />

                                        </div>

                                        {/* PASSWORD */}

                                        <div className="col-12 mb-4">

                                            <label className="text-light mb-2">

                                                Password

                                            </label>

                                            <div className="input-group">

                                                <input
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    name="password"
                                                    className="form-control form-control-lg"
                                                    value={
                                                        formData.password
                                                    }
                                                    onChange={
                                                        handleChange
                                                    }
                                                    required
                                                />

                                                <button
                                                    type="button"
                                                    className="
                            btn
                            btn-outline-secondary
                          "
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                >
                                                    {showPassword
                                                        ? (
                                                            <EyeOff size={18} />
                                                        )
                                                        : (
                                                            <Eye size={18} />
                                                        )}
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="
                      btn
                      btn-primary
                      btn-lg
                      w-100
                    "
                                    >

                                        {loading
                                            ? "Creating..."
                                            : "Register Company"}

                                    </button>

                                </form>

                                <div className="text-center mt-4">

                                    <span className="text-light">

                                        Already have an account?

                                    </span>

                                    <Link
                                        href="/login"
                                        className="
                      text-primary
                      ms-2
                      fw-bold
                    "
                                    >
                                        Login
                                    </Link>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}