"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PayrollPage() {

  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {

    try {

      const res = await fetch("/api/payroll");

      const data = await res.json();

      setPayrolls(data);

    } catch (error) {

      console.log(error);
    }
  };

  const deletePayroll = async (id) => {

    if (!confirm("Delete payroll?")) return;

    try {

      await fetch(`/api/payroll/${id}`, {
        method: "DELETE",
      });

      fetchPayrolls();

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="container-fluid p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h3 className="page-title">Payroll Management</h3>
          <p className="page-subtitle">
            Manage employee salaries and payroll
          </p>
        </div>

        <Link
          href="/dashboard/payroll/generate"
          className="btn btn-dark"
        >
          Generate Payroll
        </Link>

      </div>

      <div className="card border-0 shadow rounded-4">

        <div className="card-body">

          <div className="table-responsive">

            <table className="table align-middle">

              <thead className="table-dark">

                <tr>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Month</th>
                  <th>Basic Salary</th>
                  <th>Overtime</th>
                  <th>Deductions</th>
                  <th>Final Salary</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {payrolls.map((item) => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>{item.user?.name}</td>

                    <td>{item.month}</td>

                    <td>₹{item.basicSalary}</td>

                    <td>₹{item.overtime}</td>

                    <td>₹{item.deductions}</td>

                    <td className="fw-bold text-success">
                      ₹{item.finalSalary}
                    </td>

                    <td>
                      <span className="badge bg-success">
                        Paid
                      </span>
                    </td>

                    <td>

                      <div className="d-flex gap-2">

                        <Link
                          href={`/dashboard/payroll/view/${item.id}`}
                          className="btn btn-info btn-sm"
                        >
                          View
                        </Link>

                        <Link
                          href={`/dashboard/payroll/edit/${item.id}`}
                          className="btn btn-warning btn-sm"
                        >
                          Edit
                        </Link>

                        <Link
                          href={`/dashboard/payroll/payslip/${item.id}`}
                          className="btn btn-secondary btn-sm"
                        >
                          Payslip
                        </Link>

                        <button
                          onClick={() =>
                            deletePayroll(item.id)
                          }
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

          </div>

        </div>

      </div>

    </div>
  );
}