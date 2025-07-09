"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { getUser, updateUser } from "@/lib/api/user"
import UserForm from "@/components/users/UserForm"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import MainLayout from "@/components/layout/mainLayout";

export default function EditUserPage() {
    const router = useRouter()
    const { id } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        getForEdit();
    }, [id])

    const getForEdit = async () => {
        const data = await getUser(id)
        if (!data) return router.push("/users")
        setUser(data)
    }

    const handleSubmit = async (data) => {
        await updateUser(id, data)
        toast.success("Created", { description: "Store created successfully" })
        router.push("/users")
    }

    return (
        <MainLayout>
            {!user &&
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            }

            <div className="max-w-xl">
                <h2 className="text-2xl font-bold mb-4">Edit User</h2>
                <UserForm initialData={user} onSubmit={handleSubmit} />
            </div>
        </MainLayout>
    )
}