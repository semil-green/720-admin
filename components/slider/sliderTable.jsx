"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { MoreVertical, Pencil, Trash2, ShieldCheck } from "lucide-react";
import { deleteSliderService, updateSliderStatusService } from "@/service/slider/slider.service";
import { deleteSlider, updateSliderStatus } from "@/store/slices/slider/slider.slice";


const SliderTable = ({ data, page, totalPages, setPage }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(null);

    if (!data || data.length === 0) {
        return <div className="p-6 text-center text-muted-foreground">No sliders available</div>;
    }

    const handleDelete = async (id) => {

        setLoading(true);

        const res = await deleteSliderService(id);

        if (res?.status == 200 || res?.status == 201) {

            dispatch(deleteSlider(id))
            toast.success("Deleted", { description: "Slider deleted successfully" });
        }

    }

    const handleSliderActivate = async (slider_id, status) => {

        const updatedStatus = status == true ? false : true

        const res = await updateSliderStatusService(slider_id, updatedStatus);

        if (res?.status == 200 || res?.status == 201) {
            dispatch(updateSliderStatus(res?.data))
            toast.success("Updated", { description: "Slider status updated successfully" });
        }
        else {
            toast.error("Failed to update slider status");
        }
    }

    return (
        <div className="rounded-xl shadow-sm border bg-white px-3 py-1">
            <Table >
                <TableHeader>
                    <TableRow>
                        <TableHead>Slider Name</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Collection</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center" >Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((slider, index) => (
                        <TableRow key={slider.slider_id}>

                            <TableCell className="font-medium">{slider.slider_name}</TableCell>

                            <TableCell>
                                {slider.slider_image ? (
                                    <Image
                                        src={slider.slider_image}
                                        alt={slider.slider_name}
                                        width={64}
                                        height={64}
                                        className="rounded-md object-cover"
                                    />
                                ) : (
                                    <div className="w-16 h-10 bg-gray-100 rounded-md flex items-center justify-center text-xs text-gray-400">
                                        No image
                                    </div>
                                )}
                            </TableCell>

                            <TableCell>{slider.collection_name || "-"}</TableCell>

                            <TableCell>
                                {slider.status ? (
                                    <Badge className="bg-green-100 text-green-700 border-green-300">Active</Badge>
                                ) : (
                                    <Badge variant="destructive">Inactive</Badge>
                                )}
                            </TableCell>

                            <TableCell>
                                <div className="flex justify-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() => router.push(`/slider/new?id=${slider?.slider_id}`)}
                                                className="flex items-center gap-2"
                                            >
                                                <Pencil className="h-4 w-4" /> Edit
                                            </DropdownMenuItem>


                                            {slider?.status ? (<AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <div className="px-2 py-1.5 text-sm cursor-pointer flex items-center text-red-600 hover:text-white hover:bg-red-600 rounded-sm">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Deactivate
                                                    </div>
                                                </AlertDialogTrigger>

                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Slider?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to delete this slider? This action cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>

                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleSliderActivate(slider?.slider_id, slider?.status)}
                                                            disabled={loading === slider.slider_id}
                                                        >
                                                            {loading === slider.slider_id ? "Deleting..." : "Confirm Delete"}
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>) : (<AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <div className="px-2 py-1.5 text-sm cursor-pointer flex items-center text-green-600 hover:text-white hover:bg-green-600 rounded-sm">
                                                        <ShieldCheck className="mr-2 h-4 w-4" />
                                                        Activate
                                                    </div>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Activate Slider?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Are you sure you want to activate this slider?
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleSliderActivate(slider?.slider_id, slider?.status)}>

                                                            Confirm Activate
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>)}




                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


            <div className="flex items-center justify-between mt-4">
                <Button
                    variant="outline"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>

                <span className="text-sm">
                    Page {page} of {totalPages}
                </span>

                <Button
                    variant="outline"
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages || totalPages === 0}
                >
                    Next
                </Button>

            </div>
        </div>
    );
};

export default SliderTable;
