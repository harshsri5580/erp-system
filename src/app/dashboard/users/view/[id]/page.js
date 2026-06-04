"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ViewUserPage() {

  const { id } = useParams();

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `/api/users/${id}`
      );

      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!user) {
    return (
      <h3>User not found</h3>
    );
  }

  return (
    <div className="container-fluid">
      <div className="card shadow border-0 rounded-4">
        {/* HEADER */}

        <div className="card-header bg-dark text-white">
          <h3>User Details</h3>
        </div>

        {/* BODY */}

        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Name
              </h6>

              <h4>{user.name}</h4>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Email
              </h6>

              <h5>{user.email}</h5>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Phone
              </h6>

              <h5>
                {user.phone || "N/A"}
              </h5>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Department
              </h6>

              <h5>
                {user.department ||
                  "N/A"}
              </h5>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Designation
              </h6>

              <h5>
                {user.designation ||
                  "N/A"}
              </h5>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Salary
              </h6>

              <h5>
                ₹
                {user.salary || 0}
              </h5>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Role
              </h6>

              <h5>
                {user.role?.name}
              </h5>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Status
              </h6>

              {user.status ? (
                <span className="badge bg-success fs-6">
                  Active
                </span>
              ) : (
                <span className="badge bg-danger fs-6">
                  Inactive
                </span>
              )}
            </div>

            <div className="col-md-12 mb-4">
              <h6 className="text-muted">
                Address
              </h6>

              <p>
                {user.address || "N/A"}
              </p>
            </div>

            <div className="col-md-12">
              <h6 className="text-muted">
                Created At
              </h6>

              <p>
                {new Date(
                  user.createdAt
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}