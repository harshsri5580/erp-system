"use client";

import { useEffect, useState } from "react";

export default function AttendanceReportsPage() {

  const [attendance, setAttendance] =
    useState([]);

  useEffect(() => {

    fetchAttendance();

  }, []);

  const fetchAttendance = async () => {

    try {

      const res =
        await fetch("/api/reports/attendance");

      const data =
        await res.json();

      setAttendance(data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="container-fluid p-4">

      <div className="mb-4">

        <h2 className="page-title">
          Attendance Reports
        </h2>

        <p className="page-subtitle">
          Employee attendance analytics
        </p>

      </div>

      <div className="card border-0 shadow-sm rounded-4">

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

                </tr>

              </thead>

              <tbody>

                {attendance.map((item) => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>
                      {item.user?.name}
                    </td>

                    <td>
                      {new Date(item.date)
                        .toLocaleDateString()}
                    </td>

                    <td>{item.checkIn}</td>

                    <td>{item.checkOut}</td>

                    <td>

                      <span
                        className={`
                          badge
                          ${item.status === "Present"
                            ? "bg-success"
                            : item.status === "Late"
                              ? "bg-warning"
                              : item.status === "Half Day"
                                ? "bg-info"
                                : "bg-danger"
                          }
                        `}
                      >

                        {item.status}

                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}