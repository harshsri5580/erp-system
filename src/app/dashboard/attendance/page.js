"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

import {
  Plus,
  Eye,
  Pencil,
  Trash2,
  CalendarCheck,
} from "lucide-react";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState([]);

  const fetchAttendance = async () => {
    try {
      const res = await fetch("/api/attendance");
      const data = await res.json();
      setAttendance(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAttendance = async (id) => {

    const result =
      await Swal.fire({

        title: "Delete Attendance?",

        text:
          "This record will be permanently removed.",

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

      await fetch(
        `/api/attendance/${id}`,
        {
          method: "DELETE",
        }
      );

      toast.success(
        "Attendance deleted successfully"
      );

      fetchAttendance();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete attendance"
      );

    }

  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2
            className="fw-bold mb-1"
            style={{
              color: "#111827",
              opacity: 1,
            }}
          >
            Attendance Management
          </h2>

          <p
            className="mb-0"
            style={{
              color: "#6B7280",
            }}
          >
            Track and manage employee attendance records
          </p>
        </div>

        <Link
          href="/dashboard/attendance/add"
          className="btn btn-dark rounded-3 px-4 d-flex align-items-center gap-2"
        >
          <Plus size={18} />
          Add Attendance
        </Link>
      </div>

      <div
        className="card border-0 rounded-4"
        style={{
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <div className="card-body p-4">
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
                    Employee
                  </th>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {attendance.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td className="fw-semibold">
                      {item.user?.name}
                    </td>

                    <td className="text-muted">
                      {new Date(item.date).toLocaleDateString()}
                    </td>

                    <td>{item.checkIn}</td>

                    <td>{item.checkOut}</td>

                    <td>
                      <span
                        className={`badge rounded-pill px-3 py-2 ${item.status === "Present"
                          ? "bg-success"
                          : item.status === "Late"
                            ? "bg-warning text-dark"
                            : item.status === "Half Day"
                              ? "bg-info"
                              : "bg-danger"
                          }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="d-flex gap-2">
                        <Link
                          href={`/dashboard/attendance/view/${item.id}`}
                          className="btn btn-outline-info btn-sm d-flex align-items-center gap-1"
                        >
                          <>
                            <Eye size={14} />
                            View
                          </>
                        </Link>

                        <Link
                          href={`/dashboard/attendance/edit/${item.id}`}
                          className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
                        >
                          <>
                            <Pencil size={14} />
                            Edit
                          </>
                        </Link>

                        <button
                          onClick={() => deleteAttendance(item.id)}
                          className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                        >
                          <>
                            <Trash2 size={14} />
                            Delete
                          </>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {attendance.length === 0 && (
              <div className="text-center py-5">
                <CalendarCheck
                  size={50}
                  className="mb-3 text-secondary"
                />

                <h5>No Attendance Records</h5>

                <p className="text-muted mb-0">
                  Attendance data will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}