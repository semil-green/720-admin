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

export default function Dashboard() {
    const [orderInterval, setOrderInterval] = useState(Dashboard_Order_Interval.Today);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }, [])

    const bestSellingList = [
        {
            Name: 'Fresh Fish',
            Image: 'https://picsum.photos/200',
            SKU: 'RF-BK-45',
            Price: '300',
            Units: '5',
            TotalRevenue: '1.58K'
        }, {
            Name: 'New Fish',
            Image: 'https://picsum.photos/200',
            SKU: 'RF-BK-23',
            Price: '250',
            Units: '3',
            TotalRevenue: '1.11K'
        }, {
            Name: 'Rohu Fish',
            Image: 'https://picsum.photos/200',
            SKU: 'RF-BK-13',
            Price: '159',
            Units: '2',
            TotalRevenue: '298'
        }, {
            Name: 'Delhi Fish',
            Image: 'https://picsum.photos/200',
            SKU: 'RF-BK-25',
            Price: '499',
            Units: '2',
            TotalRevenue: '1K'
        },
    ]

    return (
        <MainLayout>

            {/* Order Cards */}
            <div>
                <div className='flex items-center justify-between pb-3'>
                    <h2 className='font-semibold text-xl'>Orders</h2>

                    <ToggleGroup type="single" className='border' size='sm' value={orderInterval} onValueChange={(val) => setOrderInterval(val)}>
                        <ToggleGroupItem className='px-4' value={Dashboard_Order_Interval.Today}>Today</ToggleGroupItem>
                        <ToggleGroupItem className='px-4' value={Dashboard_Order_Interval.ThisWeek}>This Week</ToggleGroupItem>
                        <ToggleGroupItem className='px-4' value={Dashboard_Order_Interval.ThisMonth}>This Month</ToggleGroupItem>
                    </ToggleGroup>
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
                    <h2 className='font-semibold text-xl'>Best Selling Items</h2>
                </div>

                <div className='flex flex-wrap items-center justify-between gap-5'>
                    {loading &&
                        <Skeleton className="h-[400px] flex-1 rounded-xl bg-secondary" />
                    }

                    {!loading &&
                        <BestSellingTable data={bestSellingList} />
                    }
                </div>
            </div>
        </MainLayout>
    )
}
