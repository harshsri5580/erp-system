"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  useRouter,
  useParams,
} from "next/navigation";

export default function EditUserPage() {

  const router = useRouter();

  const { id } = useParams();

  const [roles, setRoles] =
    useState([]);

  const [formData, setFormData] =
    useState({
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

  const [loading, setLoading] =
    useState(false);

  // ======================
  // FETCH USER
  // ======================

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `/api/users/${id}`
      );

      const user = response.data.user;

      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        phone: user.phone || "",
        address: user.address || "",
        department:
          user.department || "",
        designation:
          user.designation || "",
        salary: user.salary || "",
        roleId: user.roleId || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ======================
  // FETCH ROLES
  // ======================

  const fetchRoles = async () => {
    try {
      const response = await axios.get(
        "/api/roles"
      );

      setRoles(response.data.roles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchRoles();
  }, []);

  // ======================
  // HANDLE CHANGE
  // ======================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ======================
  // HANDLE SUBMIT
  // ======================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.put(
        `/api/users/${id}`,
        formData
      );

      alert(response.data.message);

      router.push(
        "/dashboard/users"
      );
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
    <div className="container-fluid">
      <div className="card shadow border-0 rounded-4">
        {/* HEADER */}

        <div className="card-header bg-dark text-white">
          <h3>Edit User</h3>
        </div>

        {/* BODY */}

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  New Password
                </label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Leave blank if no change"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  className="form-control"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Designation
                </label>

                <input
                  type="text"
                  name="designation"
                  className="form-control"
                  value={formData.designation}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Salary
                </label>

                <input
                  type="number"
                  name="salary"
                  className="form-control"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Role
                </label>

                <select
                  name="roleId"
                  className="form-select"
                  value={formData.roleId}
                  onChange={handleChange}
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

              <div className="col-md-12 mb-3">
                <label className="form-label">
                  Address
                </label>

                <textarea
                  name="address"
                  className="form-control"
                  rows="4"
                  value={formData.address}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-dark"
              disabled={loading}
            >
              {loading
                ? "Updating..."
                : "Update User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}