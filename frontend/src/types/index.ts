import { LucideProps } from "lucide-react";

export type ErrorType = {
  error: Error;
  status: number;
  statusText: string;
};

export type SidebarMenu = {
  group: string;
  menus: {
    name: string;
    link: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  }[];
};
