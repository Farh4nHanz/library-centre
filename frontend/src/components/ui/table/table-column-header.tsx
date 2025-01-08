import { cn } from "@/lib/utils";
import { type TableColumnHeaderProps } from "@/types/props-type";
import { useCapitalizeLetter } from "@/hooks/use-capitalize-letter";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const TableColumnHeader = <TData, TValue>({
  column,
  title,
  className,
}: TableColumnHeaderProps<TData, TValue>) => {
  const columnTitle = useCapitalizeLetter(title);

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex justify-start items-center space-x-2", className)}>
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        <div className="font-bold">{columnTitle}</div>
        <ArrowUpDown className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
};
