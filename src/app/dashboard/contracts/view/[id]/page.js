"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ViewContractPage() {

  const { id } = useParams();

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
    fetchContract();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!contract) {
    return (
      <h3>Contract not found</h3>
    );
  }

  return (
    <div className="container-fluid">
      <div className="card shadow border-0 rounded-4">

        <div className="card-header bg-dark text-white">
          <h3>Contract Details</h3>
        </div>

        <div className="card-body">
          <div className="row">

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Contract Title
              </h6>

              <h4>
                {contract.title}
              </h4>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Contract Value
              </h6>

              <h4>
                ₹
                {contract.contractValue}
              </h4>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Project
              </h6>

              <h5>
                {
                  contract.project?.name
                }
              </h5>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Vendor
              </h6>

              <h5>
                {
                  contract.vendor
                    ?.companyName
                }
              </h5>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Start Date
              </h6>

              <h5>
                {
                  contract.startDate
                }
              </h5>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                End Date
              </h6>

              <h5>
                {contract.endDate}
              </h5>
            </div>

            <div className="col-md-6 mb-4">
              <h6 className="text-muted">
                Status
              </h6>

              <span className="badge bg-primary">
                {contract.status}
              </span>
            </div>

            <div className="col-md-12">
              <h6 className="text-muted">
                Description
              </h6>

              <p>
                {
                  contract.description
                }
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}