"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function BOQPage() {
  const [boqs, setBoqs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ======================
  // FETCH BOQ
  // ======================

  const fetchBOQ = async () => {
    try {
      const response = await axios.get(
        "/api/boq"
      );

      setBoqs(response.data.boqs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBOQ();
  }, []);

  // ======================
  // DELETE BOQ
  // ======================

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this BOQ item?"
      );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `/api/boq/${id}`
      );

      alert(
        "BOQ deleted successfully"
      );

      fetchBOQ();
    } catch (error) {
      console.log(error);

      alert("Failed to delete BOQ");
    }
  };

  return (
    <div className="container-fluid">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="page-title">
            BOQ Management
          </h2>

          <p className="page-subtitle">
            Manage estimation & quantity items
          </p>
        </div>

        <Link
          href="/dashboard/boq/add"
          className="btn btn-dark"
        >
          Add BOQ
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
                    <th>Item</th>
                    <th>Contract</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {boqs.length > 0 ? (
                    boqs.map((boq) => (
                      <tr key={boq.id}>

                        <td>
                          {boq.id}
                        </td>

                        <td>
                          {boq.itemName}
                        </td>

                        <td>
                          {
                            boq.contract
                              ?.title
                          }
                        </td>

                        <td>
                          {boq.quantity}
                        </td>

                        <td>
                          ₹{boq.rate}
                        </td>

                        <td>
                          ₹{boq.total}
                        </td>

                        {/* ACTIONS */}

                        <td>
                          <div className="d-flex gap-2">

                            {/* VIEW */}

                            <Link
                              href={`/dashboard/boq/view/${boq.id}`}
                              className="btn btn-info btn-sm"
                            >
                              View
                            </Link>

                            {/* EDIT */}

                            <Link
                              href={`/dashboard/boq/edit/${boq.id}`}
                              className="btn btn-warning btn-sm"
                            >
                              Edit
                            </Link>

                            {/* DELETE */}

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleDelete(
                                  boq.id
                                )
                              }
                            >
                              Delete
                            </button>

                          </div>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center"
                      >
                        No BOQ Found
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