"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

export default function AddContractPage() {
  const router = useRouter();

  const [projects, setProjects] =
    useState([]);

  const [vendors, setVendors] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      projectId: "",
      vendorId: "",
      contractValue: "",
      startDate: "",
      endDate: "",
      status: "Pending",
      description: "",
    });

  // ======================
  // FETCH PROJECTS
  // ======================

  const fetchProjects =
    async () => {
      try {
        const response =
          await axios.get(
            "/api/projects"
          );

        setProjects(
          response.data.projects
        );
      } catch (error) {
        console.log(error);
      }
    };

  // ======================
  // FETCH VENDORS
  // ======================

  const fetchVendors =
    async () => {
      try {
        const response =
          await axios.get(
            "/api/vendors"
          );

        setVendors(
          response.data.vendors
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchProjects();
    fetchVendors();
  }, []);

  // ======================
  // HANDLE CHANGE
  // ======================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ======================
  // HANDLE SUBMIT
  // ======================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await axios.post(
          "/api/contracts",
          formData
        );

      toast.success(
        response.data.message ||
        "Contract created successfully"
      );

      setTimeout(() => {

        router.push(
          "/dashboard/contracts"
        );

      }, 1000);

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
        "Failed to create contract"
      );

    } finally {

      setLoading(false);

    }

  };
  return (
    <div className="container-fluid px-4 py-3">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">

        <div>

          <h2
            className="fw-bold mb-1"
            style={{
              color: "#111827",
            }}
          >
            Add Contract
          </h2>

          <p
            className="mb-0"
            style={{
              color: "#6B7280",
            }}
          >
            Create new contract agreement
          </p>

        </div>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            router.push(
              "/dashboard/contracts"
            )
          }
        >
          <ArrowLeft size={16} />
        </button>

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

        <div className="card-body p-4 p-lg-5">
          <form
            onSubmit={
              handleSubmit
            }
          >
            <div className="row">
              {/* TITLE */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold text-dark">
                  Contract Title
                </label>

                <input
                  type="text"
                  name="title"
                  className="form-control rounded-3"
                  value={
                    formData.title
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              {/* VALUE */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold text-dark">
                  Contract Value
                </label>

                <input
                  type="number"
                  name="contractValue"
                  className="form-control rounded-3"
                  value={
                    formData.contractValue
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              {/* PROJECT */}

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
                  required
                >
                  <option value="">
                    Select Project
                  </option>

                  {projects.map(
                    (project) => (
                      <option
                        key={
                          project.id
                        }
                        value={
                          project.id
                        }
                      >
                        {
                          project.name
                        }
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* VENDOR */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold text-dark">
                  Vendor
                </label>

                <select
                  name="vendorId"
                  className="form-select rounded-3"
                  value={
                    formData.vendorId
                  }
                  onChange={
                    handleChange
                  }
                  required
                >
                  <option value="">
                    Select Vendor
                  </option>

                  {vendors.map(
                    (vendor) => (
                      <option
                        key={
                          vendor.id
                        }
                        value={
                          vendor.id
                        }
                      >
                        {
                          vendor.companyName
                        }
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* START DATE */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold text-dark">
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  className="form-control rounded-3"
                  value={
                    formData.startDate
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              {/* END DATE */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold text-dark">
                  End Date
                </label>

                <input
                  type="date"
                  name="endDate"
                  className="form-control rounded-3"
                  value={
                    formData.endDate
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              {/* STATUS */}

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
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Active">
                    Active
                  </option>

                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </div>

              {/* DESCRIPTION */}

              <div className="col-md-12 mb-3">
                <label className="form-label fw-semibold text-dark">
                  Description
                </label>

                <textarea
                  name="description"
                  className="form-control rounded-3"
                  rows="4"
                  value={
                    formData.description
                  }
                  onChange={
                    handleChange
                  }
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-dark px-4"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Contract"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}