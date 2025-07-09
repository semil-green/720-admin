'use client'

import React from 'react'
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

export default function Dashboard() {
    return (
        <MainLayout>
            <div>
                <h2 className='font-semibold text-xl pb-3'>Today's Orders</h2>
                <div className='flex flex-wrap items-center justify-between gap-5'>
                    <Card className='flex-1 bg-orange-50'>
                        <CardHeader>
                            <CardTitle className='text-primary'>Pending</CardTitle>
                            <CardDescription>Total pending orders for today</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='font-bold text-3xl'>20</div>
                        </CardContent>
                    </Card>

                    <Card className='flex-1 bg-orange-50'>
                        <CardHeader>
                            <CardTitle className='text-primary'>Completed</CardTitle>
                            <CardDescription>Total completed orders for today</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='font-bold text-3xl'>80</div>
                        </CardContent>

                    </Card>

                    <Card className='flex-1 bg-orange-50'>
                        <CardHeader>
                            <CardTitle className='text-primary'>Total</CardTitle>
                            <CardDescription>Total orders for today</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='font-bold text-3xl'>100</div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MainLayout>
    )
}
