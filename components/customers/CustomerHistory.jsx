"use client"
import React, { useState, useEffect } from 'react'
import { Users, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getCustomerOrdersHistoryService } from '@/service/cutomer-order/cutomer-order.service';
import { toast } from 'sonner';
const CustomerHistory = ({ customerId }) => {
    const [customerOrderHistory, setCustomerOrderHistory] = useState([])
    const fetchCustomerHistory = async () => {
        try {

            const fetchData = await getCustomerOrdersHistoryService(customerId);
            setCustomerOrderHistory(fetchData?.data)
        }
        catch (error) {
            toast.error("Failed to fetch customer history");
        }
    }

    useEffect(() => {
        fetchCustomerHistory()
    }, [customerId])

    return (
        <div className='p-8 bg-sidebar'>
            <div className='flex justify-between items-end'>
                <div className="flex items-center gap-2">
                    <Link href={"/customer"}>
                        <Users className="text-gray-700" />
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                    {customerOrderHistory?.customer?.customer_name && <h2 className="font-semibold text-xl">{customerOrderHistory?.customer?.customer_name}</h2>}
                </div>

                <div>

                    <div>
                        <div className="relative inline-block group">
                            <button
                                className="h-8 px-4 py-2 has-[>svg]:px-3 bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 inline-flex items-center rounded-md"
                            >
                                Menu
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div
                                className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all origin-top duration-200 pointer-events-none group-hover:pointer-events-auto"
                            >
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
                            </div>
                        </div>
                    </div>
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