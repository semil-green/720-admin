
import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { MultiSelect } from "@/components/shadcn/MultiSelect"
import { Textarea } from "@/components/ui/textarea"
import { Item_Unit, Item_Unit_List } from "@/lib/constants"
import { PlusIcon } from "lucide-react"

export default function InwardItemForm({ initialData = {}, onSubmit, unitId }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const [images, setImages] = useState([])

    const unitName = useMemo(() => {
        return Item_Unit_List.find(x => x.id == unitId)?.name ?? '';
    }, [unitId])

    useEffect(() => {
        setFormData({
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

            <div className="flex-1">
                <Label className='pb-1'>Quantity</Label>
                <div className="flex items-center gap-2">
                    <Input className='flex-1' name="Quantity" value={formData.Quantity} onChange={handleChange} placeholder={'10 ' + unitName} required type='number' />
                    {unitName}
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push("/items")} disabled={loading}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />} Add
                </Button>
            </div>
        </form>
    )
}