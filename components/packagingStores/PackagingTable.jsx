
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
import { ArrowUpDown, MoreVertical, Pencil, Trash2, ShieldClose } from "lucide-react"
import { useDispatch } from "react-redux"
import { deleteDarkStorePackagingCenterService } from "@/service/darkStore-packagingCenter/darkStore-packagingCenter.service"
import { deletePackagingCenter } from "@/store/slices/packaging-center/packaging-center.slice"
import { toast } from "sonner"
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
  setDayOff
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    const res = await deleteDarkStorePackagingCenterService(id);

    if (res?.status === 200) {
      dispatch(deletePackagingCenter(id));
    } else {
      toast.error("Failed to delete packaging center");
    }
  };

  const handleSortToggle = () => {
    setSortType((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const storeColumns = (onEdit, setDayOff) => [
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
              <DropdownMenuItem onClick={() => setDayOff(store.id)}>
                <ShieldClose className="mr-2 h-4 w-4" /> Set Day Off
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns: storeColumns(
      (store) => router.push(`/packaging-stores/new?id=${store.id}`),
      setDayOff
    ),
    manualPagination: true,
    manualSorting: true,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
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
          {table?.getRowModel()?.rows?.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={table.getAllColumns().length}
                className="text-center py-6 text-gray-500"
              >
                No packaging center found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between mt-4">
        <Button
          variant="outline"
          onClick={() => setPage(page - 1)} disabled={page <= 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage(page + 1)} disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}


