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

const page = () => {

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState("");
    const [sortType, setSortType] = useState("ASC");

    const dispatch = useDispatch();

    const allVendorsData = useSelector(
        (state) => state.vendorMasterSlice.allVendors
    );

    useEffect(() => {
        const fetchVendors = async () => {
            const result = await getAllVendorsService({
                page,
                limit,
                sortBy: sortBy || undefined,
                sortType,
            });

            if (result?.status === 200) {
                dispatch(setVendors(result?.data));

                const totalCount = result?.data?.total || 0;
                setTotalPages(Math.ceil(totalCount / limit));
            }

            else {
                toast.error("Error in fetching vendors");
            }
        };

        fetchVendors();
    }, [page, limit, sortBy, sortType, dispatch]);


    return (
        <MainLayout>
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

                <div className="flex items-center justify-end gap-2 my-4">
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
                        <option value="vendor_name">Vendor Name</option>
                        <option value="payment_mode">Payment Mode</option>
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
