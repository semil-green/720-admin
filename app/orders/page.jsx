"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import OrderTable from "@/components/order/OrderTable";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import MainLayout from "@/components/layout/mainLayout";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { getAllCustomerOrdersService } from "@/service/cutomer-order/cutomer-order.service";
import { setCutomerOrders } from "@/store/slices/cutomer-order/cutomer-order.slice";
import { Input } from "@/components/ui/input";
import FilterDropdown from "@/components/items/FilterDropDown";

export default function Orders() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(9);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    const router = useRouter();
    const dispatch = useDispatch();

    const getCustomerOrders = useSelector(
        (state) => state.customerOrderSlice.paginatedCutomerOrdersData
    );

    const fetchCustomerOrders = async (
        customPage = page,
        customLimit = limit,
        customSearch = search,
        customSortBy = sort?.sortBy,
        customSortOrder = sort?.sortOrder
    ) => {

        setLoading(true);
        try {

            const res = await getAllCustomerOrdersService(customPage, customLimit, customSearch, customSortBy, customSortOrder)

            if (res?.status == 200) {
                setLoading(false);
                dispatch(setCutomerOrders(res?.data?.data))
                setTotalPages(Math.ceil(res?.data?.total_count / customLimit));
            }
        }
        catch (error) {
            toast.error("Error in fetching customer orders");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomerOrders();
    }, [page, limit, sort]);


    const customerOrderColumns = [
        { label: "Order Id", value: "order_id" },
        { label: "Order Date", value: "order_date" },
        { label: "Customer Name", value: "customer_name" },
        { label: "No of items", value: "order_items_count" },
    ];

    const handleCustomerOrderSortChange = (sort) => {
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

            <div className="space-y-4">
                {/* <div className="flex justify-end items-center gap-2">
                    <Link href={"/orders/new"}>
                        <Button className="cursor-pointer">New Order</Button>
                    </Link>
                </div> */}

                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <Input
                            placeholder="Search Order Request"
                            className="w-2xl"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <Button
                            onClick={() => { setPage(1); fetchCustomerOrders(page, limit, search) }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                setSearch("");
                                setPage(1);
                                setSort("");
                                fetchCustomerOrders(1, limit, "");
                            }}
                            variant={"link"}
                        >
                            Clear
                        </Button>
                    </div>
                    <div className="flex justify-end">
                        <FilterDropdown
                            columns={customerOrderColumns}
                            onSortChange={handleCustomerOrderSortChange}
                        />
                    </div>
                </div>

                <OrderTable
                    data={getCustomerOrders}
                    totalPages={totalPages}
                    page={page}
                    setPage={setPage}
                />
            </div>
        </MainLayout>
    );
}
