"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ViewPayrollPage() {

  const { id } = useParams();

  const [payroll, setPayroll] = useState(null);

  useEffect(() => {
    fetchPayroll();
  }, []);

  const fetchPayroll = async () => {

    const res = await fetch(`/api/payroll/${id}`);

    const data = await res.json();

    setPayroll(data);
  };

  if (!payroll) {

    return <p className="p-4">Loading...</p>;
  }

  return (

    <div className="container p-4">

      <div className="card border-0 shadow rounded-4">

        <div className="card-body">

          <h2 className="mb-4">
            Payroll Details
          </h2>

          <table className="table">

            <tbody>

              <tr>
                <th>Employee</th>
                <td>{payroll.user?.name}</td>
              </tr>

              <tr>
                <th>Month</th>
                <td>{payroll.month}</td>
              </tr>

              <tr>
                <th>Basic Salary</th>
                <td>₹{payroll.basicSalary}</td>
              </tr>

              <tr>
                <th>Overtime</th>
                <td>₹{payroll.overtime}</td>
              </tr>

              <tr>
                <th>Deductions</th>
                <td>₹{payroll.deductions}</td>
              </tr>

              <tr>
                <th>Final Salary</th>
                <td className="fw-bold text-success">
                  ₹{payroll.finalSalary}
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}