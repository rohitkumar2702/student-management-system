import { useState, useMemo, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./AppLayout.css";

const PAGE_META = {
  "/": {
    title: "Dashboard",
    subtitle: "Overview of your student system",
  },
  "/students": {
    title: "Students",
    subtitle: "Manage all student records",
  },
};

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const meta = useMemo(() => {
    return PAGE_META[pathname] || { title: "Student Management", subtitle: "" };
  }, [pathname]);

  return (
    <div className="app-shell">
      <Sidebar
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="app-shell__main">
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          onOpenMobile={() => setMobileOpen(true)}
        />

        <main className="app-shell__content">
          <div className="container fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}