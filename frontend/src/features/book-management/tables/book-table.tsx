import { useState } from "react";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

/** @types */
import { type BookTableProps } from "@/types/props-type";

/** @components */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { TablePagination } from "@/components/ui/table/table-pagination";
import { TableData } from "@/components/ui/table/table-data";

export const BookTable = <TData, TValue>({
  columns,
  data,
}: BookTableProps<TData, TValue>) => {
  const [pageState, setPageState] = useState<{
    pageSize: number;
    pageIndex: number;
  }>({
    pageSize: 10,
    pageIndex: 0,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(data.length / pageState.pageSize),
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({
              pageIndex: pageState.pageIndex,
              pageSize: pageState.pageSize,
            })
          : updater;

      setPageState((p) => ({
        ...p,
        pageIndex: newState.pageIndex,
        pageSize: newState.pageSize,
      }));
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination: {
        pageIndex: pageState.pageIndex,
        pageSize: pageState.pageSize,
      },
      columnFilters,
    },
  });

  return (
    <>
      <div className="grid grid-cols-1 place-items-start items-center gap-2">
        <div className="flex flex-nowrap gap-2 justify-between items-center flex-row-reverse">
          <Input
            placeholder="Filter by title"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("title")?.setFilterValue(e.target.value)
            }
          />

          <div className="flex-1">
            <Select
              value={String(pageState.pageSize)}
              onValueChange={(value) => {
                setPageState((p) => ({
                  ...p,
                  pageSize: Number(value),
                  pageIndex: 0,
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Rows per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Rows per page</SelectLabel>
                  {[5, 10, 20, 50, 100].map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="rounded-md border px-2">
        <TableData table={table} columns={columns} />
      </div>

      <div className="flex justify-start items-center space-x-2">
        <TablePagination table={table} />
      </div>
    </>
  );
};
