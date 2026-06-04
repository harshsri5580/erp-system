"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function VendorsPage() {
  const [vendors, setVendors] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ======================
  // FETCH VENDORS
  // ======================

  const fetchVendors = async () => {
    try {
      const response = await axios.get(
        "/api/vendors"
      );

      setVendors(
        response.data.vendors
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // ======================
  // DELETE VENDOR
  // ======================

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this vendor?"
      );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `/api/vendors/${id}`
      );

      alert(
        "Vendor deleted successfully"
      );

      fetchVendors();
    } catch (error) {
      console.log(error);

      alert(
        "Failed to delete vendor"
      );
    }
  };

  return (
    <div className="container-fluid">
      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="page-title">
            Vendors Management
          </h2>

          <p className="page-subtitle">
            Manage all vendors
          </p>
        </div>

        <Link
          href="/dashboard/vendors/add"
          className="btn btn-dark"
        >
          Add Vendor
        </Link>
      </div>

      {/* TABLE */}

      <div className="card shadow border-0 rounded-4">
        <div className="card-body">
          {loading ? (
            <h5>Loading...</h5>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Company</th>
                    <th>Owner</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>GST</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {vendors.length > 0 ? (
                    vendors.map(
                      (vendor) => (
                        <tr
                          key={vendor.id}
                        >
                          <td>
                            {vendor.id}
                          </td>

                          <td>
                            {
                              vendor.companyName
                            }
                          </td>

                          <td>
                            {
                              vendor.ownerName
                            }
                          </td>

                          <td>
                            {
                              vendor.phone
                            }
                          </td>

                          <td>
                            {
                              vendor.email
                            }
                          </td>

                          <td>
                            {
                              vendor.gstNumber
                            }
                          </td>

                          {/* ACTIONS */}

                          <td>
                            <div className="d-flex gap-2">
                              {/* VIEW */}

                              <Link
                                href={`/dashboard/vendors/view/${vendor.id}`}
                                className="btn btn-info btn-sm"
                              >
                                View
                              </Link>

                              {/* EDIT */}

                              <Link
                                href={`/dashboard/vendors/edit/${vendor.id}`}
                                className="btn btn-warning btn-sm"
                              >
                                Edit
                              </Link>

                              {/* DELETE */}

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  handleDelete(
                                    vendor.id
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center"
                      >
                        No Vendors Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}