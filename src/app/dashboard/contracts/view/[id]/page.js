"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
} from "lucide-react";

export default function ViewContractPage() {

  const { id } = useParams();
  const router = useRouter();

  const [contract, setContract] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

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

        setContract(
          response.data.contract
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (id) {
      fetchContract();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container-fluid px-4 py-3">
        <div className="card border-0 rounded-4">
          <div className="card-body text-center py-5">
            Loading Contract Details...
          </div>
        </div>
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="container-fluid px-4 py-3">
        <div className="card border-0 rounded-4">
          <div className="card-body text-center py-5">
            Contract not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-3">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">

        <div>

          <h2
            className="fw-bold mb-1"
            style={{
              color: "#111827",
            }}
          >
            Contract Details
          </h2>

          <p
            className="mb-0"
            style={{
              color: "#6B7280",
            }}
          >
            View contract information
          </p>

        </div>

        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() =>
            router.push(
              "/dashboard/contracts"
            )
          }
        >
          <ArrowLeft size={16} />
        </button>

      </div>
      <div
        className="card border-0 rounded-4"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          boxShadow:
            "0 10px 30px rgba(0,0,0,.06)",
        }}
      >


        <div className="card-body p-4 p-lg-5">


          <div className="row g-4">

            <div className="col-md-6">
              <div className="border rounded-4 p-3">
                <small className="text-muted">
                  Contract Title
                </small>

                <h5 className="fw-bold mb-0">
                  {contract.title}
                </h5>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded-4 p-3">
                <small className="text-muted">
                  Contract Value
                </small>

                <h5 className="fw-bold text-success mb-0">
                  ₹{contract.contractValue}
                </h5>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded-4 p-3">
                <small className="text-muted">
                  Project
                </small>

                <h6 className="mb-0">
                  {contract.project?.name || "-"}
                </h6>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded-4 p-3">
                <small className="text-muted">
                  Vendor
                </small>

                <h6 className="mb-0">
                  {contract.vendor?.companyName || "-"}
                </h6>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded-4 p-3">
                <small className="text-muted">
                  Start Date
                </small>

                <h6 className="mb-0">
                  {contract.startDate || "-"}
                </h6>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded-4 p-3">
                <small className="text-muted">
                  End Date
                </small>

                <h6 className="mb-0">
                  {contract.endDate || "-"}
                </h6>
              </div>
            </div>

            <div className="col-md-6">
              <div className="border rounded-4 p-3">
                <small className="text-muted">
                  Status
                </small>

                <div className="mt-2">
                  <span className="badge rounded-pill px-3 py-2 bg-primary">
                    {contract.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="border rounded-4 p-4">
                <small className="text-muted">
                  Description
                </small>

                <p className="mb-0 mt-2">
                  {contract.description ||
                    "No description available"}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}