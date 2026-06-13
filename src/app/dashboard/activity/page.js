"use client";

import { useEffect, useState } from "react";
import {
    ClipboardList,
    ArrowUpRight,
} from "lucide-react";

export default function ActivityPage() {

    const [activities, setActivities] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [currentPage, setCurrentPage] =
        useState(1);

    const itemsPerPage = 20;

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {

        try {

            const res =
                await fetch("/api/activity");

            const data =
                await res.json();

            setActivities(
                data.activities || []
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    // Pagination

    const totalPages =
        Math.ceil(
            activities.length /
            itemsPerPage
        );

    const startIndex =
        (currentPage - 1) *
        itemsPerPage;

    const endIndex =
        startIndex +
        itemsPerPage;

    const currentActivities =
        activities.slice(
            startIndex,
            endIndex
        );

    return (

        <div className="container-fluid p-4">

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <div>

                            <h2 className="fw-bold mb-1">
                                Activity Log
                            </h2>

                            <p className="text-muted mb-0">
                                System Recent Activities
                            </p>

                        </div>

                        <div className="badge bg-primary">
                            {activities.length}
                            {" "}
                            Activities
                        </div>

                    </div>

                    {loading ? (

                        <div className="text-center py-5">
                            Loading...
                        </div>

                    ) : currentActivities.length === 0 ? (

                        <div className="text-center py-5 text-muted">
                            No Activity Found
                        </div>

                    ) : (

                        <>
                            <div className="d-flex flex-column gap-3">

                                {currentActivities.map(
                                    (
                                        activity,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            className="
                        border
                        rounded-4
                        p-3
                        d-flex
                        justify-content-between
                        align-items-center
                      "
                                        >

                                            <div className="d-flex align-items-center gap-3">

                                                <div
                                                    className="
                            bg-primary
                            bg-opacity-10
                            text-primary
                            rounded-circle
                            d-flex
                            align-items-center
                            justify-content-center
                          "
                                                    style={{
                                                        width: "48px",
                                                        height: "48px",
                                                    }}
                                                >
                                                    <ClipboardList size={20} />
                                                </div>

                                                <div>

                                                    <div className="fw-semibold">
                                                        {activity.title}
                                                    </div>

                                                    <small className="text-muted">

                                                        {new Date(
                                                            activity.time
                                                        ).toLocaleString()}

                                                    </small>

                                                </div>

                                            </div>

                                            <ArrowUpRight
                                                size={18}
                                                className="text-muted"
                                            />

                                        </div>

                                    )
                                )}

                            </div>

                            {/* Pagination */}

                            {totalPages > 1 && (

                                <div className="d-flex justify-content-center gap-2 mt-4">

                                    <button
                                        className="btn btn-outline-secondary"
                                        disabled={
                                            currentPage === 1
                                        }
                                        onClick={() =>
                                            setCurrentPage(
                                                currentPage - 1
                                            )
                                        }
                                    >
                                        Previous
                                    </button>

                                    <span
                                        className="
                      px-3
                      py-2
                      border
                      rounded
                    "
                                    >
                                        {currentPage}
                                        {" / "}
                                        {totalPages}
                                    </span>

                                    <button
                                        className="btn btn-outline-secondary"
                                        disabled={
                                            currentPage === totalPages
                                        }
                                        onClick={() =>
                                            setCurrentPage(
                                                currentPage + 1
                                            )
                                        }
                                    >
                                        Next
                                    </button>

                                </div>

                            )}

                        </>

                    )}

                </div>

            </div>

        </div>

    );
}