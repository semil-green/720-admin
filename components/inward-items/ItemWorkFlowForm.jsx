
import { useState, useEffect, Fragment } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { PlusIcon, MinusIcon } from "lucide-react"
import { Item_Unit, Item_Unit_List } from "@/lib/constants"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ItemWorkFlowForm({ onSubmit }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [outputItem, setOutputItem] = useState(0)
    const [nutrients, setNutrient] = useState([{ RawItem: 0, SKU: '', Quantity: '', Unit: 0, Id: Date.now() }])

    const itemsList = [
        { value: "1", label: "Item 1", Unit: Item_Unit.KG },
        { value: "2", label: "Item 2", Unit: Item_Unit.Gram },
        { value: "3", label: "Item 3", Unit: Item_Unit.KG },
        { value: "4", label: "Item 4", Unit: Item_Unit.Piece },
        { value: "5", label: "Item 5", Unit: Item_Unit.Gram },
    ];

    const outputItemsList = [
        { value: "1", label: "Rohu Fish" },
        { value: "2", label: "Curry Fish" },
        { value: "3", label: "New Fish" },
    ];

    const handleNutrientChange = (index, field, value) => {
        const updated = [...nutrients]
        updated[index][field] = value
        setNutrient(updated)
    }
    const addNewNutrient = () => {
        setNutrient([...nutrients, { RawItem: 0, SKU: '', Unit: 0, Quantity: '', Id: Date.now() }])
    }
    const removeNutrient = (id) => {
        const newNutrients = nutrients.filter((d, i) => d.Id != id)
        setNutrient(newNutrients)
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
                <Card className='flex-1'>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Input Raw Items</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col justify-center gap-2">

                            {nutrients.map((nutrient, index) =>
                                <Fragment key={nutrient.Id}>
                                    {index == 0 &&
                                        <div className="flex-1 flex items-end gap-3">
                                            <div className='flex-1'>
                                                <Label className='pb-1'>Raw Item</Label>
                                                <Select
                                                    value={nutrient.RawItem?.toString()}
                                                    onValueChange={(value) => handleNutrientChange(index, 'RawItem', value)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a Item" />
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
                                            <div className='flex-1'>
                                                <Label className='pb-1'>Unit</Label>
                                                <Select name="Unit"
                                                    value={nutrient.Unit?.toString()}
                                                    onValueChange={(value) => handleNutrientChange(index, 'Unit', value)}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select a Unit" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Item_Unit_List.filter(d => d.id != Item_Unit.KG).map((unit) => (
                                                            <SelectItem key={unit.id} value={unit.id.toString()}>
                                                                {unit.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className='flex-1'>
                                                <Label className='pb-1'>Quantity</Label>
                                                <Input name="Quantity" value={nutrient.Quantity} onChange={(e) => handleNutrientChange(index, e.target.name, e.target.value)} placeholder='Quantity' type='number' required />
                                            </div>
                                            <div className='flex-1'>
                                                <Label className='pb-1'>SKU</Label>
                                                <Input name="SKU" value={nutrient.SKU} onChange={(e) => handleNutrientChange(index, e.target.name, e.target.value)} placeholder='SKU' required />
                                            </div>
                                            <div className="rounded-lg size-9 flex justify-center items-center bg-secondary cursor-pointer" onClick={addNewNutrient}>
                                                <PlusIcon className='text-secondary-foreground' />
                                            </div>
                                        </div>
                                    }

                                    {index > 0 &&
                                        <>
                                            <div className="flex-1 flex items-center justify-center"><PlusIcon className='text-secondary-foreground' /></div>

                                            <div className="flex-1 flex items-end gap-3">
                                                <div className='flex-1'>
                                                    <Select
                                                        value={nutrient.RawItem?.toString()}
                                                        onValueChange={(value) => handleNutrientChange(index, 'RawItem', value)}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a Item" />
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
                                                <div className='flex-1'>
                                                    <Select name="Unit"
                                                        value={nutrient.Unit?.toString()}
                                                        onValueChange={(value) => handleNutrientChange(index, 'Unit', value)}>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select a Unit" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {Item_Unit_List.filter(d => d.id != Item_Unit.KG).map((unit) => (
                                                                <SelectItem key={unit.id} value={unit.id.toString()}>
                                                                    {unit.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className='flex-1'>
                                                    <Input name="Quantity" value={nutrient.Quantity} onChange={(e) => handleNutrientChange(index, e.target.name, e.target.value)} placeholder='Quantity' type='number' required />
                                                </div>
                                                <div className='flex-1'>
                                                    <Input name="SKU" value={nutrient.SKU} onChange={(e) => handleNutrientChange(index, e.target.name, e.target.value)} placeholder='SKU' required />
                                                </div>
                                                <div className="rounded-lg size-9 min-w-[36px] flex justify-center items-center bg-secondary cursor-pointer" onClick={() => removeNutrient(nutrient.Id)}>
                                                    <MinusIcon className='text-secondary-foreground' />
                                                </div>
                                            </div>
                                        </>
                                    }
                                </Fragment>
                            )}

                        </div>
                    </CardContent>
                </Card>


                <Card className='flex-1'>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Output Product</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>

                        <div className='flex-1'>
                            <Label className='pb-1'>Output Product</Label>
                            <Select
                                value={outputItem?.toString()}
                                onValueChange={(value) => setOutputItem(value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select an output item" />
                                </SelectTrigger>
                                <SelectContent>
                                    {outputItemsList.map((item) => (
                                        <SelectItem key={item.value} value={item.value.toString()}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select></div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Button type="submit" disabled={loading}>
                                {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />} Save
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </form>
    )
}