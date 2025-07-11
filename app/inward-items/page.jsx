"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getItems } from "@/lib/api/inward-items"
import InwardItemTable from "@/components/inward-items/InwardItemTable"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import MainLayout from "@/components/layout/mainLayout";
import { Input } from "@/components/ui/input"

export default function InwardItems() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        getItemsList();
    }, [])

    const getItemsList = async () => {
        setLoading(true)

        const items = await getItems();
        setItems(items)

        setLoading(false)
    }

    const handleDelete = async (id) => {
        toast.success("Deleted", {
            description: "User deleted successfully"
        })
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
                    <Input defaultValue="" placeholder='Search Items' className='max-w-2/4' />
                    <Button onClick={() => router.push("/inward-items/new")} className='cursor-pointer'>Add Item to store</Button>
                </div>

                <InwardItemTable data={items} onDelete={handleDelete} />
            </div>
        </MainLayout>
    )
}
