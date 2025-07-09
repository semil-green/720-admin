"use client"

import MainLayout from "@/components/layout/mainLayout";
import StoreForm from "@/components/packagingStores/StoreForm"
import { addStore } from "@/lib/api/packagingStore"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function CreateStorePage() {
  const router = useRouter()

  const handleSubmit = async (data) => {
    await addStore(data)
    toast.success("Created", { description: "Packaging Store created successfully" })
    router.push("/packaging-stores")
  }

  return (
    <MainLayout>
      <div className="max-w-xl">
        <h2 className="text-2xl font-bold mb-4">Create Packaging Store</h2>
        <StoreForm initialData={{}} onSubmit={handleSubmit} />
      </div>
    </MainLayout>
  )
}