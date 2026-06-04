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

      <div className="mb-4">

        <h2 className="page-title">
          Reports Dashboard
        </h2>

        <p className="page-subtitle">
          Manage and analyze ERP reports
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

                <div className="card border-0 shadow-sm rounded-4 h-100">

                  <div className="card-body p-4">

                    <div
                      className={`
                        bg-${report.color}
                        bg-opacity-10
                        text-${report.color}
                        rounded-4
                        d-flex
                        align-items-center
                        justify-content-center
                        mb-4
                      `}
                      style={{
                        width: "60px",
                        height: "60px",
                      }}
                    >

                      <Icon size={28} />

                    </div>

                    <h5 className="fw-bold text-dark">
                      {report.title}
                    </h5>

                    <p className="text-muted mb-0">
                      {report.desc}
                    </p>

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