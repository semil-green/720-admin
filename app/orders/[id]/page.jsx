import MainLayout from '@/components/layout/mainLayout'
import UserAllTables from '@/components/user-all-orders/UserAllOrders'
import React from 'react'

const page = () => {
    return (
        <MainLayout>
            <UserAllTables />
        </MainLayout>
    )
}

export default page