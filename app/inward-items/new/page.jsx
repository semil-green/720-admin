"use client"

import MainLayout from "@/components/layout/mainLayout";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import InwardItemForm from "@/components/inward-items/InwardItemForm"
import InwardItemPriceForm from "@/components/inward-items/InwardItemPriceForm";

export default function CreateItem() {
    const router = useRouter()

    const handleSubmit = async (data) => {
        toast.success("Added", { description: "Item added successfully" })
        router.push("/inward-items")
    }

    return (
        <MainLayout>
            <div className="flex gap-5">
                <Card className=''>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Inward Item</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <InwardItemForm initialData={{}} onSubmit={handleSubmit} />
                    </CardContent>
                </Card>

                <Card className='flex-1'>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Set Price</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <InwardItemPriceForm initialData={{}} onSubmit={handleSubmit} />
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
}