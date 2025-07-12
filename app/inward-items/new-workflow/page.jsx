"use client"

import MainLayout from "@/components/layout/mainLayout";
import ItemForm from "@/components/items/ItemForm"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import BenefitForm from "@/components/items/BenefitForm";
import ItemWorkFlowForm from "@/components/inward-items/ItemWorkFlowForm";

export default function CreateItem() {
    const router = useRouter()

    const handleSubmit = async (data) => {
        toast.success("Created", { description: "Item Workflow created successfully" })
        router.push("/inward-items")
    }

    return (
        <MainLayout>
            <div className="">
                <ItemWorkFlowForm initialData={{}} onSubmit={handleSubmit} />
            </div>
        </MainLayout>
    )
}