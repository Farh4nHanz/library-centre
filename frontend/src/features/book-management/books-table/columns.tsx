import { ColumnDef } from "@tanstack/react-table";
import { Book } from "@/types";

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: () => <div className="font-bold">Title</div>,
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
  },
  {
    accessorKey: "author",
    header: () => <div className="font-bold">Author</div>,
    cell: ({ row }) => <div>{row.getValue("author")}</div>,
  },
  {
    accessorKey: "pages",
    header: () => <div className="font-bold">Pages</div>,
    cell: ({ row }) => <div>{row.getValue("pages")}</div>,
  },
];
