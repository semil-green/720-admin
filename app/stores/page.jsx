"use client"

import MainLayout from "@/components/layout/mainLayout";
import { useEffect, useState } from "react"
import StoreTable from "@/components/stores/StoreTable"
import { toast } from "sonner"
import { getStores, deleteStore } from "@/lib/api/store"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function DarkStores() {
    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)
    const [storeIdForAvailablePincode, setStoreIdForAvailablePincode] = useState(0);
    const [storeIdForSlots, setStoreIdForSlots] = useState(0);
    const [pincode, setPincode] = useState('')
    const [slot, setSlot] = useState({})

    const router = useRouter()

    useEffect(() => {
        getStoreList();
    }, [])

    const getStoreList = async () => {
        setLoading(true)

        const stores = await getStores();
        setStores(stores)

        setLoading(false)
    }

    const handleDelete = async (id) => {
        setLoading(true)

        await deleteStore(id)
        toast.success("Deleted", {
            description: "Packaging Store deleted successfully"
        })

        getStoreList();
    }

    const openAvailablePincodesModal = (storeId) => {
        setStoreIdForAvailablePincode(storeId);
    }

    const closeAvailablePincodesModal = () => {
        setStoreIdForAvailablePincode(0);
    }

    const openSlotsModal = (storeId) => {
        setStoreIdForSlots(storeId);
    }

    const closeSlotsModal = () => {
        setStoreIdForSlots(0);
    }

    const getAvalaiblePincodes = () => {
        console.log('--------------------------- opened -------------------------------')
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
                <div className="flex justify-end items-center gap-3">
                    {/* <h2 className="text-2xl font-bold">Stores</h2> */}
                    <Button onClick={() => router.push("/stores/new")} className='cursor-pointer'>Create Store</Button>
                </div>

                {stores && <StoreTable data={stores} onDelete={handleDelete}
                    openAvailablePincodesModal={openAvailablePincodesModal} openSlotsModal={openSlotsModal} />}
            </div>

            {/* Pincodes */}
            <Dialog open={!!storeIdForAvailablePincode > 0} onOpenChange={() => closeAvailablePincodesModal()}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Available Pincodes</DialogTitle>
                        <DialogDescription>
                            Items will be available for express delivery for below pincodes.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="pincode" className="sr-only">Pincode</Label>
                                <Input name="pincode" className='border-white' value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder='Pincode' />
                            </div>
                            <Button type="button">Add</Button>
                        </div>
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                            <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                                345464
                                <span className="pointer-cursor">&times;</span>
                            </Button>
                            <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                                565464
                                <span className="pointer-cursor">&times;</span>
                            </Button>
                            <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                                355558
                                <span className="pointer-cursor">&times;</span>
                            </Button>
                            <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                                956753
                                <span className="pointer-cursor">&times;</span>
                            </Button>
                            <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                                236344
                                <span className="pointer-cursor">&times;</span>
                            </Button>
                            <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                                958745
                                <span className="pointer-cursor">&times;</span>
                            </Button>
                            <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                                307005
                                <span className="pointer-cursor">&times;</span>
                            </Button>
                            <Button type="button" variant="outline" className='p-3 h-6 bg-white text-accent'>
                                360504
                                <span className="pointer-cursor">&times;</span>
                            </Button>

                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={() => setStoreIdForAvailablePincode(0)}>
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Slotes */}
            <Dialog open={!!storeIdForSlots > 0} onOpenChange={() => closeSlotsModal()}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Schedule Slots</DialogTitle>
                        <DialogDescription>
                            Schedule pre-defined slots for selected store.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="">
                                <Label htmlFor="SlotName" className="sr-only">Slot Name</Label>
                                <Input name="SlotName" className='border-white' value={slot.SlotName} onChange={(e) => setSlot({ ...slot, SlotName: e.target.value })} placeholder='Slot Name' />
                            </div>
                            <div className="">
                                <Label htmlFor="FromTime" className="sr-only">From Time</Label>
                                <Input type='time' className='border-white' name="FromTime" value={slot.FromTime} onChange={(e) => setSlot({ ...slot, FromTime: e.target.value })} placeholder='From Time' />
                            </div>
                            <div className="">
                                <Label htmlFor="ToTime" className="sr-only">To Time</Label>
                                <Input type='time' className='border-white' name="ToTime" value={slot.ToTime} onChange={(e) => setSlot({ ...slot, ToTime: e.target.value })} placeholder='To Time' />
                            </div>
                        </div>
                        <Button type="button" className='h-8'>Add</Button>
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                            <table className="w-full divide-y divide-gray-200 text-sm text-left rounded overflow-hidden">
                                <thead className="bg-orange-100">
                                    <tr>
                                        <th className="px-4 py-2 font-semibold text-gray-700">Slot</th>
                                        <th className="px-4 py-2 font-semibold text-gray-700">From</th>
                                        <th className="px-4 py-2 font-semibold text-gray-700">To</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    <tr>
                                        <td className="px-4 py-2">Slot 1</td>
                                        <td className="px-4 py-2">08:00 AM</td>
                                        <td className="px-4 py-2">09:00 AM</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Slot 2</td>
                                        <td className="px-4 py-2">10:00 AM</td>
                                        <td className="px-4 py-2">11:00 AM</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Slot 3</td>
                                        <td className="px-4 py-2">12:00 PM</td>
                                        <td className="px-4 py-2">01:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Slot 4</td>
                                        <td className="px-4 py-2">02:00 PM</td>
                                        <td className="px-4 py-2">04:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Slot 5</td>
                                        <td className="px-4 py-2">05:00 PM</td>
                                        <td className="px-4 py-2">06:00 PM</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" onClick={() => closeSlotsModal(0)}>
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </MainLayout>
    )
}
