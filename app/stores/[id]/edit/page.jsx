"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import MainLayout from "@/components/layout/mainLayout";
import { getStoreById, updateStore } from "@/lib/api/store"
import StoreForm from "@/components/stores/StoreForm"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function EditStorePage() {
    const { id } = useParams()
    const router = useRouter()
    const [store, setStore] = useState(null)

    useEffect(() => {
        getForEdit();
    }, [id])

    const getForEdit = async () => {
        const data = await getStoreById(id)
        if (data) setStore(data)
    }

    const handleSubmit = async (data) => {
        await updateStore(id, data)
        toast.success("Created", { description: "Store created successfully" })
        router.push("/stores")
    }

    return (
        <MainLayout>
            {!store &&
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            }
            <div className="max-w-xl">
                <h2 className="text-2xl font-bold mb-4">Edit Store</h2>
                <StoreForm initialData={store} onSubmit={handleSubmit} />
            </div>
        </MainLayout>
    )
}