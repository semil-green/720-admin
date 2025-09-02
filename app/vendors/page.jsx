"use client";
import MainLayout from "@/components/layout/mainLayout";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookText } from "lucide-react";
import Link from "next/link";
import VendorsTable from "@/components/vendor/vendortable";
import { useDispatch, useSelector } from "react-redux";
import { getAllVendorsService } from "@/service/vendor-master/vendor-master.service";
import { toast } from "sonner";
import { setVendors } from "@/store/slices/vendor-master/vendor-master.slice";
import FilterDropdown from "@/components/items/FilterDropDown";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react"


const page = () => {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [vendorSort, setVendorSort] = useState("ASC");
    const [vendorSearch, setVendorSearch] = useState("");
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    const allVendorsData = useSelector(
        (state) => state.vendorMasterSlice.allVendors
    );

    const fetchVendors = async (
        currentPage = page,
        currentLimit = limit,
        search = vendorSearch,
        sortBy = vendorSort?.sortBy,
        sortOrder = vendorSort?.sortOrder
    ) => {
        try {
            setLoading(true);
            const result = await getAllVendorsService(
                currentPage,
                currentLimit,
                search,
                sortBy,
                sortOrder
            );

            if (result?.status === 200) {
                dispatch(setVendors(result?.data));

                const totalCount = result?.data?.total || 0;
                setTotalPages(Math.ceil(totalCount / currentLimit));
                setLoading(false);
            } else {
                toast.error("Error in fetching vendors");
                setLoading(false);
            }
        } catch (error) {
            toast.error("Something went wrong");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVendors(page, limit, vendorSearch, vendorSort?.sortBy, vendorSort?.sortOrder);
    }, [page, limit]);

    useEffect(() => {
        if (vendorSort) {
            fetchVendors(1, limit, vendorSearch, vendorSort?.sortBy, vendorSort?.sortOrder);
            setPage(1);
        }
    }, [vendorSort]);


    const vendorColumns = [
        { label: "name", value: "vendor_name" },
        { label: "payment mode", value: "payment_mode" },

    ];

    const handleVendorSortChange = (sort) => {
        setVendorSort(sort);
    };

    return (
        <MainLayout>

            {loading &&
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            }
            <div className="space-y-4">
                <div className="flex justify-between items-end ">
                    <div className="flex  gap-3">
                        <BookText />
                        <h1 className="font-semibold text-xl">Vendors</h1>
                    </div>
                    <div className="flex gap-3">
                        <Button className="cursor-pointer" variant={"secondary"}>
                            More Actions
                        </Button>
                        <Link href={"/vendors/new "}>
                            <Button className="cursor-pointer">Add Vendors</Button>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-1 gap-2">
                        <Input
                            placeholder="Search City"
                            className="flex-1 sm:flex-[2]"
                            onChange={(e) => setVendorSearch(e.target.value)}
                            value={vendorSearch}
                        />
                        <Button onClick={() => fetchVendors(1, limit, vendorSearch)}>
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                setVendorSearch("");
                                setPage(1);
                                fetchVendors(1, limit, "");
                            }}
                            variant={"link"}
                        >
                            Clear
                        </Button>
                    </div>

                    <div className="flex justify-end">
                        <FilterDropdown columns={vendorColumns} onSortChange={handleVendorSortChange} />
                    </div>
                </div>

                <VendorsTable
                    vendorData={allVendorsData}
                    page={page}
                    setPage={setPage}
                    limit={limit}
                    setLimit={setLimit}
                    totalPages={totalPages}
                />
            </div>
        </MainLayout>
    );
};

export default page;
