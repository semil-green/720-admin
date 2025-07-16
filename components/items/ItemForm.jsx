
import { useState, useEffect } from "react"
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
import { Item_Unit_List } from "@/lib/constants"
import { PlusIcon } from "lucide-react"

export default function ItemForm({ initialData = {}, onSubmit }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const [images, setImages] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categoriesList = [
        { value: "1", label: "Catch of the day - Fresh Water" },
        { value: "2", label: "Everyones fab - Fresh Water" },
        { value: "3", label: "Marintes - Fresh Water" },
        { value: "4", label: "Boneless & Fillers - Fresh Water" },
        { value: "5", label: "Single bone - Marine Water" },
    ];

    useEffect(() => {
        setFormData({
            ...initialData,
        })
    }, [initialData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleItemImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setImages([...images, imageUrl])
        }
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
            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>Title</Label>
                    <Input name="Title" value={formData.Title} onChange={handleChange} placeholder='Rohu' required />

                    <div className="pt-4">
                        <Label className='pb-1'>Categories</Label>
                        <MultiSelect
                            options={categoriesList}
                            onValueChange={setSelectedCategories}
                            defaultValue={selectedCategories}
                            placeholder="Select Category"
                            variant="secondary"
                            animation={0}
                            modalPopover={true}
                            maxCount={3} />
                    </div>
                </div>

                <div className="flex-1">
                    <Label className='pb-1'>Description</Label>
                    <Textarea name="Description" className='min-h-[110px]' value={formData.Description} onChange={handleChange} required />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>Unit</Label>
                    <Select
                        value={formData.Unit?.toString()}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, Unit: parseInt(value) }))}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a Unit" />
                        </SelectTrigger>
                        <SelectContent>
                            {Item_Unit_List.map((unit) => (
                                <SelectItem key={unit.id} value={unit.id.toString()}>
                                    {unit.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex-1">
                    <Label className='pb-1'>Quantity</Label>
                    <Input name="Quantity" value={formData.Quantity} onChange={handleChange} placeholder='300' type='number' required />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>Pieces <small>(For display only and if applicable to item then only enter)</small></Label>
                    <Input name="Pieces" value={formData.Pieces} onChange={handleChange} placeholder='3 Pieces' required />
                </div>

                <div className="flex-1">
                    <Label className='pb-1'>Serve Person</Label>
                    <Input name="ServePerson" value={formData.ServePerson} onChange={handleChange} placeholder='3-4 Persons' required />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>Suitable For</Label>
                    <Input name="SuitableFor" value={formData.SuitableFor} onChange={handleChange} placeholder='Suitable for fish curry' required />
                </div>

                <div className="flex-1">
                    <Label className='pb-1'>SKU</Label>
                    <Input name="SKU" value={formData.SKU} onChange={handleChange} placeholder='RF-KG-23' required />
                </div>
            </div>

            <div>
                <Label className='pb-1'>Images</Label>
                <div className="border rounded-lg p-3 flex flex-wrap items-center gap-5">
                    {images.map((image, index) => (
                        <div key={index} className="p-1 rounded-lg w-[200px] h-[140px] bg-secondary">
                            <Image src={image} alt="Profile" width={200} height={140} className="rounded-lg w-full h-full" />
                        </div>
                    ))}

                    <label aria-label="item_images">
                        <Input id='item_images' className='hidden' type="file" accept="image/*" onChange={handleItemImageChange} />
                        <div className="border rounded-lg h-24 w-24 flex justify-center items-center bg-secondary cursor-pointer">
                            <PlusIcon className='size-18 text-secondary-foreground' />
                        </div>
                    </label>
                </div>
            </div>

            <div className="flex flex-wrap justify-between gap-2">
                <div>
                    <Label className='pb-1'>Show Badge?</Label>
                    <div className="flex items-center justify-center gap-2">
                        <Switch id="IsShowBadge" name="IsShowBadge" value={formData.IsShowBadge} onChange={(val) => { console.log(val) }} />
                        <Label htmlFor="IsShowBadge">Yes</Label>
                    </div>
                </div>

                <div>
                    <Label className='pb-1'>Fresh?</Label>
                    <div className="flex items-center justify-center gap-2">
                        <Switch id="IsFresh" name="IsFresh" value={formData.IsFresh} onChange={(val) => { console.log(val) }} />
                        <Label htmlFor="IsFresh">Yes</Label>
                    </div>
                </div>

                <div>
                    <Label className='pb-1'>Camicals Free?</Label>
                    <div className="flex items-center justify-center gap-2">
                        <Switch id="IsCamicalsFree" name="IsCamicalsFree" value={formData.IsCamicalsFree} onChange={(val) => { console.log(val) }} />
                        <Label htmlFor="IsCamicalsFree">Yes</Label>
                    </div>
                </div>

                <div>
                    <Label className='pb-1'>Natural?</Label>
                    <div className="flex items-center justify-center gap-2">
                        <Switch id="IsNatural" name="IsNatural" value={formData.IsNatural} onChange={(val) => { console.log(val) }} />
                        <Label htmlFor="IsNatural">Yes</Label>
                    </div>
                </div>

                <div>
                    <Label className='pb-1'>No Antibiotic?</Label>
                    <div className="flex items-center justify-center gap-2">
                        <Switch id="IsNoAntibiotic" name="IsNoAntibiotic" value={formData.IsNoAntibiotic} onChange={(val) => { console.log(val) }} />
                        <Label htmlFor="IsNoAntibiotic">Yes</Label>
                    </div>
                </div>

            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push("/items")} disabled={loading}>Back to list</Button>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />} Create
                </Button>
            </div>
        </form>
    )
}