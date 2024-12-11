import { memo } from "react";
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

export const Content = memo(({ contents }: SidebarContentProps) => {
  const { pathname } = useLocation();

  return (
    <SidebarContent>
      {contents?.map((content) => (
        <SidebarGroup key={content.group}>
          <SidebarGroupLabel>{content.group}</SidebarGroupLabel>
          {content.menus.map((menu) => (
            <SidebarGroupContent key={menu.name}>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathname === menu.link ||
                      pathname.split("/dashboard")[1].includes(menu.link)
                    }
                  >
                    <NavLink to={menu.link}>
                      <menu.icon />
                      {menu.name}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          ))}
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
});

Content.displayName = "SidebarContent";
