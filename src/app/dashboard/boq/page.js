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

    const result =
      await Swal.fire({

        title: "Delete BOQ Item?",

        text:
          "This BOQ record will be permanently removed.",

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

        customClass: {
          popup: "rounded-4",
        },

      });

    if (!result.isConfirmed)
      return;

    try {

      await axios.delete(
        `/api/boq/${id}`
      );

      toast.success(
        "BOQ deleted successfully"
      );

      fetchBOQ();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete BOQ"
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
            BOQ Management
          </h2>

          <p
            className="mb-0"
            style={{
              color: "#6B7280",
            }}
          >
            Manage bill of quantities and estimation items
          </p>

        </div>
        <Link
          href="/dashboard/boq/add"
          className="btn btn-dark rounded-3 px-4 d-flex align-items-center gap-2"
        >
          <Plus size={18} />
          Add BOQ
        </Link>

      </div>

      {/* TABLE */}

      <div
        className="card border-0 rounded-4"
        style={{
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >

        <div className="card-body p-4">

          {loading ? (
            <div className="text-center py-5">
              Loading BOQ Data...
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
                      Item
                    </th>
                    <th className="fw-semibold text-secondary">
                      Contract
                    </th>
                    <th className="fw-semibold text-secondary">
                      Qty
                    </th>
                    <th className="fw-semibold text-secondary">
                      Rate
                    </th>
                    <th className="fw-semibold text-secondary">
                      Total
                    </th>
                    <th className="fw-semibold text-secondary">
                      Actions
                    </th>
                  </tr>

                </thead>

                <tbody>

                  {boqs.length > 0 ? (
                    boqs.map((boq) => (
                      <tr key={boq.id}>

                        <td>
                          {boq.id}
                        </td>

                        <td className="fw-semibold">
                          {boq.itemName}
                        </td>

                        <td className="fw-medium">
                          {boq.contract?.title}
                        </td>

                        <td className="fw-semibold text-primary">
                          {boq.quantity}
                        </td>

                        <td className="fw-semibold text-danger">
                          ₹{boq.rate}
                        </td>

                        <td className="fw-bold text-success">
                          ₹{boq.total}
                        </td>

                        {/* ACTIONS */}

                        <td>
                          <div className="d-flex gap-2 flex-wrap">

                            {/* VIEW */}

                            <Link
                              href={`/dashboard/boq/view/${boq.id}`}
                              className="btn btn-outline-info btn-sm d-flex align-items-center gap-1"
                            >
                              <>
                                <Eye size={14} />
                                View
                              </>
                            </Link>

                            {/* EDIT */}

                            <Link
                              href={`/dashboard/boq/edit/${boq.id}`}
                              className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
                            >
                              <>
                                <Pencil size={14} />
                                Edit
                              </>
                            </Link>

                            {/* DELETE */}

                            <button
                              className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                              onClick={() =>
                                handleDelete(
                                  boq.id
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
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-5"
                      >
                        <FileText
                          size={40}
                          className="mb-3 text-secondary"
                        />

                        <div className="fw-semibold">
                          No BOQ Records Found
                        </div>

                        <div className="text-muted">
                          Create your first BOQ item
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