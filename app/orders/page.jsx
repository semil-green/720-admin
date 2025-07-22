"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getOrders } from "@/lib/api/orders"
import OrderTable from "@/components/order/OrderTable"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import MainLayout from "@/components/layout/mainLayout";
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Orders() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        getOrdersList();
    }, [])

    const getOrdersList = async () => {
        setLoading(true)

        const items = await getOrders();
        setItems(items)

        setLoading(false)
    }

    const onViewOrder = async () => {

    }

    const handleDelete = async (id) => {
        toast.success("Deleted", {
            description: "User deleted successfully"
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



            <div className="space-y-4">
                <div className="flex justify-end items-center gap-2">
                    <Link href={"/orders/draft-order"}>
                        <Button className='cursor-pointer'>Draft Order</Button>
                    </Link>
                    <Link href={"/orders/new"}>
                        <Button className='cursor-pointer'>New Order</Button>
                    </Link>
                </div>

                <OrderTable data={items} onViewOrder={onViewOrder} onDelete={handleDelete} />
            </div>
        </MainLayout>
    )
}
