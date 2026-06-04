"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function PurchaseOrdersPage() {

  const [purchaseOrders, setPurchaseOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // ======================
  // FETCH PURCHASE ORDERS
  // ======================

  const fetchPurchaseOrders =
    async () => {
      try {
        const response =
          await axios.get(
            "/api/purchase-orders"
          );

        setPurchaseOrders(
          response.data.purchaseOrders
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

  // ======================
  // DELETE
  // ======================

  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Delete this purchase order?"
        );

      if (!confirmDelete) return;

      try {
        await axios.delete(
          `/api/purchase-orders/${id}`
        );

        alert(
          "Purchase order deleted successfully"
        );

        fetchPurchaseOrders();
      } catch (error) {
        console.log(error);

        alert(
          "Failed to delete purchase order"
        );
      }
    };

  return (
    <div className="container-fluid">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="page-title">
            Purchase Orders
          </h2>

          <p className="page-subtitle">
            Manage all material purchase orders
          </p>
        </div>

        <Link
          href="/dashboard/purchase-orders/add"
          className="btn btn-dark"
        >
          Add Purchase Order
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
                    <th>Vendor</th>
                    <th>Project</th>
                    <th>BOQ Item</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {purchaseOrders.length > 0 ? (
                    purchaseOrders.map(
                      (po) => (
                        <tr key={po.id}>

                          <td>
                            {po.id}
                          </td>

                          <td>
                            {
                              po.vendor
                                ?.companyName
                            }
                          </td>

                          <td>
                            {
                              po.project
                                ?.name
                            }
                          </td>

                          <td>
                            {
                              po.boq
                                ?.itemName
                            }
                          </td>

                          <td>
                            {po.quantity}
                          </td>

                          <td>
                            ₹{po.total}
                          </td>

                          <td>
                            <span className="badge bg-primary">
                              {po.status}
                            </span>
                          </td>

                          {/* ACTIONS */}

                          <td>

                            <div className="d-flex gap-2">

                              <Link
                                href={`/dashboard/purchase-orders/view/${po.id}`}
                                className="btn btn-info btn-sm"
                              >
                                View
                              </Link>

                              <Link
                                href={`/dashboard/purchase-orders/edit/${po.id}`}
                                className="btn btn-warning btn-sm"
                              >
                                Edit
                              </Link>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  handleDelete(
                                    po.id
                                  )
                                }
                              >
                                Delete
                              </button>

                            </div>

                          </td>

                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center"
                      >
                        No Purchase Orders Found
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