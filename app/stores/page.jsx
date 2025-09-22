"use client";

import MainLayout from "@/components/layout/mainLayout";
import { useEffect, useState } from "react";
import StoreTable from "@/components/stores/StoreTable";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getAllDarkStorePackagingCenter } from "@/service/darkStore-packagingCenter/darkStore-packagingCenter.service";
import { useDispatch, useSelector } from "react-redux";
import { setDarkStores } from "@/store/slices/dark-store/dark-store.slice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { Input } from "@/components/ui/input";
import FilterDropdown from "@/components/items/FilterDropDown";
export default function DarkStores() {
    const router = useRouter();
    const dispatch = useDispatch();

    const darkStores = useSelector((state) => state.darkStoreSlice.darkStores);

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");

    const fetchDarkStores = async ({ page, limit, sort, search }) => {
        try {
            setLoading(true);
            const result = await getAllDarkStorePackagingCenter({
                type: "dark_store",
                page,
                limit,
                sortBy: sort?.sortBy,
                sortOrder: sort?.sortOrder,
                search: search?.trim() || "",
            });

            const storeList = result?.data?.data || [];
            const totalCount = result?.data?.total || 0;

            if (result?.status === 200) {

                dispatch(setDarkStores(storeList));
                setTotalPages(Math.ceil(totalCount / limit));
            } else {
                toast.error("Error fetching Packaging Centers", {
                    description: result?.data?.message || "Something went wrong",
                });
            }
        } catch (error) {
            toast.error("Error fetching Packaging Centers", {
                description: "Something went wrong",
            })
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDarkStores({ page, limit, sort, search: appliedSearch });
    }, [page, limit, sort, appliedSearch, dispatch]);

    const packagingCenterColumns = [
        { label: "Store", value: "store_name" },
        { label: "Store Code", value: "store_code" },
        { label: "Store Pincode", value: "store_pincode" },
        { label: "Address", value: "address" },
    ];

    const handleSearch = () => {
        setPage(1);
        setAppliedSearch(search);
    };

    const handleClear = () => {
        setSearch("");
        setAppliedSearch("");
        setPage(1);
    };

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
                <div className="flex flex-col flex-wrap justify-end items-end gap-4">
                    <Button onClick={() => router.push("/stores/new")} className="btn">
                        Create Store
                    </Button>

                </div>

                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <Input
                            placeholder="Search Dark Store"
                            className="w-2xl"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                        />
                        <Button onClick={handleSearch}>Search</Button>
                        <Button onClick={handleClear} variant="link">
                            Clear
                        </Button>
                    </div>

                    <div className="flex justify-end">
                        <FilterDropdown
                            columns={packagingCenterColumns}
                            onSortChange={setSort}
                        />
                    </div>
                </div>

                {darkStores && (
                    <StoreTable
                        data={darkStores}
                        page={page}
                        limit={limit}
                        setLimit={setLimit}
                        setPage={setPage}
                        totalPages={totalPages}
                    />
                )}
            </div>
        </MainLayout>
    );
}
