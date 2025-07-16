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

export default function Slots({ initialData = {}, onSubmit }) {
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [slot, setSlot] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await onSubmit(slot)
        setLoading(false)
    }

    return (
        <div className="grid gap-2 min-w-[350px]">

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="">
                        <Label htmlFor="SlotName" className="sr-only">Slot Name</Label>
                        <Input name="SlotName" className='' value={slot.SlotName} onChange={(e) => setSlot({ ...slot, SlotName: e.target.value })} placeholder='Slot Name' />
                    </div>
                    <div className="">
                        <Label htmlFor="FromTime" className="sr-only">From Time</Label>
                        <Input type='time' className='' name="FromTime" value={slot.FromTime} onChange={(e) => setSlot({ ...slot, FromTime: e.target.value })} placeholder='From Time' />
                    </div>
                    <div className="">
                        <Label htmlFor="ToTime" className="sr-only">To Time</Label>
                        <Input type='time' className='' name="ToTime" value={slot.ToTime} onChange={(e) => setSlot({ ...slot, ToTime: e.target.value })} placeholder='To Time' />
                    </div>
                </div>
                <Button type="submit" className='h-8 cursor-pointer'>Add</Button>
            </form>

            <div className="flex items-center justify-center gap-2 flex-wrap">
                <table className="w-full divide-y divide-gray-200 text-sm text-left rounded overflow-hidden">
                    <thead className="bg-orange-100">
                        <tr>
                            <th className="px-4 py-2 font-semibold text-gray-700">Slot</th>
                            <th className="px-4 py-2 font-semibold text-gray-700">From</th>
                            <th className="px-4 py-2 font-semibold text-gray-700">To</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                            <td className="px-4 py-2">Slot 1</td>
                            <td className="px-4 py-2">08:00 AM</td>
                            <td className="px-4 py-2">09:00 AM</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">Slot 2</td>
                            <td className="px-4 py-2">10:00 AM</td>
                            <td className="px-4 py-2">11:00 AM</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">Slot 3</td>
                            <td className="px-4 py-2">12:00 PM</td>
                            <td className="px-4 py-2">01:00 PM</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">Slot 4</td>
                            <td className="px-4 py-2">02:00 PM</td>
                            <td className="px-4 py-2">04:00 PM</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-2">Slot 5</td>
                            <td className="px-4 py-2">05:00 PM</td>
                            <td className="px-4 py-2">06:00 PM</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}