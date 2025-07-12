
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { roles, stores } from "@/lib/api/user"
import { Item_Unit, Item_Unit_List } from "@/lib/constants"

const RawItemForm = ({ initialData, onSubmit, handleCose }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        ItemId: 0,
        Title: "",
        SKU: "",
        Unit: "",
    })

    useEffect(() => {
        setFormData({
            ItemId: 0,
            Title: "",
            SKU: "",
            Unit: "",
            ...initialData,
        })
    }, [initialData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await onSubmit(formData)
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
                <input type="hidden" name="ItemId" value={formData.ItemId} />
                <Label className='pb-2'>Raw Item</Label>
                <Input name="Item" value={formData.Item} onChange={handleChange} required className='border-white' />
            </div>

            <div>
                <input type="hidden" name="ItemId" value={formData.ItemId} />
                <Label className='pb-2'>SKU</Label>
                <Input name="SKU" value={formData.SKU} onChange={handleChange} required className='border-white' />
            </div>

            <div>
                <input type="hidden" name="ItemId" value={formData.ItemId} />
                <Label className='pb-1'>Unit</Label>
                <Select
                    value={formData.Unit?.toString()}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, Unit: parseInt(value) }))}>
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

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => handleCose()} disabled={loading}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                    Add
                </Button>
            </div>
        </form>
    )
}

export default React.memo(RawItemForm)