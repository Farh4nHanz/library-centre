import React, { memo, PropsWithChildren } from "react";
import { type AppSidebarProps } from "@/types/props-type";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

const AppSidebarComponent: React.FC<AppSidebarProps> = ({
  children,
  ...props
}: AppSidebarProps) => {
  return <Sidebar {...props}>{children}</Sidebar>;
};

const AppSidebarHeader = memo(({ children }: PropsWithChildren) => {
  return <SidebarHeader>{children}</SidebarHeader>;
});

AppSidebarHeader.displayName = "AppSiderbarHeader";

const AppSidebarContent = memo(({ children }: PropsWithChildren) => {
  return <SidebarContent>{children}</SidebarContent>;
});

AppSidebarContent.displayName = "AppSidebarContent";

const AppSidebarFooter = memo(({ children }: PropsWithChildren) => {
  return <SidebarFooter>{children}</SidebarFooter>;
});

AppSidebarFooter.displayName = "AppSidebarFooter";

export const AppSidebar = memo(
  AppSidebarComponent
) as React.NamedExoticComponent<AppSidebarProps> & {
  Header: typeof AppSidebarHeader;
  Content: typeof AppSidebarContent;
  Footer: typeof AppSidebarFooter;
};

AppSidebar.Header = AppSidebarHeader;
AppSidebar.Content = AppSidebarContent;
AppSidebar.Footer = AppSidebarFooter;
