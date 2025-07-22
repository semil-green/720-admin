"use client"

import MainLayout from "@/components/layout/mainLayout";
import StoreForm from "@/components/stores/StoreForm"
import { addStore } from "@/lib/api/store"
import { useRouter } from "next/navigation"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import AvailablePincodes from "@/components/stores/AvailablePincodes";
import Slots from "@/components/stores/Slots";
import { Button } from "@/components/ui/button";

export default function CreateStorePage() {
  const router = useRouter()

  const handleSubmit = async (data) => {
    await addStore(data)
    toast.success("Created", { description: "Store created successfully" })
    router.push("/stores")
  }

  const handleSubmitPincodes = async (data) => {
    toast.success("Set", { description: "Pincode set for this store. Please set slots and finish it." })
  }

  const handleSubmitSlots = async (data) => {
    toast.success("Set", { description: "You have successfully finished store configuration." });
    router.push("/stores")
  }

  return (
    <MainLayout>
      <div className="flex flex-wrap gap-6">
        <Card className='flex-1'>
          <CardHeader>
            <CardTitle>
              <h2 className="text-2xl font-bold">Create Store</h2>
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
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Button type="button" variant="outline" onClick={() => router.push("/stores")}>
          Back to list
        </Button>
        <Button type="submit" >
          {/* {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />} */}
          Save
        </Button>
      </div>
    </MainLayout>
  )
}