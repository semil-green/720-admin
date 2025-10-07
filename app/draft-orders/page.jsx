"use client";
import MainLayout from '@/components/layout/mainLayout'
import DraftOrderTable from '@/components/order/draft-order/DraftOrderTable'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { PencilLine } from 'lucide-react';
import { fetchDraftOrdersService } from '@/service/draft-orders/draft-orders.service';
import { toast } from 'sonner';
import { setDraftOrders } from '@/store/slices/draft-order/draft-order.slice';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from "@/components/ui/input";
import FilterDropdown from "@/components/items/FilterDropDown";
import { Loader2 } from "lucide-react";

const page = () => {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(8);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState("")

    const dispatch = useDispatch();

    const fetchDraftOrders = async (

        customPage = page,
        customLimit = limit,
        customSearch = search,
        customSortBy = sort?.sortBy,
        customSortOrder = sort?.sortOrder
    ) => {

        try {
            setLoading(true);
            const res = await fetchDraftOrdersService(customPage, customLimit, customSearch, customSortBy, customSortOrder);
            if (res?.status == 200 || res?.status == 201) {
                dispatch(setDraftOrders(res?.data?.data));
                setTotalCount(Math.ceil(res?.data?.total_count / limit));
            }
        }
        catch (err) {
            toast.error("Failed to fetch draft orders")
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDraftOrders()
    }, [page, limit, sort])

    const allDraftOrders = useSelector(state => state.draftOrderSlice.paginatedDraftOrders)

    const draftOrderColumns = [
        { label: "Order Id", value: "order_id" },
        { label: "Order Date", value: "order_date" },
        { label: "Customer Name", value: "customer_name" },
        { label: "No of items", value: "order_items_count" },
    ];

    const handleDraftOrderSortChange = (sort) => {
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
                <div className="flex justify-end items-end gap-2">
                    <div>
                        <Link href={"/draft-orders/new"}>
                            <Button className='cursor-pointer'>Add New</Button>
                        </Link>
                    </div>
                </div>

            </div>

            <div className="flex justify-between py-4">
                <div className="flex gap-4">
                    <Input
                        placeholder="Search Order Request"
                        className="w-2xl"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <Button
                        onClick={() => { setPage(1); fetchDraftOrders(page, limit, search) }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            setSearch("");
                            setPage(1);
                            setSort("");
                            fetchDraftOrders(1, limit, "");
                        }}
                        variant={"link"}
                    >
                        Clear
                    </Button>
                </div>
                <div className="flex justify-end">
                    <FilterDropdown
                        columns={draftOrderColumns}
                        onSortChange={handleDraftOrderSortChange}
                    />
                </div>
            </div>

            <DraftOrderTable
                data={allDraftOrders}
                page={page}
                setPage={setPage}
                totalPages={totalCount}
            />
        </MainLayout>
    )
}

export default page