"use client"

import MainLayout from "@/components/layout/mainLayout";
import StoreForm from "@/components/packagingStores/StoreForm"
import { addStore } from "@/lib/api/packagingStore"
import { useRouter } from "next/navigation"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
        <Card className='flex-1'>
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-bold">Create Packaging Store</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StoreForm initialData={{}} onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}