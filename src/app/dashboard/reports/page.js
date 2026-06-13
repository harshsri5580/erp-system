"use client";

import Link from "next/link";

import {
  BarChart3,
  Wallet,
  CalendarCheck,
  FolderKanban,
  Boxes,
  Truck,
} from "lucide-react";

export default function ReportsPage() {

  const reports = [

    {
      title: "Payroll Reports",
      desc: "View employee salary reports",
      icon: Wallet,
      color: "success",
      link: "/dashboard/reports/payroll",
    },

    {
      title: "Attendance Reports",
      desc: "Track employee attendance",
      icon: CalendarCheck,
      color: "warning",
      link: "/dashboard/reports/attendance",
    },

    // {
    //   title: "Project Reports",
    //   desc: "Manage project analytics",
    //   icon: FolderKanban,
    //   color: "primary",
    //   link: "/dashboard/reports/projects",
    // },

    // {
    //   title: "Inventory Reports",
    //   desc: "Monitor inventory stock",
    //   icon: Boxes,
    //   color: "info",
    //   link: "/dashboard/reports/inventory",
    // },

    // {
    //   title: "Vendor Reports",
    //   desc: "Vendor performance reports",
    //   icon: Truck,
    //   color: "dark",
    //   link: "/dashboard/reports/vendors",
    // },

    {
      title: "Analytics",
      desc: "Charts & ERP analytics",
      icon: BarChart3,
      color: "danger",
      link: "/dashboard/reports/analytics",
    },
  ];

  return (

    <div className="container-fluid p-4">

      <div className="mb-5">

        <h1
          className="fw-bold mb-2"
          style={{
            color: "#111827",
            fontSize: "2.5rem",
          }}
        >
          Reports Dashboard
        </h1>

        <p
          className="mb-0"
          style={{
            color: "#6B7280",
            fontSize: "1rem",
          }}
        >
          Analyze payroll, attendance and business insights
        </p>

      </div>

      <div className="row g-4">

        {reports.map((report, index) => {

          const Icon = report.icon;

          return (

            <div
              className="col-xl-4 col-md-6"
              key={index}
            >

              <Link
                href={report.link}
                className="text-decoration-none"
              >

                <div
                  className="card border-0 rounded-4 h-100"
                  style={{
                    transition: "all .25s ease",
                    boxShadow:
                      "0 10px 30px rgba(0,0,0,.06)",
                    cursor: "pointer",
                  }}
                >

                  <div className="card-body p-4 d-flex flex-column h-100">

                    <div
                      className="rounded-4 d-flex align-items-center justify-content-center mb-4"
                      style={{
                        width: "72px",
                        height: "72px",
                        background:
                          report.color === "success"
                            ? "#ECFDF3"
                            : report.color === "warning"
                              ? "#FFFAEB"
                              : "#FEF2F2",
                      }}
                    >
                      <Icon
                        size={32}
                        className={`text-${report.color}`}
                      />
                    </div>

                    <h4
                      className="fw-bold mb-2"
                      style={{
                        color: "#111827",
                      }}
                    >
                      {report.title}
                    </h4>

                    <p
                      className="mb-0"
                      style={{
                        color: "#6B7280",
                        minHeight: "48px",
                      }}
                    >
                      {report.desc}
                    </p>

                    <div
                      className="mt-auto pt-4 border-top d-flex align-items-center justify-content-between"
                    >
                      <span
                        style={{
                          color: "#2563EB",
                          fontWeight: "600",
                          fontSize: "14px",
                        }}
                      >
                        Open Report
                      </span>

                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                          width: "34px",
                          height: "34px",
                          background: "#EFF6FF",
                          color: "#2563EB",
                          fontSize: "16px",
                          fontWeight: "700",
                        }}
                      >
                        →
                      </div>
                    </div>

                  </div>

                </div>

              </Link>

            </div>
          );
        })}

      </div>

    </div>
  );
}