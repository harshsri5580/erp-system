"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ViewProjectPage() {

  const { id } = useParams();

  const [project, setProject] =
    useState(null);

  const [loading, setLoading] =
    useState(true);
  // ======================
  // FETCH PROJECT
  // ======================

  const fetchProject = async () => {
    try {
      const response = await axios.get(
        `/api/projects/${id}`
      );

      setProject(response.data.project);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  // ======================
  // LOADING
  // ======================

  if (loading) {
    return <h3>Loading...</h3>;
  }

  // ======================
  // NO PROJECT
  // ======================

  if (!project) {
    return (
      <h3>Project not found</h3>
    );
  }

  return (
    <div className="container-fluid">
      <div className="card shadow border-0 rounded-4">
        {/* HEADER */}

        <div className="card-header bg-dark text-white">
          <h3>
            Project Details
          </h3>
        </div>

        {/* BODY */}

        <div className="card-body">
          <div className="row">
            {/* PROJECT NAME */}

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Project Name
              </h6>

              <h4>{project.name}</h4>
            </div>

            {/* BUDGET */}

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Budget
              </h6>

              <h4>
                ₹
                {project.budget || 0}
              </h4>
            </div>

            {/* STATUS */}

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Status
              </h6>

              <span className="badge bg-primary fs-6">
                {project.status}
              </span>
            </div>

            {/* CLIENT */}

            <div className="col-md-6 mb-4">

              <h6 className="text-muted">
                Client
              </h6>

              <h5>

                {project.client?.companyName ||
                  "No Client"}

              </h5>

            </div>

            {/* ASSIGNED USER */}

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Assigned User
              </h6>

              <h5>
                {project.user?.name ||
                  "Not Assigned"}
              </h5>
            </div>

            {/* DESCRIPTION */}

            <div className="col-md-12 mb-4">
              <h6 className="text-muted">
                Description
              </h6>

              <p>
                {project.description ||
                  "No description available"}
              </p>
            </div>

            {/* CREATED DATE */}

            <div className="col-md-12">
              <h6 className="text-muted">
                Created At
              </h6>

              <p>
                {new Date(
                  project.createdAt
                ).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}