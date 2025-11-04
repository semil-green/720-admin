"use client";

import { useEffect, useState } from "react";
import CategoryTable from "@/components/categories/CategoryTable";
import CategoryForm from "@/components/categories/CategoryForm";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import MainLayout from "@/components/layout/mainLayout";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteCategoryService,
    getAllCategoriesService,
} from "@/service/category/category.service";
import {
    deleteCategory,
    setCategoriesData,
} from "@/store/slices/category/category.slice";
import * as XLSX from "xlsx";
import { Input } from "@/components/ui/input";
import FilterDropdown from "@/components/items/FilterDropDown";
export default function Categories() {
    const [editcategoryData, setEditCategoryData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
    const [searchCategories, setSearchCategories] = useState("");
    const [sortCategories, setSortCategories] = useState(null)
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);

    const dispatch = useDispatch();

    const handleDelete = async (id) => {
        setLoading(true);

        const res = await deleteCategoryService(id);

        if (res?.status == 200) {
            dispatch(deleteCategory(id));
            toast.success("Deleted", {
                description: "Category deleted successfully",
            });
        } else {
            toast.error(res?.response?.data?.message || "Failed to delete category");
        }
        setLoading(false);
    };

    const handleEdit = async (id) => {
        setLoading(true);
        setEditCategoryData(id);
        setIsCategoryModalOpen(true);
        setLoading(false);
    };

    const openAddCategory = () => {
        setEditCategoryData({});
        setIsCategoryModalOpen(true);
    };

    const onOpenSubCategoryModal = () => {
        setIsSubCategoryModalOpen(true);
    };

    const allCategoriesData = useSelector(
        (state) => state.categoeySlice.allCategories
    );

    const totalRecordCount = useSelector((state) => state.categoeySlice.totalCategoriesCount)

    // const fetchCategories = async () => {
    //     if (!allCategoriesData || allCategoriesData.length == 0) {
    //         const response = await getAllCategoriesService(page, limit, searchCategories, sortCategories?.sortBy, sortCategories?.sortOrder);

    //         if (response?.status === 200) {
    //             dispatch(setCategoriesData(response?.data));
    //         } else {
    //             toast.error("Error fetching categories", {
    //                 description: response?.data?.message || "Something went wrong",
    //             });
    //         }
    //     }
    //     setLoading(false);
    // };

    const fetchCategories = async (
        currentPage = page,
        currentLimit = limit,
        search = searchCategories,
        sortBy = sortCategories?.sortBy,
        sortOrder = sortCategories?.sortOrder
    ) => {
        setLoading(true);
        try {
            const response = await getAllCategoriesService(currentPage, currentLimit, search, sortBy, sortOrder);

            if (response?.status === 200) {
                dispatch(setCategoriesData(response?.data));
            } else {
                toast.error(response?.response?.data?.message || "Failed to fetching categories");
            }
        } catch (err) {
            toast.error("Something went wrong while fetching categories");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {


        fetchCategories();
    }, [page, limit, sortCategories]);

    const exportToExcelCategoriesData = (categoriesData = []) => {
        if (!categoriesData || categoriesData.length === 0) {
            toast.error("No category data available to export");
            return;
        }

        const formattedData = categoriesData.map((item) => ({
            "Category ID": item.category_id || "-",
            "Category Name": item.category_name || "-",
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
        XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");

        XLSX.writeFile(workbook, "Categories_Data.xlsx");

    };

    const categoriesColumns = [
        { label: "Category", value: "category_name" },
        { label: "Status", value: "status" },
    ];

    const handleCategorieSortChange = (sort) => {
        setSortCategories(sort)
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
                <div className="flex justify-end items-center gap-4">
                    <Button onClick={() => exportToExcelCategoriesData(allCategoriesData)}>
                        Export
                    </Button>
                    <Button onClick={() => openAddCategory()} className="cursor-pointer">
                        Add Category
                    </Button>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex flex-1 gap-2">
                        <Input
                            placeholder="Search Categories"
                            className="flex-1 sm:flex-[2]"
                            onChange={(e) => setSearchCategories(e.target.value)}
                            value={searchCategories}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    fetchCategories(1, limit, searchCategories, sortCategories?.sortBy, sortCategories?.sortOrder);
                                }
                            }}
                        />
                        <Button
                            onClick={() =>
                                fetchCategories(1, limit, searchCategories, sortCategories?.sortBy, sortCategories?.sortOrder)
                            }
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                setSearchCategories("");
                                setPage(1);
                                fetchCategories(1, limit, "");
                            }}
                            variant={"link"}
                        >
                            Clear
                        </Button>
                    </div>

                    <div className="flex justify-end">
                        <FilterDropdown
                            columns={categoriesColumns}
                            onSortChange={handleCategorieSortChange}
                        />
                    </div>
                </div>

                <CategoryTable
                    data={allCategoriesData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onOpenSubCategoryModal={onOpenSubCategoryModal}
                    totalRecordCount={totalRecordCount}
                />
            </div>

            <Dialog
                open={!!isCategoryModalOpen > 0}
                onOpenChange={() => setIsCategoryModalOpen(false)}
            >
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {editcategoryData.category_id > 0
                                ? "Update Category"
                                : "Add Category"}
                        </DialogTitle>
                        <DialogDescription>
                            Add/Update category from here.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <CategoryForm
                            initialData={allCategoriesData}
                            editcategoryData={editcategoryData}
                            handleCose={() => {
                                setIsCategoryModalOpen(false), setCategoriesData(null);
                            }}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </MainLayout >
    );
}
