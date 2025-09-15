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

export default function StoreOrders() {
    const [StoreOrder, setStoreOrder] = useState({});
    const [isStoreOrderModalOpen, setIsStoreOrderModalOpen] = useState(false);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
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
                toast.error("Error in fetching store orders 456");
            }
        } catch (error) {
            toast.error("Error in fetching store orders 123");
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

    return (
        <MainLayout>
            {loading && (
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            )}
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <Input
                        placeholder="Search Order Request"
                        className="w-2xl"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
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
