import { memo } from "react";
import { type CustomAlertDialogProps } from "@/types/props-type";
import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert/alert-dialog";

export const CustomAlertDialog = memo(
  ({ open, onOpenChange, children }: CustomAlertDialogProps) => {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>{children}</AlertDialogContent>
      </AlertDialog>
    );
  }
);

CustomAlertDialog.displayName = "CustomAlertDialog";
