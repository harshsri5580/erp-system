"use client";

import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data.success) {
        localStorage.setItem(
          "userRole",
          response.data.user.role
        );

        localStorage.setItem(
          "userName",
          response.data.user.name
        );

        window.location.href =
          "/dashboard";
      } else {
        alert(
          response.data.message ||
          "Invalid Login"
        );
      }
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#111827,#1e293b)",
      }}
    >
      <div className="container py-4">

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">

          <a
            href="/"
            style={{
              textDecoration: "none",
            }}
          >
            <h2
              className="fw-bold m-0"
              style={{
                color: "#ffffff",
                letterSpacing: "1px",
              }}
            >
              CON
              <span
                style={{
                  color: "#3b82f6",
                }}
              >
                SERP
              </span>
            </h2>
          </a>

          <a
            href="/"
            className="btn btn-outline-light"
            style={{
              borderRadius: "10px",
            }}
          >
            ← Back Home
          </a>

        </div>

        <div
          className="row align-items-center"
          style={{
            minHeight: "80vh",
          }}
        >

          {/* Left Side */}
          <div className="col-lg-6 d-none d-lg-block">

            <h1
              className="fw-bold text-white mb-4"
              style={{
                fontSize: "4rem",
                lineHeight: "1.1",
              }}
            >
              Construction
              <br />
              ERP System
            </h1>

            <p
              className="text-light opacity-75"
              style={{
                fontSize: "1.2rem",
              }}
            >
              Manage Projects,
              Clients,
              Contracts,
              Inventory,
              Equipment,
              Payroll,
              Progress Billing,
              Inspections and much more
              from one powerful platform.
            </p>

            <div className="row mt-5">

              <div className="col-4">
                <h2 className="text-primary fw-bold">
                  25+
                </h2>
                <span className="text-light">
                  Modules
                </span>
              </div>

              <div className="col-4">
                <h2 className="text-primary fw-bold">
                  100%
                </h2>
                <span className="text-light">
                  Cloud ERP
                </span>
              </div>

              <div className="col-4">
                <h2 className="text-primary fw-bold">
                  24/7
                </h2>
                <span className="text-light">
                  Access
                </span>
              </div>

            </div>
          </div>

          {/* Login Card */}
          <div className="col-lg-5 mx-auto">

            <div
              className="card border-0 shadow-lg"
              style={{
                background:
                  "rgba(255,255,255,0.06)",
                backdropFilter:
                  "blur(20px)",
                borderRadius: "25px",
              }}
            >
              <div className="card-body p-5">

                <div className="text-center mb-4">

                  <h2 className="text-white fw-bold">
                    Welcome Back
                  </h2>

                  <p className="text-light">
                    Sign in to continue
                  </p>

                </div>

                <form
                  onSubmit={handleLogin}
                >

                  <div className="mb-4">

                    <label className="text-light mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) =>
                        setEmail(
                          e.target.value
                        )
                      }
                      placeholder="admin@erp.com"
                      style={{
                        background:
                          "rgba(255,255,255,0.08)",
                        border:
                          "1px solid rgba(255,255,255,0.1)",
                        color: "#fff",
                      }}
                    />

                  </div>

                  <div className="mb-4">

                    <label className="text-light mb-2">
                      Password
                    </label>

                    <div
                      className="input-group"
                    >

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) =>
                          setPassword(
                            e.target.value
                          )
                        }
                        placeholder="••••••••"
                        style={{
                          background:
                            "rgba(255,255,255,0.08)",
                          border:
                            "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#fff",
                          width: "60px",
                        }}
                        className="btn"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                    style={{
                      borderRadius:
                        "12px",
                      fontWeight: "600",
                    }}
                  >
                    Login to Dashboard
                  </button>

                </form>

                <div className="text-center mt-4">

                  <span className="text-light">
                    Construction ERP v1.0
                  </span>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

