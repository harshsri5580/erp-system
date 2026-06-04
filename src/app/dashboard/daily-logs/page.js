"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

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

            const confirmDelete =
                confirm(
                    "Are you sure you want to delete this daily log?"
                );

            if (!confirmDelete)
                return;

            try {

                await axios.delete(
                    `/api/daily-logs/${id}`
                );

                alert(
                    "Daily Log deleted successfully"
                );

                fetchDailyLogs();

            } catch (error) {

                console.log(error);

                alert(
                    "Failed to delete daily log"
                );

            }

        };

    return (

        <div className="container-fluid">

            {/* HEADER */}

            <div
                className="
          d-flex
          justify-content-between
          align-items-center
          mb-4
        "
            >

                <h2 className="page-title">
                    Daily Logs
                </h2>

                <Link
                    href="/dashboard/daily-logs/add"
                    className="btn btn-primary"
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add Daily Log
                </Link>

            </div>

            {/* CARD */}

            <div className="card shadow border-0">

                <div className="card-body">

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
                                    className="
                    table-dark
                  "
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
                                badge
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
                                                                className="
                                  btn
                                  btn-sm
                                  btn-warning
                                "
                                                            >

                                                                Edit

                                                            </Link>

                                                            <button
                                                                className="
                                  btn
                                  btn-sm
                                  btn-danger
                                "
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        log.id
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
                                                colSpan="7"
                                                className="
                          text-center
                          py-4
                        "
                                            >

                                                No Daily Logs Found

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