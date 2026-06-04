"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "/api/projects"
      );

      setProjects(response.data.projects);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container-fluid">
      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="page-title">
            Projects Management
          </h2>

          <p className="page-subtitle">
            Manage all company projects
          </p>
        </div>

        <Link
          href="/dashboard/projects/add"
          className="btn btn-dark"
        >
          Add Project
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
                    <th>Project Name</th>
                    <th>Budget</th>
                    <th>Status</th>
                    <th>Client</th>

                    <th>Assigned User</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <tr key={project.id}>
                        <td>{project.id}</td>

                        <td>{project.name}</td>

                        <td>
                          ₹
                          {project.budget || 0}
                        </td>

                        <td>

                          <span className="badge bg-primary">
                            {project.status}
                          </span>

                        </td>

                        <td>

                          {project.client?.companyName ||
                            "No Client"}

                        </td>

                        <td>

                          {project.user?.name ||
                            "Not Assigned"}

                        </td>
                        <td>
                          <div className="d-flex gap-2">

                            {/* VIEW */}

                            <Link
                              href={`/dashboard/projects/view/${project.id}`}
                              className="btn btn-info btn-sm"
                            >
                              View
                            </Link>

                            {/* EDIT */}

                            <Link
                              href={`/dashboard/projects/edit/${project.id}`}
                              className="btn btn-warning btn-sm"
                            >
                              Edit
                            </Link>

                            {/* DELETE */}

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={async () => {
                                const confirmDelete =
                                  window.confirm(
                                    "Are you sure?"
                                  );

                                if (!confirmDelete) return;

                                try {
                                  await axios.delete(
                                    `/api/projects/${project.id}`
                                  );

                                  alert(
                                    "Project deleted successfully"
                                  );

                                  fetchProjects();
                                } catch (error) {
                                  console.log(error);

                                  alert(
                                    "Failed to delete project"
                                  );
                                }
                              }}
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
                        No Projects Found
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