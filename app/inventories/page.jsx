"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getInventories } from "@/lib/api/inventories"
import InventoryTable from "@/components/inventories/InventoryTable"
import { Loader2 } from "lucide-react"
import MainLayout from "@/components/layout/mainLayout";
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { stores, StoreTypes } from "@/lib/constants"

export default function Inventory() {
    const [inventories, setInventories] = useState([])
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        getInventoryList();
    }, [])

    const getInventoryList = async () => {
        setLoading(true)

        const items = await getInventories();
        setInventories(items)

        setLoading(false)
    }

    return (
        <MainLayout>
            {loading &&
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            }

            <div className="space-y-4">
                <div className="flex justify-between items-center gap-2">
                    <Select defaultValue={''}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a packaging center/dark store" />
                        </SelectTrigger>
                        <SelectContent>
                            {stores.map((item) => (
                                <SelectItem key={item.value} value={item.value.toString()}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Input defaultValue="" placeholder='Search Items' className='' />
                </div>

                <InventoryTable data={inventories} />
            </div>
        </MainLayout>
    )
}
