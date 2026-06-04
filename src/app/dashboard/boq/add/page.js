"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    <div className="container-fluid">

      <div className="card shadow border-0 rounded-4">

        {/* HEADER */}

        <div className="card-header bg-dark text-white">
          <h3>Add BOQ Item</h3>
        </div>

        {/* BODY */}

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              {/* CONTRACT */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Contract
                </label>

                <select
                  name="contractId"
                  className="form-select"
                  value={
                    formData.contractId
                  }
                  onChange={
                    handleChange
                  }
                  required
                >

                  <option value="">
                    Select Contract
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

                <label className="form-label">
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
                  placeholder="Bag / Kg / Ton"
                />

              </div>

              {/* QTY */}

              <div className="col-md-4 mb-3">

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

              <div className="col-md-4 mb-3">

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

              {/* DESCRIPTION */}

              <div className="col-md-12 mb-3">

                <label className="form-label">
                  Description
                </label>

                <textarea
                  name="description"
                  className="form-control"
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

            <button
              type="submit"
              className="btn btn-dark"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create BOQ"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}