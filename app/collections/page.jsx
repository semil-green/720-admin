"use client";

import React, { useEffect, useState } from 'react'
import MainLayout from "@/components/layout/mainLayout";
import { Button } from '@/components/ui/button';
import { BookText, Loader2 } from "lucide-react"
import CollectionsTable from '@/components/collections/CollectionsTable';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "sonner"
import { getAllCollectionsService } from '@/service/collections/collections.service';
import { setCollections } from '@/store/slices/collections/collections.slice';
import * as XLSX from "xlsx";
import { Input } from "@/components/ui/input";
import FilterDropdown from "@/components/items/FilterDropDown";
export default function Collections() {

    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [totalPage, setTotalPage] = useState(0);
    const [totalRecordCount, setTotalRecordCount] = useState(0);
    const [searchCollections, setSearchCollections] = useState("");
    const [sortCollection, setSortCollection] = useState(null);


    const dispatch = useDispatch();

    const allCollectionsData = useSelector((state) => state.collectionsSlice.allCollections)


    const fetchCollectionData = async () => {
        setLoading(true)
        try {
            const res = await getAllCollectionsService(page, limit, searchCollections, sortCollection?.sortBy, sortCollection?.sortOrder)

            if (res?.data) {
                setTotalPage(Math.ceil(res?.data?.total / limit))
                setTotalRecordCount(res?.data?.total)
                dispatch(setCollections(res?.data?.data))

                setLoading(false)
            }
        }
        catch (error) {
            toast.error("Error in fetching collections");
        }
    }

    useEffect(() => {


        fetchCollectionData()
    }, [page, limit, sortCollection])

    const exportToExcelCollectionsData = (collectionsData = []) => {
        if (!collectionsData || collectionsData.length === 0) {
            toast.error("No collection data available to export");
            return;
        }

        const formattedData = collectionsData.map((item) => ({
            "Collection ID": item.collection_id || "-",
            "Title": item.title || "-",
            "Products": item.no_of_products ?? 0,
            "Order No": item.collection_order_no ?? 0,
            "Status": item.status ? "Active" : "Inactive",
        }));

        const worksheet = XLSX.utils.json_to_sheet(formattedData);

        const columnWidths = Object.keys(formattedData[0]).map((key) => ({
            wch: Math.max(
                key.length,
                ...formattedData.map((row) => String(row[key] || "").length)
            ) + 2,
        }));
        worksheet["!cols"] = columnWidths;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Collections");

        XLSX.writeFile(workbook, "Collections_Data.xlsx");

    };

    const collectionsColumns = [
        { label: "Collections", value: "title" },
        { label: "Products", value: "no_of_products" },
        { label: "Order No", value: "collection_order_no" },
        { label: "Status", value: "status" },
    ];

    const handleProductSortChange = (sort) => {
        setSortCollection(sort);
    };

    return (
        <MainLayout>

            <div className="space-y-4">
                <div className="flex justify-between items-end ">
                    <div className='flex  gap-3'>
                        <BookText />
                        <h1 className='font-semibold text-xl'>Collections</h1>
                    </div>
                    <div className='flex gap-3'>

                        <Button className='cursor-pointer' onClick={() => exportToExcelCollectionsData(allCollectionsData)}>Export</Button>
                        <Link href={'/collections/new'} >
                            <Button className='cursor-pointer'>Add Collections</Button>
                        </Link>
                    </div>
                </div>


                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-1 gap-2">
                        <Input
                            placeholder="Search Collections"
                            className="flex-1 sm:flex-[2]"
                            onChange={(e) => setSearchCollections(e.target.value)}
                            value={searchCollections}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    fetchCollectionData(page, limit, searchCollections, sortCollection?.sortBy, sortCollection?.sortOrder)
                                }
                            }}
                        />
                        <Button
                            onClick={() => fetchCollectionData(page, limit, searchCollections, sortCollection?.sortBy, sortCollection?.sortOrder)}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                setSearchCollections("");
                                setPage(1);
                                fetchCollectionData(1, limit, "");
                            }}
                            variant={"link"}
                        >
                            Clear
                        </Button>
                    </div>

                    <div className="flex justify-end">
                        <FilterDropdown
                            columns={collectionsColumns}
                            onSortChange={handleProductSortChange}
                        />
                    </div>
                </div>

                {loading && (
                    <div className="fixed flex w-full h-full top-0 left-0 z-10">
                        <div className="flex-1 flex justify-center items-center">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        </div>
                    </div>
                )}
                <CollectionsTable
                    allCollectionsData={allCollectionsData}
                    totalPage={totalPage}
                    page={page}
                    setPage={setPage}
                    totalRecordCount={totalRecordCount}
                />
            </div>
        </MainLayout>
    )
}
