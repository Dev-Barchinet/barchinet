"use client";

import { useCallback, useMemo, useState } from "react";

import { debounce } from "lodash";

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showColumnFilter?: boolean;
  fetchNextPage: (pageIndex: number, pageSize: number) => Promise<void>;
  hasMore: boolean;
  onSearchChanged?: (searchedValue: string) => void;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  tableTitle: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showColumnFilter = false,
  fetchNextPage,
  hasMore,
  onSearchChanged,
  isLoading,
  tableTitle,
  isFetchingNextPage,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [searchValue, setSearchValue] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: -1,
    manualPagination: true,
  });

  const handleSearch = useCallback(
    (searchTerm: string) => {
      console.log("debounce search");
      onSearchChanged?.(searchTerm);
    },
    [onSearchChanged]
  );

  // Use useMemo to persist the debounced function
  const debouncedSearch = useMemo(
    () => debounce(handleSearch, 400),
    [handleSearch]
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handlePageChange = async (nextPage: number) => {
    const pageSize = table.getState().pagination.pageSize;

    if (nextPage !== table.getState().pagination.pageIndex) {
      await fetchNextPage(nextPage, pageSize);
      table.setPageIndex(nextPage);
    }
  };

  return (
    <>
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-start justify-between pb-4 w-full">
          <p className="title-2">{tableTitle}</p>
          <Input
            placeholder="Search by name..."
            value={searchValue}
            onChange={handleInputChange}
            className="max-w-sm"
          />
        </div>

        {/* Column visibility */}
        {showColumnFilter && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: boolean) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Table */}
      <Table className="border-collapse border border-gray-200">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading || isFetchingNextPage ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : table?.getRowModel()?.rows?.length ? (
            table?.getRowModel()?.rows?.map((row) => (
              <TableRow
                key={row?.id}
                data-state={row?.getIsSelected() && "selected"}
              >
                {row?.getVisibleCells()?.map((cell) => (
                  <TableCell key={cell?.id}>
                    {flexRender(
                      cell?.column?.columnDef?.cell,
                      cell?.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns?.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            handlePageChange(table.getState().pagination.pageIndex - 1)
          }
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            handlePageChange(table.getState().pagination.pageIndex + 1)
          }
          disabled={isLoading || !hasMore}
        >
          Next
        </Button>
      </div>
    </>
  );
}
