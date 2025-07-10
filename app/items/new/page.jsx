"use client"

import MainLayout from "@/components/layout/mainLayout";
import ItemForm from "@/components/items/ItemForm"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import BenefitForm from "@/components/items/BenefitForm";
import NutritionalForm from "@/components/items/NutritionalForm";

export default function CreateItem() {
    const router = useRouter()

    const handleSubmit = async (data) => {
        toast.success("Created", { description: "Item created successfully" })
        router.push("/items")
    }

    return (
        <MainLayout>
            <div className="grid gap-5">
                <Card className='flex-1'>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Create Item</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ItemForm initialData={{}} onSubmit={handleSubmit} />
                    </CardContent>
                </Card>

                <Card className='flex-1'>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Benefits</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BenefitForm initialData={{}} onSubmit={handleSubmit} />
                    </CardContent>
                </Card>

                <Card className='flex-1'>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Nutritional Facts</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <NutritionalForm initialData={{}} onSubmit={handleSubmit} />
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
}