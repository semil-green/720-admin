"use client";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "sonner";
import { activateDiscountService, deleteDiscountService, getDiscountsService } from '@/service/discount/discount.service';
import { activateDiscount, deleteDiscount, setAllDiscounts } from '@/store/slices/discount/discount.slice';
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterDropdown from "@/components/items/FilterDropDown";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
    AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
    AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction
} from "@/components/ui/alert-dialog";
import { MoreVertical, Pencil, Trash2, ShieldCheck } from "lucide-react";
import { useRouter } from 'next/navigation';


const DiscountDatatTable = () => {
    const [activeTab, setActiveTab] = useState("All");
    const [loading, setLoading] = useState(false)

    const [type, setType] = useState("")

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [sort, setSort] = useState("")

    const dispatch = useDispatch();
    const router = useRouter();

    const tabs = [
        { name: "All", value: "" },
        { name: "Active", value: "active" },
        { name: "Scheduled", value: "scheduled" },
        { name: "Expired", value: "expired" },
    ];

    const StatusBadge = ({ status }) => {
        let classes = "";

        if (status === "active") {
            classes = "bg-green-100 text-green-700";
        } else if (status === "expired") {
            classes = "bg-red-100 text-red-700";
        } else if (status === "scheduled") {
            classes = "bg-blue-100 text-blue-700";
        } else {
            classes = "bg-gray-200 text-gray-600";
        }

        return (
            <span
                className={`text-sm px-3 py-1 rounded-full font-medium min-w-[90px] inline-block text-center ${classes}`}
            >
                {status}
            </span>
        );
    };

    const fetchDiscounts = async (
        pageVal = page,
        limitVal = limit,
        searchVal = search,
        typeVal = type,
        sortBy = sort?.sortBy,
        sortOrder = sort?.sortOrder
    ) => {
        try {
            setLoading(true);
            const res = await getDiscountsService(pageVal, limitVal, searchVal, typeVal, sortBy, sortOrder);

            if (res?.status == 200) {
                setTotalPages(Math.ceil(res?.data?.total_count / limitVal));
                dispatch(setAllDiscounts(res?.data?.data));
            } else {
                toast.error(res?.response?.data?.message || "Failed to fetch discounts");
            }
        } catch (err) {
            toast.error(err?.response?.data?.message ?? "Failed to fetch discounts");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchDiscounts();
    }, [activeTab, page, sort])

    const allDiscountsData = useSelector((state) => state.discountSlice.paginatedDiscountData)
    const discountColumns = [
        { label: "discount code", value: "discount_code" },
    ];

    const handleDiscountSortChange = (sort) => {
        setSort(sort)
    }

    const handleDelete = async (id) => {
        const res = await deleteDiscountService(id);

        if (res?.data?.status == 200) {
            dispatch(deleteDiscount(id));
            toast.success("Deleted", { description: "Discount deactivated successfully" });
        }
        else {
            toast.error("Failed to deactivate discount");
        }
    }

    const handleActivate = async (id) => {
        const res = await activateDiscountService(id);
        if (res?.data?.status == 200) {
            dispatch(activateDiscount(id));
            toast.success("Activated", { description: "Discount Activated successfully" });
        }
        else {
            toast.error("Failed to activate discount");
        }
    }
    return (
        <>
            {loading && (
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            )}
            <div className="flex justify-between items-end px-3 py-3 rounded border shadow mt-4">
                <div className="flex gap-4">
                    {tabs.map((tab, index) => (
                        <div
                            key={index}
                            onClick={() => { setActiveTab(tab?.name), setType(tab?.value), setPage(1); }}
                            className={`cursor-pointer px-4 py-2 rounded ${activeTab === tab.name
                                ? "bg-gray-500 text-white"
                                : "bg-gray-200"
                                }`}
                        >
                            {tab?.name}
                        </div>
                    ))}
                </div>
                <div className='flex  gap-2'>
                    <input
                        placeholder="search here.."
                        className="border rounded-md px-2 py-2"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                fetchDiscounts(page, limit, search);
                                setPage(1);
                            }
                        }}
                    />
                    <Button
                        onClick={() => { fetchDiscounts(page, limit, search), setPage(1); }}
                    >
                        Search
                    </Button>
                    <Button

                        onClick={() => {
                            setSearch("");
                            setPage(1);
                            setSort("");
                            fetchDiscounts(1, limit, type, "");
                        }}
                        variant={"link"}
                    >
                        Clear
                    </Button>

                    <div className="flex justify-end">
                        <FilterDropdown
                            columns={discountColumns}
                            onSortChange={handleDiscountSortChange}
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto py-4">
                <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                Title
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                Type
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                Status
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {allDiscountsData?.length > 0 ? (
                            allDiscountsData?.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">
                                        <div className="font-medium text-gray-800">
                                            {item?.discount_code}
                                        </div>

                                        <div className="text-sm text-gray-500">
                                            {item.discount_type === "percent"
                                                ? `${item?.discount_value}% off on entire order`
                                                : `₹${item?.discount_value} off on entire order${item?.min_purchase_amount
                                                    ? ` (Min purchase ₹${item?.min_purchase_amount})`
                                                    : ""
                                                }${item.min_purchase_quantity
                                                    ? ` (Min quantity ${item?.min_purchase_quantity})`
                                                    : ""
                                                }`}
                                        </div>
                                    </td>

                                    <td className="px-4 py-2">
                                        <StatusBadge status={item?.discount_status} />
                                    </td>

                                    <td>
                                        {item?.status ? <span className="text-green-600 px-4 py-2">Active</span> : <span className="text-red-600 px-4 py-2"> Inactive</span>}
                                    </td>
                                    <td>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        router.push(`/discount/add-discount?id=${item?.id}`);

                                                    }}
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" /> Edit
                                                </DropdownMenuItem>

                                                {
                                                    item?.status ? (<AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <div className="px-2 py-1.5 text-sm cursor-pointer flex items-center text-red-600 hover:text-white hover:bg-red-600 rounded-sm">
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Deactivate
                                                            </div>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Deactivate Discount?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Are you sure you want to deactivate this Discount?
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(item?.id)}>
                                                                    Confirm Delete
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>) : (
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <div className="px-2 py-1.5 text-sm cursor-pointer flex items-center text-green-600 hover:text-white hover:bg-green-600 rounded-sm">
                                                                    <ShieldCheck className="mr-2 h-4 w-4" />
                                                                    Activate
                                                                </div>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Activate Discount?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Are you sure you want to deactivate this Discount?
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleActivate(item?.id)}>
                                                                        Confirm Activate
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    )
                                                }

                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-2 text-center">
                                    No discounts found
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

                <div className="flex justify-between items-center mt-4 w-full">

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-sm">Page {page} of {totalPages}</span>
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
        </>
    );
};


export default DiscountDatatTable