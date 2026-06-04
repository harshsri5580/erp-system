"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddProjectPage() {
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    status: "Pending",
    userId: "",
    clientId: "",
  });

  const [loading, setLoading] = useState(false);

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
    }
  };

  const fetchClients = async () => {

    try {

      const response = await axios.get(
        "/api/clients"
      );

      setClients(response.data.clients);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchUsers();

    fetchClients();

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

      const response = await axios.post(
        "/api/projects",
        formData
      );

      alert(response.data.message);

      router.push("/dashboard/projects");
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
        <div className="card-header bg-dark text-white">
          <h3>Add New Project</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* PROJECT NAME */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Project Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter project name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* BUDGET */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Budget
                </label>

                <input
                  type="number"
                  name="budget"
                  className="form-control"
                  placeholder="Enter budget"
                  value={formData.budget}
                  onChange={handleChange}
                />
              </div>

              {/* STATUS */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Status
                </label>

                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </div>

              {/* CLIENT */}

              <div className="col-md-6 mb-3">

                <label className="form-label">
                  Select Client
                </label>

                <select
                  name="clientId"
                  className="form-select"
                  value={formData.clientId}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Client
                  </option>

                  {clients.map((client) => (

                    <option
                      key={client.id}
                      value={client.id}
                    >
                      {client.companyName}
                    </option>

                  ))}

                </select>

              </div>

              {/* ASSIGNED USER */}

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Assign User
                </label>

                <select
                  name="userId"
                  className="form-select"
                  value={formData.userId}
                  onChange={handleChange}
                >
                  <option value="">
                    Select User
                  </option>

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

              {/* DESCRIPTION */}

              <div className="col-md-12 mb-3">
                <label className="form-label">
                  Description
                </label>

                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  placeholder="Enter project description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="btn btn-dark"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Project"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}