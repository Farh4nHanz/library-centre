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
import { TableColumnHeader } from "@/components/ui/table/table-column-header";
import { CustomAlertDialog as DeleteBookAlertDialog } from "@/components/ui/alert/custom-alert-dialog";

/** @icons */
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

export const bookColumns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => <TableColumnHeader column={column} title="title" />,
  },
  {
    accessorKey: "coverURL",
    header: () => <div className="font-bold text-start">Book Cover</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
        <img
          src={row.getValue("coverURL")}
          alt={row.getValue("title")}
          className="size-10"
        />
      </div>
    ),
  },
  {
    accessorKey: "genre",
    header: () => <div className="font-bold text-start">Genre</div>,
    cell: ({ row }) => (
      <div className="text-start">{row.getValue("genre")}</div>
    ),
  },
  {
    accessorKey: "pages",
    header: () => <div className="font-bold text-center">Total Pages</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("pages")}</div>
    ),
  },
  {
    accessorKey: "author",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="author" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const book = row.original;
      const [isDeleteBookDialogOpen, setIsDeleteBookDialogOpen] =
        useState<boolean>(false);

      return (
        <>
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
              <DropdownMenuItem onClick={() => setIsDeleteBookDialogOpen(true)}>
                Delete book
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DeleteBookAlertDialog
            open={isDeleteBookDialogOpen}
            onOpenChange={setIsDeleteBookDialogOpen}
          >
            
          </DeleteBookAlertDialog>
        </>
      );
    },
  },
];
