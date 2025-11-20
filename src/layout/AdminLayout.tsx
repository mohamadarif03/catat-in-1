import { Outlet } from "react-router";
import { AppSidebar } from "@/components/layout/Sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/layout/AdminSidebar";

function AdminLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
      className="w-screen"
    >
      <AdminSidebar variant="inset" />
      <SidebarInset className="">
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main w-full h-full flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 h-full py-4 md:gap-6 md:py-6 px-4 md:px-6 lg:px-8">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminLayout;
