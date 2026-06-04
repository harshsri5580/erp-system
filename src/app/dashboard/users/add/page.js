"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
  const router = useRouter();

  const [roles, setRoles] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    department: "",
    designation: "",
    salary: "",
    roleId: "",
  });

  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH ROLES
  // =========================

  const fetchRoles = async () => {
    try {
      const response = await axios.get("/api/roles");

      setRoles(response.data.roles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // HANDLE SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        "/api/users",
        formData
      );

      alert(response.data.message);

      router.push("/users");
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h3>Add New User</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* NAME */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* EMAIL */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* PASSWORD */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* PHONE */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* ADDRESS */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Address
                </label>

                <input
                  type="text"
                  name="address"
                  className="form-control"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              {/* DEPARTMENT */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  className="form-control"
                  placeholder="Enter department"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>

              {/* DESIGNATION */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Designation
                </label>

                <input
                  type="text"
                  name="designation"
                  className="form-control"
                  placeholder="Enter designation"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>

              {/* SALARY */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Salary
                </label>

                <input
                  type="number"
                  name="salary"
                  className="form-control"
                  placeholder="Enter salary"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>

              {/* ROLE */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Role
                </label>

                <select
                  name="roleId"
                  className="form-select"
                  value={formData.roleId}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select Role
                  </option>

                  {roles.map((role) => (
                    <option
                      key={role.id}
                      value={role.id}
                    >
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}