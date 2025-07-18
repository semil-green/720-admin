"use client"

import MainLayout from "@/components/layout/mainLayout";
import ItemForm from "@/components/items/ItemForm"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import BenefitForm from "@/components/items/BenefitForm";
import NutritionalForm from "@/components/items/NutritionalForm";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function CreateItem() {
    const router = useRouter()

    const handleSubmit = async (data) => {
        toast.success("Created", { description: "Product created successfully" })
        router.push("/items")
    }

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

                <div className="flex justify-center gap-4 mt-4">
                    <Button type="button" variant="outline" onClick={() => router.push("/items")} >Back to list</Button>
                    <Button type="submit" >
                        {/* <Loader2 className="animate-spin h-4 w-4 mr-2" />  */}
                        Save
                    </Button>
                </div>
            </div>
        </MainLayout>
    )
}