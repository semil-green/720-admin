"use client"

import MainLayout from "@/components/layout/mainLayout";
import UserForm from "@/components/users/UserForm"
import { addUser } from "@/lib/api/user"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

export default function CreateUserPage() {
    const router = useRouter()

    const handleSubmit = async (data) => {
        await addUser(data)
        toast.success("Created", { description: "User created successfully" })
        router.push("/users")
    }

    const searchParams = useSearchParams();
    const editId = searchParams.get("id");

    return (
        <MainLayout>
            <div className="max-w-xl">
                <Card className='flex-1'>
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">{editId ? "Edit User" : "Create User"}</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UserForm initialData={{}} onSubmit={handleSubmit} userEditId={editId} />
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    )
}