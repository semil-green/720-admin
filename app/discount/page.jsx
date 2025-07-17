import MainLayout from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import React from 'react'
import { CirclePercent } from 'lucide-react';
import DiscountDatatTable from '@/components/discount/DiscountDatatTable';
import Link from 'next/link';

const page = () => {
    return (
        <MainLayout>

            <div className="flex justify-between items-end ">
                <div className='flex  gap-3'>
                    <CirclePercent />
                    <h1 className='font-semibold text-xl'>Discount</h1>
                </div>
                <div className='flex gap-3'>
                    <Button className='cursor-pointer' variant={'secondary'}>Export</Button>
                    <Button className='cursor-pointer' variant={'secondary'}>More Actions</Button>
                    <Link href="/discount/add-discount">
                        <Button className='cursor-pointer'>Create Discount</Button>
                    </Link>
                </div>
            </div>

            <DiscountDatatTable />

        </MainLayout>
    )
}

export default page