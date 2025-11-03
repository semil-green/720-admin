"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import MainLayout from "@/components/layout/mainLayout";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector, useDispatch } from "react-redux";
import { getAllDarkStorePackagingCenter } from "@/service/darkStore-packagingCenter/darkStore-packagingCenter.service";
import { setAllPackagingCenter } from "@/store/slices/packaging-center/packaging-center.slice";
import { setAllDarkStores } from "@/store/slices/dark-store/dark-store.slice";
import {
    fetchAllRawMaterialService,
    fetchFinishedMaterialService,
} from "@/service/inventories/inventories.service";
import {
    setPaginatedFinishedProductData,
    setPaginatedRawItemsData,
} from "@/store/slices/inventories/inventories.slice";
import InventoryRawItemTable from "@/components/inventories/RawitemTable";
import { toast } from "sonner";
import FinishedProductTable from "@/components/inventories/FinishedProductTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FilterDropdown from "@/components/items/FilterDropDown";
import * as XLSX from "xlsx";


export default function Inventory() {
    const [loading, setLoading] = useState(true);
    const [selectedItem, setSelectedItem] = useState("Item");
    const [typeOfFinishedProduct, setTypeOfFinishedProduct] = useState("packagingCenter");

    const [rawItemPage, setRawItemPage] = useState(1);
    const [rawItemsLimit, setRawItemLimit] = useState(50);
    const [totalRawItemsPage, setRawItemTotalPages] = useState(1);

    const [finishedProductPage, setFinishedProductPage] = useState(1);
    const [finishedProductLimit, setFinishedProductLimit] = useState(50);
    const [totalFinishedProductPage, setFinishedProductTotalPages] = useState(1);

    const [selectedRawMaterialId, setSelectedRawMaterialId] = useState("");
    const [selectedFinishedProductId, setSelectedFinishedProductId] = useState("");

    const [searchRawMaterial, setSearchRawMaterial] = useState("")
    const [appliedSearch, setAppliedSearch] = useState("");
    const [rawItemSort, setRawItemSort] = useState("")


    const [searchFinishedProduct, setSearchFinishedProduct] = useState("")
    const [appliedFinishedSearch, setAppliedFinishedSearch] = useState("");
    const [finishedProductSort, setFinishedProductSort] = useState("")

    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedFinishedProductId(null);
    }, [typeOfFinishedProduct]);

    const allPackagingCentersData = useSelector(
        (state) => state.packagingStoreSlice.allPackagingCenters
    );

    useEffect(() => {
        if (!allPackagingCentersData || allPackagingCentersData.length === 0) {
            const fetchData = async () => {
                const result = await getAllDarkStorePackagingCenter({
                    type: "packaging_center",
                    page: 1,
                    limit: 10000,
                });
                if (result?.status === 200) {
                    dispatch(setAllPackagingCenter(result?.data?.data || []));
                }
            };
            fetchData();
        }
    }, []);

    const allDarkStores = useSelector(
        (state) => state.darkStoreSlice.allDarkStores
    );

    const fetchDarkStores = async () => {
        try {
            setLoading(true);
            const result = await getAllDarkStorePackagingCenter({
                type: "dark_store",
                page: 1,
                limit: 10000,
            });

            const storeList = result?.data?.data || [];
            const totalCount = result?.data?.total || 0;

            if (result?.status === 200) {
                dispatch(setAllDarkStores(storeList));
                setTotalPages(Math.ceil(totalCount / rawItemsLimit));
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDarkStores();
    }, []);

    // raw item handler ======================================================================

    const allRawItemsData = useSelector(
        (state) => state.inventoriesSlice.paginatedRawItemsData
    );

    const fetchAllRawITemsData = async (
        rawItemPage,
        rawItemsLimit,
        selectedRawMaterialId,
        searchRawMaterial,
        rawItemSortBy = rawItemSort?.sortBy,
        rawItemSortOrder = rawItemSort?.sortOrder
    ) => {
        try {
            setLoading(true);
            const result = await fetchAllRawMaterialService(
                rawItemPage,
                rawItemsLimit,
                selectedRawMaterialId,
                searchRawMaterial,
                rawItemSortBy,
                rawItemSortOrder
            );

            if (result?.status == 200) {
                setRawItemTotalPages(
                    Math.ceil(result?.data?.pagination?.total / rawItemsLimit)
                );

                dispatch(setPaginatedRawItemsData(result?.data?.data));
            }
        } catch (error) {
            toast.error("Error fetching raw items", {
                description: "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchAllRawITemsData(
            rawItemPage,
            rawItemsLimit,
            selectedRawMaterialId,
            appliedSearch,
            rawItemSort?.sortBy,
            rawItemSort?.sortOrder
        );
    }, [rawItemPage, selectedRawMaterialId, rawItemSort, appliedSearch]);




    const rawItemColumns = [
        { label: "Raw item", value: "raw_item" },
        { label: "In hand", value: "in_hand" },

    ]

    const handleRawItemSortChange = (sort) => {
        setRawItemSort(sort)
    }

    // finish product handler ======================================================================

    const finishedProductData = useSelector(
        (state) => state.inventoriesSlice.paginatedFinishedProductData
    );

    const fetchAllFinishedProductData = async (
        finishedProductPage,
        finishedProductLimit,
        selectedFinishedProductId,
        searchFinishedProduct,
        finishedProductSortBy = finishedProductSort?.sortBy,
        finishedProductSortOrder = finishedProductSort?.sortOrder
    ) => {
        try {
            setLoading(true);
            const result = await fetchFinishedMaterialService(
                finishedProductPage,
                finishedProductLimit,
                selectedFinishedProductId,
                searchFinishedProduct,
                finishedProductSortBy,
                finishedProductSortOrder
            );

            if (result?.status == 200) {
                setFinishedProductTotalPages(
                    Math.ceil(result?.data?.pagination?.total / finishedProductLimit)
                );

                dispatch(setPaginatedFinishedProductData(result?.data?.data));
            }
        } catch (error) {
            toast.error("Error fetching finished product ", {
                description: "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllFinishedProductData(
            finishedProductPage,
            finishedProductLimit,
            selectedFinishedProductId,
            appliedFinishedSearch,
            finishedProductSort?.sortBy,
            finishedProductSort?.sortOrder
        );
    }, [finishedProductPage, selectedFinishedProductId, finishedProductSort, appliedFinishedSearch]);

    const finishedProductColumns = [
        { label: "Product", value: "title" },
        { label: "Stock", value: "in_hand" },
    ]

    const handleFinishedProductSortChange = (sort) => {
        setFinishedProductSort(sort)
    }

    const exportToExcelRawMaterialData = (allRawMaterialData = []) => {
        if (!allRawMaterialData || allRawMaterialData.length === 0) {
            toast.error("No raw material data available to export.");
            return;
        }

        const dataToExport = allRawMaterialData.map((item) => ({
            "Raw Item": item.raw_item || "-",
            "SKU": item.sku || "-",
            "In Hand": item.in_hand ?? "-",
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();

        const columnWidths = Object.keys(dataToExport[0]).map((key) => ({
            wch: Math.max(
                key.length,
                ...dataToExport.map((item) =>
                    item[key] ? item[key].toString().length : 0
                )
            ) + 2,
        }));
        ws["!cols"] = columnWidths;

        XLSX.utils.book_append_sheet(wb, ws, "Raw Materials");

        XLSX.writeFile(wb, "raw-material-data.xlsx");
    };

    const exportToExcelFinishedProductData = (allFinishedProductData = []) => {
        if (!allFinishedProductData || allFinishedProductData.length === 0) {
            toast.error("No finished product data available to export.");
            return;
        }

        const dataToExport = allFinishedProductData.map((item) => ({
            "Product Name": item.product_name || "-",
            "SKU": item.sku || "-",
            "In Hand": item.in_hand ?? "-",
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();

        const columnWidths = Object.keys(dataToExport[0]).map((key) => ({
            wch: Math.max(
                key.length,
                ...dataToExport.map((item) =>
                    item[key] ? item[key].toString().length : 0
                )
            ) + 2,
        }));
        ws["!cols"] = columnWidths;

        XLSX.utils.book_append_sheet(wb, ws, "Finished Products");

        XLSX.writeFile(wb, "finished-product-data.xlsx");
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

            <div className="flex justify-between">
                <div>
                    <Tabs defaultValue="Item">
                        <TabsList>
                            <TabsTrigger
                                value="Item"
                                onClick={() => {
                                    setSelectedItem("Item");
                                }}
                            >
                                Raw Material
                            </TabsTrigger>
                            <TabsTrigger
                                value="RawItem"
                                onClick={() => {
                                    setSelectedItem("RawItem");
                                }}
                            >
                                Finished Product
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                </div>
                <div>

                    {
                        selectedItem === "Item" && <Button onClick={() => exportToExcelRawMaterialData(allRawItemsData)}>Export</Button>
                    }

                    {
                        selectedItem === "RawItem" && <Button onClick={() => exportToExcelFinishedProductData(finishedProductData)}>Export </Button>
                    }

                </div>
            </div>

            <div className="space-y-4 mt-4">
                {selectedItem === "Item" && (

                    <>
                        <div className="flex justify-between items-center gap-2">
                            <Select
                                value={
                                    selectedRawMaterialId ? selectedRawMaterialId.toString() : ""
                                }
                                onValueChange={(value) => setSelectedRawMaterialId(Number(value))}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Packaging Center" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allPackagingCentersData?.map((center) => (
                                        <SelectItem key={center.id} value={center.id.toString()}>
                                            {center.store_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <Input
                                    placeholder="Search Raw Material"
                                    className="w-2xl"
                                    onChange={(e) => setSearchRawMaterial(e.target.value)}
                                    value={searchRawMaterial}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            setAppliedSearch(searchRawMaterial);
                                            setRawItemPage(1);
                                            fetchAllRawITemsData(
                                                1,
                                                rawItemsLimit,
                                                selectedRawMaterialId,
                                                searchRawMaterial,
                                                rawItemSort?.sortBy,
                                                rawItemSort?.sortOrder
                                            );
                                        }
                                    }}
                                />
                                <Button
                                    onClick={() => {
                                        setAppliedSearch(searchRawMaterial);
                                        setRawItemPage(1);
                                        fetchAllRawITemsData(
                                            1,
                                            rawItemsLimit,
                                            selectedRawMaterialId,
                                            searchRawMaterial,
                                            rawItemSort?.sortBy,
                                            rawItemSort?.sortOrder
                                        );
                                    }}
                                >
                                    Search
                                </Button>
                                <Button
                                    onClick={() => {
                                        setSearchRawMaterial("");
                                        setAppliedSearch("");
                                        setRawItemPage(1);
                                        setRawItemSort("");
                                        fetchAllRawITemsData(1, rawItemsLimit, selectedRawMaterialId, "");
                                    }}
                                    variant={"link"}
                                >
                                    Clear
                                </Button>
                            </div>
                            <div className="flex justify-end">
                                <FilterDropdown
                                    columns={rawItemColumns}
                                    onSortChange={handleRawItemSortChange}
                                />
                            </div>
                        </div>
                    </>
                )}

                {selectedItem === "RawItem" && (
                    <div className="flex mt-4 gap-6">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="storeType"
                                value="packagingCenter"
                                className="form-radio text-blue-600"
                                checked={typeOfFinishedProduct === "packagingCenter"}
                                onChange={(e) => {
                                    setTypeOfFinishedProduct(e.target.value);
                                    setSelectedFinishedProductId(null);
                                }}
                            />
                            <span>Packaging center</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="storeType"
                                value="darkStore"
                                className="form-radio text-blue-600"
                                checked={typeOfFinishedProduct === "darkStore"}
                                onChange={(e) => {
                                    setTypeOfFinishedProduct(e.target.value);
                                    setSelectedFinishedProductId(null);
                                }}
                            />
                            <span>Dark Store</span>
                        </label>
                    </div>
                )}

                {selectedItem === "RawItem" &&
                    typeOfFinishedProduct === "packagingCenter" && (
                        <>
                            <Select
                                value={
                                    selectedFinishedProductId
                                        ? selectedFinishedProductId.toString()
                                        : ""
                                }
                                onValueChange={(value) =>
                                    setSelectedFinishedProductId(Number(value))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Packaging Center" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allPackagingCentersData?.map((center) => (
                                        <SelectItem key={center.id} value={center.id.toString()}>
                                            {center.store_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <div className="flex justify-between">
                                <div className="flex gap-4">
                                    <Input
                                        placeholder="Search Finished Product"
                                        className="w-2xl"
                                        onChange={(e) => setSearchFinishedProduct(e.target.value)}
                                        value={searchFinishedProduct}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                setAppliedFinishedSearch(searchFinishedProduct);
                                                setFinishedProductPage(1);
                                                fetchAllFinishedProductData(
                                                    1,
                                                    finishedProductLimit,
                                                    selectedFinishedProductId,
                                                    searchFinishedProduct,
                                                    finishedProductSort?.sortBy,
                                                    finishedProductSort?.sortOrder
                                                );
                                            }
                                        }}
                                    />
                                    <Button
                                        onClick={() => {
                                            setAppliedFinishedSearch(searchFinishedProduct);
                                            setFinishedProductPage(1);
                                            fetchAllFinishedProductData(
                                                1,
                                                finishedProductLimit,
                                                selectedFinishedProductId,
                                                searchFinishedProduct,
                                                finishedProductSort?.sortBy,
                                                finishedProductSort?.sortOrder
                                            );
                                        }}
                                    >
                                        Search
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setSearchFinishedProduct("");
                                            setAppliedFinishedSearch("");
                                            setFinishedProductPage(1);
                                            setFinishedProductSort("");
                                            fetchAllFinishedProductData(1, finishedProductLimit, selectedFinishedProductId, "");
                                        }}
                                        variant={"link"}
                                    >
                                        Clear
                                    </Button>
                                </div>
                                <div className="flex justify-end">
                                    <FilterDropdown
                                        columns={finishedProductColumns}
                                        onSortChange={handleFinishedProductSortChange}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                {selectedItem === "RawItem" &&
                    typeOfFinishedProduct === "darkStore" && (
                        <>
                            <Select
                                value={
                                    selectedFinishedProductId
                                        ? selectedFinishedProductId.toString()
                                        : ""
                                }
                                onValueChange={(value) =>
                                    setSelectedFinishedProductId(Number(value))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Dark Store" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allDarkStores?.map((store) => (
                                        <SelectItem key={store.id} value={store.id.toString()}>
                                            {store.store_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <div className="flex justify-between">
                                <div className="flex gap-4">
                                    <Input
                                        placeholder="Search Finished Product"
                                        className="w-2xl"
                                        onChange={(e) => setSearchFinishedProduct(e.target.value)}
                                        value={searchFinishedProduct}
                                    />
                                    <Button
                                        onClick={() => {
                                            setAppliedFinishedSearch(searchFinishedProduct);
                                            setFinishedProductPage(1);
                                            fetchAllFinishedProductData(
                                                1,
                                                finishedProductLimit,
                                                selectedFinishedProductId,
                                                searchFinishedProduct,
                                                finishedProductSort?.sortBy,
                                                finishedProductSort?.sortOrder
                                            );
                                        }}
                                    >
                                        Search
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setSearchFinishedProduct("");
                                            setAppliedFinishedSearch("");
                                            setFinishedProductPage(1);
                                            setFinishedProductSort("");
                                            fetchAllFinishedProductData(1, finishedProductLimit, selectedFinishedProductId, "");
                                        }}
                                        variant={"link"}
                                    >
                                        Clear
                                    </Button>
                                </div>
                                <div className="flex justify-end">
                                    <FilterDropdown
                                        columns={finishedProductColumns}
                                        onSortChange={handleFinishedProductSortChange}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                {selectedItem === "Item" && (
                    <InventoryRawItemTable
                        data={allRawItemsData}
                        totalPage={totalRawItemsPage}
                        rawItemPage={rawItemPage}
                        setRawItemPage={setRawItemPage}
                    />
                )}

                {selectedItem === "RawItem" &&
                    (typeOfFinishedProduct === "packagingCenter" ||
                        typeOfFinishedProduct === "darkStore") && (
                        <FinishedProductTable
                            data={finishedProductData}
                            totalPage={totalFinishedProductPage}
                            page={finishedProductPage}
                            setRawItemPage={setFinishedProductPage}
                        />
                    )}
            </div>
        </MainLayout >
    );
}
