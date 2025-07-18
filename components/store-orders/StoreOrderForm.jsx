
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { stores, StoreTypes } from "@/lib/constants"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const StoreOrderForm = ({ initialData, onSubmit, handleCose, itemsList }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        StoreOrderId: 0,
        StoreId: "",
        ItemId: "",
        Quantity: ""
    })

    useEffect(() => {
        setFormData({
            StoreOrderId: 0,
            StoreId: "",
            ItemId: "",
            Quantity: "",
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
                <Label className='pb-2'>Product</Label>
                {/* <Select value={formData.ItemId?.toString()}
                    onValueChange={(value) => handleChange({ target: { name: 'ItemId', value: value } })}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                        {itemsList.map((item) => (
                            <SelectItem key={item.value} value={item.value.toString()}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select> */}
                <Input name="Quantity" value={initialData.product} onChange={handleChange} required className='' disabled={true} />
            </div>

            <div>
                <Label className='pb-2'>Quantity</Label>
                <Input name="Quantity" value={formData.Quantity} onChange={handleChange} required className='' />
            </div>

            <div>
                <Label className='pb-2'>Remarks</Label>
                <Input name="Quantity" value={formData.Remarks} onChange={handleChange} required className='' />
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => handleCose()} disabled={loading}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                    {formData.StoreOrderId > 0 ? 'Update Order Request' : 'Order Request'}
                </Button>
            </div>
        </form>
    )
}

export default React.memo(StoreOrderForm)