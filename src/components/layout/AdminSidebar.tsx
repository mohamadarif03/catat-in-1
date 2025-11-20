import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { IconRobot } from "@tabler/icons-react";
import { Home, FileText, CheckSquare, Users, User, Settings } from "lucide-react";
import { NavLink } from "react-router";

/**
 * AppSidebar — renders the app navigation.
 * - Uses Sidebar primitives from src/components/ui/sidebar (shadcn)
 * - Links use NavLink to apply active state
 * - Routes with :user_id use "me" as a placeholder (e.g. /me/files)
 */
export function AdminSidebar({ variant = "inset" }: { variant?: string }) {
  const items = [
    { to: "/dashboard", label: "Dashboard", icon: Home },
    { to: "/users", label: "Users", icon: User },
    { to: "/ai", label: "AI Oeverview", icon: IconRobot },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <Sidebar
      variant={variant as any}
      side="left"
      collapsible="icon"
      className="h-full"
    >
      <SidebarContent>
        <SidebarHeader className="px-3 py-4">
          <div className="text-lg font-semibold">Catatin</div>
        </SidebarHeader>

        <nav aria-label="Main navigation" className="px-2">
          <SidebarMenu>
            {items.map((it) => {
              const Icon = it.icon;
              return (
                <SidebarMenuItem key={it.to}>
                  <SidebarMenuButton
                    asChild
                    // NavLink will receive className; active styling handled below
                  >
                    <NavLink
                      to={it.to}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-md text-sm w-full ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`
                      }
                    >
                      <Icon className="size-4" />
                      <span>{it.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
}

export default AdminSidebar;
