"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getItems } from "@/lib/api/inward-items"
import InwardItemTable from "@/components/inward-items/InwardItemTable"
import ItemWorkflowTable from "@/components/inward-items/ItemWorkflowTable"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import MainLayout from "@/components/layout/mainLayout";
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { stores, StoreTypes } from "@/lib/constants"

export default function InwardItems() {
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
            description: "Inward product deleted successfully."
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


            <Tabs defaultValue="InwardItem">
                <TabsList>
                    <TabsTrigger value="InwardItem" onClick={() => { getItemsList() }}>Inward Materials</TabsTrigger>
                    <TabsTrigger value="ItemWorkflow" onClick={() => { getItemsList() }}>Workflow</TabsTrigger>
                </TabsList>
                <TabsContent value="InwardItem">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center gap-2">
                            <Select defaultValue={''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a packagin store" />
                                </SelectTrigger>
                                <SelectContent>
                                    {stores.filter(f => f.type == StoreTypes.PackagingCenter).map((item) => (
                                        <SelectItem key={item.value} value={item.value.toString()}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Input defaultValue="" placeholder='Search Items' className='' />
                            <Button onClick={() => router.push("/inward-items/new")} className='cursor-pointer'>Inward New Materials</Button>
                        </div>

                        <InwardItemTable data={items} onDelete={handleDelete} />
                    </div>
                </TabsContent>
                <TabsContent value="ItemWorkflow">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center gap-2">
                            <Select defaultValue={''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a packagin store" />
                                </SelectTrigger>
                                <SelectContent>
                                    {stores.filter(f => f.type == StoreTypes.PackagingCenter).map((item) => (
                                        <SelectItem key={item.value} value={item.value.toString()}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Input defaultValue="" placeholder='Search Items' className='' />
                            <Button onClick={() => router.push("/inward-items/new-workflow")} className='cursor-pointer'>Add Workflow</Button>
                        </div>

                        <ItemWorkflowTable data={items} onDelete={handleDelete} />
                    </div>
                </TabsContent>
            </Tabs>
        </MainLayout>
    )
}
