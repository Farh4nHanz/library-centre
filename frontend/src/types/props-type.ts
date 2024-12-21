import { HTMLAttributes, InputHTMLAttributes, PropsWithChildren } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Column, ColumnDef, Table } from "@tanstack/react-table";
import { VariantProps } from "class-variance-authority";
import { type Statistics, type SidebarMenu, type User } from ".";
import { Alert } from "@/components/ui/alert/alert";
import { loader } from "@/constants";

export type AccessRoleProps = {
  role: User["role"];
} & PropsWithChildren;

export type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  description?: string;
  Icon?: React.ComponentType<HTMLAttributes<Element>>;
  component?: "input" | "textarea";
  display?: "row" | "column";
} & InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;

export type PasswordInputProps<T extends FieldValues> = {
  errors: any;
} & Omit<FormInputProps<T>, "type" | "Icon">;

export type LoaderProps = {
  className?: HTMLAttributes<HTMLElement>["className"];
  variant?: "1" | "2";
} & VariantProps<typeof loader>;

export type CustomAlertProps = {
  variant?: VariantProps<typeof Alert>["variant"];
  Icon: React.ComponentType<HTMLAttributes<Element>>;
  title: string;
  description: string | null;
};

export type CustomAlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & PropsWithChildren;

export type CustomDialogProps = {} & CustomAlertDialogProps &
  React.HTMLAttributes<HTMLDivElement>;

export type RedirectButtonProps = {
  redirectTo: string;
} & PropsWithChildren;

export type AuthLinkProps = {
  text: string;
  url: string;
} & PropsWithChildren;

export type AppSidebarProps = {
  page: "admin" | "user";
};

export type SidebarHeaderProps = {
  link: string;
};

export type SidebarContentProps = {
  contents: SidebarMenu[];
};

export type SidebarFooterProps = {} & PropsWithChildren;

export type StatisticProps = {
  stats: Statistics[];
};

export type BookTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
};

export type TableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
} & React.HTMLAttributes<HTMLDivElement>;

export type TablePaginationProps<TData> = {
  table: Table<TData>;
};

export type TableDataProps<TData, TValue> = {
  table: Table<TData>;
  columns: ColumnDef<TData, TValue>[];
};
