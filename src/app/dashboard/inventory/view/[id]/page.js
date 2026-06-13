"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

export default function ViewInventoryPage() {

  const { id } = useParams();

  const [inventory, setInventory] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // ======================
  // FETCH INVENTORY
  // ======================

  const fetchInventory =
    async () => {

      try {

        const response =
          await axios.get(
            `/api/inventory/${id}`
          );

        setInventory(
          response.data.inventory
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {

    if (id) {

      fetchInventory();

    }

  }, [id]);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (!inventory) {
    return (
      <h3>
        Inventory not found
      </h3>
    );
  }

  return (
    <div className="container-fluid">

      <div className="card shadow border-0 rounded-4">

        {/* HEADER */}

        <div className="card-header bg-dark text-white">
          <h3>Inventory Details</h3>
        </div>

        {/* BODY */}

        <div className="card-body">

          <div className="row">

            <div className="col-md-6 mb-4">

              <h6 className="text-muted">
                Material Name
              </h6>

              <h4>
                {
                  inventory.materialName
                }
              </h4>

            </div>

            <div className="col-md-3 mb-4">

              <h6 className="text-muted">
                Quantity
              </h6>

              <h5>
                {
                  inventory.quantity
                }
              </h5>

            </div>

            <div className="col-md-3 mb-4">

              <h6 className="text-muted">
                Unit
              </h6>

              <h5>
                {
                  inventory.unit
                }
              </h5>

            </div>

            <div className="col-md-4 mb-4">

              <h6 className="text-muted">
                Min Stock
              </h6>

              <h5>
                {
                  inventory.minStock
                }
              </h5>

            </div>

            <div className="col-md-4 mb-4">

              <h6 className="text-muted">
                Status
              </h6>

              {inventory.quantity <= inventory.minStock ? (

                <span className="badge bg-danger">
                  Low Stock
                </span>

              ) : (

                <span className="badge bg-success">
                  In Stock
                </span>

              )}

            </div>
            <div className="col-md-4 mb-4">

              <h6 className="text-muted">
                Vendor
              </h6>

              <h5>
                {
                  inventory.vendor
                    ?.companyName
                }
              </h5>

            </div>

            <div className="col-md-6 mb-4">

              <h6 className="text-muted">
                Project
              </h6>

              <h5>
                {
                  inventory.project
                    ?.name
                }
              </h5>

            </div>

            <div className="col-md-6 mb-4">

              <h6 className="text-muted">
                Created Date
              </h6>

              <h5>

                {new Date(
                  inventory.createdAt
                ).toLocaleDateString()}

              </h5>

            </div>

            {/* <div className="col-md-6 mb-4">

              <h6 className="text-muted">
                Purchase Order
              </h6>

              <h5>
                {
                  inventory.purchaseorder?.poNumber ||
                  `PO-${inventory.purchaseOrderId}`
                }
              </h5>

            </div> */}

          </div>

        </div>
      </div>
    </div>
  );
}