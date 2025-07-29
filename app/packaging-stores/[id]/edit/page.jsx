"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import MainLayout from "@/components/layout/mainLayout";
import { getStoreById, updateStore } from "@/lib/api/packagingStore"
import StoreForm from "@/components/packagingStores/PackagingForm"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import AvailablePincodes from "@/components/packagingStores/AvailablePincodes";
import Slots from "@/components/packagingStores/Slots";

export default function EditStorePage() {
    const { id } = useParams()
    const router = useRouter()
    const [store, setStore] = useState(null)

    useEffect(() => {
        getForEdit();
    }, [id])

    const getForEdit = async () => {
        const data = await getStoreById(id)
        if (data) setStore(data)
    }

    const handleSubmit = async (data) => {
        await updateStore(id, data)
        toast.success("Updated", { description: "Packaging Center updated successfully" })
        router.push("/packaging-stores")
    }

    const handleSubmitPincodes = async (data) => {
        toast.success("Updated", { description: "Pincode updated for this packagin center." })
    }

    const handleSubmitSlots = async (data) => {
        toast.success("Updated", { description: "Slots updated for this packagin center." });
    }

    return (
        <MainLayout>
            {!store &&
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            }

            <div className="flex flex-wrap gap-6">
                <Card className='flex-1'>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Create Packaging Center</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <StoreForm initialData={{}} onSubmit={handleSubmit} />
                    </CardContent>
                </Card>

                <Card className='flex-1'>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Available Pincodes</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <AvailablePincodes initialData={{}} onSubmit={handleSubmitPincodes} />
                    </CardContent>
                </Card>

                <Card className='flex-1'>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Schedule Slots</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Slots initialData={{}} onSubmit={handleSubmitSlots} />
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
}