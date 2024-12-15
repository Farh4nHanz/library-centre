import { memo } from "react";
import { type CustomDialogProps } from "@/types/props-type";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

export const CustomDialog = memo(
  ({ open, onOpenChange, children }: CustomDialogProps) => {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>{children}</AlertDialogContent>
      </AlertDialog>
    );
  }
);

CustomDialog.displayName = "CustomDialog";
