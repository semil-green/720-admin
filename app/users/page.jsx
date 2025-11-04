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
import FilterDropdown from "@/components/items/FilterDropDown";
import { Input } from "@/components/ui/input";
export default function Users() {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");

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
            toast.error(res?.response?.data?.message || "Failed to delete user");
        }
        setLoading(false);
    };

    const fetchAllUsers = async (
        pageParam = page,
        limitParam = limit,
        searchParam = search,
        sortByParam = sort?.sortBy,
        sortOrderParam = sort?.sortOrder
    ) => {
        try {
            setLoading(true);
            const res = await getAllUsersService(
                pageParam,
                limitParam,
                searchParam,
                sortByParam,
                sortOrderParam
            );

            const usersArray = res?.data?.data || [];
            if (res?.status === 200) {
                dispatch(setAllUSers(usersArray));
                const totalCount = Number(res?.data?.total) || 0;
                setTotalPages(Math.ceil(totalCount / limitParam));
            } else
                toast.error(res?.response?.data?.message || "Failed to fetch user");
        } catch (err) {
            const status = err?.response?.status;
            const message = err?.response?.data?.message || "Something went wrong";

            if (status === 401 || status === 403) {
                toast.error("Access Denied", { description: message });
            } else {
                toast.error("Error fetching users", { description: message });
            }
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchAllUsers();
    }, [page, limit, sort?.sortBy, sort?.sortOrder]);

    const userSortColumns = [
        { label: "Name", value: "full_name" },
        { label: "Email", value: "email" },
    ]

    const handleUserSortChange = (sort) => {
        setSort(sort);
        setPage(1);
    }

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

                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <Input
                            placeholder="Search User"
                            className="w-2xl"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    fetchAllUsers(1, limit, search, sort?.sortBy, sort?.sortOrder);
                                }
                            }}
                        />
                        <Button
                            onClick={() => {
                                setPage(1);
                                fetchAllUsers(1, limit, search, sort?.sortBy, sort?.sortOrder);
                            }}>
                            Search
                        </Button>
                        <Button

                            onClick={() => {
                                setSearch("");
                                setPage(1);
                                setSort("");
                                fetchAllUsers(1, limit, "", "", "");
                            }}
                            variant={"link"}
                        >
                            Clear
                        </Button>
                    </div>
                    <div className="flex justify-end">
                        <FilterDropdown
                            columns={userSortColumns}
                            onSortChange={handleUserSortChange}
                        />
                    </div>
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
