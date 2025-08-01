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

export default function DarkStores() {
    const router = useRouter();
    const dispatch = useDispatch();

    const darkStores = useSelector((state) => state.darkStoreSlice.darkStores);

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("");
    const [sortType, setSortType] = useState("ASC");

    useEffect(() => {
        const fetchDarkStores = async () => {
            try {
                setLoading(true);
                const result = await getAllDarkStorePackagingCenter({
                    type: "dark_store",
                    page,
                    limit,
                    sortBy: sortBy ? `dsp.${sortBy}` : undefined,
                    sortType,
                });


                const storeList = result?.data?.data || [];
                const totalCount = result?.data?.total || 0;

                if (result?.status === 200) {

                    dispatch(setDarkStores(storeList));
                    setTotalPages(Math.ceil(totalCount / limit));
                }
                else {
                    toast.error("Error fetching dark stores", {
                        description: result?.data?.message || "Something went wrong",
                    });
                }

            } catch (error) {
                console.error("Error fetching dark stores:");
            } finally {
                setLoading(false);
            }
        };

        fetchDarkStores();
    }, [page, limit, sortBy, sortType, dispatch]);

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

                    <div className="flex items-center gap-2">
                        <label className="text-sm">Sort by:</label>
                        <select
                            value={sortBy}
                            onChange={(e) => {
                                setSortBy(e.target.value);
                                setPage(1);
                            }}
                            className="border px-2 py-1 rounded text-sm"
                        >
                            <option value="">Default</option>
                            <option value="store_name">Store Name</option>
                            <option value="store_code">Store Code</option>
                            <option value="store_pincode">Pincode</option>
                            <option value="address">Address</option>
                        </select>

                        <Button
                            variant="outline"
                            onClick={() =>
                                setSortType((prev) => (prev === "ASC" ? "DESC" : "ASC"))
                            }
                        >
                            {sortType === "DESC" ? "Descending" : "Ascending"}
                        </Button>
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
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        sortType={sortType}
                        setSortType={setSortType}
                    />
                )}
            </div>
        </MainLayout>
    );
}
