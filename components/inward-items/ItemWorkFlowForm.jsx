"use client"

import { useState, useEffect, Fragment } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, PlusIcon, MinusIcon } from "lucide-react"
import { Item_Unit, Item_Unit_List } from "@/lib/constants"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function ItemWorkFlowForm({ onSubmit }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [outputItem, setOutputItem] = useState([{ value: "", Id: Date.now() }])
    const [nutrients, setNutrient] = useState([{ RawItem: 0, SKU: '', Quantity: '', Unit: 0, Id: Date.now() }])

    const itemsList = [
        { value: "1", label: "Item 1", Unit: Item_Unit.KG },
        { value: "2", label: "Item 2", Unit: Item_Unit.Gram },
        { value: "3", label: "Item 3", Unit: Item_Unit.KG },
        { value: "4", label: "Item 4", Unit: Item_Unit.Piece },
        { value: "5", label: "Item 5", Unit: Item_Unit.Gram },
    ]

    const outputItemsList = [
        { value: "1", label: "Kolkata Bhetki (Sea Bass) Kali Mirch (Boneless Cubes) Nt. Wt. 300g (6-8 pcs)" },
        { value: "2", label: "Amritsari Basa (Boneless Cubes) (Pangasius, Basa) Nt. Wt. 300g (6-8 pcs)" },
        { value: "3", label: "Amritsari Basa (Boneless Cubes) (Pangasius, Basa) Nt. Wt. 100g (2-3 pcs)" },
    ]

    const handleNutrientChange = (index, field, value) => {
        const updated = [...nutrients]
        updated[index][field] = value
        setNutrient(updated)
    }

    const addNewNutrient = () => {
        setNutrient([...nutrients, { RawItem: 0, SKU: '', Unit: 0, Quantity: '', Id: Date.now() }])
    }

    const removeNutrient = (id) => {
        const newNutrients = nutrients.filter((d) => d.Id !== id)
        setNutrient(newNutrients)
    }

    const handleOutputChange = (index, value) => {
        const updated = [...outputItem]
        updated[index].value = value
        setOutputItem(updated)
    }

    const addNewOutputProduct = () => {
        setOutputItem([...outputItem, { value: "", Id: Date.now() }])
    }

    const removeOutputItem = (index) => {
        const updated = outputItem.filter((_, i) => i !== index)
        setOutputItem(updated)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await onSubmit(nutrients)
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-5">

                {/* ====== Input Raw Items ====== */}
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Input Raw Items</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col justify-center gap-2">
                            {nutrients.map((nutrient, index) => (
                                <Fragment key={nutrient.Id}>
                                    {index > 0 && (
                                        <div className="flex-1 flex items-center justify-center">
                                            <PlusIcon className="text-secondary-foreground" />
                                        </div>
                                    )}

                                    <div className="flex-1 flex items-end gap-3">
                                        <div className="flex-1">
                                            <Label className="pb-1">Raw Item</Label>
                                            <Select
                                                value={nutrient.RawItem?.toString()}
                                                onValueChange={(value) => handleNutrientChange(index, 'RawItem', value)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select an Item" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {itemsList.map((item) => (
                                                        <SelectItem key={item.value} value={item.value}>
                                                            {item.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex-1">
                                            <Label className="pb-1">Unit</Label>
                                            <Select
                                                value={nutrient.Unit?.toString()}
                                                onValueChange={(value) => handleNutrientChange(index, 'Unit', value)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a Unit" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Item_Unit_List.filter(d => d.id !== Item_Unit.KG).map((unit) => (
                                                        <SelectItem key={unit.id} value={unit.id.toString()}>
                                                            {unit.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex-1">
                                            <Label className="pb-1">Quantity</Label>
                                            <Input
                                                name="Quantity"
                                                value={nutrient.Quantity}
                                                onChange={(e) => handleNutrientChange(index, e.target.name, e.target.value)}
                                                placeholder="Quantity"
                                                type="number"
                                                required
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <Label className="pb-1">SKU</Label>
                                            <Input
                                                name="SKU"
                                                value={nutrient.SKU}
                                                onChange={(e) => handleNutrientChange(index, e.target.name, e.target.value)}
                                                placeholder="SKU"
                                                required
                                            />
                                        </div>

                                        {index === 0 ? (
                                            <div className="rounded-lg size-9 flex justify-center items-center bg-secondary cursor-pointer" onClick={addNewNutrient}>
                                                <PlusIcon className="text-secondary-foreground" />
                                            </div>
                                        ) : (
                                            <div className="rounded-lg size-9 min-w-[36px] flex justify-center items-center bg-secondary cursor-pointer" onClick={() => removeNutrient(nutrient.Id)}>
                                                <MinusIcon className="text-secondary-foreground" />
                                            </div>
                                        )}
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* ====== Output Products ====== */}
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Output Product</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col justify-center gap-2">
                            {outputItem.map((item, index) => (
                                <Fragment key={item.Id}>
                                    {index > 0 && (
                                        <div className="flex-1 flex items-center justify-center">
                                            <PlusIcon className="text-secondary-foreground" />
                                        </div>
                                    )}

                                    <div className="flex items-end gap-3">
                                        <div className="flex-1">
                                            <Label className="pb-1">Output Product</Label>
                                            <Select
                                                value={item.value}
                                                onValueChange={(value) => handleOutputChange(index, value)}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select an output item" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {outputItemsList.map((opt) => (
                                                        <SelectItem key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {index === 0 ? (
                                            <div className="rounded-lg size-9 flex justify-center items-center bg-secondary cursor-pointer" onClick={addNewOutputProduct}>
                                                <PlusIcon className="text-secondary-foreground" />
                                            </div>
                                        ) : (
                                            <div className="rounded-lg size-9 flex justify-center items-center bg-secondary cursor-pointer" onClick={() => removeOutputItem(index)}>
                                                <MinusIcon className="text-secondary-foreground" />
                                            </div>
                                        )}
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Submit Button */}
            <div className="mt-6 flex justify-center gap-4">
                <Link href={'/inward-items'}>
                    <Button type="button" variant="outline" >
                        Back to list
                    </Button>
                </Link>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                    Save
                </Button>
            </div>
        </form>
    )
}
