"use client";
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

export default function VendorForm({ initialData = {}, onSubmit }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const [images, setImages] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCollections, setSelectedCollections] = useState([]);

    const [gstSlabSelected, setGstSlabSelected] = useState({})

    const categoriesList = [
        { value: "1", label: "Catch of the day - Fresh Water" },
        { value: "2", label: "Everyones fab - Fresh Water" },
        { value: "3", label: "Marintes - Fresh Water" },
        { value: "4", label: "Boneless & Fillers - Fresh Water" },
        { value: "5", label: "Single bone - Marine Water" },
    ];

    const collectionsList = [
        {
            name: "fish curry cut",
            product: 17,
            condition: "fresh"
        },
        {
            name: "chicken drumstick",
            product: 24,
            condition: "frozen"
        },
        {
            name: "organic egg",
            product: 12,
            condition: "new"
        },
    ]

    useEffect(() => {
        setFormData({
            ...initialData,
        })
    }, [initialData])

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };


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

    const handleAdd = (value) => {
        const current = formData.Collections || [];
        if (!current.includes(value)) {
            setFormData({
                ...formData,
                Collections: [...current, value],
            });
        }
    };

    const handleRemove = (indexToRemove) => {
        setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
    };

    const gstRates = [
        {
            hsnCode: "0101",
            gstPercent: 10,
            igst: 7,
        },
        {
            hsnCode: "0401",
            gstPercent: 5,
            igst: 5,
        },
        {
            hsnCode: "1006",
            gstPercent: 5,
            igst: 5,
        },
        {
            hsnCode: "1701",
            gstPercent: 5,
            igst: 5,
        },
        {
            hsnCode: "2106",
            gstPercent: 18,
            igst: 18,
        },
        {
            hsnCode: "3304",
            gstPercent: 18,
            igst: 18,
        },
        {
            hsnCode: "8528",
            gstPercent: 28,
            igst: 28,
        },
        {
            hsnCode: "8703",
            gstPercent: 28,
            igst: 28,
        },
    ];



    return (
        <form onSubmit={handleSubmit} className="grid gap-4">


            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>Name</Label>
                    <Input name="Quantity" value={formData.Quantity} onChange={handleChange} placeholder='Vendor Name' type='number' required />
                </div>

                <div className="flex-1">
                    <Label className='pb-1'>GST</Label>
                    <Input name="Quantity" value={formData.Quantity} onChange={handleChange} placeholder='GST Number' type='number' required />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>Address</Label>
                    <Textarea name="Description" placeholder="Vendor Address" className='min-h-[110px]' value={formData.Description} onChange={handleChange} required />
                </div>
            </div>



            <div className="flex gap-3 max-w-[50%]">
                <div className="flex-1">
                    <Label className='pb-1'>Contact Details</Label>
                    <Input name="Pieces" value={formData.Pieces} onChange={handleChange} placeholder='Enter Contact number' required />
                </div>
            </div>

            <h4 className=" font-semibold mt-4">Bank Details</h4>


            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>Account Name</Label>
                    <Input name="Quantity" value={formData.Quantity} onChange={handleChange} placeholder='Vendor account name' type='text' required />
                </div>

                <div className="flex-1">
                    <Label className='pb-1'>Account number</Label>
                    <Input name="Quantity" value={formData.Quantity} onChange={handleChange} placeholder='Vendor account number' type='text' required />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>IFSC Code</Label>
                    <Input name="Quantity" value={formData.Quantity} onChange={handleChange} placeholder='Vendor IFSC Code' type='text' required />
                </div>

                <div className="flex-1">
                    <Label className='pb-1'>Branch name</Label>
                    <Input name="Quantity" value={formData.Quantity} onChange={handleChange} placeholder='enter branch name' type='text' required />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>Gpay Number</Label>
                    <Input name="Quantity" value={formData.Quantity} onChange={handleChange} placeholder='Vendor Gpay number' type='text' required />
                </div>

                <div className="flex-1">
                    <Label className='pb-1'>Upi id</Label>
                    <Input name="Quantity" value={formData.Quantity} onChange={handleChange} placeholder='enter upi id' type='text' required />
                </div>
            </div>

            <div className="flex-1 max-w-[50%]">
                <Label className='pb-1'>mode of Payment</Label>
                <Select
                    value={formData.Unit?.toString()}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, Unit: parseInt(value) }))}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Unit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem>Cash</SelectItem>
                        <SelectItem>Upi</SelectItem>
                        <SelectItem>Bank transfer</SelectItem>
                    </SelectContent>
                </Select>
            </div>


            <div className="flex gap-3">
                <div className="flex-1">
                    <Label className='pb-1'>Attachment</Label>
                    <Input name="Quantity" value={formData.Quantity} onChange={handleChange} placeholder='Vendor Gpay number' type='file' required />
                </div>

                <div className="flex-1">

                </div>
            </div>


        </form>
    )
}