"use client";

import React, { useEffect, useState } from 'react'
import MainLayout from "@/components/layout/mainLayout";
import { Button } from '@/components/ui/button';
import { BookText, Loader2 } from "lucide-react"
import CollectionsTable from '@/components/collections/CollectionsTable';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "sonner"
import { getAllCollectionsService } from '@/service/collections/collections.service';
import { setCollections } from '@/store/slices/collections/collections.slice';

export default function Collections() {

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();


    const allCollectionsData = useSelector((state) => state.collectionsSlice.allCollections)

    useEffect(() => {
        const fetchCollectionData = async () => {
            setLoading(true)
            try {
                const res = await getAllCollectionsService()

                if (res?.data) {
                    dispatch(setCollections(res?.data))
                    setLoading(false)
                }
            }
            catch (error) {
                toast.error("Error in fetching collections");
            }
        }

        fetchCollectionData()
    }, [])

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

                {loading && (
                    <div className="fixed flex w-full h-full top-0 left-0 z-10">
                        <div className="flex-1 flex justify-center items-center">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        </div>
                    </div>
                )}
                <CollectionsTable allCollectionsData={allCollectionsData} />
            </div>
        </MainLayout>
    )
}
