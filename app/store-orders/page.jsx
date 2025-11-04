"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    getStoreOrders,
    deleteStoreOrder,
    addStoreOrder,
    getStoreOrder,
    updateStoreOrder,
} from "@/lib/api/storeOrders";
import StoreOrderTable from "@/components/store-orders/StoreOrderTable";
import StoreOrderForm from "@/components/store-orders/StoreOrderForm";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import MainLayout from "@/components/layout/mainLayout";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import StoreOrdersTable from "@/components/store-orders/StoreOrdersTable";
import { useSelector, useDispatch } from "react-redux";
import { fetchStoreOrderService } from "@/service/store-order/store-order.service";
import { setStoreOrders } from "@/store/slices/store-order/store-order.slice";
import FilterDropdown from "@/components/items/FilterDropDown";
import { setDarkStores } from "@/store/slices/dark-store/dark-store.slice";
import { getAllDarkStorePackagingCenter } from "@/service/darkStore-packagingCenter/darkStore-packagingCenter.service";
import * as XLSX from "xlsx";

export default function StoreOrders() {
    const [StoreOrder, setStoreOrder] = useState({});
    const [isStoreOrderModalOpen, setIsStoreOrderModalOpen] = useState(false);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [loading, setLoading] = useState(true);
    const [displayTransferFields, setDisplayTransferFields] = useState(false);
    const [editData, setEditData] = useState({});

    const router = useRouter();
    const dispatch = useDispatch();

    const handleTransfer = (rowData) => {
        setStoreOrder(rowData);
        setIsStoreOrderModalOpen(true);
    };

    // ================

    const allStoreOrders = useSelector(
        (state) => state.storeOrderSlice.paginatedStoresData
    );

    const fetchAllStoreOrders = async (page, limit, search, sortBy = sort?.sortBy, sortOrder = sort?.sortOrder) => {
        setLoading(true);
        try {
            const response = await fetchStoreOrderService(page, limit, search, sortBy, sortOrder);

            if (response?.status == 200) {
                setTotalPages(Math.ceil(response?.data?.total_count / limit));
                dispatch(setStoreOrders(response?.data?.rows));
            } else {
                toast.error(response?.response?.data?.message || "Failed to fetch store orders");
            }
        } catch (error) {
            toast.error("Error in fetching store orders");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllStoreOrders(page, limit, search, sort?.sortBy, sort?.sortOrder);
    }, [page, limit, sort]);

    const storeOrderColumns = [
        { label: "Order id", value: "id" },
        { label: "Created At", value: "created_at" },
        { label: "Product", value: "product.title" },
        { label: "Packaging Center", value: "packaging_center.store_name" },
        { label: "Dark Store", value: "dark_store.store_name" },
        { label: "Quantity", value: "quantity" },
        { label: "Transferred Quantity", value: "transferred_quantity" },
        { label: "Transferred Date", value: "transferred_date" }
    ];

    const handleStoreOrderSortChange = (sort) => {
        setSort(sort);
    }

    const exportToExcelStoreOrderData = (data) => {
        if (!data || data.length === 0) {
            toast.error("No data available to export");
            return;
        }

        const formattedData = data.map((item) => {
            const createdAt = new Date(item.created_at);
            const createdDate = createdAt.toLocaleDateString("en-GB");
            const createdTime = createdAt.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            });

            const transferredDateTime = item.transferred_date
                ? (() => {
                    const date = new Date(item.transferred_date);
                    const formattedDate = date.toLocaleDateString("en-GB");
                    const formattedTime = date.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                    });
                    return `${formattedDate} ${formattedTime}`;
                })()
                : "-";

            return {
                "Order No.": item.id,
                "Order Date & Time": `${createdDate} ${createdTime}`,
                "Product": item.product?.title || "-",
                "Store": item.packaging_center?.store_name || "-",
                "Store Remarks": item.remarks || "-",
                "Demanded Qty": item.quantity ?? 0,
                "Transferred Qty": item.transferred_quantity ?? 0,
                "PC Remarks": item.transferred_remarks || "-",
                "Transfer Date & Time": transferredDateTime,
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Store Orders");

        XLSX.writeFile(workbook, "Store_Orders.xlsx");
    };

    return (
        <MainLayout>
            {loading && (
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            )}

            <div className="mb-4 flex justify-end">
                <Button onClick={() => exportToExcelStoreOrderData(allStoreOrders)}>Export</Button>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <Input
                        placeholder="Search Order Request"
                        className="w-2xl"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                fetchAllStoreOrders(page, limit, search, sort?.sortBy, sort?.sortOrder)
                            }
                        }}
                    />
                    <Button
                        onClick={() => fetchAllStoreOrders(page, limit, search, sort?.sortBy, sort?.sortOrder)}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            setSearch("");
                            setPage(1);
                            setSort("");
                            fetchAllStoreOrders(page, limit, "", sort?.sortBy, sort?.sortOrder)

                        }}
                        variant={"link"}
                    >
                        Clear
                    </Button>
                </div>
                <div className="flex justify-end">
                    <FilterDropdown
                        columns={storeOrderColumns}
                        onSortChange={handleStoreOrderSortChange}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <StoreOrdersTable
                    data={allStoreOrders}
                    onTransferClick={handleTransfer}
                    totalPages={totalPages}
                    page={page}
                    setPage={setPage}
                    setDisplayTransferFields={setDisplayTransferFields}
                    setEditData={setEditData}
                />
            </div>

            {/* Add/Edit StoreOrder */}
            <Dialog
                open={!!isStoreOrderModalOpen > 0}
                onOpenChange={() => setIsStoreOrderModalOpen(false)}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {StoreOrder.StoreOrderId > 0
                                ? "Update Order Request"
                                : "Transfer Order "}
                        </DialogTitle>
                        <DialogDescription>
                            Add/Update Order Request from here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <StoreOrderForm
                            initialData={StoreOrder}
                            handleCose={() => setIsStoreOrderModalOpen(false)}
                            displayTransferFields={displayTransferFields}
                            setDisplayTransferFields={setDisplayTransferFields}
                            editData={editData}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </MainLayout>
    );
}
