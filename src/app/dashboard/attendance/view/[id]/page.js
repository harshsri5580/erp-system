"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  BadgeCheck,
} from "lucide-react";

export default function ViewAttendancePage() {
  const { id } = useParams();
  const router = useRouter();

  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    const res = await fetch(`/api/attendance/${id}`);
    const data = await res.json();

    setAttendance(data);
  };

  if (!attendance) {
    return (
      <div className="container-fluid p-4">
        <div className="card border-0 rounded-4">
          <div className="card-body text-center py-5">
            Loading Attendance...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-3">
      <div
        className="card border-0 rounded-4"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <div className="card-body p-4 p-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">

            <div>

              <h2
                className="fw-bold mb-1"
                style={{
                  color: "#111827",
                }}
              >
                Attendance Details
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#6B7280",
                }}
              >
                Employee attendance information
              </p>

            </div>

            <button
              className="btn btn-outline-secondary d-flex align-items-center gap-2"
              onClick={() =>
                router.push(
                  "/dashboard/attendance"
                )
              }
            >
              <ArrowLeft size={16} />
              Back
            </button>

          </div>

          <table className="table table-bordered align-middle mb-0">
            <tbody>
              <tr>
                <th
                  style={{
                    width: "220px",
                    background: "#F9FAFB",
                  }}
                >ID</th>
                <td>{attendance.id}</td>
              </tr>

              <tr>
                <th
                  style={{
                    width: "220px",
                    background: "#F9FAFB",
                  }}
                >Employee</th>
                <td className="fw-semibold">
                  {attendance.user?.name}
                </td>
              </tr>

              <tr>
                <th
                  style={{
                    width: "220px",
                    background: "#F9FAFB",
                  }}
                >Date</th>
                <td>
                  {new Date(attendance.date).toLocaleDateString()}
                </td>
              </tr>

              <tr>
                <th
                  style={{
                    width: "220px",
                    background: "#F9FAFB",
                  }}
                >Check In</th>
                <td>{attendance.checkIn}</td>
              </tr>

              <tr>
                <th
                  style={{
                    width: "220px",
                    background: "#F9FAFB",
                  }}
                >Check Out</th>
                <td>{attendance.checkOut}</td>
              </tr>

              <tr>
                <th
                  style={{
                    width: "220px",
                    background: "#F9FAFB",
                  }}
                >Status</th>
                <td>
                  <span
                    className={`badge px-3 py-2 ${attendance.status === "Present"
                      ? "bg-success"
                      : attendance.status === "Late"
                        ? "bg-warning text-dark"
                        : attendance.status === "Half Day"
                          ? "bg-info"
                          : "bg-danger"
                      }`}
                  >
                    {attendance.status}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}