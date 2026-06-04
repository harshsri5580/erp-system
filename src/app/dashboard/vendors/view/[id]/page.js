"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ViewVendorPage() {

  const { id } = useParams();

  const [vendor, setVendor] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ======================
  // FETCH VENDOR
  // ======================

  const fetchVendor = async () => {
    try {
      const response = await axios.get(
        `/api/vendors/${id}`
      );

      setVendor(response.data.vendor);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendor();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!vendor) {
    return (
      <h3>Vendor not found</h3>
    );
  }

  return (
    <div className="container-fluid">
      <div className="card shadow border-0 rounded-4">
        {/* HEADER */}

        <div className="card-header bg-dark text-white">
          <h3>Vendor Details</h3>
        </div>

        {/* BODY */}

        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Company Name
              </h6>

              <h4>
                {vendor.companyName}
              </h4>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Owner Name
              </h6>

              <h5>
                {vendor.ownerName ||
                  "N/A"}
              </h5>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Phone
              </h6>

              <h5>
                {vendor.phone || "N/A"}
              </h5>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Email
              </h6>

              <h5>
                {vendor.email || "N/A"}
              </h5>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                GST Number
              </h6>

              <h5>
                {vendor.gstNumber ||
                  "N/A"}
              </h5>
            </div>

            <div className="col-md-12 mb-4">
              <h6 className="text-muted">
                Address
              </h6>

              <p>
                {vendor.address ||
                  "N/A"}
              </p>
            </div>

            <div className="col-md-12">
              <h6 className="text-muted">
                Bank Details
              </h6>

              <p>
                {vendor.bankDetails ||
                  "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}