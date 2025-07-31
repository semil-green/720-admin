"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers, deleteUser } from "@/lib/api/user";
import UserTable from "@/components/users/UserTable";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import MainLayout from "@/components/layout/mainLayout";
import { getAllUsersService } from "@/service/user/user.service";
import { useDispatch, useSelector } from "react-redux";
import { setAllUSers } from "@/store/slices/user-slice/user.slice";
import { getAllRoles } from "@/service/role-master/role-master.service";
import { all } from "axios";

export default function Users() {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);

    const router = useRouter();
    const dispatch = useDispatch();

    const allUsersData = useSelector((state) => state.userSlice.users);

    const handleDelete = async (id) => {
        setLoading(true);

        await deleteUser(id);
        toast.success("Deleted", {
            description: "User deleted successfully",
        });
    };

    const fetchAllUsers = async () => {
        try {
            setLoading(true);
            const res = await getAllUsersService(page, limit);


            const result = res.data;

            const usersArray = result.data || [];
            const totalCount = result.total || 0;

            dispatch(setAllUSers(usersArray));
            setTotalPages(Math.ceil(totalCount / limit));
        } catch (err) {
            console.error("Failed to fetch users:", err);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchAllUsers();
    }, [page, limit]);

    return (
        <MainLayout>
            {loading && (
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            )}

            <div className="space-y-4">
                <div className="flex justify-end items-center">
                    <Button
                        onClick={() => router.push("/users/new")}
                        className="cursor-pointer"
                    >
                        Add User
                    </Button>
                </div>

                <UserTable
                    data={allUsersData}
                    onDelete={handleDelete}
                    page={page}
                    limit={limit}
                    totalPages={totalPages}
                    setPage={setPage}
                    setLimit={setLimit}
                />
            </div>
        </MainLayout>
    );
}
