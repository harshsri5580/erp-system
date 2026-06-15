"use client";

import { useRouter } from "next/navigation";
import {
  Menu,
  LogOut,
} from "lucide-react";

export default function Navbar() {

  const router = useRouter();

  const handleLogout = () => {

    localStorage.clear();

    router.push("/login");

  };

  return (

    <nav
      className="navbar navbar-dark bg-dark px-3 px-md-4 shadow"
      style={{
        minHeight: "70px",
      }}
    >

      {/* LEFT */}

      <div className="d-flex align-items-center gap-3">

        <button
          className="btn btn-outline-light d-md-none"
          onClick={() =>
            window.dispatchEvent(
              new Event(
                "openMobileSidebar"
              )
            )
          }
        >
          <Menu size={20} />
        </button>

        <h5
          className="text-white m-0 fw-semibold"
          style={{
            fontSize: "clamp(16px,2vw,22px)",
          }}
        >
          ERP Dashboard
        </h5>

      </div>

      {/* RIGHT */}

      <button
        onClick={handleLogout}
        className="
          btn
          btn-danger
          d-flex
          align-items-center
          gap-2
          rounded-3
          px-3
        "
      >

        <LogOut size={18} />

        <span className="d-none d-sm-inline">
          Logout
        </span>

      </button>

    </nav>

  );

}