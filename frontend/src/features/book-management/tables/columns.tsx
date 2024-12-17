import { ColumnDef } from "@tanstack/react-table";

/** @types */
import { type Book } from "@/types";

/** @components */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

/** @icons */
import { MoreHorizontal } from "lucide-react";

export const bookColumns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: () => <div className="font-bold">Title</div>,
  },
  {
    accessorKey: "author",
    header: () => <div className="font-bold">Author</div>,
  },
  {
    accessorKey: "pages",
    header: () => <div className="font-bold text-end">Pages</div>,
    cell: ({ row }) => <div className="text-end">{row.getValue("pages")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const book = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(book.id)}
            >
              Copy book ID
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>View book details</DropdownMenuItem>
            <DropdownMenuItem>Edit book</DropdownMenuItem>
            <DropdownMenuItem>Delete book</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
