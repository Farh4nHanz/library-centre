import { memo } from "react";

/** @types */
import { type SidebarFooterProps } from "@/types/props-type";

/** @components */
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const Footer = memo(({ children }: SidebarFooterProps) => {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>{children}</SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
});

Footer.displayName = "SidebarFooter"