
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { roles, stores } from "@/lib/api/user"

const CategoryForm = ({ initialData, onSubmit, handleCose }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        CategoryId: 0,
        Category: "",
        Image: "",
        ParentCategoryId: 0,
    })

    useEffect(() => {
        setFormData({
            CategoryId: 0,
            Category: "",
            Image: "",
            ParentCategoryId: 0,
            ...initialData,
        })
    }, [initialData])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setFormData((prev) => ({ ...prev, Image: imageUrl }))
        }
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
                <input type="hidden" name="CategoryId" value={formData.CategoryId} />
                <Label className='pb-2'>Category</Label>
                <Input name="Category" value={formData.Category} onChange={handleChange} required className='' />
            </div>

            <div>
                <Label className='pb-2'>Category Image</Label>
                <Input type="file" accept="image/*" onChange={handleFileChange} className='' />
                {formData.Image && (
                    <div className="mt-2">
                        <Image src={formData.Image} alt="Image" width={80} height={80} className="rounded-full" />
                    </div>
                )}
            </div>

            {/* <div>
                <div className="flex items-center gap-2">
                    <Switch id="IsShowonHomepage" name="IsShowonHomepage" value={formData.IsShowonHomepage} onChange={(val) => { console.log(val) }} />
                    <Label htmlFor="IsShowonHomepage">Show on homepage?</Label>
                </div>
            </div> */}

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => handleCose()} disabled={loading}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                    {formData.CategoryId > 0 ? 'Update Category' : 'Add Category'}
                </Button>
            </div>
        </form>
    )
}

export default React.memo(CategoryForm)