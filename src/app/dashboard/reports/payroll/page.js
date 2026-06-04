"use client";

import { useEffect, useState } from "react";

export default function PayrollReportsPage() {

  const [payrolls, setPayrolls] =
    useState([]);

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

  return (

    <div className="container-fluid p-4">

      <div className="mb-4">

        <h2 className="page-title">
          Payroll Reports
        </h2>

        <p className="page-subtitle">
          Employee salary reports
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
                  <th>Month</th>
                  <th>Basic Salary</th>
                  <th>Overtime</th>
                  <th>Deductions</th>
                  <th>Final Salary</th>

                </tr>

              </thead>

              <tbody>

                {payrolls.map((item) => (

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

                    <td className="fw-bold text-success">
                      ₹{item.finalSalary}
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