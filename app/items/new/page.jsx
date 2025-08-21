"use client"

import MainLayout from "@/components/layout/mainLayout";
import ItemForm from "@/components/items/ItemForm"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react";

function CreateItem() {

    const searchParams = useSearchParams();

    const editItemId = parseInt(searchParams?.get("id"));

    return (
        <MainLayout>
            <div className="grid gap-5">
                <Card className='flex-1'>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Create Product</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ItemForm editItemId={editItemId} />
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
}

export default function CreateCreateItem() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateItem />
        </Suspense>
    );
}