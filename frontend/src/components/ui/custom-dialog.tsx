import { memo } from "react";
import { type CustomDialogProps } from "@/types/props-type";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const CustomDialog = memo(
  ({ open, onOpenChange, className, children }: CustomDialogProps) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={cn("max-w-sm", className)}>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
);

CustomDialog.displayName = "CustomDialog";
