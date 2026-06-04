"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ViewAttendancePage() {
  const { id } = useParams();

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
    return <p className="p-4">Loading...</p>;
  }

  return (
    <div className="container p-4">
      <div className="card shadow border-0 rounded-4">
        <div className="card-body">
          <h2 className="mb-4">Attendance Details</h2>

          <table className="table">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{attendance.id}</td>
              </tr>

              <tr>
                <th>Employee</th>
                <td>{attendance.user?.name}</td>
              </tr>

              <tr>
                <th>Date</th>
                <td>
                  {new Date(attendance.date).toLocaleDateString()}
                </td>
              </tr>

              <tr>
                <th>Check In</th>
                <td>{attendance.checkIn}</td>
              </tr>

              <tr>
                <th>Check Out</th>
                <td>{attendance.checkOut}</td>
              </tr>

              <tr>
                <th>Status</th>
                <td>{attendance.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}