"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="container p-4">
      <div className="card shadow border-0 rounded-4">
        <div className="card-body">
          <h2 className="mb-4">Add Attendance</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Employee</label>

              <select
                name="userId"
                className="form-control"
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

            <div className="mb-3">
              <label>Date</label>

              <input
                type="date"
                name="date"
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Check In</label>

              <input
                type="time"
                name="checkIn"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Check Out</label>

              <input
                type="time"
                name="checkOut"
                className="form-control"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Status</label>

              <select
                name="status"
                className="form-control"
                onChange={handleChange}
              >
                <option>Present</option>
                <option>Absent</option>
                <option>Late</option>
                <option>Half Day</option>
              </select>
            </div>

            <button className="btn btn-dark">
              Save Attendance
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}