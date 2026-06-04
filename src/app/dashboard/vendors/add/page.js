"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddVendorPage() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      companyName: "",
      ownerName: "",
      phone: "",
      email: "",
      gstNumber: "",
      address: "",
      bankDetails: "",
    });

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
          "/api/vendors",
          formData
        );

      alert(response.data.message);

      router.push(
        "/dashboard/vendors"
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
          <h3>Add Vendor</h3>
        </div>

        {/* BODY */}

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* COMPANY NAME */}

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
                  required
                />
              </div>

              {/* OWNER NAME */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Owner Name
                </label>

                <input
                  type="text"
                  name="ownerName"
                  className="form-control"
                  value={
                    formData.ownerName
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              {/* PHONE */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              {/* EMAIL */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                />
              </div>

              {/* GST */}

              <div className="col-md-6 mb-3">
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

              {/* ADDRESS */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Address
                </label>

                <input
                  type="text"
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

              {/* BANK DETAILS */}

              <div className="col-md-12 mb-3">
                <label className="form-label">
                  Bank Details
                </label>

                <textarea
                  name="bankDetails"
                  className="form-control"
                  rows="4"
                  value={
                    formData.bankDetails
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
                : "Create Vendor"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}