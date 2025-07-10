import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { cities, states } from "@/lib/data/storeData"

export default function StoreForm({ initialData = {}, onSubmit }) {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        StoreName: "",
        StoreCode: "",
        CityId: "0",
        StateId: "0",
        Address: "",
        Pincode: "",
        Latitude: "",
        Longitude: ""
    })

    useEffect(() => {
        setFormData({
            StoreName: "",
            StoreCode: "",
            CityId: "0",
            StateId: "0",
            Address: "",
            Pincode: "",
            Latitude: "",
            Longitude: "",
            ...initialData,
        })
    }, [initialData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleToggle = (checked) => {
        setFormData((prev) => ({ ...prev }))
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
                <Label className='pb-1'>Store Name</Label>
                <Input name="StoreName" value={formData.StoreName} onChange={handleChange} required />
            </div>
            <div>
                <Label className='pb-1'>Store Code</Label>
                <Input name="StoreCode" value={formData.StoreCode} onChange={handleChange} required />
            </div>
            <div>
                <Label className='pb-1'>State</Label>
                <Select
                    value={formData.StateId?.toString()}
                    onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, StateId: parseInt(value), CityId: "" }))
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a state" />
                    </SelectTrigger>
                    <SelectContent>
                        {states.map((state) => (
                            <SelectItem key={state.id} value={state.id.toString()}>
                                {state.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label className='pb-1'>City</Label>
                <Select
                    value={formData.CityId?.toString()}
                    onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, CityId: parseInt(value) }))
                    }
                    disabled={!formData.StateId}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                        {cities
                            .filter((c) => c.stateId == formData.StateId)
                            .map((city) => (
                                <SelectItem key={city.id} value={city.id.toString()}>
                                    {city.name}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label className='pb-1'>Address</Label>
                <Textarea name="Address" value={formData.Address} onChange={handleChange} />
            </div>
            <div>
                <Label className='pb-1'>Pincode</Label>
                <Input name="Pincode" value={formData.Pincode} onChange={handleChange} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label className='pb-1'>Latitude</Label>
                    <Input name="Latitude" value={formData.Latitude} onChange={handleChange} />
                </div>
                <div>
                    <Label className='pb-1'>Longitude</Label>
                    <Input name="Longitude" value={formData.Longitude} onChange={handleChange} />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" disabled={loading} onClick={() => router.push("/packaging-stores")}>
                    Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                    Submit
                </Button>
            </div>
        </form>
    )
}