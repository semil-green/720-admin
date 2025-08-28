"use client";
import MainLayout from '@/components/layout/mainLayout'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SliderForm from '@/components/slider/sliderForm';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
const Page = () => {

    const editId = useSearchParams().get("id");

    return (
        <MainLayout>
            <div className="w-full">
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">
                                Add Slider
                            </h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <SliderForm editId={editId} />
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
}


export default function AddSliderPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Page />
        </Suspense>
    );
}
