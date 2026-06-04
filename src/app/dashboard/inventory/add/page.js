"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddInventoryPage() {

  const router = useRouter();

  const [vendors, setVendors] =
    useState([]);

  const [projects, setProjects] =
    useState([]);

  const [purchaseOrders, setPurchaseOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      materialName: "",
      quantity: "",
      unit: "",
      minStock: "",
      status: "In Stock",
      vendorId: "",
      projectId: "",
      purchaseOrderId: "",
    });

  // ======================
  // FETCH DATA
  // ======================

  const fetchData =
    async () => {

      try {

        const vendorsRes =
          await axios.get(
            "/api/vendors"
          );

        const projectsRes =
          await axios.get(
            "/api/projects"
          );

        const poRes =
          await axios.get(
            "/api/purchase-orders"
          );

        setVendors(
          vendorsRes.data.vendors
        );

        setProjects(
          projectsRes.data.projects
        );

        setPurchaseOrders(
          poRes.data.purchaseOrders
        );

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
            "/api/inventory",
            formData
          );

        alert(
          response.data.message
        );

        router.push(
          "/dashboard/inventory"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to create inventory"
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
          <h3>Add Inventory</h3>
        </div>

        {/* BODY */}

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              {/* MATERIAL */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Material Name
                </label>

                <input
                  type="text"
                  name="materialName"
                  className="form-control"
                  value={
                    formData.materialName
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* QUANTITY */}

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

              {/* UNIT */}

              <div className="col-md-3 mb-3">

                <label className="form-label">
                  Unit
                </label>

                <input
                  type="text"
                  name="unit"
                  className="form-control"
                  value={
                    formData.unit
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Bag / Kg"
                />

              </div>

              {/* MIN STOCK */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Min Stock
                </label>

                <input
                  type="number"
                  name="minStock"
                  className="form-control"
                  value={
                    formData.minStock
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* STATUS */}

              <div className="col-md-4 mb-3">

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

                  <option value="In Stock">
                    In Stock
                  </option>

                  <option value="Low Stock">
                    Low Stock
                  </option>

                  <option value="Out Of Stock">
                    Out Of Stock
                  </option>

                </select>

              </div>

              {/* VENDOR */}

              <div className="col-md-4 mb-3">

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

              {/* PURCHASE ORDER */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Purchase Order
                </label>

                <select
                  name="purchaseOrderId"
                  className="form-select"
                  value={
                    formData.purchaseOrderId
                  }
                  onChange={
                    handleChange
                  }
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
                        PO #{po.id}
                      </option>
                    )
                  )}

                </select>

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
                : "Create Inventory"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}