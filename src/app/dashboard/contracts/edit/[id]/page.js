"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  useRouter,
  useParams,
} from "next/navigation";

export default function EditContractPage() {

  const router = useRouter();

  const { id } = useParams();

  const [projects, setProjects] =
    useState([]);

  const [vendors, setVendors] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      projectId: "",
      vendorId: "",
      contractValue: "",
      startDate: "",
      endDate: "",
      status: "",
      description: "",
    });

  // ======================
  // FETCH CONTRACT
  // ======================

  const fetchContract =
    async () => {
      try {
        const response =
          await axios.get(
            `/api/contracts/${id}`
          );

        const contract =
          response.data.contract;

        setFormData({
          title:
            contract.title || "",

          projectId:
            contract.projectId || "",

          vendorId:
            contract.vendorId || "",

          contractValue:
            contract.contractValue ||
            "",

          startDate:
            contract.startDate ||
            "",

          endDate:
            contract.endDate ||
            "",

          status:
            contract.status || "",

          description:
            contract.description ||
            "",
        });
      } catch (error) {
        console.log(error);
      }
    };

  // ======================
  // FETCH PROJECTS
  // ======================

  const fetchProjects =
    async () => {
      try {
        const response =
          await axios.get(
            "/api/projects"
          );

        setProjects(
          response.data.projects
        );
      } catch (error) {
        console.log(error);
      }
    };

  // ======================
  // FETCH VENDORS
  // ======================

  const fetchVendors =
    async () => {
      try {
        const response =
          await axios.get(
            "/api/vendors"
          );

        setVendors(
          response.data.vendors
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchContract();
    fetchProjects();
    fetchVendors();
  }, []);

  // ======================
  // HANDLE CHANGE
  // ======================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ======================
  // HANDLE SUBMIT
  // ======================

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const response =
          await axios.put(
            `/api/contracts/${id}`,
            formData
          );

        alert(
          response.data.message
        );

        router.push(
          "/dashboard/contracts"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Failed to update contract"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="container-fluid">

      <div className="card shadow border-0 rounded-4">

        <div className="card-header bg-dark text-white">
          <h3>Edit Contract</h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Contract Title
                </label>

                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Contract Value
                </label>

                <input
                  type="number"
                  name="contractValue"
                  className="form-control"
                  value={formData.contractValue}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Project
                </label>

                <select
                  name="projectId"
                  className="form-select"
                  value={formData.projectId}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Project
                  </option>

                  {projects.map(
                    (project) => (
                      <option
                        key={project.id}
                        value={project.id}
                      >
                        {project.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Vendor
                </label>

                <select
                  name="vendorId"
                  className="form-select"
                  value={formData.vendorId}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Vendor
                  </option>

                  {vendors.map(
                    (vendor) => (
                      <option
                        key={vendor.id}
                        value={vendor.id}
                      >
                        {
                          vendor.companyName
                        }
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  className="form-control"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">
                  End Date
                </label>

                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>

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

                  <option value="Active">
                    Active
                  </option>

                  <option value="Completed">
                    Completed
                  </option>
                </select>
              </div>

              <div className="col-md-12 mb-3">
                <label className="form-label">
                  Description
                </label>

                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={formData.description}
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
                : "Update Contract"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}