"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import toast from "react-hot-toast";

import {
  X,
  User,
  Calendar,
  Clock,
  Pencil,
} from "lucide-react";

export default function EditAttendancePage() {
  const { id } = useParams();

  const router = useRouter();

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    userId: "",
    date: "",
    checkIn: "",
    checkOut: "",
    status: "",
  });

  useEffect(() => {
    if (id) {
      fetchUsers();
      fetchAttendance();
    }
  }, [id]);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data.users || []);
  };

  const fetchAttendance = async () => {
    const res = await fetch(`/api/attendance/${id}`);
    const data = await res.json();

    setFormData({
      userId: data.userId,
      date: data.date?.split("T")[0],
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      status: data.status,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        `/api/attendance/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            formData
          ),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Update failed"
        );
      }

      toast.success(
        "Attendance updated successfully"
      );

      setTimeout(() => {
        router.push(
          "/dashboard/attendance"
        );
      }, 1000);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to update attendance"
      );

    }

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
                Edit Attendance
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#6B7280",
                }}
              >
                Update employee attendance record
              </p>

            </div>

            <button
              type="button"
              className="btn btn-outline-secondary d-flex align-items-center gap-2"
              onClick={() =>
                router.push(
                  "/dashboard/attendance"
                )
              }
            >
              Back
            </button>

          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">Employee</label>

              <select
                name="userId"
                className="form-select rounded-3"
                value={formData.userId}
                onChange={handleChange}
              >
                {users.map((user) => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">Date</label>

              <input
                type="date"
                name="date"
                className="form-control rounded-3"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">Check In</label>

              <input
                type="time"
                name="checkIn"
                className="form-control rounded-3"
                value={formData.checkIn}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold text-dark">Check Out</label>

              <input
                type="time"
                name="checkOut"
                className="form-control rounded-3"
                value={formData.checkOut}
                onChange={handleChange}
              />
            </div>

            <div className="row">

              <div className="mb-3">
                <label className="form-label fw-semibold text-dark">Status</label>

                <select
                  name="status"
                  className="form-select rounded-3"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Present</option>
                  <option>Absent</option>
                  <option>Late</option>
                  <option>Half Day</option>
                </select>
              </div>
            </div>

            <div className="d-flex gap-2 mt-4">

              <button
                type="submit"
                className="btn btn-dark px-4"
              >
                Update Attendance
              </button>



            </div>
          </form>
        </div>
      </div>
    </div>
  );
}