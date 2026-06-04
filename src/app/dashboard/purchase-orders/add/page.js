"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddPurchaseOrderPage() {

  const router = useRouter();

  const [vendors, setVendors] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [boqs, setBoqs] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      vendorId: "",
      projectId: "",
      boqId: "",
      quantity: "",
      rate: "",
      status: "Pending",
      description: "",
    });

  // ======================
  // FETCH DATA
  // ======================

  const fetchData = async () => {
    try {

      const vendorsRes =
        await axios.get(
          "/api/vendors"
        );

      const projectsRes =
        await axios.get(
          "/api/projects"
        );

      const boqsRes =
        await axios.get(
          "/api/boq"
        );

      setVendors(
        vendorsRes.data.vendors
      );

      setProjects(
        projectsRes.data.projects
      );

      setBoqs(boqsRes.data.boqs);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
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

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await axios.post(
            "/api/purchase-orders",
            formData
          );

        alert(
          response.data.message
        );

        router.push(
          "/dashboard/purchase-orders"
        );
      } catch (error) {
        console.log(error);

        alert(
          error?.response?.data
            ?.message ||
            "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="container-fluid">

      <div className="card shadow border-0 rounded-4">

        {/* HEADER */}

        <div className="card-header bg-dark text-white">
          <h3>Add Purchase Order</h3>
        </div>

        {/* BODY */}

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              {/* VENDOR */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Vendor
                </label>

                <select
                  name="vendorId"
                  className="form-select"
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

              {/* PROJECT */}

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

              {/* BOQ */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  BOQ Item
                </label>

                <select
                  name="boqId"
                  className="form-select"
                  value={
                    formData.boqId
                  }
                  onChange={
                    handleChange
                  }
                  required
                >

                  <option value="">
                    Select BOQ
                  </option>

                  {boqs.map(
                    (boq) => (
                      <option
                        key={boq.id}
                        value={boq.id}
                      >
                        {
                          boq.itemName
                        }
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* QTY */}

              <div className="col-md-3 mb-3">

                <label className="form-label">
                  Quantity
                </label>

                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  value={
                    formData.quantity
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* RATE */}

              <div className="col-md-3 mb-3">

                <label className="form-label">
                  Rate
                </label>

                <input
                  type="number"
                  name="rate"
                  className="form-control"
                  value={
                    formData.rate
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* STATUS */}

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

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Approved">
                    Approved
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                </select>

              </div>

              {/* DESCRIPTION */}

              <div className="col-md-12 mb-3">

                <label className="form-label">
                  Description
                </label>

                <textarea
                  name="description"
                  rows="4"
                  className="form-control"
                  value={
                    formData.description
                  }
                  onChange={
                    handleChange
                  }
                ></textarea>

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
                : "Create Purchase Order"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}