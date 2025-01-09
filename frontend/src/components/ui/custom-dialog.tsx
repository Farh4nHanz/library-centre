import { memo } from "react";
import {
  type CustomDialogFooterProps,
  type CustomDialogHeaderProps,
  type CustomDialogProps,
} from "@/types/props-type";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const CustomDialogComponent: React.FC<CustomDialogProps> = ({
  open,
  onOpenChange,
  className,
  children,
}: CustomDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("max-w-sm", className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

const CustomDialogHeader = memo(
  ({ title, description, ...props }: CustomDialogHeaderProps) => {
    return (
      <DialogHeader {...props}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
    );
  }
);

CustomDialogHeader.displayName = "CustomDialogHeader";

const CustomDialogFooter = memo(
  ({ children, ...props }: CustomDialogFooterProps) => {
    return <DialogFooter {...props}>{children}</DialogFooter>;
  }
);

CustomDialogFooter.displayName = "CustomDialogFooter";

export const CustomDialog = memo(
  CustomDialogComponent
) as React.NamedExoticComponent<CustomDialogProps> & {
  Header: typeof CustomDialogHeader;
  Footer: typeof CustomDialogFooter;
};

CustomDialog.Header = CustomDialogHeader;
CustomDialog.Footer = CustomDialogFooter;
