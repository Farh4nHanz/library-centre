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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

/** @icons */
import { Search, Settings2 } from "lucide-react";

export const BookTable = <TData, TValue>({
  columns,
  data,
}: BookTableProps<TData, TValue>) => {
  const [pageState, setPageState] = useState<{
    pageSize: number;
    pageIndex: number;
  }>({
    pageSize: 5,
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
      <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] items-center justify-between gap-5">
        <div className="flex gap-2 lg:max-w-sm flex-row-reverse justify-between">
          {/* filter */}
          <div className="flex-shrink lg:flex-1 relative">
            <Input
              id="filter"
              className="peer pe-9"
              placeholder="Filter by title"
              type="text"
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(e) =>
                table.getColumn("title")?.setFilterValue(e.target.value)
              }
            />
            <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
              <Search size={16} strokeWidth={2} aria-hidden="true" />
            </div>
          </div>

          {/* select rows per page */}
          <div className="max-w-xs">
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

        {/* columns toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <Settings2 />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 rounded-md border px-2">
        <TableData table={table} columns={columns} />
      </div>

      <div className="flex justify-start items-center space-x-2">
        <TablePagination table={table} />
      </div>
    </>
  );
};
