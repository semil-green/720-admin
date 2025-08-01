"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserTable from "@/components/users/UserTable";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import MainLayout from "@/components/layout/mainLayout";
import {
    deleteUseService,
    getAllUsersService,
} from "@/service/user/user.service";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteUserData,
    setAllUSers,
} from "@/store/slices/user-slice/user.slice";

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

        const res = await deleteUseService(id);

        if (res?.status == 200) {
            dispatch(deleteUserData(id));
            toast.success("Deleted", {
                description: "User deleted successfully",
            });
        }
        else {
            toast.error("Error deleting user", {
                description: res?.data?.message || "Something went wrong",
            });
        }
        setLoading(false);
    };
    const fetchAllUsers = async () => {
        try {
            setLoading(true);
            const res = await getAllUsersService(page, limit);

            const result = res.data;
            const usersArray = result.data || [];
            const totalCount = result.total || 0;

            if (res?.status === 200) {
                dispatch(setAllUSers(usersArray));
                setTotalPages(Math.ceil(totalCount / limit));
            }
        } catch (err) {
            const status = err?.response?.status;
            const message = err?.response?.data?.message || "Something went wrong";

            if (status === 401 || status === 403) {
                toast.error("Access Denied", {
                    description: message,
                });
            } else {
                toast.error("Error fetching users", {
                    description: message,
                });
            }
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
