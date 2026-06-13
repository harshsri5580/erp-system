"use client";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-dark bg-dark px-4 shadow"
      style={{
        height: "70px",
      }}
    >
      {/* LEFT SIDE */}

      <div>
        <h4 className="text-white m-0">
          ERP Dashboard
        </h4>
      </div>

      {/* RIGHT SIDE */}

      <div className="d-flex align-items-center gap-3">
        {/* USER NAME */}

        <div className="d-flex align-items-center">

          {/* <span className="text-white fw-medium">
            Welcome, Admin
          </span> */}

        </div>
      </div>
    </nav>
  );
}