"use client"

import MainLayout from "@/components/layout/mainLayout";
import { useEffect, useState } from "react"
import StoreTable from "@/components/stores/StoreTable"
import { toast } from "sonner"
import { getStores, deleteStore } from "@/lib/api/store"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { getAllDarkStorePackagingCenter } from "@/service/darkStore-packagingCenter/darkStore-packagingCenter.service";
import { useDispatch, useSelector } from "react-redux"
import { setAllDarkStorePackagingCenter } from "@/store/slices/darkStore-packagingCenter/darkStore-packagingCenter.slice";

export default function DarkStores() {

    const [loading, setLoading] = useState(true)

    const router = useRouter()
    const dispatch = useDispatch()

    const allDarkStore = useSelector((state) => state.darkStorePackagingCenterSlice.allDarkStorePackagingCenter)

    const filteredDarkStore = allDarkStore?.data?.filter((item) => item.type == "dark_store")

    useEffect(() => {
        const fetchAllDarkStoresPackagingCenter = async () => {
            try {
                const data = await getAllDarkStorePackagingCenter()
                dispatch(setAllDarkStorePackagingCenter(data))
            } catch (err) {
                console.error("Failed to fetch:", err)
            } finally {
                setLoading(false)
            }
        }

        if (allDarkStore.length === 0) {
            fetchAllDarkStoresPackagingCenter()
        } else {
            setLoading(false)
        }
    }, [allDarkStore, dispatch])

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
                <div className="flex justify-end items-center gap-3">
                    {/* <h2 className="text-2xl font-bold">Stores</h2> */}
                    <Button onClick={() => router.push("/stores/new")} className='cursor-pointer'>Create Store</Button>
                </div>

                {filteredDarkStore && <StoreTable data={filteredDarkStore} />}
            </div>

        </MainLayout>
    )
}
