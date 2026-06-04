"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ContractsPage() {
  const [contracts, setContracts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

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
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchContracts();
  }, []);

  // ======================
  // DELETE CONTRACT
  // ======================

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this contract?"
        );

      if (!confirmDelete) return;

      try {
        await axios.delete(
          `/api/contracts/${id}`
        );

        alert(
          "Contract deleted successfully"
        );

        fetchContracts();
      } catch (error) {
        console.log(error);

        alert(
          "Failed to delete contract"
        );
      }
    };

  return (
    <div className="container-fluid">
      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="page-title">
            Contracts Management
          </h2>

          <p className="page-subtitle">
            Manage all contracts
          </p>
        </div>

        <Link
          href="/dashboard/contracts/add"
          className="btn btn-dark"
        >
          Add Contract
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
                    <th>Title</th>
                    <th>Project</th>
                    <th>Vendor</th>
                    <th>Value</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {contracts.length >
                    0 ? (
                    contracts.map(
                      (
                        contract
                      ) => (
                        <tr
                          key={
                            contract.id
                          }
                        >
                          <td>
                            {
                              contract.id
                            }
                          </td>

                          <td>
                            {
                              contract.title
                            }
                          </td>

                          <td>
                            {
                              contract
                                .project
                                ?.name
                            }
                          </td>

                          <td>
                            {
                              contract
                                .vendor
                                ?.companyName
                            }
                          </td>

                          <td>
                            ₹
                            {contract.contractValue ||
                              0}
                          </td>

                          <td>
                            <span className="badge bg-primary">
                              {
                                contract.status
                              }
                            </span>
                          </td>

                          {/* ACTIONS */}

                          <td>
                            <div className="d-flex gap-2">
                              <Link
                                href={`/dashboard/contracts/view/${contract.id}`}
                                className="btn btn-info btn-sm"
                              >
                                View
                              </Link>

                              <Link
                                href={`/dashboard/contracts/edit/${contract.id}`}
                                className="btn btn-warning btn-sm"
                              >
                                Edit
                              </Link>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  handleDelete(
                                    contract.id
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
                        No Contracts Found
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