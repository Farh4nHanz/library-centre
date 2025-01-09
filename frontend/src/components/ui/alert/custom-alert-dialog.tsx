import { memo, PropsWithChildren } from "react";
import {
  type CustomAlertDialogHeaderProps,
  type CustomAlertDialogProps,
} from "@/types/props-type";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert/alert-dialog";

const CustomAlertDialogComponent: React.FC<CustomAlertDialogProps> = ({
  open,
  onOpenChange,
  children,
}: CustomAlertDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>{children}</AlertDialogContent>
    </AlertDialog>
  );
};

const CustomAlertDialogHeader = memo(
  ({ title, description, ...props }: CustomAlertDialogHeaderProps) => {
    return (
      <AlertDialogHeader {...props}>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
    );
  }
);

CustomAlertDialogHeader.displayName = "CustomAlertDialogHeader";

const CustomAlertDialogFooter = memo(
  ({ children, ...props }: PropsWithChildren) => {
    return <AlertDialogFooter {...props}>{children}</AlertDialogFooter>;
  }
);

CustomAlertDialogFooter.displayName = "CustomAlertDialogFooter";

export const CustomAlertDialog = memo(
  CustomAlertDialogComponent
) as React.NamedExoticComponent<CustomAlertDialogProps> & {
  Header: typeof CustomAlertDialogHeader;
  Footer: typeof CustomAlertDialogFooter;
};

CustomAlertDialog.Header = CustomAlertDialogHeader;
CustomAlertDialog.Footer = CustomAlertDialogFooter;
