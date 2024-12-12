import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import _ from "lodash";
import { type SidebarMenu } from "@/types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const capitalizeLetter = (words: string) => {
  return _.startCase(words);
};

export const generateBreadcrumbs = (
  pathname: string,
  sidebarMenu: SidebarMenu[]
) => {
  const paths = pathname.split("/").filter(Boolean);
  const breadcrumbs = [{ name: "Dashboard", link: "/dashboard" }];

  let currentPath = "";
  for (const path of paths) {
    currentPath += `/${path}`;
    const menuItem = sidebarMenu
      .flatMap((item) => item.menus)
      .find((menu) => menu.link === currentPath);

    if (menuItem) {
      breadcrumbs.push({ name: menuItem.name, link: currentPath });
    }
  }

  return breadcrumbs.filter((breadcrumb) => breadcrumb.name !== "Home");
};
