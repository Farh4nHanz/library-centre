import { HTMLAttributes, InputHTMLAttributes, PropsWithChildren } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Column, ColumnDef, Table } from "@tanstack/react-table";
import { VariantProps } from "class-variance-authority";
import { type Statistics, type User } from ".";
import { loader } from "@/constants";
import { Alert } from "@/components/ui/alert/alert";
import { Sidebar } from "@/components/ui/sidebar";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert/alert-dialog";

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

export type CustomAlertDialogHeaderProps = {
  title: string;
  description?: string;
} & React.ComponentProps<typeof AlertDialogHeader>;

export type CustomAlertDialogFooterProps = PropsWithChildren &
  React.ComponentProps<typeof AlertDialogFooter>;

export type CustomDialogProps = CustomAlertDialogProps &
  React.HTMLAttributes<HTMLDivElement>;

export type CustomDialogHeaderProps = CustomAlertDialogHeaderProps &
  React.ComponentProps<typeof DialogHeader>;

export type CustomDialogFooterProps = PropsWithChildren &
  React.ComponentProps<typeof DialogFooter>;

export type RedirectButtonProps = {
  redirectTo: string;
} & PropsWithChildren;

export type AuthLinkProps = {
  text: string;
  url: string;
} & PropsWithChildren;

export type AppSidebarProps = PropsWithChildren &
  React.ComponentProps<typeof Sidebar>;

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
