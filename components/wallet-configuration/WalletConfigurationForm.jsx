
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const WalletConfigurationForm = ({ initialData, onSubmit, handleCose }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        WalletConfigurationId: 0,
        MaxPointPerOrder: "",
        PerPointPrice: "",
    })

    useEffect(() => {
        setFormData({
            WalletConfigurationId: 0,
            MaxPointPerOrder: "",
            PerPointPrice: "",
            ...initialData,
        })
    }, [initialData])

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
        <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
                <input type="hidden" name="WalletConfigurationId" value={formData.WalletConfigurationId} />
                <Label className='pb-2'>Max Point Per Order</Label>
                <Input name="MaxPointPerOrder" value={formData.MaxPointPerOrder} onChange={handleChange} required placeholder='10' type='number' className='border-white' />
            </div>

            <div>
                <Label className='pb-2'>Per Point Price (In Paisa)</Label>
                <Input name="PerPointPrice" value={formData.PerPointPrice} onChange={handleChange} required placeholder='10' type='number' className='border-white' />
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => handleCose()} disabled={loading}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                    {formData.WalletConfigurationId > 0 ? 'Update' : 'Add'}
                </Button>
            </div>
        </form>
    )
}

export default React.memo(WalletConfigurationForm)