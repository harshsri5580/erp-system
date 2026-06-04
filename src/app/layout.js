import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import {
  LayoutDashboard,
  Users,
  Building2,
} from "lucide-react";

export const metadata = {
  title: "ERP System",
  description: "Construction ERP",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}