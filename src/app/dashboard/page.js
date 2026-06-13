"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  Users,
  FolderKanban,
  IndianRupee,
  CalendarCheck,
  TrendingUp,
  ClipboardList,
  Bell,
  ArrowUpRight,
} from "lucide-react";


export default function DashboardPage() {
  const [userRole, setUserRole] =
    useState("");
  const [companyName, setCompanyName] =
    useState("");

  const [statsData, setStatsData] =

    useState({
      totalUsers: 0,
      totalProjects: 0,
      totalAttendance: 0,
      totalPayroll: 0,
      totalRevenue: 0,

      pendingPayments: 0,

      pendingExpenses: 0,
    });
  const [recentActivity,
    setRecentActivity] =
    useState([]);


  useEffect(() => {

    const role =
      localStorage.getItem(
        "userRole"
      );

    setUserRole(role || "");

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    try {

      const res =
        await fetch("/api/dashboard");

      const data =
        await res.json();

      setStatsData(data);

      setRecentActivity(
        data.recentActivity || []
      );

      setStatsData(data);

      setRecentActivity(
        data.recentActivity || []
      );

      setCompanyName(
        data.companyName || ""
      );

    } catch (error) {

      console.log(error);
    }
  };

  const stats = [

    {
      title: "Total Users",
      value: statsData.totalUsers,
      growth: "+12%",
      color: "primary",
      icon: Users,
    },

    {
      title: "Active Projects",
      value: statsData.totalProjects,
      growth: "+4",
      color: "success",
      icon: FolderKanban,
    },

    {
      title: "Attendance Today",
      value: statsData.totalAttendance,
      growth: "92%",
      color: "warning",
      icon: CalendarCheck,
    },

    {
      title: "Revenue",
      value: `₹${statsData.totalRevenue}`,
      growth: "+8%",
      color: "success",
      icon: IndianRupee,
    },

    {
      title: "Pending Payments",
      value: `₹${statsData.pendingPayments}`,
      growth: "Pending",
      color: "warning",
      icon: ClipboardList,
    },

    {
      title: "Pending Expenses",
      value: `₹${statsData.pendingExpenses}`,
      growth: "Tracking",
      color: "danger",
      icon: CalendarCheck,
    },
  ];
  const role =
    (userRole || "")
      .toLowerCase();
  let filteredStats = stats;
  if (
    role === "employee"
  ) {

    filteredStats =
      stats.filter(
        (item) =>

          [
            "Attendance Today",
          ].includes(
            item.title
          )
      );
  }

  if (
    role === "accountant"
  ) {

    filteredStats =
      stats.filter(
        (item) =>

          [
            "Revenue",
            "Pending Payments",
            "Pending Expenses",
          ].includes(
            item.title
          )
      );
  }

  if (
    role === "manager"
  ) {

    filteredStats =
      stats.filter(
        (item) =>

          [
            "Active Projects",
            "Total Users",
            "Attendance Today",
          ].includes(
            item.title
          )
      );
  }

  const premiumCardStyle = `
  .premium-card {
    transition: all 0.25s ease;
  }

  .premium-card:hover {
    transform: translateY(-6px);
  }
`;

  return (

    <div
      className="container-fluid p-4"
      style={{
        background:
          "linear-gradient(to bottom, #f8fafc, #eef2ff)",
        minHeight: "100vh",
      }}
    >
      <style>{premiumCardStyle}</style>

      {/* TOP HEADER */}

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">

        <div>

          <h2
            className="fw-black mb-2"
            style={{
              fontSize: "42px",
              letterSpacing: "-1px",
              color: "#0f172a",
            }}
          >
            Construction ERP Dashboard
          </h2>
          {/* <h5>{userRole}</h5> */}
          <p
            className="mb-0"
            style={{
              color: "#64748b",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Monitor projects, workforce, finance and operations from one unified platform.
          </p>

        </div>

        <div className="d-flex align-items-center gap-3">
          {/* 
          <button className="btn btn-light border rounded-3 position-relative">

            <Bell size={18} />

            <span
              className="
                position-absolute
                top-0
                start-100
                translate-middle
                badge
                rounded-pill
                bg-danger
              "
            >
              3
            </span>

          </button> */}

          <div
            className="
              d-flex
              align-items-center
              gap-2
              bg-white
              shadow-sm
              border
              rounded-4
              px-3
              py-2
            "
          >

            <div
              className="
                bg-primary
                text-white
                rounded-circle
                d-flex
                align-items-center
                justify-content-center
              "
              style={{
                width: "38px",
                height: "38px",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              H
            </div>

            <div>

              <div
                className="fw-bold"
                style={{
                  fontSize: "15px",
                  color: "#0f172a",
                  letterSpacing: "-0.3px",
                }}
              >
                {companyName || "Company"}
              </div>

              <small className="text-muted">
                {userRole || "User"}
              </small>

            </div>

          </div>

        </div>

      </div>

      {/* STATS CARDS */}

      <div className="row g-5 mb-5">

        {filteredStats.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              className="col-xl-4 col-md-6"
              key={index}
            >

              <div
                className="
                  card
border-0
shadow-lg bg-white
rounded-5
h-100
overflow-hidden
position-relative
premium-card
                "
                style={{
                  backdropFilter: "blur(12px)",
                }}
              >

                <div className="card-body p-4 d-flex flex-column justify-content-between h-100">

                  <div className="d-flex justify-content-between align-items-center">

                    <div>

                      <p
                        className="mb-2"
                        style={{
                          color: "#64748b",
                          fontSize: "15px",
                          fontWeight: "600",
                        }}
                      >
                        {item.title}
                      </p>

                      <h2
                        className="fw-black mb-3"
                        style={{
                          fontSize: "42px",
                          letterSpacing: "-1px",
                          color: "#0f172a",
                        }}
                      >
                        {item.value}
                      </h2>

                      <div
                        className={`
                          text-${item.color}
                          small
                          fw-semibold
                          d-flex
                          align-items-center
                          gap-1
                        `}
                      >

                        <TrendingUp size={14} />

                        {item.growth}
                        {/* 
                        <span className="text-muted fw-normal">
                          this month
                        </span> */}

                      </div>

                    </div>

                    <div
                      className={`
                        bg-${item.color}
                        bg-opacity-10
                        text-${item.color}
                        rounded-4
                        d-flex
                        align-items-center
                        justify-content-center
                      `}
                      style={{
                        width: "68px",
                        height: "68px",
                        background:
                          item.color === "success"
                            ? "rgba(34,197,94,0.12)"
                            : item.color === "warning"
                              ? "rgba(251,191,36,0.15)"
                              : item.color === "danger"
                                ? "rgba(239,68,68,0.12)"
                                : "rgba(59,130,246,0.12)",

                        backdropFilter: "blur(12px)",
                      }}
                    >

                      <Icon size={32} strokeWidth={2.3} />

                    </div>

                  </div>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* MAIN SECTION */}

      <div className="row g-4">

        {/* RECENT ACTIVITY */}

        <div className="col-lg-8">

          <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-body p-4">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <h5 className="fw-bold mb-0">
                  Recent Activity
                </h5>

                <button
                  className="btn btn-sm btn-light border rounded-3"
                  onClick={() =>
                    window.location.href =
                    "/dashboard/activity"
                  }
                >
                  View All
                </button>

              </div>

              <div className="d-flex flex-column gap-3">

                {recentActivity.length > 0 ? (

                  recentActivity.map(
                    (activity, index) => (

                      <div
                        key={index}
                        className="
d-flex
justify-content-between
align-items-center
rounded-4
p-3
border-0
shadow-sm
bg-white
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
                              width: "42px",
                              height: "42px",
                            }}
                          >
                            <ClipboardList size={18} />
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

                        {/* <ArrowUpRight
                          size={18}
                          className="text-muted"
                        /> */}

                      </div>

                    )
                  )

                ) : (

                  <div className="text-center text-muted py-4">
                    No Recent Activity Found
                  </div>

                )}

              </div>

            </div>

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="col-lg-4">

          <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-body p-4">

              <h5 className="fw-bold mb-4">
                Quick Actions
              </h5>

              <div className="d-grid gap-3">

                {role === "admin" && (
                  <>
                    <Link
                      href="/dashboard/users/add"
                      className="btn btn-dark rounded-3 py-3 fw-semibold"
                    >
                      Add User
                    </Link>

                    <Link
                      href="/dashboard/projects/add"
                      className="btn btn-primary rounded-3 py-3 fw-semibold"
                    >
                      Create Project
                    </Link>

                    <Link
                      href="/dashboard/payroll/generate"
                      className="btn btn-success rounded-3 py-3 fw-semibold"
                    >
                      Generate Payroll
                    </Link>

                    <Link
                      href="/dashboard/reports"
                      className="btn btn-warning text-white rounded-3 py-3 fw-semibold"
                    >
                      View Reports
                    </Link>

                    <Link
                      href="/dashboard/invoices/add"
                      className="btn btn-danger rounded-3 py-3 fw-semibold"
                    >
                      Create Invoice
                    </Link>

                    <Link
                      href="/dashboard/payments/add"
                      className="btn btn-info text-white rounded-3 py-3 fw-semibold"
                    >
                      Add Payment
                    </Link>

                    <Link
                      href="/dashboard/expenses/add"
                      className="btn btn-secondary rounded-3 py-3 fw-semibold"
                    >
                      Add Expense
                    </Link>
                  </>
                )}

                {role === "manager" && (
                  <>
                    <Link
                      href="/dashboard/projects/add"
                      className="btn btn-primary rounded-3 py-3 fw-semibold"
                    >
                      Create Project
                    </Link>

                    <Link
                      href="/dashboard/purchase-orders/add"
                      className="btn btn-success rounded-3 py-3 fw-semibold"
                    >
                      Create PO
                    </Link>

                    <Link
                      href="/dashboard/grn/add"
                      className="btn btn-warning text-white rounded-3 py-3 fw-semibold"
                    >
                      Create GRN
                    </Link>

                    <Link
                      href="/dashboard/reports"
                      className="btn btn-info text-white rounded-3 py-3 fw-semibold"
                    >
                      View Reports
                    </Link>
                  </>
                )}

                {role === "accountant" && (
                  <>
                    <Link
                      href="/dashboard/invoices/add"
                      className="btn btn-danger rounded-3 py-3 fw-semibold"
                    >
                      Create Invoice
                    </Link>

                    <Link
                      href="/dashboard/payments/add"
                      className="btn btn-info text-white rounded-3 py-3 fw-semibold"
                    >
                      Add Payment
                    </Link>

                    <Link
                      href="/dashboard/expenses/add"
                      className="btn btn-secondary rounded-3 py-3 fw-semibold"
                    >
                      Add Expense
                    </Link>

                    <Link
                      href="/dashboard/reports"
                      className="btn btn-warning text-white rounded-3 py-3 fw-semibold"
                    >
                      View Reports
                    </Link>
                  </>
                )}

                {role === "employee" && (
                  <>
                    <Link
                      href="/dashboard/attendance"
                      className="btn btn-success rounded-3 py-3 fw-semibold"
                    >
                      My Attendance
                    </Link>

                    <Link
                      href="/dashboard/documents"
                      className="btn btn-primary rounded-3 py-3 fw-semibold"
                    >
                      My Documents
                    </Link>
                  </>
                )}

              </div>

              {/* MINI STATUS */}

              {/* <div
                className="
                  mt-4
                  p-3
                  bg-light
                  rounded-4
                  border
                "
              >

                <div className="small text-muted mb-2">
                  System Status
                </div>

                <div className="d-flex justify-content-between mb-2">

                  <span className="small">
                    Server
                  </span>

                  <span className="badge bg-success">
                    Online
                  </span>

                </div>

                <div className="d-flex justify-content-between mb-2">

                  <span className="small">
                    Database
                  </span>

                  <span className="badge bg-success">
                    Connected
                  </span>

                </div>

                <div className="d-flex justify-content-between">

                  <span className="small">
                    Backup
                  </span>

                  <span className="badge bg-warning text-dark">
                    Pending
                  </span>

                </div>

              </div> */}



            </div>

          </div>

        </div>

      </div>

    </div>
  );
}