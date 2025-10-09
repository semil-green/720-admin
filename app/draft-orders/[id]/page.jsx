import MainLayout from '@/components/layout/mainLayout'
import React from 'react'
import DraftOrderDetailTable from '@/components/order/draft-order/draftOrderDetailTable';
const page = async ({ params }) => {

    const order_id = await params

    return (
        <MainLayout>
            <DraftOrderDetailTable
                order_id={order_id?.id}
            />
        </MainLayout>
    )
}

export default page