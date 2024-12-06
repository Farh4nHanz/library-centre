import React from "react";
import { NavLink, useLocation } from "react-router-dom";

/** @types */
import { type SidebarContentProps } from "@/types/props-type";

/** @components */
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const Content = React.memo(({ menus }: SidebarContentProps) => {
  const { pathname } = useLocation();

  return (
    <SidebarContent>
      {menus?.map((item) => (
        <SidebarGroup key={item.label}>
          <SidebarGroupLabel>{item.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.link)}
                >
                  <NavLink to={item.link}>
                    <item.icon />
                    {item.name}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
});

Content.displayName = "SidebarContent";
