"use client";
import MainLayout from '@/components/layout/mainLayout'
import VendorForm from '@/components/vendor/AddVendorForm'
import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button'


const page = () => {
    const handleSubmit = () => { }
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
                        <VendorForm initialData={{}} onSubmit={handleSubmit} />
                    </CardContent>
                </Card>

                <div className="flex justify-center gap-4 mt-4">
                    <Button type="button" variant="outline" onClick={() => router.push("/items")} >Back to list</Button>
                    <Button type="submit" >
                        Save
                    </Button>
                </div>
            </div>
        </MainLayout>
    )
}

export default page