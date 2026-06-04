"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
    if (!confirm("Delete this attendance record?")) return;

    try {
      await fetch(`/api/attendance/${id}`, {
        method: "DELETE",
      });

      fetchAttendance();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="page-title">Attendance Management</h3>
          <p className="page-subtitle">
            Manage employee attendance records
          </p>
        </div>

        <Link href="/dashboard/attendance/add" className="btn btn-dark">
          Add Attendance
        </Link>
      </div>

      <div className="card shadow border-0 rounded-4">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Employee</th>
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

                    <td>{item.user?.name}</td>

                    <td>
                      {new Date(item.date).toLocaleDateString()}
                    </td>

                    <td>{item.checkIn}</td>

                    <td>{item.checkOut}</td>

                    <td>
                      <span
                        className={`badge ${item.status === "Present"
                          ? "bg-success"
                          : item.status === "Late"
                            ? "bg-warning"
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
                          className="btn btn-info btn-sm"
                        >
                          View
                        </Link>

                        <Link
                          href={`/dashboard/attendance/edit/${item.id}`}
                          className="btn btn-warning btn-sm"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => deleteAttendance(item.id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {attendance.length === 0 && (
              <p className="text-center mt-3">
                No attendance records found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}