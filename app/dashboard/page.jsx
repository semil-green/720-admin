'use client'

import React, { use, useEffect, useState } from 'react'
import MainLayout from "@/components/layout/mainLayout";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Skeleton } from "@/components/ui/skeleton"
import { Dashboard_Order_Interval } from '@/lib/constants';
import BestSellingTable from '@/components/dashboard/BestSellingTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import WorstSellingTable from '@/components/dashboard/WorstSellingTable';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllDashboardItemService, getDashboardOrdersService } from '@/service/dashboard/dashboard.service';
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
    const [orderInterval, setOrderInterval] = useState("today");
    const [loading, setLoading] = useState(false)
    const [itemSelected, setItemSelected] = useState("best")
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [ordersLoading, setOrdersLoading] = useState(true)
    const [ordersData, setOrdersData] = useState([])

    const [bestItemsData, setBestitemsData] = useState([])
    const [worstItemsData, setWorstItemsData] = useState([])
    const [itemsLoading, setItemsLoading] = useState(false)
    const [itemsRange, setItemsRange] = useState(5)

    const fetchItemsData = async (
        customFilter = orderInterval,
        customStartDate = startDate?.toISOString()?.split("T")[0],
        customEndData = endDate?.toISOString()?.split("T")[0],
        customItemSelected = itemSelected,
        customItemRange = itemsRange) => {

        try {
            setItemsLoading(true);
            const res = await getAllDashboardItemService(customFilter, customStartDate, customEndData, customItemSelected, customItemRange)

            if (itemSelected == "best") {
                setBestitemsData(res?.data)
            }
            else {
                setWorstItemsData(res?.data)
            }
        }
        catch (error) {
            toast.error("Error in fetching orders");
        }
        finally {
            setItemsLoading(false);
        }
    }

    const fetchOrdersData = async (
        customFilter = orderInterval,
        customStartDate = startDate?.toISOString()?.split("T")[0],
        customEndData = endDate?.toISOString()?.split("T")[0],
    ) => {

        try {
            setOrdersLoading(true);
            const result = await getDashboardOrdersService(customFilter, customStartDate, customEndData)

            setOrdersData(result?.data)
        }
        catch (error) {
            toast.error("Error in fetching orders");
        }
        finally {
            setOrdersLoading(false);
        }
    }

    useEffect(() => {
        if (orderInterval === "custom" && (!startDate || !endDate)) return;
        const formattedStart = startDate ? startDate.toISOString().split("T")[0] : null;
        const formattedEnd = endDate ? endDate.toISOString().split("T")[0] : null;

        fetchOrdersData(orderInterval, formattedStart, formattedEnd)
    }, [orderInterval, startDate, endDate, orderInterval])

    useEffect(() => {
        if (orderInterval === "custom" && (!startDate || !endDate)) return;
        const formattedStart = startDate ? startDate.toISOString().split("T")[0] : null;
        const formattedEnd = endDate ? endDate.toISOString().split("T")[0] : null;

        fetchItemsData(orderInterval, formattedStart, formattedEnd, itemSelected, itemsRange)
    }, [itemSelected, orderInterval, startDate, endDate, orderInterval])

    return (
        <MainLayout>
            <div>
                <div className="relative">
                    <div className='flex items-center justify-between pb-3'>
                        <h2 className='font-semibold text-xl'>Orders</h2>

                        <div className="relative">
                            <ToggleGroup type="single" className='border' size='sm' value={orderInterval} onValueChange={(val) => setOrderInterval(val)}>
                                <ToggleGroupItem className='px-4' value={"today"}>Today</ToggleGroupItem>
                                <ToggleGroupItem className='px-4' value={"week"}>This Week</ToggleGroupItem>
                                <ToggleGroupItem className='px-4' value={"month"}>This Month</ToggleGroupItem>
                                <ToggleGroupItem className='px-4' value={"custom"}>Custom</ToggleGroupItem>
                            </ToggleGroup>

                            {orderInterval === "custom" && (
                                <div className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-lg p-3 z-50">
                                    <div className="text-sm font-medium mb-2 text-center text-gray-700">
                                        Select Date Range
                                    </div>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(dates) => {
                                            const [start, end] = dates;
                                            setStartDate(start);
                                            setEndDate(end);
                                        }}
                                        startDate={startDate}
                                        endDate={endDate}
                                        selectsRange
                                        inline
                                        monthsShown={1}
                                        dateFormat="yyyy-MM-dd"
                                    />
                                    <div className="flex justify-between items-center mt-3 pt-3 border-t text-sm">
                                        <div className="text-gray-600">
                                            {startDate && endDate ? (
                                                `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
                                            ) : (
                                                'Select start and end dates'
                                            )}
                                        </div>
                                        <button
                                            onClick={() => setOrderInterval(Dashboard_Order_Interval.Today)}
                                            className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='flex flex-wrap items-center justify-between gap-5'>
                    {ordersLoading &&
                        <>
                            <Skeleton className="h-[156px] flex-1 rounded-xl bg-secondary" />
                            <Skeleton className="h-[156px] flex-1 rounded-xl bg-secondary" />
                        </>
                    }

                    {ordersLoading &&
                        <div className="fixed flex w-full h-full top-0 left-0 z-10">
                            <div className="flex-1 flex justify-center items-center">
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                            </div>
                        </div>
                    }

                    {!ordersLoading &&
                        <>
                            <Card className='flex-1'>
                                <CardHeader>
                                    {/* <CardDescription className="whitespace-nowrap">Not Delivered</CardDescription>
                                    <CardAction>₹20</CardAction> */}
                                    <CardTitle className='text-3xl font-bold tabular-nums text-primary'>{ordersData?.total_count}</CardTitle>
                                </CardHeader>
                                <CardFooter>
                                    <div className="text-sm font-semibold whitespace-nowrap">Total orders</div>
                                </CardFooter>
                            </Card>

                            <Card className='flex-1'>
                                <CardHeader>
                                    {/* <CardDescription className=''>Total</CardDescription>
                                    <CardAction>₹220</CardAction> */}
                                    <CardTitle className='text-3xl font-bold tabular-nums text-primary'>{ordersData?.total_amount}</CardTitle>
                                </CardHeader>
                                <CardFooter>
                                    <div className='text-sm font-semibold'>Total Amount</div>
                                </CardFooter>
                            </Card>
                        </>
                    }
                </div>
            </div>

            {/* Best Selling List */}
            <div>
                <div className='flex items-center justify-between pb-3 pt-8'>
                    <Tabs value={itemSelected} onValueChange={(val) => setItemSelected(val)}>
                        <TabsList>
                            <TabsTrigger value="best">Best Selling Items</TabsTrigger>
                            <TabsTrigger value="worst">Worst Selling Items</TabsTrigger>
                        </TabsList>
                    </Tabs>

                </div>

                <div className='flex flex-wrap items-center justify-between gap-5'>
                    {itemsLoading &&
                        <Skeleton className="h-[400px] flex-1 rounded-xl bg-secondary" />
                    }

                    {
                        itemsLoading && (
                            <div className="fixed flex w-full h-full top-0 left-0 z-10">
                                <div className="flex-1 flex justify-center items-center">
                                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                </div>
                            </div>
                        )
                    }

                    {!itemsLoading && itemSelected === "best" &&
                        <BestSellingTable data={bestItemsData} />
                    }
                </div>

                {!itemsLoading && itemSelected === "worst" &&
                    <WorstSellingTable data={worstItemsData} />
                }
            </div>
        </MainLayout>
    )
}
