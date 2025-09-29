import React from 'react'
import MainLayout from '@/components/layout/mainLayout';
import CustomerHistory from '@/components/customers/CustomerHistory';
const page = async ({ params }) => {

    const { name } = await params


    return (
        <MainLayout>
            <CustomerHistory customerId={name} />
        </MainLayout>
    )
}

export default page