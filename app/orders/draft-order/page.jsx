import MainLayout from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { PencilLine } from 'lucide-react';
import DraftOrderTable from '@/components/order/draft-order/DraftOrderTable';


const page = () => {
    return (
        <MainLayout>
            <div className="space-y-4">
                <div className="flex justify-between items-center gap-2">
                    <div className='flex gap-2'>
                        <PencilLine />
                        <h4 className='font-semibold text-lg'>Draft</h4>
                    </div>

                    <div>

                        <Link href={"/orders/new"}>
                            <Button className='cursor-pointer'>Add New</Button>
                        </Link>
                    </div>
                </div>

            </div>

            <DraftOrderTable />
        </MainLayout>
    )
}

export default page