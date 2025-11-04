"use client";
import MainLayout from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import SliderTable from '@/components/slider/sliderTable';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSlidersService } from '@/service/slider/slider.service';
import { setSliders } from '@/store/slices/slider/slider.slice';
import { Loader2 } from 'lucide-react';
const page = () => {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false)

    const router = useRouter();
    const dispatch = useDispatch();

    const allServicesData = useSelector((state) => state.sliderSlice.allSliders);

    useEffect(() => {
        const fetchSLiderData = async () => {
            setLoading(true);
            const res = await getAllSlidersService(page, limit);
            if (res?.data) {
                setTotalPages(Math.ceil(res?.total / limit));
                dispatch(setSliders(res?.data));
                setLoading(false);
            } else {
                setLoading(false);
            }
        };

        fetchSLiderData();
    }, [page, limit, dispatch]);

    return (
        <MainLayout>
            {loading && (
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            )}
            <div className="space-y-4">
                <div className="flex justify-end items-center">
                    <Button
                        onClick={() => router.push("/slider/new")}
                        className="cursor-pointer"
                    >
                        Add Slider
                    </Button>
                </div>

                <SliderTable
                    data={allServicesData}
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            </div>
        </MainLayout>
    )
}

export default page