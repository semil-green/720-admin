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
import {
    Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog"
import DayOffForm from "@/components/day-off/DayOffForm";
import DayOffTable from "@/components/day-off/DayOffTable";
import { deleteDayOff, getDayOffByStoreId, saveDayOff } from "@/service/day-off/dayoff.service";
import * as XLSX from "xlsx";


export default function DarkStores() {
    const router = useRouter();
    const dispatch = useDispatch();

    const darkStores = useSelector((state) => state.darkStoreSlice.darkStores);

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [totalPages, setTotalPages] = useState(1);
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");
    const [appliedSearch, setAppliedSearch] = useState("");
    const [dayOffConfigurations, setDayOffConfigurations] = useState([]);
    const [dayOffConfiguration, setWDayOffConfiguration] = useState({
        day_off_id: 0,
        store_id: 0,
        day_off_date: new Date().toISOString().split('T')[0],
        day_off_remarks: "",
    });
    const [selectedStoreId, setSelectedStoreId] = useState(0);
    const [isDayOffModalOpen, setIsDayOffModalOpen] = useState(false);


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

    const getDaysOffByStoreId = async (storeId) => {
        return await new Promise(async (resolve) => {
            try {
                setLoading(true);
                const result = await getDayOffByStoreId(storeId);

                if (result?.status === 200) {
                    resolve(result.data);
                } else {
                    toast.error("Error fetching Day Off", {
                        description: result?.message || "Something went wrong",
                    });
                    resolve([]);
                }
            } catch (error) {
                toast.error("Error fetching Packaging Centers", {
                    description: "Something went wrong",
                })
                resolve([]);
            } finally {
                setLoading(false);
            }
        })
    };

    const setDayOff = async (storeId) => {
        setLoading(true);
        const data = await getDaysOffByStoreId(storeId);
        setDayOffConfigurations(data);
        setSelectedStoreId(storeId);
        setIsDayOffModalOpen(true);
        setLoading(false);
    }

    const handleDayOffSubmit = async (data) => {
        try {
            setLoading(true);
            const payload = { ...data, store_id: selectedStoreId };
            const result = await saveDayOff(payload);

            if (result?.status === 201) {
                toast.success("Success", { description: "Day Off set successfully." });
                setIsDayOffModalOpen(false);
            } else {
                const message = result?.response?.data?.message || "Something went wrong";
                toast.error("Error saving Day Off", {
                    description: message,
                });
            }
        } catch (error) {
            toast.error("Error saving Day Off", {
                description: "Something went wrong",
            })
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteDayOff = async (id) => {
        try {
            setLoading(true);
            const result = await deleteDayOff(id);

            if (result?.status === 200) {
                toast.success("Success", { description: "Day Off deleted successfully." });
                setIsDayOffModalOpen(false);
            } else {
                const message = result?.response?.data?.message || "Something went wrong";
                toast.error("Error deleting Day Off", {
                    description: message,
                });
            }
        } catch (error) {
            toast.error("Error deleting Day Off", {
                description: "Something went wrong",
            })
        } finally {
            setLoading(false);
        }
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
                        setDayOff={setDayOff}
                    />
                )}
            </div>


            {/* Day Off Modal */}
            <Dialog open={!!isDayOffModalOpen > 0} onOpenChange={() => setIsDayOffModalOpen(false)}>
                <DialogContent className="min-w-max">
                    <DialogHeader className={'gap-1 border-b-1 pb-3'}>
                        <DialogTitle>
                            Set Day Off
                        </DialogTitle>
                        <DialogDescription>
                            Add/Update Day off from here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <DayOffForm initialData={dayOffConfiguration} onSubmit={handleDayOffSubmit} handleCose={() => setIsDayOffModalOpen(false)} />

                        <div className="border-b-1 pb-2 mb-2"></div>

                        <DayOffTable data={dayOffConfigurations} onDelete={handleDeleteDayOff} />
                    </div>
                </DialogContent>
            </Dialog>

        </MainLayout>
    );
}
