"use client"

import MainLayout from "@/components/layout/mainLayout";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import InwardItemForm from "@/components/inward-items/InwardItemForm"
import InwardItemPriceForm from "@/components/inward-items/InwardItemPriceForm";
import { useMemo, useState } from "react";
import { Item_Unit, stores, StoreTypes } from "@/lib/constants";
import { Label } from "@/components/ui/label";

export default function CreateInwardItem() {
    const [formData, setFormData] = useState({})

    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const itemsList = [
        { value: "1", label: "Item 1", Unit: Item_Unit.Piece },
        { value: "2", label: "Item 2", Unit: Item_Unit.Gram },
        { value: "3", label: "Item 3", Unit: Item_Unit.Gram },
        { value: "4", label: "Item 4", Unit: Item_Unit.Piece },
        { value: "5", label: "Item 5", Unit: Item_Unit.Gram },
    ];

    const unitId = useMemo(() => {
        return itemsList.find(x => x.value == formData.ItemId)?.Unit ?? 0;
    }, [formData])

    const handleSubmit = async (data) => {
        toast.success("Added", { description: "Stock added successfully" })
        router.push("/inward-items")
    }

    return (
        <MainLayout>
            <div className="flex flex-wrap gap-5 mb-5">
                <div className="min-w-2xs">
                    <Label className='pb-1'>Packagin Store</Label>
                    <Select
                        value={formData.StoreId?.toString()}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, StoreId: parseInt(value) }))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a packagin store" />
                        </SelectTrigger>
                        <SelectContent>
                            {stores.filter(f => f.type == StoreTypes.PackagingCenter).map((item) => (
                                <SelectItem key={item.value} value={item.value.toString()}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="min-w-2xs">
                    <Label className='pb-1'>Raw Items</Label>
                    <Select
                        value={formData.ItemId?.toString()}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, ItemId: parseInt(value) }))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a raw item" />
                        </SelectTrigger>
                        <SelectContent>
                            {itemsList.map((item) => (
                                <SelectItem key={item.value} value={item.value.toString()}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex gap-5">
                <Card className=''>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Add Stock</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <InwardItemForm initialData={{}} onSubmit={handleSubmit} unitId={unitId} />
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