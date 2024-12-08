import { HTMLAttributes, InputHTMLAttributes } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { VariantProps } from "class-variance-authority";
import { Alert } from "@/components/ui/alert";

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
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  color?: "black" | "white" | "blue" | "green" | "red" | "yellow";
};

export type CustomAlertProps = {
  variant?: VariantProps<typeof Alert>["variant"];
  Icon: React.ComponentType<HTMLAttributes<Element>>;
  title: string;
  description: string | null;
};

export type CustomDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export type RedirectButtonProps = {
  url: string;
  children: React.ReactNode;
};