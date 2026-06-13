"use client";

import { useEffect, useState } from "react";

import {
  Users,
  Search,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

export default function AttendanceReportsPage() {

  const [attendance, setAttendance] =
    useState([]);
  const [search, setSearch] =
    useState("");
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

  const filteredAttendance =
    attendance.filter(
      (item) =>
        item.user?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.status
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalRecords =
    attendance.length;

  const presentCount =
    attendance.filter(
      (x) =>
        x.status === "Present"
    ).length;

  const lateCount =
    attendance.filter(
      (x) =>
        x.status === "Late"
    ).length;
  return (

    <div className="container-fluid p-4">

      <div className="mb-5">

        <h1
          className="fw-bold mb-2"
          style={{
            color: "#111827",
          }}
        >
          Attendance Reports
        </h1>

        <p
          className="mb-0"
          style={{
            color: "#6B7280",
          }}
        >
          Employee attendance and workforce insights
        </p>

      </div>

      <div className="row mb-4">

        <div className="col-md-4">

          <div
            className="card border-0 rounded-4"
            style={{
              boxShadow:
                "0 10px 30px rgba(0,0,0,.06)",
            }}
          >

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <div className="text-muted">
                    Total Records
                  </div>

                  <h3 className="fw-bold mb-0">
                    {totalRecords}
                  </h3>

                </div>

                <Users
                  size={28}
                  className="text-primary"
                />

              </div>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div
            className="card border-0 rounded-4"
            style={{
              boxShadow:
                "0 10px 30px rgba(0,0,0,.06)",
            }}
          >

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <div className="text-muted">
                    Present
                  </div>

                  <h3 className="fw-bold text-success mb-0">
                    {presentCount}
                  </h3>

                </div>

                <CheckCircle2
                  size={28}
                  className="text-success"
                />

              </div>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div
            className="card border-0 rounded-4"
            style={{
              boxShadow:
                "0 10px 30px rgba(0,0,0,.06)",
            }}
          >

            <div className="card-body">

              <div className="d-flex justify-content-between">

                <div>

                  <div className="text-muted">
                    Late Entries
                  </div>

                  <h3 className="fw-bold text-warning mb-0">
                    {lateCount}
                  </h3>

                </div>

                <CalendarDays
                  size={28}
                  className="text-warning"
                />

              </div>

            </div>

          </div>

        </div>

      </div>
      <div
        className="card border-0 rounded-4"
        style={{
          boxShadow:
            "0 10px 30px rgba(0,0,0,.06)",
        }}
      >


        <div className="card-body">
          <div className="row mb-4">

            <div className="col-md-4">

              <div className="position-relative">

                <Search
                  size={18}
                  style={{
                    position:
                      "absolute",
                    left: "14px",
                    top: "12px",
                    color:
                      "#6B7280",
                  }}
                />

                <input
                  type="text"
                  className="form-control rounded-3 ps-5"
                  placeholder="Search employee..."
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

          </div>
          <div className="table-responsive">

            <table className="table align-middle">

              <thead
                style={{
                  background:
                    "#F9FAFB",
                }}
              >

                <tr>

                  <th className="fw-semibold text-secondary">ID</th>
                  <th className="fw-semibold text-secondary">Employee</th>
                  <th className="fw-semibold text-secondary">Date</th>
                  <th className="fw-semibold text-secondary">Check In</th>
                  <th className="fw-semibold text-secondary">Check Out</th>
                  <th className="fw-semibold text-secondary">Status</th>

                </tr>

              </thead>

              <tbody>

                {filteredAttendance.map((item) => (

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
                {filteredAttendance.length === 0 && (

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center py-5"
                    >

                      <CalendarDays
                        size={50}
                        className="text-secondary mb-3"
                      />

                      <h5>
                        No Attendance Records
                      </h5>

                      <p className="text-muted mb-0">
                        Attendance reports will appear here
                      </p>

                    </td>

                  </tr>

                )}
              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}