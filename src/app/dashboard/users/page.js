"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ======================
  // FETCH USERS
  // ======================

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "/api/users"
      );

      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ======================
  // DELETE USER
  // ======================

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this user?"
      );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `/api/users/${id}`
      );

      alert(
        "User deleted successfully"
      );

      fetchUsers();
    } catch (error) {
      console.log(error);

      alert("Failed to delete user");
    }
  };

  return (
    <div className="container-fluid">
      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="page-title">
            Users Management
          </h2>

          <p className="page-subtitle">
            Manage all company users
          </p>
        </div>

        <Link
          href="/dashboard/users/add"
          className="btn btn-dark"
        >
          Add User
        </Link>
      </div>

      {/* TABLE */}

      <div className="card shadow border-0 rounded-4">
        <div className="card-body">
          {loading ? (
            <h5>Loading...</h5>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>

                        <td>{user.name}</td>

                        <td>{user.email}</td>

                        <td>
                          {user.department ||
                            "N/A"}
                        </td>

                        <td>
                          {user.role?.name}
                        </td>

                        <td>
                          {user.status ? (
                            <span className="badge bg-success">
                              Active
                            </span>
                          ) : (
                            <span className="badge bg-danger">
                              Inactive
                            </span>
                          )}
                        </td>

                        {/* ACTIONS */}

                        <td>
                          <div className="d-flex gap-2">
                            {/* VIEW */}

                            <Link
                              href={`/dashboard/users/view/${user.id}`}
                              className="btn btn-info btn-sm"
                            >
                              View
                            </Link>

                            {/* EDIT */}

                            <Link
                              href={`/dashboard/users/edit/${user.id}`}
                              className="btn btn-warning btn-sm"
                            >
                              Edit
                            </Link>

                            {/* DELETE */}

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                handleDelete(
                                  user.id
                                )
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center"
                      >
                        No Users Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}