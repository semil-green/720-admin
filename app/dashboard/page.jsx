'use client'

import React, { useEffect, useState } from 'react'
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


export default function Dashboard() {
    const [orderInterval, setOrderInterval] = useState(Dashboard_Order_Interval.Today);
    const [loading, setLoading] = useState(false)
    const [itemSelected, setItemSelected] = useState("bestItem")
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    console.log("itemSelected :", itemSelected)
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [])

    const bestSellingList = [
        {
            Name: 'Fresh Fish',
            Image: "/images/fish-image.png",
            SKU: 'RF-BK-45',
            Price: '300',
            Units: '5',
            TotalRevenue: '1.58K'
        }, {
            Name: 'New Fish',
            Image: "/images/fish-image.png",
            SKU: 'RF-BK-23',
            Price: '250',
            Units: '3',
            TotalRevenue: '1.11K'
        }, {
            Name: 'Rohu Fish',
            Image: "/images/fish-image.png",
            SKU: 'RF-BK-13',
            Price: '159',
            Units: '2',
            TotalRevenue: '298'
        }, {
            Name: 'Delhi Fish',
            Image: "/images/fish-image.png",
            SKU: 'RF-BK-25',
            Price: '499',
            Units: '2',
            TotalRevenue: '1K'
        },
    ]

    const worstSellingList = [
        {
            Name: 'Dry Fish',
            Image: 'https://picsum.photos/200?random=1',
            SKU: 'RF-WK-12',
            Price: '180',
            Units: '1',
            TotalRevenue: '180'
        },
        {
            Name: 'Frozen Shrimp',
            Image: 'https://picsum.photos/200?random=2',
            SKU: 'RF-WK-07',
            Price: '299',
            Units: '1',
            TotalRevenue: '299'
        },
        {
            Name: 'Bangda Fish',
            Image: 'https://picsum.photos/200?random=3',
            SKU: 'RF-WK-19',
            Price: '120',
            Units: '2',
            TotalRevenue: '240'
        },
        {
            Name: 'Imported Fish',
            Image: 'https://picsum.photos/200?random=4',
            SKU: 'RF-WK-33',
            Price: '499',
            Units: '1',
            TotalRevenue: '499'
        }
    ];


    return (
        <MainLayout>
            <div>
                <div className="relative">
                    <div className='flex items-center justify-between pb-3'>
                        <h2 className='font-semibold text-xl'>Orders</h2>

                        <div className="relative">
                            <ToggleGroup type="single" className='border' size='sm' value={orderInterval} onValueChange={(val) => setOrderInterval(val)}>
                                <ToggleGroupItem className='px-4' value={Dashboard_Order_Interval.Today}>Today</ToggleGroupItem>
                                <ToggleGroupItem className='px-4' value={Dashboard_Order_Interval.ThisWeek}>This Week</ToggleGroupItem>
                                <ToggleGroupItem className='px-4' value={Dashboard_Order_Interval.ThisMonth}>This Month</ToggleGroupItem>
                                <ToggleGroupItem className='px-4' value={Dashboard_Order_Interval.Custom}>Custom</ToggleGroupItem>
                            </ToggleGroup>

                            {orderInterval === Dashboard_Order_Interval.Custom && (
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
                                        dateFormat="MMM d, yyyy"
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
                    {loading &&
                        <>
                            <Skeleton className="h-[156px] flex-1 rounded-xl bg-secondary" />
                            <Skeleton className="h-[156px] flex-1 rounded-xl bg-secondary" />
                            <Skeleton className="h-[156px] flex-1 rounded-xl bg-secondary" />
                            <Skeleton className="h-[156px] flex-1 rounded-xl bg-secondary" />
                        </>
                    }

                    {!loading &&
                        <>
                            <Card className='flex-1'>
                                <CardHeader>
                                    <CardDescription className=''>Pending</CardDescription>
                                    <CardAction>₹50</CardAction>
                                    <CardTitle className='text-3xl font-bold tabular-nums text-primary'>20</CardTitle>
                                </CardHeader>
                                <CardFooter>
                                    <div className='text-sm font-semibold'>Total pending orders for today</div>
                                </CardFooter>
                            </Card>

                            <Card className='flex-1'>
                                <CardHeader>
                                    <CardDescription className=''>Delivered</CardDescription>
                                    <CardAction>₹150</CardAction>
                                    <CardTitle className='text-3xl font-bold tabular-nums text-primary'>80</CardTitle>

                                </CardHeader>
                                <CardFooter>
                                    <div className='text-sm font-semibold'>Total delivered orders for today</div>
                                </CardFooter>
                            </Card>

                            <Card className='flex-1'>
                                <CardHeader>
                                    <CardDescription className=''>Not Delivered</CardDescription>
                                    <CardAction>₹20</CardAction>
                                    <CardTitle className='text-3xl font-bold tabular-nums text-primary'>10</CardTitle>

                                </CardHeader>
                                <CardFooter>
                                    <div className='text-sm font-semibold'>Total not delivered orders for today</div>
                                </CardFooter>
                            </Card>

                            <Card className='flex-1'>
                                <CardHeader>
                                    <CardDescription className=''>Total</CardDescription>
                                    <CardAction>₹220</CardAction>
                                    <CardTitle className='text-3xl font-bold tabular-nums text-primary'>110</CardTitle>

                                </CardHeader>
                                <CardFooter>
                                    <div className='text-sm font-semibold'>Total orders for today</div>
                                </CardFooter>
                            </Card>
                        </>
                    }
                </div>
            </div>

            {/* Best Selling List */}
            <div>
                <div className='flex items-center justify-between pb-3 pt-8'>
                    {/* <h2 className='font-semibold text-xl'>Best Selling Items</h2> */}
                    <Tabs defaultValue="Item">
                        <TabsList>
                            <TabsTrigger value="bestItem" onClick={() => setItemSelected("bestItem")}>Best Selling Items</TabsTrigger>
                            <TabsTrigger value="worstItem" onClick={() => setItemSelected("worstItem")}>Worst Selling Items</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                <div className='flex flex-wrap items-center justify-between gap-5'>
                    {loading &&
                        <Skeleton className="h-[400px] flex-1 rounded-xl bg-secondary" />
                    }

                    {!loading && itemSelected === "bestItem" &&
                        <BestSellingTable data={bestSellingList} />
                    }
                </div>

                {!loading && itemSelected === "worstItem" &&
                    <WorstSellingTable data={worstSellingList} />
                }
            </div>
        </MainLayout>
    )
}
