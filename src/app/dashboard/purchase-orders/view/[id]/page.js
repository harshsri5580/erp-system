"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ViewPurchaseOrderPage() {

  const { id } = useParams();

  const [purchaseOrder, setPurchaseOrder] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ======================
  // FETCH PURCHASE ORDER
  // ======================

  const fetchPurchaseOrder =
    async () => {
      try {
        const response =
          await axios.get(
            `/api/purchase-orders/${id}`
          );

        setPurchaseOrder(
          response.data.purchaseOrder
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchPurchaseOrder();
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!purchaseOrder) {
    return (
      <h3>
        Purchase Order not found
      </h3>
    );
  }

  return (
    <div className="container-fluid">

      <div className="card shadow border-0 rounded-4">

        {/* HEADER */}

        <div className="card-header bg-dark text-white">
          <h3>Purchase Order Details</h3>
        </div>

        {/* BODY */}

        <div className="card-body">

          <div className="row">

            <div className="col-md-6 mb-4">

              <h6 className="text-muted">
                Vendor
              </h6>

              <h4>
                {
                  purchaseOrder.vendor
                    ?.companyName
                }
              </h4>

            </div>

            <div className="col-md-6 mb-4">

              <h6 className="text-muted">
                Project
              </h6>

              <h4>
                {
                  purchaseOrder.project
                    ?.name
                }
              </h4>

            </div>

            <div className="col-md-6 mb-4">

              <h6 className="text-muted">
                BOQ Item
              </h6>

              <h5>
                {
                  purchaseOrder.boq
                    ?.itemName
                }
              </h5>

            </div>

            <div className="col-md-3 mb-4">

              <h6 className="text-muted">
                Quantity
              </h6>

              <h5>
                {
                  purchaseOrder.quantity
                }
              </h5>

            </div>

            <div className="col-md-3 mb-4">

              <h6 className="text-muted">
                Rate
              </h6>

              <h5>
                ₹
                {
                  purchaseOrder.rate
                }
              </h5>

            </div>

            <div className="col-md-6 mb-4">

              <h6 className="text-muted">
                Total
              </h6>

              <h4>
                ₹
                {
                  purchaseOrder.total
                }
              </h4>

            </div>

            <div className="col-md-6 mb-4">

              <h6 className="text-muted">
                Status
              </h6>

              <span className="badge bg-primary">
                {
                  purchaseOrder.status
                }
              </span>

            </div>

            <div className="col-md-12">

              <h6 className="text-muted">
                Description
              </h6>

              <p>
                {
                  purchaseOrder.description
                }
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}