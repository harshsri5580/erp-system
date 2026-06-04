"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Calculator,
  Truck,
  ShoppingCart,
  Boxes,
  Users,
  CalendarCheck,
  Wallet,
  ReceiptText,
  CreditCard,
  ArrowLeftRight,
  BadgeIndianRupee,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Menu,
  MenuFold,
  LogOut,
  Settings,
  ClipboardList,
  Flag,
  MessageSquare,
  ClipboardCheck,
  ShieldCheck,
  AlertTriangle,
  Wrench,
} from "lucide-react";

export default function Sidebar() {

  const pathname = usePathname();
  const router = useRouter();

  const [collapsed, setCollapsed] =
    useState(false);
  const [userRole, setUserRole] =
    useState("");

  const [openMenus, setOpenMenus] =
    useState({
      projects: true,
      procurement: true,
      hr: true,
      finance: true,
    });

  // ======================
  // TOGGLE MENU
  // ======================

  const toggleMenu = (menu) => {

    setOpenMenus({
      ...openMenus,
      [menu]: !openMenus[menu],
    });
  };

  useEffect(() => {

    const content =
      document.querySelector(".dashboard-content");

    if (!content) return;

    content.style.marginLeft =
      collapsed ? "78px" : "255px";

  }, [collapsed]);

  useEffect(() => {

    const role =
      localStorage.getItem(
        "userRole"
      );

    setUserRole(role || "");

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");

    router.push("/login");
  };
  // ======================
  // MENU SECTIONS
  // ======================

  const menuSections = [

    {
      title: "Overview",

      items: [
        {
          name: "Dashboard",
          path: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },

    {
      title: "Projects",

      key: "projects",

      items: [
        {
          name: "Projects",
          path: "/dashboard/projects",
          icon: FolderKanban,
        },

        {
          name: "Contracts",
          path: "/dashboard/contracts",
          icon: FileText,
        },

        {
          name: "BOQ",
          path: "/dashboard/boq",
          icon: Calculator,
        },
        {
          name: "Milestones",
          path: "/dashboard/milestones",
          icon: Flag,
        },
        {
          name: "RFI",
          path: "/dashboard/rfi",
          icon: MessageSquare,
        },
        {
          name: "Change Orders",
          path: "/dashboard/change-orders",
          icon: ClipboardCheck,
        },
        {
          name: "Progress Billing",
          path: "/dashboard/progress-billing",
          icon: ReceiptText,
        },
      ],
    },

    {
      title: "Procurement",

      key: "procurement",

      items: [
        {
          name: "Vendors",
          path: "/dashboard/vendors",
          icon: Truck,
        },

        {
          name: "Purchase Orders",
          path: "/dashboard/purchase-orders",
          icon: ShoppingCart,
        },
        {
          name: "GRN",
          path: "/dashboard/grn",
          icon: Boxes,
        },

        {
          name: "Inventory",
          path: "/dashboard/inventory",
          icon: Boxes,
        },
        {
          name: "Clients",
          path: "/dashboard/clients",
          icon: Users,
        },
      ],
    },

    {
      title: "HR Management",

      key: "hr",

      items: [
        {
          name: "Users",
          path: "/dashboard/users",
          icon: Users,
        },

        {
          name: "Attendance",
          path: "/dashboard/attendance",
          icon: CalendarCheck,
        },

        {
          name: "Daily Logs",
          path: "/dashboard/daily-logs",
          icon: ClipboardList,
        },

        {
          name: "Payroll",
          path: "/dashboard/payroll",
          icon: Wallet,
        },
      ],
    },

    {
      title: "Finance",

      key: "finance",

      items: [

        {
          name: "Invoices",
          path: "/dashboard/invoices",
          icon: ReceiptText,
        },

        {
          name: "Payments",
          path: "/dashboard/payments",
          icon: CreditCard,
        },

        {
          name: "Expenses",
          path: "/dashboard/expenses",
          icon: BadgeIndianRupee,
        },

        {
          name: "Transactions",
          path: "/dashboard/transactions",
          icon: ArrowLeftRight,
        },

        {
          name: "Accounts",
          path: "/dashboard/accounts",
          icon: Wallet,
        },

      ],
    },

    {
      title: "Quality & Safety",

      items: [

        {
          name: "Inspections",
          path: "/dashboard/inspections",
          icon: ShieldCheck,
        },
        {
          name: "Incidents",
          path: "/dashboard/incidents",
          icon: AlertTriangle,
        }

      ],

    },
    {
      title: "Equipment",

      items: [

        {
          name: "Equipment",
          path: "/dashboard/equipment",
          icon: Wrench,
        },

      ],

    },
    {
      title: "Documents",

      items: [
        {
          name: "Documents",
          path: "/dashboard/documents",
          icon: FileText,
        },
      ],
    },

    {
      title: "Reports",

      items: [
        {
          name: "Reports",
          path: "/dashboard/reports",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Administration",

      items: [
        {
          name: "Settings",
          path: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ];

  const role =
    (userRole || "")
      .toLowerCase();

  let filteredSections =
    menuSections;

  if (role === "employee") {

    filteredSections =
      menuSections
        .filter(
          (section) =>
            [
              "Overview",
              "Projects",
              "HR Management",
              "Equipment",
              "Documents",
            ].includes(
              section.title
            )
        )
        .map((section) => {

          if (
            section.title ===
            "HR Management"
          ) {

            return {

              ...section,

              items:
                section.items.filter(
                  (item) =>
                    [
                      "Attendance",
                      "Daily Logs",
                      "Milestones",
                    ].includes(
                      item.name
                    )
                ),

            };
          }

          if (
            section.title ===
            "Projects"
          ) {

            return section;

          }
          if (
            section.title ===
            "Quality & Safety"
          ) {

            return {

              ...section,

              items:
                section.items.filter(
                  (item) =>
                    [
                      "Projects",
                      "Milestones",
                      "RFI",
                    ].includes(
                      item.name
                    )
                ),

            };

          }

          return section;

        });
  }

  if (role === "accountant") {

    filteredSections =
      menuSections.filter(
        (section) =>
          [
            "Overview",
            "Projects",
            "Finance",
            "Reports",
          ].includes(
            section.title
          )
      ).map((section) => {

        if (
          section.title ===
          "Projects"
        ) {

          return {

            ...section,

            items:
              section.items.filter(
                (item) =>
                  [
                    "Progress Billing",
                  ].includes(
                    item.name
                  )
              ),

          };

        }

        return section;

      });

  }
  if (role === "manager") {

    filteredSections =
      menuSections.filter(
        (section) =>
          [
            "Overview",
            "Projects",
            "Procurement",
            "HR Management",
            "Equipment",
            "Reports",
          ].includes(
            section.title
          )
      );
  }

  if (role === "admin") {

    filteredSections =
      menuSections;
  }

  return (

    <div
      className="
bg-dark
text-white
border-end
border-secondary
shadow-lg
position-fixed
d-flex
flex-column
vh-100
"
      style={{
        width: collapsed ? "78px" : "255px",

        position: "fixed",

        top: 0,
        left: 0,

        height: "100vh",

        background: "#1f252d",

        overflowY: "auto",
        overflowX: "hidden",

        transition: "all 0.3s ease",

        zIndex: 999,
      }}
    >

      {/* TOP */}

      <div className="px-3 py-2 border-bottom border-secondary">

        <div className="d-flex align-items-center justify-content-between">

          {!collapsed && (

            <div>

              <h5 className="fw-bold mb-0 text-white">
                BuildERP
              </h5>

              <small className="text-secondary small">
                Construction ERP
              </small>

            </div>
          )}

          {/* COLLAPSE BUTTON */}

          <button
            className="
    btn
    btn-dark
    border
    border-secondary-subtle
    rounded-3
    d-flex
    align-items-center
    justify-content-center
    p-0
  "
            style={{
              width: "36px",
              height: "36px",
            }}
            onClick={() =>
              setCollapsed(!collapsed)
            }
          >
            <Menu size={20} />
          </button>

        </div>

      </div>

      {/* COMPANY */}

      <div className="px-3 py-3 border-bottom border-secondary">

        <div
          className={`
      d-flex
      align-items-center
      ${collapsed ? "justify-content-center" : "gap-3"}
    `}
        >

          {/* LOGO */}

          <div
            className="
        bg-primary
        rounded-4
        d-flex
        align-items-center
        justify-content-center
        fw-bold
        shadow-sm
        flex-shrink-0
      "
            style={{
              width: "48px",
              height: "48px",
              minWidth: "48px",
              fontSize: "18px",
            }}
          >
            H
          </div>

          {/* COMPANY INFO */}

          {!collapsed && (

            <div
              className="overflow-hidden"
              style={{
                minWidth: 0,
              }}
            >

              <div
                className="
            fw-semibold
            text-white
            text-truncate
          "
                style={{
                  fontSize: "15px",
                }}
              >
                Harsh Builders
              </div>

              <small
                className="
            text-secondary
            d-block
            text-truncate
          "
              >
                Construction ERP
              </small>

            </div>
          )}

        </div>

      </div>
      {/* MENU */}

      <div
        className="px-2 py-3 flex-grow-1"
      >

        {filteredSections.map(
          (section, index) => (

            <div
              key={index}
              className="mb-3"
            >

              {/* SECTION HEADER */}

              {!collapsed && (

                <div
                  className="
    d-flex
    justify-content-between
    align-items-center
    text-uppercase
    text-secondary
    fw-bold
    small
    px-2
    mt-3
    mb-2
  "


                  onClick={() =>
                    section.key &&
                    toggleMenu(
                      section.key
                    )
                  }
                >

                  <span>
                    {section.title}
                  </span>

                  {section.key && (

                    openMenus[
                      section.key
                    ] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )
                  )}

                </div>
              )}

              {/* ITEMS */}

              {(!section.key ||

                openMenus[
                section.key
                ] ||

                collapsed) && (

                  <ul
                    className="nav flex-column w-100"
                    style={{
                      minWidth: 0,
                    }}
                  >

                    {section.items.map(
                      (
                        item,
                        itemIndex
                      ) => {

                        const Icon =
                          item.icon;

                        return (

                          <li
                            key={itemIndex}
                            className="nav-item"
                          >

                            <Link

                              href={item.path}

                              className={`

d-flex
align-items-center
${collapsed ? "justify-content-center" : "gap-3"}

text-decoration-none
text-white

px-3
py-2

rounded-4

mb-2

fw-medium

${pathname === item.path
                                  ? "bg-primary bg-gradient shadow-sm"
                                  : "bg-transparent"
                                }

`}
                            >

                              <Icon size={18} />

                              {!collapsed && (
                                <span className="small fw-medium">
                                  {item.name}
                                </span>
                              )}

                            </Link>

                          </li>
                        );
                      }
                    )}

                  </ul>
                )}

            </div>
          )
        )}

      </div>

      {/* FOOTER */}

      <div className="p-2 border-top border-secondary mt-auto">

        <button
          onClick={handleLogout}
          className="btn btn-danger w-100 py-2 rounded-3 fw-semibold d-flex align-items-center justify-content-center gap-2"
        >

          <LogOut size={18} />

          {!collapsed && (
            <span>
              Logout
            </span>
          )}

        </button>

      </div>


    </div>
  );
}