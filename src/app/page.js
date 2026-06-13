export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1e293b 100%)",
        color: "#fff",
      }}
    >
      {/* Navbar */}
      <nav className="container py-4 d-flex justify-content-between align-items-center">
        <h3 className="fw-bold mb-0">
          CON<span style={{ color: "#3b82f6" }}>SERP</span>
        </h3>

        <div className="d-flex gap-3">
          <a
            href="/login"
            className="btn btn-outline-light px-4"
          >
            Login
          </a>

          <a
            href="/register"
            className="btn btn-primary px-4"
          >
            Register
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container">
        <div
          className="row align-items-center"
          style={{ minHeight: "85vh" }}
        >
          <div className="col-lg-6">
            <span
              className="badge bg-primary mb-3 px-3 py-2"
            >
              Construction ERP Platform
            </span>

            <h1
              className="fw-bold mb-4"
              style={{
                fontSize: "4rem",
                lineHeight: "1.1",
              }}
            >
              Smart Construction
              <br />
              Management System
            </h1>

            <p
              className="text-light opacity-75 mb-4"
              style={{
                fontSize: "1.1rem",
              }}
            >
              Manage Projects, Clients, Contracts,
              BOQ, Inventory, Payroll, Equipment,
              Progress Billing, Inspections and
              Incidents from a single platform.
            </p>

            <div className="d-flex gap-3 flex-wrap">
              <a
                href="/login"
                className="btn btn-primary btn-lg px-5"
              >
                Get Started
              </a>
              {/* 
              <a
                href="/register"
                className="btn btn-outline-light btn-lg px-5"
              >
                Create Account
              </a> */}
            </div>

            <div className="row mt-5">
              <div className="col-4">
                <h3 className="fw-bold text-primary">
                  25+
                </h3>
                <small>ERP Modules</small>
              </div>

              <div className="col-4">
                <h3 className="fw-bold text-primary">
                  100%
                </h3>
                <small>Cloud Based</small>
              </div>

              <div className="col-4">
                <h3 className="fw-bold text-primary">
                  24/7
                </h3>
                <small>Access</small>
              </div>
            </div>
          </div>

          {/* Right Side Card */}
          <div className="col-lg-6">
            <div
              className="card border-0 shadow-lg"
              style={{
                background:
                  "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                borderRadius: "25px",
              }}
            >
              <div className="card-body p-5">
                <h4
                  className="mb-4 text-white fw-bold"
                >
                  ERP Modules Included
                </h4>

                <div className="row g-3">
                  {[
                    "Projects",
                    "Clients",
                    "Contracts",
                    "BOQ",
                    "Inventory",
                    "Purchase",
                    "Invoices",
                    "Payments",
                    "Payroll",
                    "Attendance",
                    "Equipment",
                    "Inspections",
                  ].map((item) => (
                    <div
                      key={item}
                      className="col-md-6"
                    >
                      <div
                        className="p-3 rounded text-white fw-semibold"
                        style={{
                          background:
                            "rgba(255,255,255,0.08)",
                          border:
                            "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        ✓ {item}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <a
                    href="/login"
                    className="btn btn-primary w-100"
                  >
                    Access Dashboard
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="text-center py-4"
        style={{
          borderTop:
            "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <small>
          © 2026 CONSERP ERP System. All Rights
          Reserved.
        </small>
      </footer>
    </div>
  );
}