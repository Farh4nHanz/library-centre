import { HTMLAttributes, InputHTMLAttributes, PropsWithChildren } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { VariantProps } from "class-variance-authority";
import { Alert } from "@/components/ui/alert";
import { loader } from "@/constants";
import { type Statistics, type SidebarMenu } from ".";

export type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  description?: string;
  Icon?: React.ComponentType<HTMLAttributes<Element>>;
} & InputHTMLAttributes<HTMLInputElement>;

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

export type CustomDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & PropsWithChildren;

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
