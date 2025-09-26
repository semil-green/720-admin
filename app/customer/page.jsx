"use client"
import MainLayout from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import React, { useState, useEffect, Suspense } from 'react'
import { Users } from 'lucide-react';
import CustomerTable from '@/components/customers/CustomerTable';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomerService } from '@/service/customer/customer.service';
import { setCustomers } from '@/store/slices/customer/customer.slice';
import { Input } from "@/components/ui/input";
import FilterDropdown from "@/components/items/FilterDropDown";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const CustomerPage = () => {

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [search, setSearch] = useState('')
    const searchParams = useSearchParams();
    const searchFromUrl = searchParams.get("search");
    const [totalPages, setTotalPages] = useState(0)
    const [loading, setLoading] = useState(false)
    const [sort, setSort] = useState('')

    const dispatch = useDispatch()

    const allCustomers = useSelector(state => state.customerSlice.paginatedCustomersData)

    const fetchCustomers = async (page, limit, search, sortBy = sort?.sortBy, sortOrder = sort?.sortOrder) => {
        try {
            setLoading(true);
            const response = await getAllCustomerService(page, limit, search, sortBy, sortOrder);

            if (response?.status == 200 || response?.status == 201) {

                setTotalPages(response?.data?.total)
                dispatch(setCustomers(response?.data?.rows))
            }
        } catch (error) {
            toast.error("Error in fetching customers");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchFromUrl) {
            setSearch(searchFromUrl);
            fetchCustomers(1, limit, searchFromUrl, sort?.sortBy, sort?.sortOrder);
        } else {
            fetchCustomers(page, limit, search, sort?.sortBy, sort?.sortOrder);
        }
    }, [page, limit, sort, searchFromUrl]);



    const customerColumns = [
        { label: "Total Spent", value: "total_spent" },
    ];

    const handleCustomerSortChange = (sort) => {
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
                <div className="flex justify-between items-end ">
                    <div className='flex  gap-3'>
                        <Users />
                        <h1 className='font-semibold text-xl'>Customers</h1>
                    </div>
                    {/* <div className='flex gap-3'>
                        <Button className='cursor-pointer' variant={'secondary'}>Export</Button>
                        <Button className='cursor-pointer' variant={'secondary'}>Import</Button>
                        <Button className='cursor-pointer' variant={'secondary'}>More Actions</Button>
                        <Button className='cursor-pointer'>Add Customer</Button>
                    </div> */}
                </div>

                <div className='  px-2 py-2 rounded border shadow	'>
                    <div className="flex justify-between">
                        <div className="flex gap-4">
                            <Input
                                placeholder="Search Customer"
                                className="w-2xl"
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                            />
                            <Button
                                onClick={() => fetchCustomers(page, limit, search, sort?.sortBy, sort?.sortOrder)}
                            >
                                Search
                            </Button>
                            <Button
                                onClick={() => {
                                    setSearch("");
                                    setPage(1);
                                    setSort("");
                                    fetchCustomers(1, limit, "");
                                }}
                                variant={"link"}
                            >
                                Clear
                            </Button>
                        </div>
                        <div className="flex justify-end">
                            <FilterDropdown
                                columns={customerColumns}
                                onSortChange={handleCustomerSortChange}
                            />
                        </div>
                    </div>
                </div>

                <CustomerTable
                    data={allCustomers}
                    page={page}
                    setPage={setPage}
                    totalPages={totalPages}
                />
            </div>
        </MainLayout>
    )
}

export default function page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CustomerPage />
        </Suspense>
    );
}