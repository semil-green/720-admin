import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const DayOffForm = ({ initialData, onSubmit, handleCose }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        day_off_id: 0,
        day_off_date: "",
        day_off_remarks: "",
    })

    useEffect(() => {
        setFormData({
            day_off_id: 0,
            day_off_date: "",
            day_off_remarks: "",
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

            <div className="flex flex-row gap-4">
                <div className="flex-1">
                    <input type="hidden" name="day_off_id" value={formData.day_off_id} />
                    {/* <Label className='pb-2'>Date</Label> */}
                    <Input name="day_off_date" value={formData.day_off_date} onChange={handleChange} required placeholder='' type='date' className='border-white' />
                </div>

                <div className="flex-2">
                    {/* <Label className='pb-2'>Remarks</Label> */}
                    <Input name="day_off_remarks" value={formData.day_off_remarks} onChange={handleChange} required placeholder='Due to rain' type='text' className='border-white' />
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => handleCose()} disabled={loading}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                    Set
                </Button>
            </div>
        </form>
    )
}


export default React.memo(DayOffForm);