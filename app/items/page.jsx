"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ItemTable from "@/components/items/ItemTable";
import RawItemTable from "@/components/items/RawItemTable";
import RawItemForm from "@/components/items/RawItemForm";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import MainLayout from "@/components/layout/mainLayout";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import FilterDropdown from "@/components/items/FilterDropDown";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, getAllItems } from "@/store/slices/items/items.slice";
import {
    deleteItemService,
    getAllItemsService,
} from "@/service/items/items.service";
import { getAllRawItemsService } from "@/service/raw-item/raw-item.service";
import { setRawItems } from "@/store/slices/raw-ittem/raw-item.store";
import { getAllUnitsService } from "@/service/unit/unit.service";
import * as XLSX from "xlsx";


export default function Items() {

    const [loading, setLoading] = useState(false);
    const [isRawItemModalOpen, setIsRawItemModalOpen] = useState(false);

    const [productSortState, setProductSortState] = useState();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [totalItems, setTotalItems] = useState(0);
    const [searchProduct, setSearchProduct] = useState("");
    const [totalProductCount, setTotalProductCount] = useState(0);

    const [rawItemSortState, setRawItemSortState] = useState();
    const [rawItemPage, setRawItemPage] = useState(1);
    const [rawItemLimit, setRawItemLimit] = useState(50);
    const [totalRawItems, settotalRawItems] = useState(0);
    const [units, setUnits] = useState([]);
    const [editRawItem, setEditRawItem] = useState({});
    const [searchRawItem, setSearchRawItem] = useState("");
    const [totalRawItemCount, setTotalRawItemCount] = useState(0);

    const router = useRouter();
    const dispatch = useDispatch();

    const allItemsData = useSelector(
        (state) => state.allItemsSlice?.allItems ?? []
    );
    const allRawItemsData = useSelector(
        (state) => state.rawItemSlice.allRawItems
    );

    const fetchItems = async (
        page = 1,
        limit = 5,
        search = searchProduct,
        sortBy = productSortState?.sortBy,
        sortOrder = productSortState?.sortOrder
    ) => {
        try {
            setLoading(true);
            const res = await getAllItemsService(page, limit, search, sortBy, sortOrder);
            if (res?.status == 200) {
                if (res && res.data) {
                    setTotalProductCount(res?.data?.total)
                    dispatch(getAllItems(res?.data?.data || []));
                    setTotalItems(res?.data?.total ?? 0);
                } else {
                    dispatch(getAllItems([]));
                    setTotalItems(0);
                }
            } else
                toast.error(res?.response?.data?.message || "Failed to fetch product list");
        } catch (err) {
            toast.error("Failed to fetch product list");
            dispatch(getAllItems([]));
            setTotalItems(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems(page, limit, searchProduct);
    }, [page, limit, productSortState]);


    const fetchALlRawItems = async (
        page = rawItemPage,
        limit = rawItemLimit,
        search = searchRawItem,
        sortBy = rawItemSortState?.sortBy,
        sortOrder = rawItemSortState?.sortOrder
    ) => {
        try {
            setLoading(true);
            const res = await getAllRawItemsService(page, limit, search, sortBy, sortOrder);
            if (res) {
                setTotalRawItemCount(res?.total)
                settotalRawItems(res?.total);
                dispatch(setRawItems(res?.items));
            }
        } catch (error) {
            toast.error("Error in fetching raw items");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchALlRawItems(rawItemPage, rawItemLimit, searchRawItem, rawItemSortState?.sortBy, rawItemSortState?.sortOrder);
    }, [rawItemPage, rawItemLimit, rawItemSortState]);


    useEffect(() => {
        if (units.length === 0) {
            const fetchUnitsData = async () => {
                try {
                    const res = await getAllUnitsService();
                    setUnits(res?.data || []);
                } catch (error) {
                    toast.error("Failed to fetch units");
                }
            };
            fetchUnitsData();
        }
    }, []);


    const openAddRawItem = () => {
        setIsRawItemModalOpen(true);
    };

    const handleDelete = async (itemId) => {
        const res = await deleteItemService(itemId);
        if (res?.status == 200 || res?.status == 201) {
            dispatch(deleteItem(itemId));
            toast.success("Deleted", {
                description: "Product Deactivated Successfully",
            });
        }
    };

    const handleProductSortChange = (sort) => {
        setProductSortState(sort);
    };

    const handleRawItemSortChange = (sort) => {
        setRawItemSortState(sort);
    };

    const productColumns = [
        { label: "Product", value: "p.title" },
        { label: "Serve Person", value: "p.serve_person" },
        { label: "Price", value: "p.price" },
        { label: "Pieces", value: "p.pieces" },
        { label: "Created At", value: "p.created_date" },
    ];

    const rawItemColumns = [
        { label: "raw item", value: "raw_item" },
        { label: "sku", value: "sku" },
        { label: "unit", value: "unit" },
    ];

    const exportToExcelProductData = (allItemsData = []) => {
        if (!allItemsData || allItemsData.length === 0) {
            toast.error("No product data available to export.");
            return;
        }
        const dataToExport = allItemsData.map((item) => ({
            "Product ID": item.product_id || "-",
            "Title": item.title || "-",
            "SKU": item.sku || "-",
            "Categories": Array.isArray(item.categories)
                ? item.categories.filter(Boolean).join(", ")
                : "-",
            "Quantity": item.quantity || "-",
            "Unit": item.unit || "-",
            "Serve Person": item.serve_person || "-",
            "Status": item.status ? "Active" : "Inactive",
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();

        const columnWidths = Object.keys(dataToExport[0]).map((key) => ({
            wch: Math.max(
                key.length,
                ...dataToExport.map((item) => (item[key] ? item[key].toString().length : 0))
            ) + 2,
        }));
        ws["!cols"] = columnWidths;

        XLSX.utils.book_append_sheet(wb, ws, "Products");

        XLSX.writeFile(wb, "product-data.xlsx");
    };

    const exportToExcelRawItemData = (allRawItemsData = []) => {
        if (!allRawItemsData || allRawItemsData.length === 0) {
            toast.error("No raw item data available to export.");
            return;
        }

        const dataToExport = allRawItemsData.map((item) => ({
            "Raw Item": item.raw_item || "-",
            "Unit": item.unit || "-",
            "SKU": item.sku || "-",
            "Status": item.status ? "Active" : "Inactive",
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();

        const columnWidths = Object.keys(dataToExport[0]).map((key) => ({
            wch: Math.max(
                key.length,
                ...dataToExport.map((item) => (item[key] ? item[key].toString().length : 0))
            ) + 2,
        }));
        ws["!cols"] = columnWidths;

        XLSX.utils.book_append_sheet(wb, ws, "Raw Items");

        XLSX.writeFile(wb, "raw-item-data.xlsx");
    };

    return (
        <MainLayout>
            {loading && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-white/60">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
            )}

            <Tabs defaultValue="Item">
                <TabsList>
                    <TabsTrigger value="Item">Product</TabsTrigger>
                    <TabsTrigger value="RawItem">Raw Item</TabsTrigger>
                </TabsList>

                <TabsContent value="Item">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center gap-2">
                            <div />
                            <div className="flex gap-4">
                                <Button variant="" onClick={() => exportToExcelProductData(allItemsData)}>Export</Button>
                                <Button onClick={() => router.push("/items/new")}>
                                    Add Product
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <div className="flex flex-1 gap-2">
                                <Input
                                    placeholder="Search Items"
                                    className="flex-1 sm:flex-[2]"
                                    onChange={(e) => setSearchProduct(e.target.value)}
                                    value={searchProduct}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            fetchItems(page, limit, searchProduct, productSortState?.sortBy, productSortState?.sortOrder);
                                        }
                                    }}
                                />
                                <Button
                                    onClick={() => fetchItems(page, limit, searchProduct)}
                                >
                                    Search
                                </Button>
                                <Button
                                    onClick={() => {
                                        setSearchProduct("");
                                        setPage(1);
                                        fetchItems(1, limit, "");
                                    }}
                                    variant={"link"}
                                >
                                    Clear
                                </Button>
                            </div>

                            <div className="flex justify-end">
                                <FilterDropdown
                                    columns={productColumns}
                                    onSortChange={handleProductSortChange}
                                />
                            </div>
                        </div>

                        <ItemTable
                            data={allItemsData}
                            onDelete={handleDelete}
                            productSortState={productSortState}
                            page={page}
                            limit={limit}
                            setPage={setPage}
                            totalItems={totalItems}
                            totalProductCount={totalProductCount}
                        />
                    </div>
                </TabsContent>

                <TabsContent value="RawItem">
                    <div className="space-y-4">
                        <div className="flex justify-end items-center gap-2">
                            <Button variant="" onClick={() => exportToExcelRawItemData(allRawItemsData)}>Export</Button>

                            <Button onClick={() => openAddRawItem()}>Add Raw Item</Button>
                        </div>

                        <div className="flex justify-between">
                            <div className="flex gap-4">
                                <Input
                                    placeholder="Search Raw Items"
                                    className="w-2xl"
                                    onChange={(e) => setSearchRawItem(e.target.value)}
                                    value={searchRawItem}

                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            fetchALlRawItems()
                                        }
                                    }}
                                />
                                <Button onClick={() => fetchALlRawItems()}>
                                    Search
                                </Button>
                                <Button
                                    onClick={() => {
                                        setSearchRawItem("");
                                        setRawItemPage(1);
                                        fetchALlRawItems(1, rawItemLimit, "");
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

                        <RawItemTable
                            data={allRawItemsData}
                            onDelete={handleDelete}
                            page={rawItemPage}
                            limit={rawItemLimit}
                            setPage={setRawItemPage}
                            totalPages={Math.ceil(totalRawItems / rawItemLimit)}
                            setEditRawItem={setEditRawItem}
                            openEditModal={openAddRawItem}
                            totalRawItemCount={totalRawItemCount}
                        />
                    </div>
                </TabsContent>
            </Tabs>

            <Dialog
                open={isRawItemModalOpen}
                onOpenChange={(open) => { setIsRawItemModalOpen(open); setEditRawItem({}); }}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Raw Item</DialogTitle>
                        <DialogDescription>
                            Add/Update Raw Item from here.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <RawItemForm
                            handleClose={() => {
                                setIsRawItemModalOpen(false);
                                setEditRawItem({});
                            }}
                            units={units}
                            setEditRawItem={editRawItem}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </MainLayout>
    );
}
