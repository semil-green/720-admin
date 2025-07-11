
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { roles, stores } from "@/lib/api/user"
import { Item_Unit, Item_Unit_List } from "@/lib/constants"
import { PlusIcon, ImageIcon } from "lucide-react"

export default function BenefitForm({ onSubmit }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formDatas, setFormDatas] = useState([{ Title: "", Description: '', Image: '', Id: Date.now() }])

    const handleChange = (index, field, value) => {
        const updated = [...formDatas]
        updated[index][field] = value
        setFormDatas(updated)
    }

    const handleItemImageChange = (index, e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            let formDatasNew = [...formDatas];
            formDatasNew[index].Image = imageUrl;
            setFormDatas(formDatasNew)
        }
    }

    const addNewBenefit = () => {
        setFormDatas([...formDatas, { Title: "", Description: '', Image: '', Id: Date.now() }])
    }

    const removeBenefit = (id) => {
        const newFormDatas = formDatas.filter((d, i) => d.Id != id)
        setFormDatas(newFormDatas)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await onSubmit(formData)
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap items-center gap-5">
                {formDatas.map((formData, index) =>
                    <div key={formData.Id} className="border rounded-lg p-3 relative">
                        <div className="grid gap-3">
                            <Input name="Title" value={formData.Title} onChange={(e) => handleChange(index, e.target.name, e.target.value)} placeholder='Title' required />
                            <Input name="Description" value={formData.Description} onChange={(e) => handleChange(index, e.target.name, e.target.value)} required placeholder='Description' />

                            {formData.Image &&
                                <div className="flex justify-center">
                                    <Image src={formData.Image} alt="Profile" width={150} height={150} />
                                </div>
                            }

                            {!formData.Image &&
                                <label aria-label="item_images">
                                    <Input id='item_images' className='hidden' type="file" accept="image/*" onChange={(e) => handleItemImageChange(index, e)} />
                                    <div className="border rounded-lg h-24 w-24 flex justify-center items-center bg-secondary pointer-cursor">
                                        <ImageIcon className='size-18 text-secondary-foreground' />
                                    </div>
                                </label>
                            }

                            {formData.Image &&
                                <label aria-label="item_images">
                                    <Input id='item_images' className='hidden' type="file" accept="image/*" onChange={(e) => handleItemImageChange(index, e)} />
                                    <div className="underline text-center cursor-pointer">Change</div>
                                </label>
                            }
                        </div>

                        <PlusIcon className='size-4 text-secondary-foreground cursor-pointer absolute bottom-3 right-3 rotate-45' onClick={() => removeBenefit(formData.Id)} />
                    </div>
                )}
                <div className="border rounded-lg h-24 w-24 flex justify-center items-center bg-secondary cursor-pointer" onClick={addNewBenefit}>
                    <PlusIcon className='size-18 text-secondary-foreground' />
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />} Save
                </Button>
            </div>
        </form>
    )
}