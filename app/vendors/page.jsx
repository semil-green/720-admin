import MainLayout from '@/components/layout/mainLayout'
import React from 'react'
import { Button } from '@/components/ui/button';
import { BookText } from "lucide-react"
import CollectionsTable from '@/components/collections/CollectionsTable';
import Link from 'next/link';
import VendorsTable from '@/components/vendor/vendortable';

const page = () => {
    return (
        <MainLayout>
            <div className="space-y-4">
                <div className="flex justify-between items-end ">
                    <div className='flex  gap-3'>
                        <BookText />
                        <h1 className='font-semibold text-xl'>Collections</h1>
                    </div>
                    <div className='flex gap-3'>

                        <Button className='cursor-pointer' variant={'secondary'}>More Actions</Button>
                        <Link href={'/vendors/new '} >
                            <Button className='cursor-pointer'>Add Vendors</Button>
                        </Link>
                    </div>
                </div>

                <VendorsTable />
            </div>
        </MainLayout>
    )
}

export default page