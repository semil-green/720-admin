"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getItems } from "@/lib/api/items"
import ItemTable from "@/components/items/ItemTable"
import RawItemTable from "@/components/items/RawItemTable"
import RawItemForm from "@/components/items/RawItemForm"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import MainLayout from "@/components/layout/mainLayout";
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import FilterDropdown from "@/components/items/FilterDropDown"

export default function Items() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [rawItem, setRawItem] = useState({})
    const [isRawItemModalOpen, setIsRawItemModalOpen] = useState(false)
    const [sortState, setSortState] = useState()


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
            description: "Deleted successfully"
        })
    }

    const openAddRawItem = () => {
        setRawItem({})
        setIsRawItemModalOpen(true);
    }


    const handleSubmit = async (data) => {
        await addCategory(data)
        toast.success("Created", { description: "Raw Item created successfully" })

        setIsRawItemModalOpen(false);
        await getItemsList();
    }

    const handleSortChange = (sort) => {
        setSortState([sort])
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

            <Tabs defaultValue="Item">
                <TabsList>
                    <TabsTrigger value="Item" onClick={() => { getItemsList() }}>Product</TabsTrigger>
                    <TabsTrigger value="RawItem" onClick={() => { getItemsList() }}>Raw Item</TabsTrigger>
                </TabsList>
                <TabsContent value="Item">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center gap-2">
                            <div>

                            </div>
                            <div className="flex gap-4">
                                <Button variant='secondary'>Export</Button>
                                <Button onClick={() => router.push("/items/new")} className='cursor-pointer'>Add Product</Button>
                            </div>
                        </div>

                        <div className="flex justify-between">

                            <div>

                                <Input defaultValue="" placeholder='Search Items' className='w-2xl' />
                            </div>

                            <div className="flex justify-end">
                                <FilterDropdown onSortChange={handleSortChange} />
                            </div>
                        </div>

                        <ItemTable data={items} onDelete={handleDelete} sortState={sortState} />
                    </div>
                </TabsContent>
                <TabsContent value="RawItem">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center gap-2">
                            <Input defaultValue="" placeholder='Search Raw Items' className='max-w-2/4' />
                            <Button onClick={() => openAddRawItem()} className='cursor-pointer'>Add Raw Item</Button>
                        </div>

                        <RawItemTable data={items} onDelete={handleDelete} />
                    </div>
                </TabsContent>
            </Tabs>


            {/* Add/Edit Raw Item */}
            <Dialog open={!!isRawItemModalOpen > 0} onOpenChange={() => setIsRawItemModalOpen(false)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Add Raw Item
                        </DialogTitle>
                        <DialogDescription>
                            Add/Update Raw Item from here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <RawItemForm initialData={rawItem} onSubmit={handleSubmit} handleCose={() => setIsRawItemModalOpen(false)} />
                    </div>
                </DialogContent>
            </Dialog>


        </MainLayout>
    )
}
