"use client";

import { useEffect, useState } from "react";

import {
  Wallet,
  Search,
  IndianRupee,
  Users,
} from "lucide-react";

export default function PayrollReportsPage() {

  const [payrolls, setPayrolls] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchPayrolls();

  }, []);

  const fetchPayrolls = async () => {

    try {

      const res =
        await fetch("/api/reports/payroll");

      const data =
        await res.json();

      setPayrolls(data);

    } catch (error) {

      console.log(error);
    }
  };

  const filteredPayrolls =
    payrolls.filter(
      (item) =>
        item.user?.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.month
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const totalSalary =
    payrolls.reduce(
      (
        sum,
        item
      ) =>
        sum +
        Number(
          item.finalSalary || 0
        ),
      0
    );

  const totalEmployees =
    payrolls.length;

  return (

    <div className="container-fluid p-4">

      <div className="mb-5">

        <h1
          className="fw-bold mb-2"
          style={{
            color: "#111827",
          }}
        >
          Payroll Reports
        </h1>

        <p
          className="mb-0"
          style={{
            color: "#6B7280",
          }}
        >
          Employee salary and payroll analytics
        </p>

      </div>


      <div className="row mb-4">

        <div className="col-md-6">

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
                    Total Employees
                  </div>

                  <h3 className="fw-bold mb-0">
                    {totalEmployees}
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

        <div className="col-md-6">

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
                    Total Payroll
                  </div>

                  <h3 className="fw-bold text-success mb-0">
                    ₹
                    {totalSalary.toLocaleString()}
                  </h3>

                </div>

                <Wallet
                  size={28}
                  className="text-success"
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
                  placeholder="Search payroll..."
                  className="form-control rounded-3 ps-5"
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

                  <th>ID</th>
                  <th>Employee</th>
                  <th>Month</th>
                  <th>Basic Salary</th>
                  <th>Overtime</th>
                  <th>Deductions</th>
                  <th>Final Salary</th>

                </tr>

              </thead>

              <tbody>

                {filteredPayrolls.map((item) => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>
                      {item.user?.name}
                    </td>

                    <td>{item.month}</td>

                    <td>
                      ₹{item.basicSalary}
                    </td>

                    <td>
                      ₹{item.overtime}
                    </td>

                    <td>
                      ₹{item.deductions}
                    </td>

                    <td>

                      <span
                        className="fw-bold"
                        style={{
                          color:
                            "#16A34A",
                        }}
                      ></span>
                      ₹{item.finalSalary}
                    </td>

                  </tr>
                ))}
                {filteredPayrolls.length === 0 && (

                  <tr>

                    <td
                      colSpan="7"
                      className="text-center py-5"
                    >

                      <Wallet
                        size={50}
                        className="mb-3 text-secondary"
                      />

                      <h5>
                        No Payroll Reports
                      </h5>

                      <p className="text-muted mb-0">
                        Payroll records will appear here
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