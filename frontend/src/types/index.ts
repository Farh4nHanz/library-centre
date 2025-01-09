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

export type Statistics = {
  title: string;
  value: string;
  change: {
    value: number;
    timeframe: string;
  };
  icon: React.ElementType;
};

export type User = {
  id: string;
  username: string;
  email: string;
  photoURL: string | null;
  role: "user" | "admin";
};

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  genre: string;
  coverURL: string;
  isbn?: number;
  pages: number;
  publisher: string;
  publicationDate: Date;
  totalCopies: number;
  availableCopies: number;
  rating: number;
  slug: string;
};
