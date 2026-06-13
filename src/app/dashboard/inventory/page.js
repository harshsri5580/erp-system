"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function InventoryPage() {

  const [inventories, setInventories] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // FETCH

  const fetchInventory =
    async () => {

      try {

        const response =
          await axios.get(
            "/api/inventory"
          );

        setInventories(
          response.data.inventories
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  useEffect(() => {
    fetchInventory();
  }, []);

  // DELETE

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete inventory?"
        );

      if (!confirmDelete) return;

      try {

        await axios.delete(
          `/api/inventory/${id}`
        );

        alert(
          "Inventory deleted successfully"
        );

        fetchInventory();

      } catch (error) {

        console.log(error);

        alert(
          "Failed to delete inventory"
        );
      }
    };

  return (
    <div className="container-fluid">

      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="page-title">
            Inventory Management
          </h2>

          <p className="page-subtitle">
            Manage stock & materials
          </p>
        </div>

        <Link
          href="/dashboard/inventory/add"
          className="btn btn-dark"
        >
          Manual Stock Entry
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
                    <th>Material</th>
                    <th>Qty</th>
                    <th>Unit</th>
                    <th>Min Stock</th>
                    <th>Stock Alert</th>
                    <th>Vendor</th>
                    <th>Project</th>
                    {/* <th>PO</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {inventories.length > 0 ? (
                    inventories.map(
                      (inventory) => (
                        <tr
                          key={
                            inventory.id
                          }
                        >

                          <td>
                            {
                              inventory.id
                            }
                          </td>

                          <td>
                            {
                              inventory.materialName
                            }
                          </td>

                          <td>
                            {
                              inventory.quantity
                            }
                          </td>

                          <td>
                            {
                              inventory.unit
                            }
                          </td>





                          <td>
                            {inventory.minStock}
                          </td>

                          <td>

                            {Number(inventory.quantity || 0) <= Number(inventory.minStock || 0) ? (

                              <span className="badge bg-danger">
                                Low Stock
                              </span>

                            ) : (

                              <span className="badge bg-success">
                                In Stock
                              </span>

                            )}

                          </td>

                          <td>
                            {inventory.vendor?.companyName || "-"}
                          </td>

                          <td>
                            {inventory.project?.name || "-"}
                          </td>

                          {/* <td>
                            {
                              inventory.purchaseorder?.poNumber ||
                              `PO-${inventory.purchaseOrderId || "-"}`
                            }
                          </td> */}

                          <td>

                            <div className="d-flex gap-2">

                              <Link
                                href={`/dashboard/inventory/view/${inventory.id}`}
                                className="btn btn-info btn-sm"
                              >
                                View
                              </Link>

                              <Link
                                href={`/dashboard/inventory/edit/${inventory.id}`}
                                className="btn btn-warning btn-sm"
                              >
                                Edit
                              </Link>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  handleDelete(
                                    inventory.id
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
                        colSpan="10"
                        className="text-center"
                      >
                        No Inventory Found
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