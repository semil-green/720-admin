
import React from 'react'
import MainLayout from "@/components/layout/mainLayout";
import { Button } from '@/components/ui/button';
import { BookText } from "lucide-react"
import CollectionsTable from '@/components/collections/CollectionsTable';
import Link from 'next/link';


export default function Collections() {
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
                        <Link href={'/collections/new'} >
                            <Button className='cursor-pointer'>Add Collections</Button>
                        </Link>
                    </div>
                </div>

                <CollectionsTable />
            </div>
        </MainLayout>
    )
}
