import { ColumnDef } from "@tanstack/react-table";
import { type Book } from "@/types";
import { TableColumnHeader } from "@/components/ui/table/table-column-header";
import { ColumnActions } from "@/features/book-management/tables/column-actions";

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
          className="size-12 aspect-square"
        />
      </div>
    ),
  },
  {
    accessorKey: "genre",
    header: () => <div className="font-bold text-start">Genre</div>,
    cell: ({ row }) => (
      <div className="text-start">
        {Array.from(row.getValue("genre") as string).join(", ")}
      </div>
    ),
  },
  {
    accessorKey: "pages",
    header: () => (
      <div className="font-bold text-center text-sm">Total Pages</div>
    ),
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
    cell: ({ row }) => <ColumnActions book={row.original} />,
  },
];
