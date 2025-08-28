"use client"

import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/mainLayout";
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import ItemWorkFlowForm from "@/components/inward-items/ItemWorkFlowForm";
import { useSearchParams } from "next/navigation";
import { getWorkflowbyIdService } from "@/service/work-flow/workflow.service";
import { Suspense } from "react";

function CreateItemPage() {
    const router = useRouter()
    const editId = useSearchParams().get("id");

    const [editData, setEditData] = useState({});

    useEffect(() => {
        if (!editId) return;

        const editData = async () => {
            try {
                const response = await getWorkflowbyIdService(editId);

                setEditData(response);
            } catch (error) {
                toast.error("Failed to fetch edit data")
            }
        }

        editData();
    }, [editId])

    return (
        <MainLayout>
            <div className="">
                <ItemWorkFlowForm editData={editData} />
            </div>
        </MainLayout>
    )
}


export default function CreateItem() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateItemPage />
        </Suspense>
    );
}