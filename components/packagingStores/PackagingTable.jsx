
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction
} from "@/components/ui/alert-dialog"
import { ArrowUpDown, MoreVertical, Pencil, Trash2 } from "lucide-react"
import { useDispatch } from "react-redux"
import { deleteDarkStorePackagingCenterService } from "@/service/darkStore-packagingCenter/darkStore-packagingCenter.service"
import { deletePackagingCenter } from "@/store/slices/packaging-center/packaging-center.slice"

export default function PackagingStoreTable({
  data,
  page,
  setPage,
  limit,
  setLimit,
  totalPages,
  sortBy,
  setSortBy,
  sortType,
  setSortType,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const res = await deleteDarkStorePackagingCenterService(id);

    if (res?.status === 200) {
      dispatch(deletePackagingCenter(id));
    } else {
      console.error("Failed to delete:", res);
    }
  };

  const handleSortToggle = () => {
    setSortType((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const storeColumns = (onEdit) => [
    {
      accessorKey: "store_name",
      header: "Name",
    },
    {
      accessorKey: "store_code",
      header: "Code",
    },
    {
      header: "City",
      cell: ({ row }) => row.original.city?.city_name ?? "N/A",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const store = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(store)}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="px-2 py-1.5 text-sm cursor-pointer flex items-center text-red-600 hover:text-white hover:bg-red-600 rounded-sm">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Store?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(store.id)}>
                      Confirm Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns: storeColumns((store) => router.push(`/packaging-stores/new?id=${store.id}`)),
    manualPagination: true,
    manualSorting: true,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded border p-4 pt-0 shadow">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table?.getRowModel()?.rows?.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4 gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Button onClick={() => setPage(page - 1)} disabled={page <= 1}>
            Previous
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <Button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
            Next
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page:</span>
          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            {[5, 10, 20].map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}


