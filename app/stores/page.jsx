"use client"

import MainLayout from "@/components/layout/mainLayout";
import { useEffect, useState } from "react"
import StoreTable from "@/components/stores/StoreTable"
import { toast } from "sonner"
import { getStores, deleteStore } from "@/lib/api/store"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function DarkStores() {
    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        getStoreList();
    }, [])

    const getStoreList = async () => {
        setLoading(true)

        const stores = await getStores();
        setStores(stores)

        setLoading(false)
    }

    const handleDelete = async (id) => {
        setLoading(true)

        await deleteStore(id)
        toast.success("Deleted", {
            description: "Packaging Store deleted successfully"
        })

        getStoreList();
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
                <div className="flex justify-end items-center gap-3">
                    {/* <h2 className="text-2xl font-bold">Stores</h2> */}
                    <Button onClick={() => router.push("/stores/new")} className='cursor-pointer'>Create Store</Button>
                </div>

                {stores && <StoreTable data={stores} onDelete={handleDelete} />}
            </div>

        </MainLayout>
    )
}
