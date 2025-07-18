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

export default function AvailablePincodes({ initialData = {}, onSubmit }) {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [pincode, setPincode] = useState('')
    const [deliveryCharge, setDeliveryCharge] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await onSubmit(pincode)
        setLoading(false)
    }

    const data = [
        { pincode: "345464", charge: 30 },
        { pincode: "565464", charge: 40 },
        { pincode: "355558", charge: 25 },
        { pincode: "956753", charge: 35 },
        { pincode: "236344", charge: 50 },
        { pincode: "958745", charge: 45 },
        { pincode: "307005", charge: 60 },
        { pincode: "360504", charge: 55 },
    ];

    return (
        <div className="flex flex-col gap-2 min-w-[280px]">
            <form onSubmit={handleSubmit} className="">
                <div className="flex flex-col items-center gap-2">
                    <Label htmlFor="pincode" className="sr-only">Pincode</Label>
                    <Input name="pincode" className='' value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder='Pincode' />
                    <Input name="delivery" className='mt-2' value={deliveryCharge} onChange={(e) => setDeliveryCharge(e.target.value)} placeholder='Delivery Charge' />
                    <Button type="submit" className='cursor-pointer mt-2'>Add</Button>
                </div>
            </form>
            <table className="min-w-full table-auto border border-gray-300 rounded-md mt-2">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border-b text-center">Pincode</th>
                        <th className="p-2 border-b text-center">Delivery Charge</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.pincode} className="hover:bg-gray-50">
                            <td className="p-2 border-b text-center">
                                <div className="inline-flex items-center gap-1 px-3 py-1 h-6 bg-white text-accent">
                                    {item.pincode}
                                    <span className="cursor-pointer text-red-500 text-sm hover:text-red-700">
                                        &times;
                                    </span>
                                </div>
                            </td>

                            <td className="p-2 border-b border-l border-gray-300 text-center">₹{item.charge}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}   