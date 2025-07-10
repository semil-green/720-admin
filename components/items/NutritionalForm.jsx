
import { useState, useEffect, Fragment } from "react"
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
import { PlusIcon, MinusIcon } from "lucide-react"

export default function NutritionalForm({ onSubmit }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [nutrients, setNutrient] = useState([{ Lable: "", Value: '', Id: Date.now() }])
    const [vitamins, setVitamin] = useState([{ Lable: "", Value: '', Id: Date.now() }])
    const [minerals, setMineral] = useState([{ Lable: "", Value: '', Id: Date.now() }])

    const handleNutrientChange = (index, field, value) => {
        const updated = [...nutrients]
        updated[index][field] = value
        setNutrient(updated)
    }
    const addNewNutrient = () => {
        setNutrient([...nutrients, { Lable: "", Value: '', Id: Date.now() }])
    }
    const removeNutrient = (id) => {
        const newNutrients = nutrients.filter((d, i) => d.Id != id)
        setNutrient(newNutrients)
    }

    const handleVitaminChange = (index, field, value) => {
        const updated = [...vitamins]
        updated[index][field] = value
        setVitamin(updated)
    }
    const addNewVitamin = () => {
        setVitamin([...vitamins, { Lable: "", Value: '', Id: Date.now() }])
    }
    const removeVitamin = (id) => {
        const newVitamin = vitamins.filter((d, i) => d.Id != id)
        setVitamin(newVitamin)
    }

    const handleMineralChange = (index, field, value) => {
        const updated = [...minerals]
        updated[index][field] = value
        setMineral(updated)
    }
    const addNewMineral = () => {
        setMineral([...minerals, { Lable: "", Value: '', Id: Date.now() }])
    }
    const removeMineral = (id) => {
        const newMineral = minerals.filter((d, i) => d.Id != id)
        setMineral(newMineral)
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

                <div className="border rounded-lg p-3 flex flex-col gap-3">
                    {nutrients.map((nutrient, index) =>
                        <Fragment key={nutrient.Id}>
                            {index == 0 &&
                                <div className="flex items-end gap-3">
                                    <div>
                                        <Label className='text-lg pb-1'>Nutrient</Label>
                                        <Input name="Label" value={nutrient.Label} onChange={(e) => handleNutrientChange(index, e.target.name, e.target.value)} placeholder='Calories' required />
                                    </div>
                                    <div>
                                        <Label className='text-lg pb-1'>Amount</Label>
                                        <Input className='max-w-36' name="Value" value={nutrient.Value} onChange={(e) => handleNutrientChange(index, e.target.name, e.target.value)} required placeholder='90kcal' />
                                    </div>
                                    <div className="rounded-lg size-9 flex justify-center items-center bg-secondary cursor-pointer" onClick={addNewNutrient}>
                                        <PlusIcon className='text-secondary-foreground' />
                                    </div>
                                </div>
                            }

                            {index > 0 &&
                                <div className="flex items-end gap-3">
                                    <Input name="Label" value={nutrient.Label} onChange={(e) => handleNutrientChange(index, e.target.name, e.target.value)} placeholder='Calories' required />
                                    <Input className='max-w-36' name="Value" value={nutrient.Value} onChange={(e) => handleNutrientChange(index, e.target.name, e.target.value)} required placeholder='90kcal' />
                                    <div className="rounded-lg size-9 min-w-[36px] flex justify-center items-center bg-secondary cursor-pointer" onClick={() => removeNutrient(nutrient.Id)}>
                                        <MinusIcon className='text-secondary-foreground' />
                                    </div>
                                </div>
                            }
                        </Fragment>
                    )}
                </div>

                <div className="border rounded-lg p-3 flex flex-col gap-3">
                    {vitamins.map((vitamin, index) =>
                        <Fragment key={vitamin.Id} >
                            {index == 0 &&
                                <div className="flex items-end gap-3">
                                    <div>
                                        <Label className='text-lg pb-1'>Vitamin</Label>
                                        <Input name="Label" value={vitamin.Label} onChange={(e) => handleVitaminChange(index, e.target.name, e.target.value)} placeholder='Vitamin D' required />
                                    </div>
                                    <div>
                                        <Label className='text-lg pb-1'>Amount</Label>
                                        <Input className='max-w-36' name="Value" value={vitamin.Value} onChange={(e) => handleVitaminChange(index, e.target.name, e.target.value)} required placeholder='5 IU' />
                                    </div>
                                    <div className="rounded-lg size-9 flex justify-center items-center bg-secondary cursor-pointer" onClick={addNewVitamin}>
                                        <PlusIcon className='text-secondary-foreground' />
                                    </div>
                                </div>
                            }

                            {index > 0 &&
                                <div className="flex items-end gap-3">
                                    <Input name="Label" value={vitamin.Label} onChange={(e) => handleVitaminChange(index, e.target.name, e.target.value)} placeholder='Vitamin D' required />
                                    <Input className='max-w-36' name="Value" value={vitamin.Value} onChange={(e) => handleVitaminChange(index, e.target.name, e.target.value)} required placeholder='5 IU' />
                                    <div className="rounded-lg size-9 min-w-[36px] flex justify-center items-center bg-secondary cursor-pointer" onClick={() => removeVitamin(vitamin.Id)}>
                                        <MinusIcon className='text-secondary-foreground' />
                                    </div>
                                </div>
                            }
                        </Fragment>
                    )}
                </div>

                <div className="border rounded-lg p-3 flex flex-col gap-3">
                    {minerals.map((mineral, index) =>
                        <Fragment key={mineral.Id}>
                            {index == 0 &&
                                <div className="flex items-end gap-3">
                                    <div>
                                        <Label className='text-lg pb-1'>Mineral</Label>
                                        <Input name="Label" value={mineral.Label} onChange={(e) => handleMineralChange(index, e.target.name, e.target.value)} placeholder='Phosphorus' required />
                                    </div>
                                    <div>
                                        <Label className='text-lg pb-1'>Amount</Label>
                                        <Input className='max-w-36' name="Value" value={mineral.Value} onChange={(e) => handleMineralChange(index, e.target.name, e.target.value)} required placeholder='150 mg' />
                                    </div>
                                    <div className="rounded-lg size-9 flex justify-center items-center bg-secondary cursor-pointer" onClick={addNewMineral}>
                                        <PlusIcon className='text-secondary-foreground' />
                                    </div>
                                </div>
                            }

                            {index > 0 &&
                                <div className="flex items-end gap-3">
                                    <Input name="Label" value={mineral.Label} onChange={(e) => handleMineralChange(index, e.target.name, e.target.value)} placeholder='Phosphorus' required />
                                    <Input className='max-w-36' name="Value" value={mineral.Value} onChange={(e) => handleMineralChange(index, e.target.name, e.target.value)} required placeholder='150 mg' />
                                    <div className="rounded-lg size-9 min-w-[36px] flex justify-center items-center bg-secondary cursor-pointer" onClick={() => removeMineral(mineral.Id)}>
                                        <MinusIcon className='text-secondary-foreground' />
                                    </div>
                                </div>
                            }
                        </Fragment>
                    )}
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