
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
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

export default function UserForm({ initialData = {}, onSubmit }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        RoleId: "",
        StoreId: "",
        FullName: "",
        MobileNo: "",
        EmailId: "",
        Profile: ""
    })

    useEffect(() => {
        setFormData({
            RoleId: "",
            StoreId: "",
            FullName: "",
            MobileNo: "",
            EmailId: "",
            Profile: "",
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
            setFormData((prev) => ({ ...prev, Profile: imageUrl }))
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
            <div>
                <Label className='pb-1'>Full Name</Label>
                <Input name="FullName" value={formData.FullName} onChange={handleChange} required />
            </div>

            <div>
                <Label className='pb-1'>Mobile No</Label>
                <Input name="MobileNo" value={formData.MobileNo} onChange={handleChange} required />
            </div>

            <div>
                <Label className='pb-1'>Email</Label>
                <Input name="EmailId" value={formData.EmailId} onChange={handleChange} required />
            </div>

            <div>
                <Label className='pb-1'>Role</Label>
                <Select
                    value={formData.RoleId?.toString()}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, RoleId: parseInt(value) }))}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id.toString()}>
                                {role.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label className='pb-1'>Store</Label>
                <Select
                    value={formData.StoreId?.toString()}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, StoreId: parseInt(value) }))}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a store" />
                    </SelectTrigger>
                    <SelectContent>
                        {stores.map((store) => (
                            <SelectItem key={store.id} value={store.id.toString()}>
                                {store.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label className='pb-1'>Profile Picture</Label>
                <Input type="file" accept="image/*" onChange={handleFileChange} />
                {formData.Profile && (
                    <div className="mt-2">
                        <Image src={formData.Profile} alt="Profile" width={80} height={80} className="rounded-full" />
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.push("/users")} disabled={loading}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />} Submit
                </Button>
            </div>
        </form>
    )
}