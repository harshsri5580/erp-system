"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPayrollPage() {

  const { id } = useParams();

  const router = useRouter();

  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    userId: "",
    month: "",
    basicSalary: "",
    overtime: "",
    deductions: "",
  });

  useEffect(() => {

    fetchUsers();
    fetchPayroll();

  }, []);

  const fetchUsers = async () => {

    const res = await fetch("/api/users");

    const data = await res.json();

    setUsers(data.users || []);
  };

  const fetchPayroll = async () => {

    const res = await fetch(`/api/payroll/${id}`);

    const data = await res.json();

    setFormData(data);
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await fetch(`/api/payroll/${id}`, {

      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(formData),
    });

    router.push("/dashboard/payroll");
  };

  return (

    <div className="container p-4">

      <div className="card border-0 shadow rounded-4">

        <div className="card-body">

          <h2 className="mb-4">
            Edit Payroll
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label>Employee</label>

              <select
                name="userId"
                className="form-control"
                value={formData.userId}
                onChange={handleChange}
              >

                {users.map((user) => (

                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}

              </select>

            </div>

            <div className="mb-3">

              <label>Month</label>

              <input
                type="month"
                name="month"
                className="form-control"
                value={formData.month}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label>Basic Salary</label>

              <input
                type="number"
                name="basicSalary"
                className="form-control"
                value={formData.basicSalary}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label>Overtime</label>

              <input
                type="number"
                name="overtime"
                className="form-control"
                value={formData.overtime}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label>Deductions</label>

              <input
                type="number"
                name="deductions"
                className="form-control"
                value={formData.deductions}
                onChange={handleChange}
              />

            </div>

            <button className="btn btn-dark">
              Update Payroll
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}