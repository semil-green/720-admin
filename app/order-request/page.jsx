"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import StoreOrderTable from "@/components/store-orders/StoreOrderTable";
import StoreOrderForm from "@/components/store-orders/StoreOrderForm";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
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
import { useSelector, useDispatch } from "react-redux";
import { getAllItemsService } from "@/service/items/items.service";
import { getAllItemsData } from "@/store/slices/items/items.slice";
import { getAllOrderRequestService } from "@/service/order-request/order-requet.service";
import { getAllOrderRequests } from "@/store/slices/order-request/order-request.slice";
import {
    allDarkStoresOfUserService,
    getAllDarkStorePackagingCenter,
} from "@/service/darkStore-packagingCenter/darkStore-packagingCenter.service";
import { setAllPackagingCenter } from "@/store/slices/packaging-center/packaging-center.slice";
import { setAllDarkStoresOfUser, setDarkStores } from "@/store/slices/dark-store/dark-store.slice";
import { Input } from "@/components/ui/input";
import FilterDropdown from "@/components/items/FilterDropDown";

export default function StoreOrders() {
    const [StoreOrder, setStoreOrder] = useState({});
    const [userType, setUserType] = useState(null);


    const [loading, setLoading] = useState(true);
    const [isStoreOrderModalOpen, setIsStoreOrderModalOpen] = useState(false);
    const [editData, setEditData] = useState({});

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [totalPage, setTotalPage] = useState(0);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [displayTransferFields, setDisplayTransferFields] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const allProductsData = useSelector(
        (state) => state.allItemsSlice.allItemsData
    );

    useEffect(() => {
        const fetchProductData = async () => {
            const res = await getAllItemsService(1, 10000, "", "", "");
            if (res?.status === 200) {
                dispatch(getAllItemsData(res?.data?.data));
            }
        };
        fetchProductData();
    }, []);

    const allPackagingCentersData = useSelector(
        (state) => state.packagingStoreSlice.allPackagingCenters
    );

    useEffect(() => {
        if (!allPackagingCentersData || allPackagingCentersData.length === 0) {
            const fetchData = async () => {
                const result = await getAllDarkStorePackagingCenter({
                    type: "packaging_center",
                    page: 1,
                    limit: 10000,
                });
                if (result?.status === 200) {
                    dispatch(setAllPackagingCenter(result?.data?.data || []));
                }
            };
            fetchData();
        }
    }, []);

    const allOrderRequestData = useSelector(
        (state) => state.orderRequestSlice.paginatedOrderRequest
    );

    const fetchALlOrderRequestData = async (
        customPage = page,
        customLimit = limit,
        customSearch = search,
        customSortBy = sort?.sortBy,
        customSortOrder = sort?.sortOrder
    ) => {
        setLoading(true);
        try {
            const res = await getAllOrderRequestService(
                customPage,
                customLimit,
                customSearch,
                customSortBy,
                customSortOrder
            );

            if (res?.status === 200) {
                setLoading(false);
                setTotalPage(Math.ceil(res?.data?.total_count / customLimit));
                dispatch(getAllOrderRequests(res?.data?.rows));
            }
        } catch (error) {
            toast.error("Error in fetching order requests ");
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchALlOrderRequestData();
    }, [page, limit, sort]);


    useEffect(() => {
        if (typeof window !== "undefined") {
            const role = localStorage.getItem("role");
            setUserType(role);
        }
    }, []);

    const allDarkStoresOfUser = useSelector(
        (state) => state.darkStoreSlice.allDarkStoresOfUser
    );

    const adminDarkStores = useSelector((state) => state.darkStoreSlice.darkStores);


    useEffect(() => {
        if (userType !== "admin") {
            if (!allDarkStoresOfUser || allDarkStoresOfUser.length === 0) {
                const fetchData = async () => {
                    const result = await allDarkStoresOfUserService();
                    if (result?.status === 200) {
                        dispatch(setAllDarkStoresOfUser(result?.data || []));
                    }
                };
                fetchData();
            }
        } else {
            const fetchDarkStores = async () => {
                try {
                    setLoading(true);
                    const result = await getAllDarkStorePackagingCenter({
                        type: "dark_store",
                        page,
                        limit,
                    });


                    const storeList = result?.data?.data || [];

                    if (result?.status === 200) {

                        dispatch(setDarkStores(storeList));
                    }
                    else {
                        toast.error("Error fetching dark stores", {
                            description: result?.data?.message || "Something went wrong",
                        });
                    }

                } catch (error) {
                    toast.error("Error fetching dark stores", {
                        description: result?.data?.message || "Something went wrong",
                    })
                } finally {
                    setLoading(false);
                }
            };

            fetchDarkStores();
        }
    }, [userType, allDarkStoresOfUser, dispatch]);

    const openAddStoreOrder = () => {
        setStoreOrder({});
        setIsStoreOrderModalOpen(true);
    };

    const orderRequestColumns = [
        { label: "Product", value: "title" },
        { label: "Quantity", value: "quantity" }
    ];

    const handleOrderRequestSortChange = (sort) => {
        setSort(sort)
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

            <div className="space-y-4">
                <div className="flex justify-end items-center">
                    <Button
                        onClick={() => openAddStoreOrder()}
                        className="cursor-pointer"
                    >
                        New Order
                    </Button>
                </div>

                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <Input
                            placeholder="Search Order Request"
                            className="w-2xl"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <Button
                            onClick={() => fetchALlOrderRequestData(page, limit, search)}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                setSearch("");
                                setPage(1);
                                setSort("");
                                fetchALlOrderRequestData(1, limit, "");
                            }}
                            variant={"link"}
                        >
                            Clear
                        </Button>
                    </div>
                    <div className="flex justify-end">
                        <FilterDropdown
                            columns={orderRequestColumns}
                            onSortChange={handleOrderRequestSortChange}
                        />
                    </div>
                </div>

                <StoreOrderTable
                    data={allOrderRequestData}
                    openAddStoreOrder={openAddStoreOrder}
                    setEditData={setEditData}
                    page={page}
                    totalPages={totalPage}
                    setPage={setPage}
                />
            </div>

            {/* Add/Edit StoreOrder */}
            <Dialog
                open={!!isStoreOrderModalOpen > 0}
                onOpenChange={() => setIsStoreOrderModalOpen(false)}
            >
                <DialogContent className="sm:max-w-md md:max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {StoreOrder.StoreOrderId > 0
                                ? "Update Order Request"
                                : "Order Request"}
                        </DialogTitle>
                        <DialogDescription>
                            Add/Update Order Request from here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <StoreOrderForm
                            initialData={StoreOrder}
                            handleCose={() => {
                                setIsStoreOrderModalOpen(false);
                                setEditData({});
                            }}
                            allProductsData={allProductsData}
                            packagingCenterData={allPackagingCentersData}
                            allDarkStoresOfUser={userType == "admin" ? adminDarkStores : allDarkStoresOfUser}
                            editData={editData}
                            setEditData={setEditData}
                            displayTransferFields={displayTransferFields}
                            setDisplayTransferFields={setDisplayTransferFields}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </MainLayout>
    );
}
