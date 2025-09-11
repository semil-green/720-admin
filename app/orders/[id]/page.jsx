import MainLayout from '@/components/layout/mainLayout'
import UserAllTables from '@/components/user-all-orders/UserAllOrders'
import React from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import OrderDetailTable from '@/components/order/OrderDetailTable';
const page = async ({ params }) => {

    const order_id = await params

    return (
        <MainLayout>
            <OrderDetailTable
                order_id={order_id?.id}
            />
        </MainLayout>
    )
}

export default page