"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getStoreOrders, deleteStoreOrder, addStoreOrder, getStoreOrder, updateStoreOrder } from "@/lib/api/storeOrders"
import StoreOrderTable from "@/components/store-orders/StoreOrderTable"
import StoreOrderForm from "@/components/store-orders/StoreOrderForm"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import MainLayout from "@/components/layout/mainLayout";
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import StoreOrdersTable from "@/components/store-orders/StoreOrdersTable"

export default function StoreOrders() {
    const [StoreOrders, setStoreOrders] = useState([])
    const [StoreOrder, setStoreOrder] = useState({})
    const [loading, setLoading] = useState(true)
    const [isStoreOrderModalOpen, setIsStoreOrderModalOpen] = useState(false)

    const router = useRouter()

    const itemsList = [
        { value: "1", label: "Fresh Water", SKU: 'RH-FG-45' },
        { value: "2", label: "Item 2", SKU: 'RH-FG-77' },
        { value: "3", label: "Item 3", SKU: 'RH-FG-12' },
        { value: "4", label: "Item 4", SKU: 'RH-FG-56' },
        { value: "5", label: "Item 5", SKU: 'RH-FG-78' },
    ];

    useEffect(() => {
        getStoreOrderList();
    }, [])

    const getStoreOrderList = async () => {
        setLoading(true)

        const StoreOrders = await getStoreOrders();
        setStoreOrders([...StoreOrders])
        setLoading(false)
    }

    const handleDelete = async (id) => {
        setLoading(true)

        await deleteStoreOrder(id)
        toast.success("Deleted", {
            description: "Order Request deleted successfully"
        })

        await getStoreOrderList();
    }

    const handleSubmit = async (data) => {
        if (data.StoreOrderId === 0) {
            await addStoreOrder(data)
            toast.success("Created", { description: "Order Request created successfully" })
        } else {
            await updateStoreOrder(data.StoreOrderId, data)
            toast.success("Updated", { description: "Order Request updated successfully" })
        }
        setIsStoreOrderModalOpen(false);
        await getStoreOrderList();
    }

    const handleEdit = async (id) => {
        setLoading(true);
        const data = await getStoreOrder(id)
        setStoreOrder(data)
        setIsStoreOrderModalOpen(true);
        setLoading(false);
    }

    const openAddStoreOrder = () => {
        setStoreOrder({})
        setIsStoreOrderModalOpen(true);
    }

    const handleTransfer = (rowData) => {
        setStoreOrder(rowData); // sets the selected row data in state
        setIsStoreOrderModalOpen(true); // opens the modal
    };



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


                <StoreOrdersTable openAddStoreOrder={openAddStoreOrder} onTransferClick={handleTransfer} />
            </div>


            {/* Add/Edit StoreOrder */}
            <Dialog open={!!isStoreOrderModalOpen > 0} onOpenChange={() => setIsStoreOrderModalOpen(false)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {StoreOrder.StoreOrderId > 0 ? 'Update Order Request' : 'Order Request'}
                        </DialogTitle>
                        <DialogDescription>
                            Add/Update Order Request from here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <StoreOrderForm initialData={StoreOrder} onSubmit={handleSubmit} handleCose={() => setIsStoreOrderModalOpen(false)} itemsList={itemsList} />
                    </div>
                </DialogContent>
            </Dialog>

        </MainLayout>
    )
}
