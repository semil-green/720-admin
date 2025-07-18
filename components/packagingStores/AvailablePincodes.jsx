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
            <div className="flex items-center justify-center gap-2 flex-wrap">
                <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                    345464
                    <span className="pointer-cursor">&times;</span>
                </Button>
                <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                    565464
                    <span className="pointer-cursor">&times;</span>
                </Button>
                <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                    355558
                    <span className="pointer-cursor">&times;</span>
                </Button>
                <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                    956753
                    <span className="pointer-cursor">&times;</span>
                </Button>
                <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                    236344
                    <span className="pointer-cursor">&times;</span>
                </Button>
                <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                    958745
                    <span className="pointer-cursor">&times;</span>
                </Button>
                <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                    307005
                    <span className="pointer-cursor">&times;</span>
                </Button>
                <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                    360504
                    <span className="pointer-cursor">&times;</span>
                </Button>

            </div>
        </div>
    )
}