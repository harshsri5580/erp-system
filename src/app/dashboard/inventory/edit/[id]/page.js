"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  useRouter,
  useParams,
} from "next/navigation";

export default function EditInventoryPage() {

  const router = useRouter();

  const { id } = useParams();

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
      status: "",
      vendorId: "",
      projectId: "",
      // purchaseOrderId: "",
    });

  // ======================
  // FETCH DATA
  // ======================

  const fetchData =
    async () => {

      try {

        const inventoryRes =
          await axios.get(
            `/api/inventory/${id}`
          );

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

        const inventory =
          inventoryRes.data.inventory;

        setFormData({

          materialName:
            inventory.materialName ||
            "",

          quantity:
            inventory.quantity ||
            "",

          unit:
            inventory.unit || "",

          minStock:
            inventory.minStock ||
            "",

          status:
            inventory.status ||
            "",

          vendorId:
            inventory.vendorId ||
            "",

          projectId:
            inventory.projectId ||
            "",

          // purchaseOrderId:
          //   inventory.purchaseOrderId ||
          //   "",
        });

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
          await axios.put(
            `/api/inventory/${id}`,
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
          "Failed to update inventory"
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
          <h3>Edit Inventory</h3>
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
                  readOnly
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
                  readOnly
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
                  required
                  readOnly
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

              {/* <div className="col-md-4 mb-3">

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

              </div> */}

              {/* VENDOR */}

              <div className="col-md-4 mb-3">

                <label className="form-label">
                  Vendor
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={
                    vendors.find(
                      v => v.id == formData.vendorId
                    )?.companyName || ""
                  }
                  readOnly
                />

              </div>

              {/* PROJECT */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Project
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={
                    projects.find(
                      p => p.id == formData.projectId
                    )?.name || ""
                  }
                  readOnly
                />

              </div>

              {/* PURCHASE ORDER */}

              {/* <div className="col-md-6 mb-3">

                <label className="form-label">
                  Purchase Order
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={`PO-${formData.purchaseOrderId}`}
                  readOnly
                />

              </div> */}

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="btn btn-dark"
              disabled={loading}
            >
              {loading
                ? "Updating..."
                : "Update Inventory"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}