"use client";
import MainLayout from '@/components/layout/mainLayout'
import VendorForm from '@/components/vendor/AddVendorForm'
import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VendorPageContent() {
    const searchParams = useSearchParams();
    const editId = parseInt(searchParams.get("id"));

    return (
        <MainLayout>
            <div className="grid gap-5">
                <Card className='flex-1'>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Add vendor</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <VendorForm editId={editId} />
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
}

export default function VendorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VendorPageContent />
        </Suspense>
    );
}