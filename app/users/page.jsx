"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUsers, deleteUser } from "@/lib/api/user"
import UserTable from "@/components/users/UserTable"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import MainLayout from "@/components/layout/mainLayout";

export default function Users() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        getUserList();
    }, [])

    const getUserList = async () => {
        setLoading(true)

        const users = await getUsers();
        setUsers(users)

        setLoading(false)
    }

    const handleDelete = async (id) => {
        setLoading(true)

        await deleteUser(id)
        toast.success("Deleted", {
            description: "User deleted successfully"
        })

        getStoreList();
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
                    <Button onClick={() => router.push("/users/new")} className='cursor-pointer'>Add User</Button>
                </div>

                <UserTable data={users} onDelete={handleDelete} />
            </div>
        </MainLayout>
    )
}
