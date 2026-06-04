"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  useRouter,
  useParams,
} from "next/navigation";

export default function EditPurchaseOrderPage() {

  const router = useRouter();

  const { id } = useParams();

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
      status: "",
      description: "",
    });

  // ======================
  // FETCH DATA
  // ======================

  const fetchData = async () => {
    try {

      const purchaseOrderRes =
        await axios.get(
          `/api/purchase-orders/${id}`
        );

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

      const po =
        purchaseOrderRes.data
          .purchaseOrder;

      setFormData({
        vendorId:
          po.vendorId || "",

        projectId:
          po.projectId || "",

        boqId:
          po.boqId || "",

        quantity:
          po.quantity || "",

        rate:
          po.rate || "",

        status:
          po.status || "",

        description:
          po.description || "",
      });

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
          await axios.put(
            `/api/purchase-orders/${id}`,
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
          "Failed to update purchase order"
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
          <h3>Edit Purchase Order</h3>
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

            <button
              type="submit"
              className="btn btn-dark"
              disabled={loading}
            >
              {loading
                ? "Updating..."
                : "Update Purchase Order"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}