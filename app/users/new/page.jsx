"use client"

import MainLayout from "@/components/layout/mainLayout";
import UserForm from "@/components/users/UserForm"
import { addUser } from "@/lib/api/user"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function CreateUserPage() {
    const router = useRouter()

    const handleSubmit = async (data) => {
        await addUser(data)
        toast.success("Created", { description: "User created successfully" })
        router.push("/users")
    }

    return (
        <MainLayout>
            <div className="max-w-xl">
                <h2 className="text-2xl font-bold mb-4">Create User</h2>
                <UserForm initialData={{}} onSubmit={handleSubmit} />
            </div>
        </MainLayout>
    )
}