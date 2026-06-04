"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  useRouter,
  useParams,
} from "next/navigation";

export default function EditProjectPage() {

  const router = useRouter();

  const { id } = useParams();

  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    status: "",
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
  // ======================
  // FETCH PROJECT
  // ======================

  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `/api/projects/${id}`
      );

      const project = response.data.project;

      setFormData({
        name: project.name || "",
        description:
          project.description || "",
        budget: project.budget || "",
        status: project.status || "",
        userId: project.userId || "",
        clientId: project.clientId || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    fetchUsers();

    fetchClients();

    fetchProject();

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
        `/api/projects/${id}`,
        formData
      );

      alert(response.data.message);

      router.push(
        "/dashboard/projects"
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
          <h3>Edit Project</h3>
        </div>

        {/* BODY */}

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

              {/* ASSIGN USER */}

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
                  rows="5"
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
                ? "Updating..."
                : "Update Project"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}