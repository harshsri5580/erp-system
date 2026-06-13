"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PayslipPage() {

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

    <div id="payslip-print" className="container p-4">

      <div className="card border-0 shadow rounded-4">

        <div className="card-body">

          <div className="d-flex justify-content-between mb-4">

            <div>
              <h2 className="page-title">
                Payslip
              </h2>

              <p className="page-subtitle">
                Employee Salary Slip
              </p>
            </div>
            <button
              className="btn btn-dark no-print"
              onClick={() => {

                const printContents =
                  document.getElementById(
                    "payslip-print"
                  ).innerHTML;

                const printWindow =
                  window.open(
                    "",
                    "",
                    "width=900,height=650"
                  );

                printWindow.document.write(`
    <html>
      <head>
        <title>Payslip</title>

        <style>
          body{
            font-family: Arial;
            padding:20px;
          }

          table{
            width:100%;
            border-collapse:collapse;
          }

          th,td{
            border:1px solid #ddd;
            padding:10px;
            text-align:left;
          }

          th{
            width:250px;
          }
        </style>

      </head>

      <body>

        ${printContents}

      </body>

    </html>
  `);

                printWindow.document.close();

                printWindow.print();

              }}
            >
              Print
            </button>

          </div>

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