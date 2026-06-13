"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  FileText,
} from "lucide-react";

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

  const handleDelete = async (id) => {

    const result =
      await Swal.fire({

        title: "Delete Contract?",

        text:
          "This contract will be permanently removed.",

        icon: "warning",

        showCancelButton: true,

        confirmButtonText:
          "Yes, Delete",

        cancelButtonText:
          "Cancel",

        reverseButtons: true,

        confirmButtonColor:
          "#dc3545",

        cancelButtonColor:
          "#6c757d",

      });

    if (!result.isConfirmed)
      return;

    try {

      await axios.delete(
        `/api/contracts/${id}`
      );

      toast.success(
        "Contract deleted successfully"
      );

      fetchContracts();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete contract"
      );

    }

  };

  return (
    <div className="container-fluid px-4 py-3">
      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2
            className="fw-bold mb-1"
            style={{
              color: "#111827",
            }}
          >
            Contracts Management
          </h2>

          <p
            className="mb-0"
            style={{
              color: "#6B7280",
            }}
          >
            Manage project contracts and agreements
          </p>
        </div>

        <Link
          href="/dashboard/contracts/add"
          className="btn btn-dark rounded-3 px-4 d-flex align-items-center gap-2"
        >
          <>
            <Plus size={18} />
            Add Contract
          </>
        </Link>
      </div>

      {/* TABLE */}

      <div
        className="card border-0 rounded-4"
        style={{
          boxShadow:
            "0 10px 30px rgba(0,0,0,.06)",
        }}
      >
        <div className="card-body p-4">
          {loading ? (
            <div className="text-center py-5">
              Loading Contracts...
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead
                  style={{
                    background: "#F9FAFB",
                  }}
                >
                  <tr>
                    <th className="fw-semibold text-secondary">
                      ID
                    </th>
                    <th className="fw-semibold text-secondary">
                      Title
                    </th>
                    <th className="fw-semibold text-secondary">
                      Project
                    </th>
                    <th className="fw-semibold text-secondary">
                      Vendor
                    </th>
                    <th className="fw-semibold text-secondary">
                      Value
                    </th>
                    <th className="fw-semibold text-secondary">
                      Status
                    </th>
                    <th className="fw-semibold text-secondary">
                      Actions
                    </th>
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

                          <td className="fw-semibold">
                            {contract.title}
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

                          <td className="fw-bold text-success">
                            ₹{contract.contractValue || 0}
                          </td>

                          <td>
                            <span className="badge rounded-pill px-3 py-2 bg-primary">
                              {
                                contract.status
                              }
                            </span>
                          </td>

                          {/* ACTIONS */}

                          <td>
                            <div className="d-flex gap-2 flex-wrap">
                              <Link
                                href={`/dashboard/contracts/view/${contract.id}`}
                                className="btn btn-outline-info btn-sm d-flex align-items-center gap-1"
                              >
                                <>
                                  <Eye size={14} />
                                  View
                                </>
                              </Link>

                              <Link
                                href={`/dashboard/contracts/edit/${contract.id}`}
                                className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
                              >
                                <>
                                  <Pencil size={14} />
                                  Edit
                                </>
                              </Link>

                              <button
                                className="btn btn-danger btn-sm d-flex align-items-center gap-1"
                                onClick={() =>
                                  handleDelete(
                                    contract.id
                                  )
                                }
                              >
                                <>
                                  <Trash2 size={14} />
                                  Delete
                                </>
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
                        <FileText
                          size={45}
                          className="mb-3 text-secondary"
                        />

                        <div className="fw-semibold">
                          No Contracts Found
                        </div>

                        <div className="text-muted">
                          Create your first contract
                        </div>
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