"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

import {
    Plus,
    Pencil,
    Trash2,
    ClipboardList,
} from "lucide-react";

export default function DailyLogsPage() {

    const [dailyLogs, setDailyLogs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const fetchDailyLogs =
        async () => {

            try {

                const response =
                    await axios.get(
                        "/api/daily-logs"
                    );

                setDailyLogs(
                    response.data.dailyLogs || []
                );

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

    useEffect(() => {

        fetchDailyLogs();

    }, []);

    const handleDelete =
        async (id) => {

            const result =
                await Swal.fire({

                    title:
                        "Delete Daily Log?",

                    text:
                        "This daily log will be permanently removed.",

                    icon: "warning",

                    showCancelButton: true,

                    confirmButtonText:
                        "Yes, Delete",

                    cancelButtonText:
                        "Cancel",

                    reverseButtons: true,

                    confirmButtonColor:
                        "#dc3545",

                });

            if (!result.isConfirmed)
                return;

            try {

                await axios.delete(
                    `/api/daily-logs/${id}`
                );

                toast.success(
                    "Daily log deleted successfully"
                );

                fetchDailyLogs();

            } catch (error) {

                console.log(error);

                toast.error(
                    "Failed to delete daily log"
                );

            }

        };

    return (

        <div className="container-fluid px-4 py-3">

            {/* HEADER */}

            <div
                className="
          d-flex
          justify-content-between
          align-items-center
          mb-4
        "
            >

                <h2
                    className="fw-bold mb-1"
                    style={{
                        color: "#111827",
                    }}
                >
                    Daily Logs
                </h2>
                <p
                    className="mb-0"
                    style={{
                        color: "#6B7280",
                    }}
                >
                    Monitor project daily activities
                </p>
                <Link
                    href="/dashboard/daily-logs/add"
                    className="btn btn-dark rounded-3 px-4 d-flex align-items-center gap-2"
                >
                    <>
                        <Plus size={18} />
                        Add Daily Log
                    </>
                </Link>

            </div>

            {/* CARD */}

            <div
                className="card border-0 rounded-4"
                style={{
                    boxShadow:
                        "0 10px 30px rgba(0,0,0,.06)",
                }}
            >

                <div className="card-body p-4">

                    {loading ? (

                        <div className="text-center py-5">

                            <div
                                className="
                  spinner-border
                  text-primary
                "
                            ></div>

                        </div>

                    ) : (

                        <div className="table-responsive">

                            <table
                                className="
                  table
                  table-bordered
                  table-hover
                  align-middle
                "
                            >
                                <thead
                                    style={{
                                        background: "#F9FAFB",
                                    }}
                                >

                                    <tr>

                                        <th>ID</th>

                                        <th>Date</th>

                                        <th>Project</th>

                                        <th>User</th>

                                        <th>Labour</th>

                                        <th>Status</th>

                                        <th width="220">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {dailyLogs.length >
                                        0 ? (

                                        dailyLogs.map(
                                            (log) => (

                                                <tr
                                                    key={log.id}
                                                >

                                                    <td>
                                                        {log.id}
                                                    </td>

                                                    <td>

                                                        {new Date(
                                                            log.logDate
                                                        ).toLocaleDateString()}

                                                    </td>

                                                    <td>

                                                        {
                                                            log.project
                                                                ?.name
                                                        }

                                                    </td>

                                                    <td>

                                                        {
                                                            log.user
                                                                ?.name
                                                        }

                                                    </td>

                                                    <td>

                                                        {
                                                            log.labourCount
                                                        }

                                                    </td>

                                                    <td>

                                                        <span
                                                            className={`
                                badge rounded-pill px-3 py-2
                                ${log.status ===
                                                                    "Closed"
                                                                    ? "bg-success"
                                                                    : "bg-warning text-dark"
                                                                }
                              `}
                                                        >

                                                            {
                                                                log.status
                                                            }

                                                        </span>

                                                    </td>

                                                    <td>

                                                        <div
                                                            className="
                                d-flex
                                gap-2
                              "
                                                        >

                                                            <Link
                                                                href={`/dashboard/daily-logs/edit/${log.id}`}
                                                                className="btn btn-outline-warning btn-sm d-flex align-items-center gap-1"
                                                            >

                                                                <>
                                                                    <Pencil size={14} />
                                                                    Edit
                                                                </>

                                                            </Link>

                                                            <button
                                                                className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        log.id
                                                                    )
                                                                }
                                                            >

                                                                <>
                                                                    <Trash2 size={14} />
                                                                    Delete
                                                                </>

                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            )
                                        )

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="
                          text-center
                          py-4
                        "
                                            >

                                                <div className="py-5">

                                                    <ClipboardList
                                                        size={45}
                                                        className="mb-3 text-secondary"
                                                    />

                                                    <div className="fw-semibold">
                                                        No Daily Logs Found
                                                    </div>

                                                    <div className="text-muted">
                                                        Create your first daily log
                                                    </div>

                                                </div>

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