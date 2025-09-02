"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { deleteCityService } from "@/service/citiy/city.slice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { deleteCity } from "@/store/slices/city/city.slice";

const CityTable = ({ data, onEdit, page, limit, totalPages, setPage }) => {
    const dispatch = useDispatch();
    const handleCityDelete = async (city_id) => {

        const res = await deleteCityService(city_id);

        if (res?.status == 200 || res?.status == 201) {
            dispatch(deleteCity(city_id))
            toast.success("Deleted", { description: "City deleted successfully" });
        }
        else {
            toast.error("Failed to delete city");
        }
    }
    return (
        <div className="w-full">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>City Name</TableHead>
                        <TableHead>State Name</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data?.length > 0 ? (
                        data.map((city, index) => (
                            <TableRow key={index}>
                                <TableCell>{city.city_name}</TableCell>
                                <TableCell>{city.state_name}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => onEdit(city)}>
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
                                                        <AlertDialogTitle>Delete City?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. The city will be permanently deleted.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleCityDelete(city.id)}>
                                                            Confirm Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center text-gray-500">
                                No cities found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className="flex justify-between items-center mt-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <span className="text-sm">
                    Page {page} of {totalPages}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </Button>
            </div>

        </div>
    );
};

export default CityTable;
