"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  FileText,
  Package,
  Calculator,
} from "lucide-react";

export default function ViewBOQPage() {

  const { id } = useParams();
  const router = useRouter();

  const [boq, setBoq] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ======================
  // FETCH BOQ
  // ======================

  const fetchBOQ = async () => {
    try {
      const response = await axios.get(
        `/api/boq/${id}`
      );

      setBoq(response.data.boq);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBOQ();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container-fluid px-4 py-3">
        <div className="card border-0 rounded-4">
          <div className="card-body text-center py-5">
            Loading BOQ Details...
          </div>
        </div>
      </div>
    );
  }

  if (!boq) {
    return (
      <div className="container-fluid px-4 py-3">
        <div className="alert alert-warning">
          BOQ record not found
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-4 py-3">

      <div
        className="card border-0 rounded-4"
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >

        {/* HEADER */}



        {/* BODY */}

        <div className="card-body p-4 p-lg-5">
          <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">

            <div>

              <h2
                className="fw-bold mb-1"
                style={{
                  color: "#111827",
                }}
              >
                BOQ Details
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#6B7280",
                }}
              >
                View bill of quantity information
              </p>

            </div>

            <button
              type="button"
              className="btn btn-outline-secondary d-flex align-items-center gap-2"
              onClick={() =>
                router.push("/dashboard/boq")
              }
            >
              <ArrowLeft size={16} />
              Back
            </button>

          </div>
          <div className="row">

            <div className="col-md-6 mb-4">

              <div className="border rounded-4 p-3 h-100">
                <h6 className="text-muted">
                  Item Name
                </h6>

                <h4 className="fw-bold mb-0">
                  {boq.itemName}
                </h4>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Contract
              </h6>

              <h5 className="fw-semibold mb-0">
                {boq.contract?.title}
              </h5>
            </div>

            <div className="col-md-4 mb-4">
              <h6 className="text-muted">
                Unit
              </h6>

              <h5>
                {boq.unit}
              </h5>
            </div>

            <div className="col-md-4 mb-4">
              <h6 className="text-muted">
                Quantity
              </h6>

              <h5
                className="fw-bold mb-0"
                style={{
                  color: "#2563EB",
                }}
              >
                {boq.quantity}
              </h5>
            </div>

            <div className="col-md-4 mb-4">
              <h6 className="text-muted">
                Rate
              </h6>

              <h5
                className="fw-bold mb-0 text-danger"
              >
                ₹{boq.rate}
              </h5>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Total
              </h6>

              <h4
                className="fw-bold mb-0 text-success"
              >
                ₹{boq.total}
              </h4>
            </div>

            <div className="border rounded-4 p-4">

              <h6 className="text-muted mb-3">
                Description
              </h6>

              <p className="mb-0">
                {boq.description ||
                  "No description available"}
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}