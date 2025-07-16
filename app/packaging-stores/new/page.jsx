"use client"

import MainLayout from "@/components/layout/mainLayout";
import StoreForm from "@/components/packagingStores/StoreForm"
import { addStore } from "@/lib/api/packagingStore"
import { useRouter } from "next/navigation"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import AvailablePincodes from "@/components/packagingStores/AvailablePincodes";
import Slots from "@/components/packagingStores/Slots";

export default function CreateStorePage() {
  const router = useRouter()

  const handleSubmit = async (data) => {
    await addStore(data)
    toast.success("Created", { description: "Packaging Center created successfully. Please set avalaible pincodes now." })
  }

  const handleSubmitPincodes = async (data) => {
    toast.success("Set", { description: "Pincode set for this packagin center. Please set slots and finish it." })
  }

  const handleSubmitSlots = async (data) => {
    toast.success("Set", { description: "You have successfully finished packaging center configuration." });
    router.push("/packaging-stores")
  }

  return (
    <MainLayout>
      <div className="flex flex-wrap gap-6">
        <Card className='flex-1'>
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-bold">Create Packaging Center</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StoreForm initialData={{}} onSubmit={handleSubmit} />
          </CardContent>
        </Card>

        <Card className='flex-1'>
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-bold">Available Pincodes</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AvailablePincodes initialData={{}} onSubmit={handleSubmitPincodes} />
          </CardContent>
        </Card>

        <Card className='flex-1'>
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-bold">Schedule Slots</h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Slots initialData={{}} onSubmit={handleSubmitSlots} />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}