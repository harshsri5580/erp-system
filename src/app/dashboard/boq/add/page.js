"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  FileText,
} from "lucide-react";

export default function AddBOQPage() {

  const router = useRouter();

  const [contracts, setContracts] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      contractId: "",
      itemName: "",
      unit: "",
      quantity: "",
      rate: "",
      description: "",
    });

  // ======================
  // FETCH CONTRACTS
  // ======================

  const fetchContracts =
    async () => {
      try {
        const response =
          await axios.get(
            "/api/contracts"
          );

        setContracts(
          response.data.contracts
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchContracts();
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
            "/api/boq",
            formData
          );

        alert(
          response.data.message
        );

        router.push(
          "/dashboard/boq"
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
    <div className="container-fluid px-4 py-3">

      <div
        className="card border-0 rounded-4"
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >

        {/* HEADER */}
        {/* 
        <div className="card-header bg-dark text-white">
          <h3>Add BOQ Item</h3>
        </div> */}

        {/* BODY */}

        <div className="card-body p-4 p-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">

            <div>

              <h2
                className="fw-bold mb-1"
                style={{
                  color: "#111827",
                }}
              >
                Add BOQ Item
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#6B7280",
                }}
              >
                Create a new bill of quantity item
              </p>

            </div>

            <button
              type="button"
              className="btn btn-outline-secondary d-flex align-items-center gap-2"
              onClick={() =>
                router.push("/dashboard/boq")
              }
            >
              <ArrowLeft size={16} />
              Back
            </button>

          </div>
          <form onSubmit={handleSubmit}>

            <div className="row">

              {/* CONTRACT */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold text-dark">
                  Contract
                </label>

                <select
                  name="contractId"
                  className="form-select rounded-3"
                  value={
                    formData.contractId
                  }
                  onChange={
                    handleChange
                  }
                  required
                >

                  <option value="">
                    Select a Contract
                  </option>

                  {contracts.map(
                    (contract) => (
                      <option
                        key={
                          contract.id
                        }
                        value={
                          contract.id
                        }
                      >
                        {
                          contract.title
                        }
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* ITEM */}

              <div className="col-md-6 mb-3">

                <label className="form-label fw-semibold text-dark">
                  Item Name
                </label>

                <input
                  type="text"
                  name="itemName"
                  className="form-control"
                  value={
                    formData.itemName
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* UNIT */}

              <div className="col-md-4 mb-3">

                <label className="form-label fw-semibold text-dark">
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
                  placeholder="Bag / Kg / Ton"
                />

              </div>

              {/* QTY */}

              <div className="col-md-4 mb-3">

                <label className="form-label fw-semibold text-dark">
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

              <div className="col-md-4 mb-3">

                <label className="form-label fw-semibold text-dark">
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

              {/* DESCRIPTION */}

              <div className="col-12 mt-2">

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

            {/* BUTTON */}

            <div className="d-flex gap-2 mt-4">

              <button
                type="submit"
                className="btn btn-dark px-4"
                disabled={loading}
              >
                {loading
                  ? "Creating..."
                  : "Create BOQ"}
              </button>

              {/* <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() =>
                  router.push("/dashboard/boq")
                }
              >
                Cancel
              </button> */}

            </div>
          </form>

        </div>
      </div>
    </div>
  );
}