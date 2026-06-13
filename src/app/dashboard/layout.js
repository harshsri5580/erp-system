import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function DashboardLayout({
  children,
}) {

  return (

    <div className="d-flex">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div
        className="flex-grow-1 dashboard-content"

      >

        {/* NAVBAR */}

        <div className="no-print">
          <Navbar />
        </div>

        {/* PAGE */}

        <div className="p-4">

          {children}

        </div>

      </div>

    </div>
  );
}