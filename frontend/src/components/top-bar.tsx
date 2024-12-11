import React from "react";
import { Link, useLocation } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { generateBreadcrumbs } from "@/lib/utils";

export const TopBar = () => {
  const { pathname } = useLocation();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <header className="flex sticky top-0 h-14 z-50 shrink-0 bg-background items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((breadcrumb, i) => (
            <React.Fragment key={i}>
              <BreadcrumbItem>
                <Link to={breadcrumb.link}>{breadcrumb.name}</Link>
              </BreadcrumbItem>
              {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};
