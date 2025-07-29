"use client"

import MainLayout from "@/components/layout/mainLayout";
import { useEffect, useState } from "react"
import PackagingStoreTable from "@/components/packagingStores/PackagingTable"
import { toast } from "sonner"
import { getStores, deleteStore } from "@/lib/api/packagingStore"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { setAllDarkStorePackagingCenter } from "@/store/slices/darkStore-packagingCenter/darkStore-packagingCenter.slice";
import { getAllDarkStorePackagingCenter } from "@/service/darkStore-packagingCenter/darkStore-packagingCenter.service";
import { useDispatch, useSelector } from "react-redux"

export default function PackagingStores() {
    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState("")

    const router = useRouter()
    const dispatch = useDispatch()

    const allPackagingCenter = useSelector((state) => state.darkStorePackagingCenterSlice.allDarkStorePackagingCenter)

    const filteredPackagingCenter = allPackagingCenter?.data?.filter((item) => item.type == "packaging_center")


    const handleDelete = async (id) => {
        setLoading(true)

        await deleteStore(id)
        toast.success("Deleted", {
            description: "Packaging Center deleted successfully"
        })

        getStoreList();
    }


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

        if (allPackagingCenter.length === 0) {
            fetchAllDarkStoresPackagingCenter()
        } else {
            setLoading(false)
        }
    }, [allPackagingCenter, dispatch])


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
                <div className="flex justify-end items-center">
                    {/* <h2 className="text-2xl font-bold">Packaging Stores</h2> */}
                    <Button onClick={() => router.push("/packaging-stores/new")} className='cursor-pointer'>Create Packaging Center</Button>
                </div>

                {filteredPackagingCenter && <PackagingStoreTable data={filteredPackagingCenter} onDelete={handleDelete} />}
            </div>

        </MainLayout>
    )
}
