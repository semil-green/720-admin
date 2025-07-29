"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUsers, deleteUser } from "@/lib/api/user"
import UserTable from "@/components/users/UserTable"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import MainLayout from "@/components/layout/mainLayout";
import { getAllUsersService } from "@/service/user/user.service"
import { useDispatch, useSelector } from "react-redux";
import { setAllUSers } from "@/store/slices/user-slice/user.slice"
import { getAllRoles } from "@/service/role-master/role-master.service"

export default function Users() {
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const dispatch = useDispatch();
    const allUsersData = useSelector((state) => state.userSlice.users)

    const handleDelete = async (id) => {
        setLoading(true)

        await deleteUser(id)
        toast.success("Deleted", {
            description: "User deleted successfully"
        })
    }

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const res = await getAllUsersService();
                dispatch(setAllUSers(res?.data));
                setLoading(false)
            } catch (err) {
                console.error("Failed to fetch roles:", err);
            }
        };

        fetchAllUsers();
    }, [])

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
                    <Button onClick={() => router.push("/users/new")} className='cursor-pointer'>Add User</Button>
                </div>

                <UserTable data={allUsersData} onDelete={handleDelete} />
            </div>
        </MainLayout>
    )
}
