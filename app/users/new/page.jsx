"use client"

import MainLayout from "@/components/layout/mainLayout";
import UserForm from "@/components/users/UserForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CreateUserPageContent() {
    const searchParams = useSearchParams();
    const editId = searchParams.get("id");

    return (
        <MainLayout>
            <div className="max-w-xl">
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">
                                {editId ? "Edit User" : "Create User"}
                            </h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UserForm userEditId={editId} />
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}

export default function CreateUserPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateUserPageContent />
        </Suspense>
    );
}