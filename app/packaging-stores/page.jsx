"use client"

import MainLayout from "@/components/layout/mainLayout";
import { useEffect, useState } from "react"
import PackagingStoreTable from "@/components/packagingStores/StoreTable"
import { toast } from "sonner"
import { getStores, deleteStore } from "@/lib/api/packagingStore"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function PackagingStores() {
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
            description: "Packaging Center deleted successfully"
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
                <div className="flex justify-end items-center">
                    {/* <h2 className="text-2xl font-bold">Packaging Stores</h2> */}
                    <Button onClick={() => router.push("/packaging-stores/new")} className='cursor-pointer'>Create Packaging Center</Button>
                </div>

                {stores && <PackagingStoreTable data={stores} onDelete={handleDelete} />}
            </div>

        </MainLayout>
    )
}
