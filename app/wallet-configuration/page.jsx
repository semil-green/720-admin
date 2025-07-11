"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getWalletConfigurations, deleteWalletConfiguration, addWalletConfiguration, getWalletConfiguration, updateWalletConfiguration } from "@/lib/api/wallet-configuration"
import WalletConfigurationTable from "@/components/wallet-configuration/WalletConfigurationTable"
import WalletConfigurationForm from "@/components/wallet-configuration/WalletConfigurationForm"
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

export default function WalletConfigurations() {
    const [walletConfigurations, setWalletConfigurations] = useState([])
    const [walletConfiguration, setWalletConfiguration] = useState({})
    const [loading, setLoading] = useState(true)
    const [isWalletConfigurationModalOpen, setIsWalletConfigurationModalOpen] = useState(false)

    useEffect(() => {
        getWalletConfigurationList();
    }, [])

    const getWalletConfigurationList = async () => {
        setLoading(true)

        const walletConfigurations = await getWalletConfigurations();
        setWalletConfigurations([...walletConfigurations])
        setLoading(false)
    }

    const handleDelete = async (id) => {
        setLoading(true)

        await deleteWalletConfiguration(id)
        toast.success("Deleted", {
            description: "Wallet Configuration deleted successfully"
        })

        await getWalletConfigurationList();
    }

    const handleSubmit = async (data) => {
        if (data.WalletConfigurationId === 0) {
            await addWalletConfiguration(data)
            toast.success("Created", { description: "Wallet Configuration created successfully" })
        } else {
            await updateWalletConfiguration(data.WalletConfigurationId, data)
            toast.success("Updated", { description: "Wallet Configuration updated successfully" })
        }
        setIsWalletConfigurationModalOpen(false);
        await getWalletConfigurationList();
    }

    const handleEdit = async (id) => {
        setLoading(true);
        const data = await getWalletConfiguration(id)
        setWalletConfiguration(data)
        setIsWalletConfigurationModalOpen(true);
        setLoading(false);
    }

    const openAddWalletConfiguration = () => {
        setWalletConfiguration({})
        setIsWalletConfigurationModalOpen(true);
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
                <div className="flex justify-end items-center">
                    {/* <h2 className="text-2xl font-bold">Users</h2> */}
                    <Button onClick={() => openAddWalletConfiguration()} className='cursor-pointer'>Add Wallet Configuration</Button>
                </div>

                <WalletConfigurationTable data={walletConfigurations} onEdit={handleEdit} onDelete={handleDelete} />
            </div>

            {/* Add/Edit Category */}
            <Dialog open={!!isWalletConfigurationModalOpen > 0} onOpenChange={() => setIsWalletConfigurationModalOpen(false)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {walletConfiguration.WalletConfigurationId > 0 ? 'Update Wallet Configuration' : 'Add Wallet Configuration'}
                        </DialogTitle>
                        <DialogDescription>
                            Add/Update Wallet Configuration from here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <WalletConfigurationForm initialData={walletConfiguration} onSubmit={handleSubmit} handleCose={() => setIsWalletConfigurationModalOpen(false)} />
                    </div>
                </DialogContent>
            </Dialog>

        </MainLayout>
    )
}
