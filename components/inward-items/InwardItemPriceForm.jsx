
import { useState, useEffect, Fragment } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"
import { PlusIcon, MinusIcon } from "lucide-react"

export default function InwardItemPriceForm({ onSubmit }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ Price: "", ComparePrice: '', IsChargeTax: false })

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
        <>
            <table className="w-full divide-y divide-gray-200 text-sm text-left rounded overflow-hidden">
                <thead className="bg-secondary">
                    <tr>
                        <th className="px-4 py-2 font-semibold text-secondary-foreground">Price</th>
                        <th className="px-4 py-2 font-semibold text-secondary-foreground">Compare Price</th>
                        <th className="px-4 py-2 font-semibold text-secondary-foreground">Charge Tax</th>
                        <th className="px-4 py-2 font-semibold text-secondary-foreground">Effective Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                    <tr>
                        <td className="px-4 py-2">450</td>
                        <td className="px-4 py-2">500</td>
                        <td className="px-4 py-2">Yes</td>
                        <td className="px-4 py-2">06-07-2025</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">599</td>
                        <td className="px-4 py-2">899</td>
                        <td className="px-4 py-2">No</td>
                        <td className="px-4 py-2">08-07-2025</td>
                    </tr>
                    <tr>
                        <td className="px-4 py-2">200</td>
                        <td className="px-4 py-2">250</td>
                        <td className="px-4 py-2">Yes</td>
                        <td className="px-4 py-2">11-07-2025</td>
                    </tr>

                </tbody>
            </table>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-3">
                    <div className="flex items-center gap-3">
                        <Input name="Price" value={formData.Price} onChange={(e) => handleChange(e)} placeholder='New Price' required type='number' />
                        <Input name="ComparePrice" value={formData.ComparePrice} onChange={(e) => handleChange(e)} placeholder='New Compare Price' required type='number' />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <Switch id="IsChargeTax" name="IsChargeTax" value={formData.IsChargeTax} onChange={(val) => { console.log(val) }} />
                            <Label htmlFor="IsChargeTax">Charge tax on this item?</Label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 pt-4">
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />} Set
                    </Button>
                </div>
            </form>
        </>
    )
}