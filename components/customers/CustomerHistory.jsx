"use client"
import React, { useState, useEffect } from 'react'
import { Users, ChevronRight, PhoneIcon, CastleIcon, UserIcon, HomeIcon, WorkflowIcon, GlobeIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCustomerOrdersHistoryService } from '@/service/cutomer-order/cutomer-order.service';
import { toast } from 'sonner';
import { Loader2 } from "lucide-react";
import { ADDRESS_TYPE, PAYMENT_STATUSES } from '@/lib/constants';

const CustomerHistory = ({ customerId }) => {
    const [customerOrderHistory, setCustomerOrderHistory] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const paymentStatusOptions = Object.fromEntries(Object.entries(PAYMENT_STATUSES).map(([label, code]) => [code, label]));

    const fetchCustomerHistory = async () => {
        try {

            setIsLoading(true)
            const fetchData = await getCustomerOrdersHistoryService(customerId, page);
            setCustomerOrderHistory(fetchData?.data)
            setTotalPage(fetchData?.data?.orders?.pagination?.totalPages)

        }
        catch (error) {
            toast.error("Failed to fetch customer history");
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCustomerHistory()
    }, [customerId, page])


    return (
        <>

            <div className='p-8 bg-sidebar'>
                {
                    isLoading && <div className="fixed flex w-full h-full top-0 left-0 z-10">
                        <div className="flex-1 flex justify-center items-center">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        </div>
                    </div>
                }
                <div className='flex justify-between items-end'>
                    <div className="flex items-center gap-2">
                        <Link href={"/customer"}>
                            <Users className="text-gray-700" />
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                        {customerOrderHistory?.customer?.customer_name && <h2 className="font-semibold text-xl">{customerOrderHistory?.customer?.customer_name}</h2>}
                    </div>
                </div>

                <div className='mt-4  rounded-lg border shadow px-3 py-3 bg-white 	'>
                    <div className='grid grid-cols-4'>

                        <div>
                            <h1 className="font-semibold underline underline-offset-4 decoration-gray-400">
                                Amount spent
                            </h1>

                            <p className='pt-2'> ₹ {customerOrderHistory?.customer?.total_spent} </p>
                        </div>

                        <div>
                            <h1 className="font-semibold underline underline-offset-4 decoration-gray-400">Orders</h1>
                            <p className='pt-2'>{customerOrderHistory?.customer?.total_orders}</p>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-3 mt-4 gap-4'>
                    <div className='col-span-2 rounded-lg border shadow px-3 py-3 bg-white'>
                        <div className="max-w-full mx-auto p-6 bg-white rounded-md  mt-4">
                            <h2 className="text-xl font-bold mb-6">Order History</h2>

                            <div className="relative border-l-2 border-gray-200 pl-6 space-y-8">
                                {customerOrderHistory?.orders?.data?.map((order) => {
                                    let statusColor = "gray-400";
                                    if (order.order_status === "Fulfilled") statusColor = "green-500";
                                    else if (order.order_status === "Unfulfilled") statusColor = "yellow-400";
                                    else if (order.order_status === "Cancelled") statusColor = "red-500";

                                    let paymentStatusColor = 'gray-500';
                                    if (order.payment_status === PAYMENT_STATUSES.Success) paymentStatusColor = "green-500";
                                    else if (order.payment_status === PAYMENT_STATUSES.Pending) paymentStatusColor = "yellow-400";
                                    else if (order.payment_status === PAYMENT_STATUSES.Failed) paymentStatusColor = "red-500";

                                    return (
                                        <div key={order.order_id} className="relative">
                                            <div className={`absolute -left-[20px] top-1 w-4 h-4 rounded-full border-2 border-white bg-${statusColor}`}></div>
                                            <div>
                                                <h3 className="text-md font-semibold text-gray-900">
                                                    Order #{order.order_id}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    Placed on <span className='font-bold'>{new Date(order.order_date).toLocaleDateString("en-US", {
                                                        year: "numeric", month: "long", day: "numeric"
                                                    })}</span>
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Order Status: <span className={`font-bold text-${statusColor}`}>{order.order_status}</span>
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Payment Status: <span className={`font-bold text-${paymentStatusColor}`}>{paymentStatusOptions[order.payment_status]}</span>
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Order Total :  <span className={`font-bold`}>₹{order.final_price}</span>
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    No of items: <span className={`font-bold`}>{order.order_items_count} </span>
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                            <Button
                                variant="outline"
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                disabled={page === 1}
                            >
                                Previous
                            </Button>
                            <span className="text-sm">
                                Page {page} of {totalPage}

                            </span>
                            <Button
                                variant="outline"
                                onClick={() => setPage((p) => Math.min(p + 1, totalPage))}
                                disabled={page === totalPage}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                    <div className='col-span-1 rounded-lg border shadow px-3 py-3 bg-white'>

                        <div>
                            <h1>Customer Name :</h1>
                            <p className='flex flex-row items-center gap-1'>
                                <UserIcon className="size-4" />
                                {customerOrderHistory?.customer?.customer_name}</p>
                        </div>

                        <div className='mt-3'>
                            <h1>Contact Information:</h1>
                            <p className='flex flex-row items-center gap-2'>
                                <PhoneIcon className="size-4" />
                                {customerOrderHistory?.customer?.mobile_no}</p>
                        </div>

                        <div className='mt-3'>
                            <h1>Addresses:</h1>

                            <div className='flex flex-col gap-3'>
                                {customerOrderHistory?.customer?.addresses &&
                                    customerOrderHistory?.customer?.addresses.length > 0 &&
                                    customerOrderHistory?.customer?.addresses.map((address, index) =>
                                        <p className='flex flex-row items-start gap-3 text-sm' key={index}>
                                            {address.address_type == ADDRESS_TYPE.Home && <HomeIcon className="size-5" />}
                                            {address.address_type == ADDRESS_TYPE.Work && <CastleIcon className="size-5" />}
                                            {address.address_type == ADDRESS_TYPE.Other && <GlobeIcon className="size-5" />}

                                            <span>
                                                {address?.address}
                                                {address.is_default_address && <span className='font-bold'> - Default</span>}
                                            </span>
                                        </p>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
                <Link href={"/customer"}>
                    <Button>Back to list</Button>
                </Link>
            </div>
        </>
    )
}

export default CustomerHistory