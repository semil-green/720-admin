"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getItems } from "@/lib/api/items"
import ItemTable from "@/components/items/ItemTable"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import MainLayout from "@/components/layout/mainLayout";

export default function Items() {
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
                <div className="flex justify-end items-center">
                    <Button onClick={() => router.push("/items/new")} className='cursor-pointer'>Add Item</Button>
                </div>

                <ItemTable data={items} onDelete={handleDelete} />
            </div>
        </MainLayout>
    )
}
