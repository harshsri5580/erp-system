"use client";

import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import {
  Users,
  FolderKanban,
  CalendarCheck,
  Wallet,
  Truck,
  Boxes,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
const printReport = () => {
  window.print();
};
const exportExcel = (
  analytics
) => {

  const data = [

    {
      Metric:
        "Revenue",
      Value:
        analytics.totalRevenue || 0,
    },

    {
      Metric:
        "Expenses",
      Value:
        analytics.totalExpenses || 0,
    },

    {
      Metric:
        "Net Profit",
      Value:
        analytics.netProfit || 0,
    },

    {
      Metric:
        "Pending Payments",
      Value:
        analytics.pendingPayments || 0,
    },

    {
      Metric:
        "Pending Expenses",
      Value:
        analytics.pendingExpenses || 0,
    },

    {
      Metric:
        "Active Projects",
      Value:
        analytics.activeProjects || 0,
    },

  ];

  const worksheet =
    XLSX.utils.json_to_sheet(
      data
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Analytics"
  );

  const excelBuffer =
    XLSX.write(
      workbook,
      {
        bookType:
          "xlsx",
        type:
          "array",
      }
    );

  const file =
    new Blob(
      [excelBuffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

  saveAs(
    file,
    "ERP_Analytics.xlsx"
  );

};
const exportPDF =
  async () => {

    const input =
      document.body;

    const canvas =
      await html2canvas(
        input
      );

    const imgData =
      canvas.toDataURL(
        "image/png"
      );

    const pdf =
      new jsPDF(
        "p",
        "mm",
        "a4"
      );

    const width =
      pdf.internal.pageSize.getWidth();

    const height =
      (
        canvas.height *
        width
      ) /
      canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      width,
      height
    );

    pdf.save(
      "ERP_Analytics.pdf"
    );

  };
export default function AnalyticsPage() {

  const [vendors, setVendors] = useState([]);
  const [projects, setProjects] =
    useState([]);

  const [clients, setClients] =
    useState([]);

  const fetchProjects = async () => {

    try {

      const res =
        await fetch(
          "/api/projects"
        );

      const data =
        await res.json();

      setProjects(
        data.projects || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  const fetchClients = async () => {

    try {

      const res =
        await fetch(
          "/api/clients"
        );

      const data =
        await res.json();

      setClients(
        data.clients || []
      );

    } catch (error) {

      console.log(error);

    }

  };

  const fetchVendors = async () => {

    try {

      const res =
        await fetch(
          "/api/vendors"
        );

      const data =
        await res.json();

      setVendors(
        data.vendors || []
      );

    } catch (error) {

      console.log(error);

    }

  };
  const [analytics, setAnalytics] =
    useState({

      totalUsers: 0,

      totalProjects: 0,

      totalAttendance: 0,

      totalPayroll: 0,

      totalVendors: 0,

      totalInventory: 0,
    });

  const [filters, setFilters] =
    useState({

      fromDate: "",

      toDate: "",

      project: "",

      client: "",

      vendor: "",

      paymentStatus: "",

      expenseStatus: "",

      projectStatus: "",

    });

  useEffect(() => {

    fetchAnalytics();

    fetchProjects();

    fetchClients();

    fetchVendors();

  }, []);

  const fetchAnalytics =
    async () => {

      try {

        const params =
          new URLSearchParams();

        if (
          filters.paymentStatus
        ) {
          params.append(
            "paymentStatus",
            filters.paymentStatus
          );
        }

        if (
          filters.expenseStatus
        ) {
          params.append(
            "expenseStatus",
            filters.expenseStatus
          );
        }

        if (
          filters.projectStatus
        ) {
          params.append(
            "projectStatus",
            filters.projectStatus
          );
        }

        if (
          filters.project
        ) {

          params.append(
            "project",
            filters.project
          );

        }

        if (
          filters.client
        ) {

          params.append(
            "client",
            filters.client
          );

        }

        if (
          filters.vendor
        ) {

          params.append(
            "vendor",
            filters.vendor
          );

        }

        if (filters.fromDate) {
          params.append(
            "fromDate",
            filters.fromDate
          );
        }

        if (filters.toDate) {
          params.append(
            "toDate",
            filters.toDate
          );
        }

        const res =
          await fetch(
            `/api/reports/analytics?${params}`
          );

        const data =
          await res.json();

        setAnalytics(data);

      } catch (error) {

        console.log(error);

      }
    };

  const cards = [

    {
      title: "Total Revenue",
      value: `₹${analytics.totalRevenue || 0}`,
      icon: Wallet,
      color: "success",
    },

    {
      title: "Total Expenses",
      value: `₹${analytics.totalExpenses || 0}`,
      icon: Wallet,
      color: "danger",
    },

    {
      title: "Net Profit",
      value: `₹${analytics.netProfit || 0}`,
      icon: TrendingUp,
      color: "primary",
    },

    {
      title: "Pending Payments",
      value: `₹${analytics.pendingPayments || 0}`,
      icon: CalendarCheck,
      color: "warning",
    },

    {
      title: "Pending Expenses",
      value: `₹${analytics.pendingExpenses || 0}`,
      icon: Boxes,
      color: "info",
    },

    {
      title: "Active Projects",
      value: analytics.activeProjects || 0,
      icon: FolderKanban,
      color: "dark",
    },

  ];

  const revenueData = [
    {
      name: "Revenue",
      value: analytics.totalRevenue || 0,
    },
    {
      name: "Expenses",
      value: analytics.totalExpenses || 0,
    },
    {
      name: "Profit",
      value: analytics.netProfit || 0,
    },
  ];

  const paymentData = [
    {
      name: "Completed",
      value: analytics.totalRevenue || 0,
    },
    {
      name: "Pending",
      value: analytics.pendingPayments || 0,
    },
  ];

  const COLORS = [
    "#198754",
    "#ffc107",
  ];

  return (

    <div className="container-fluid p-4">

      {/* PAGE HEADER */}

      <div className="mb-4">

        <h2 className="page-title">
          ERP Analytics Dashboard
        </h2>

        <p className="page-subtitle">
          Real-time business analytics
        </p>

        <div className="card border-0 shadow-sm rounded-4 mb-4">

          <div className="card-body">


            {/* DATE FILTERS */}

            <div className="row g-3 mb-4">

              <div className="col-md-3">

                <label className="form-label fw-semibold">
                  From Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={filters.fromDate}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      fromDate: e.target.value,
                    })
                  }
                />

              </div>

              <div className="col-md-3">

                <label className="form-label fw-semibold">
                  To Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={filters.toDate}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      toDate: e.target.value,
                    })
                  }
                />

              </div>

              <div className="col-md-3 d-flex align-items-end">

                <button
                  className="btn btn-primary w-100"
                  onClick={fetchAnalytics}
                >
                  Apply Filter
                </button>

              </div>

              <div className="col-md-3 d-flex align-items-end">

                <button
                  className="btn btn-secondary w-100"
                  onClick={() => {

                    setFilters({
                      fromDate: "",
                      toDate: "",
                      project: "",
                      client: "",
                      vendor: "",
                      paymentStatus: "",
                      expenseStatus: "",
                      projectStatus: "",
                    });

                    window.location.reload();

                  }}
                >
                  Reset
                </button>

              </div>

            </div>



            <div className="row g-3 mb-4">

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Project
                </label>

                <select
                  className="form-select"
                  value={filters.project}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      project: e.target.value,
                    })
                  }
                >

                  <option value="">
                    All Projects
                  </option>

                  {projects.map(
                    (project) => (

                      <option
                        key={project.id}
                        value={project.id}
                      >
                        {project.name}
                      </option>

                    )
                  )}

                </select>

              </div>

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Client
                </label>

                <select
                  className="form-select"
                  value={filters.client}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      client: e.target.value,
                    })
                  }
                >

                  <option value="">
                    All Clients
                  </option>

                  {clients.map(
                    (client) => (

                      <option
                        key={client.id}
                        value={client.id}
                      >
                        {client.companyName}
                      </option>

                    )
                  )}

                </select>

              </div>

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Vendor
                </label>

                <select
                  className="form-select"
                  value={filters.vendor}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      vendor: e.target.value,
                    })
                  }
                >

                  <option value="">
                    All Vendors
                  </option>

                  {vendors.map(
                    (vendor) => (

                      <option
                        key={vendor.id}
                        value={vendor.id}
                      >
                        {vendor.companyName}
                      </option>

                    )
                  )}

                </select>

              </div>

            </div>

            <div className="row g-3 mb-4">

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Payment Status
                </label>

                <select
                  className="form-select"
                  value={filters.paymentStatus}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      paymentStatus:
                        e.target.value,
                    })
                  }
                >

                  <option value="">
                    All Payments
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                </select>

              </div>

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Expense Status
                </label>

                <select
                  className="form-select"
                  value={filters.expenseStatus}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      expenseStatus:
                        e.target.value,
                    })
                  }
                >

                  <option value="">
                    All Expenses
                  </option>

                  <option value="Paid">
                    Paid
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                </select>

              </div>

              <div className="col-md-4">

                <label className="form-label fw-semibold">
                  Project Status
                </label>

                <select
                  className="form-select"
                  value={filters.projectStatus}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      projectStatus:
                        e.target.value,
                    })
                  }
                >

                  <option value="">
                    All Projects
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                </select>

              </div>

            </div>

            <div className="row g-3 mb-4">

              <div className="col-md-3">

                <label className="form-label fw-semibold">
                  Report Type
                </label>

                <select className="form-select">

                  <option>
                    Financial Report
                  </option>

                  <option>
                    Project Report
                  </option>

                  <option>
                    Vendor Report
                  </option>

                  <option>
                    Client Report
                  </option>

                  <option>
                    Payroll Report
                  </option>

                  <option>
                    Attendance Report
                  </option>

                </select>

              </div>

              <div className="col-md-3 d-flex align-items-end">

                <button
                  className="btn btn-success w-100"
                  onClick={exportPDF}
                >
                  Export PDF
                </button>

              </div>

              <div className="col-md-3 d-flex align-items-end">

                <button
                  className="btn btn-dark w-100"
                  onClick={() =>
                    exportExcel(
                      analytics
                    )
                  }
                >
                  Export Excel
                </button>

              </div>

              <div className="col-md-3 d-flex align-items-end">

                <button
                  className="btn btn-info w-100"
                  onClick={printReport}
                >
                  Print Report
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ANALYTICS CARDS */}

      <div className="row g-4 mb-4">

        {cards.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              className="col-xl-4 col-md-6"
              key={index}
            >

              <div className="card border-0 shadow-sm rounded-4 h-100">

                <div className="card-body p-4">

                  <div className="d-flex justify-content-between align-items-start">

                    <div>

                      <p className="text-muted small fw-medium mb-2">
                        {item.title}
                      </p>

                      <h2 className="fw-bold mb-2">
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

                        Live ERP Data

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
                        width: "60px",
                        height: "60px",
                      }}
                    >

                      <Icon size={28} />

                    </div>

                  </div>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* SECOND SECTION */}

      <div className="row g-4">

        {/* BUSINESS SUMMARY */}

        <div className="col-lg-12">

          <div className="card border-0 shadow-sm rounded-4 h-100">

            <div className="card-body p-4">

              <h5 className="fw-bold mb-4">
                Financial Summary
              </h5>

              <div className="table-responsive">

                <table className="table align-middle">

                  <thead className="table-dark">

                    <tr>

                      <th>Module</th>

                      <th>Amount</th>

                      <th>Status</th>

                    </tr>

                  </thead>

                  <tbody>

                    <tr>

                      <td>Total Revenue</td>

                      <td className="fw-bold text-success">
                        ₹{analytics.totalRevenue || 0}
                      </td>

                      <td>
                        <span className="badge bg-success">
                          Received
                        </span>
                      </td>

                    </tr>

                    <tr>

                      <td>Total Expenses</td>

                      <td className="fw-bold text-danger">
                        ₹{analytics.totalExpenses || 0}
                      </td>

                      <td>
                        <span className="badge bg-danger">
                          Paid
                        </span>
                      </td>

                    </tr>

                    <tr>

                      <td>Net Profit</td>

                      <td className="fw-bold text-primary">
                        ₹{analytics.netProfit || 0}
                      </td>

                      <td>
                        <span className="badge bg-primary">
                          Profit
                        </span>
                      </td>

                    </tr>

                    <tr>

                      <td>Pending Payments</td>

                      <td className="fw-bold text-warning">
                        ₹{analytics.pendingPayments || 0}
                      </td>

                      <td>
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      </td>

                    </tr>

                    <tr>

                      <td>Pending Expenses</td>

                      <td className="fw-bold text-warning">
                        ₹{analytics.pendingExpenses || 0}
                      </td>

                      <td>
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      </td>

                    </tr>

                    <tr>

                      <td>Active Projects</td>

                      <td className="fw-bold">
                        {analytics.activeProjects || 0}
                      </td>

                      <td>
                        <span className="badge bg-info">
                          Running
                        </span>
                      </td>

                    </tr>

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>


      </div>

      {/* CHARTS SECTION */}

      <div className="row g-4 mt-2">

        {/* REVENUE CHART */}

        <div className="col-lg-8">

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body p-4">

              <h5 className="fw-bold mb-4">
                Revenue vs Expenses
              </h5>

              <div
                style={{
                  width: "100%",
                  height: 350,
                }}
              >

                <ResponsiveContainer>

                  <BarChart
                    data={revenueData}
                  >

                    <XAxis
                      dataKey="name"
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="value"
                      fill="#0d6efd"
                      radius={[8, 8, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

        </div>

        {/* PAYMENT PIE CHART */}

        <div className="col-lg-4">

          <div className="card border-0 shadow-sm rounded-4">

            <div className="card-body p-4">

              <h5 className="fw-bold mb-4">
                Payment Collection
              </h5>

              <div
                style={{
                  width: "100%",
                  height: 350,
                }}
              >

                <ResponsiveContainer>

                  <PieChart>

                    <Pie
                      data={paymentData}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={100}
                      label
                    >

                      {paymentData.map(
                        (
                          entry,
                          index
                        ) => (
                          <Cell
                            key={index}
                            fill={
                              COLORS[
                              index
                              ]
                            }
                          />
                        )
                      )}

                    </Pie>

                    <Tooltip />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}