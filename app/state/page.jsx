"use client";
import MainLayout from "@/components/layout/mainLayout";
import StateTable from "@/components/state/stateTable";
import { getAllStatesService } from "@/service/state/state.service";
import { setAllStates } from "@/store/slices/state/state.slice";
import { Loader2 } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import StateForm from "@/components/state/stateForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FilterDropdown from "@/components/items/FilterDropDown";

const page = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchState, setSearchState] = useState("");
    const [sortState, setSortState] = useState(null);
    const [editingState, setEditingState] = useState(null);

    const [isCityModalOpen, setIsCityModalOpen] = useState(false);

    const dispatch = useDispatch();
    const allStates = useSelector((state) => state.stateSlice.allStates);

    const fetchStates = async (pageNum = page, limitNum = limit, search = searchState, sortBy = sortState?.sortBy, sortOrder = sortState?.sortOrder) => {
        try {
            setLoading(true);
            const data = await getAllStatesService(pageNum, limitNum, search, sortBy, sortOrder);

            if (data?.status === 200) {
                setTotalCount(data?.data?.total_count);
                dispatch(setAllStates(data?.data?.data));
            } else {
                toast.error("Failed to get all states");
            }
        } catch (err) {
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStates(page, limit, searchState, sortState?.sortBy, sortState?.sortOrder);
    }, [page, limit, sortState]);

    const openAddCity = () => {
        setIsCityModalOpen(true);
    };

    const stateColumns = [
        { label: "state", value: "state_name" },
    ];

    const handleProductSortChange = (sort) => {
        setSortState(sort);
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

            <div className="flex justify-end mb-4">
                <Button onClick={openAddCity}>Add State</Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex flex-1 gap-2">
                    <Input
                        placeholder="Search State"
                        className="flex-1 sm:flex-[2]"
                        onChange={(e) => setSearchState(e.target.value)}
                        value={searchState}
                    />
                    <Button
                        onClick={() => fetchStates(page, limit, searchState)}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            setSearchState("");
                            setPage(1);
                            fetchStates(1, limit, "");
                        }}
                        variant={"link"}
                    >
                        Clear
                    </Button>
                </div>

                <div className="flex justify-end">
                    <FilterDropdown
                        columns={stateColumns}
                        onSortChange={handleProductSortChange}
                    />
                </div>
            </div>

            <Dialog open={isCityModalOpen} onOpenChange={(open) => {
                setIsCityModalOpen(open);
                if (!open) setEditingState(null);
            }}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            Add state
                        </DialogTitle>
                        <DialogDescription>
                            Add/Update state from here.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <StateForm
                            editStateData={editingState}
                            handleClose={() => { setIsCityModalOpen(false); setEditingState(null) }}

                        />
                    </div>
                </DialogContent>
            </Dialog>

            <div className="mt-4">

                <StateTable
                    data={allStates}
                    page={page}
                    limit={limit}
                    totalPages={Math.ceil(totalCount / limit)}
                    setPage={setPage}
                    setIsCityModalOpen={setIsCityModalOpen}
                    setEditingState={setEditingState}
                />
            </div>
        </MainLayout>
    );
};

export default page;
