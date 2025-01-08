import { memo, PropsWithChildren } from "react";
import { type CustomAlertDialogProps } from "@/types/props-type";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
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

const CustomAlertDialogHeader = memo(({ children }: PropsWithChildren) => {
  return <AlertDialogHeader>{children}</AlertDialogHeader>;
});

CustomAlertDialogHeader.displayName = "CustomAlertDialogHeader";

const CustomAlertDialogFooter = memo(({ children }: PropsWithChildren) => {
  return <AlertDialogFooter>{children}</AlertDialogFooter>;
});

CustomAlertDialogFooter.displayName = "CustomAlertDialogFooter";

export const CustomAlertDialog = memo(
  CustomAlertDialogComponent
) as React.NamedExoticComponent<CustomAlertDialogProps> & {
  Header: typeof CustomAlertDialogHeader;
  Footer: typeof CustomAlertDialogFooter;
};

CustomAlertDialog.Header = CustomAlertDialogHeader;
CustomAlertDialog.Footer = CustomAlertDialogFooter;
