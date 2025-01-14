import { memo } from "react";
import {
  type ModalFooterProps,
  type ModalHeaderProps,
  type ModalProps,
} from "@/types/props-type";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const ModalComponent: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  className,
  children,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("max-w-sm", className)}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

const ModalHeader = memo(
  ({ title, description, ...props }: ModalHeaderProps) => {
    return (
      <DialogHeader {...props}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <Separator />
      </DialogHeader>
    );
  }
);

ModalHeader.displayName = "ModalHeader";

const ModalFooter = memo(({ children, ...props }: ModalFooterProps) => {
  return (
    <>
      <Separator />
      <DialogFooter {...props} className="sm:space-x-0 gap-2">
        {children}
      </DialogFooter>
    </>
  );
});

ModalFooter.displayName = "ModalFooter";

export const Modal = memo(
  ModalComponent
) as React.NamedExoticComponent<ModalProps> & {
  Header: typeof ModalHeader;
  Footer: typeof ModalFooter;
};

Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
