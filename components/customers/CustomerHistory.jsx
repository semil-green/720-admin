"use client"
import React, { useState, useEffect } from 'react'
import { Users, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCustomerOrdersHistoryService } from '@/service/cutomer-order/cutomer-order.service';
import { toast } from 'sonner';
import { Loader2 } from "lucide-react";

const CustomerHistory = ({ customerId }) => {
    const [customerOrderHistory, setCustomerOrderHistory] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
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
                                let statusColor = "bg-gray-400";
                                if (order.order_status === "Fulfilled") statusColor = "bg-green-500";
                                else if (order.order_status === "Unfulfilled") statusColor = "bg-yellow-400";
                                else if (order.order_status === "Cancelled") statusColor = "bg-red-500";

                                return (
                                    <div key={order.order_id} className="relative">
                                        <div className={`absolute -left-[20px] top-1 w-4 h-4 rounded-full border-2 border-white ${statusColor}`}></div>
                                        <div>
                                            <h3 className="text-md font-semibold text-gray-900">
                                                Order #{order.order_id}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                Placed on {new Date(order.order_date).toLocaleDateString("en-US", {
                                                    year: "numeric", month: "long", day: "numeric"
                                                })}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Status: <span className={`font-medium ${statusColor.replace("bg-", "text-")}`}>{order.order_status}</span>
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Order Total :  <span className={`font-medium ${statusColor.replace("bg-", "text-")}`}>₹{order.final_price}</span>
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                No of items: <span className={`font-medium ${statusColor.replace("bg-", "text-")}`}>{order.order_items_count} </span>
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
                        <p>{customerOrderHistory?.customer?.customer_name}</p>
                    </div>

                    <div className='mt-3'>
                        <h1>Contact Information</h1>
                        <p className=''>{customerOrderHistory?.customer?.mobile_no}</p>
                    </div>

                    <div className='mt-3'>
                        <h1>Default Address</h1>
                        <p className=''>{customerOrderHistory?.customer?.default_address}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerHistory