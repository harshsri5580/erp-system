"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  X,
  User,
  Calendar,
  Clock,
} from "lucide-react";

export default function AddAttendancePage() {
  const router = useRouter();

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    userId: "",
    date: "",
    checkIn: "",
    checkOut: "",
    status: "Present",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(Array.isArray(data.users) ? data.users : []);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    router.push("/dashboard/attendance");
  };

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
                Add Attendance
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#6B7280",
                }}
              >
                Create a new attendance record
              </p>

            </div>

            <button
              type="button"
              className="btn btn-outline-secondary rounded-3"
              onClick={() =>
                router.push(
                  "/dashboard/attendance"
                )
              }
            >
              <X size={16} />
            </button>

          </div>

          <form onSubmit={handleSubmit}>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold text-dark">Employee</label>

              <select
                name="userId"
                className="form-select rounded-3"
                onChange={handleChange}
                required
              >
                <option value="">Select Employee</option>

                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold text-dark">Date</label>

                <input
                  type="date"
                  name="date"
                  className="form-control rounded-3"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold text-dark">Check In</label>

              <input
                type="time"
                name="checkIn"
                className="form-control rounded-3"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold text-dark">Check Out</label>

              <input
                type="time"
                name="checkOut"
                className="form-control rounded-3"
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold text-dark">Status</label>

              <select
                name="status"
                className="form-select rounded-3"
                onChange={handleChange}
              >
                <option>Present</option>
                <option>Absent</option>
                <option>Late</option>
                <option>Half Day</option>
              </select>
            </div>

            <div className="d-flex gap-2 mt-4">

              <button
                type="submit"
                className="btn btn-dark px-4"
              >
                Save Attendance
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={() =>
                  router.push(
                    "/dashboard/attendance"
                  )
                }
              >
                Close
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}