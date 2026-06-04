"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ViewBOQPage() {

  const { id } = useParams();

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
    fetchBOQ();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!boq) {
    return <h3>BOQ not found</h3>;
  }

  return (
    <div className="container-fluid">

      <div className="card shadow border-0 rounded-4">

        {/* HEADER */}

        <div className="card-header bg-dark text-white">
          <h3>BOQ Details</h3>
        </div>

        {/* BODY */}

        <div className="card-body">

          <div className="row">

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Item Name
              </h6>

              <h4>
                {boq.itemName}
              </h4>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Contract
              </h6>

              <h5>
                {
                  boq.contract?.title
                }
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

              <h5>
                {boq.quantity}
              </h5>
            </div>

            <div className="col-md-4 mb-4">
              <h6 className="text-muted">
                Rate
              </h6>

              <h5>
                ₹{boq.rate}
              </h5>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Total
              </h6>

              <h4>
                ₹{boq.total}
              </h4>
            </div>

            <div className="col-md-12">
              <h6 className="text-muted">
                Description
              </h6>

              <p>
                {boq.description}
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}