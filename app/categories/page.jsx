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

export default function Categories() {
    const [editcategoryData, setEditCategoryData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);

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
            toast.error("Error deleting category", {
                description: res?.data?.message || "Something went wrong",
            });
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

    useEffect(() => {
        const fetchCategories = async () => {
            if (!allCategoriesData || allCategoriesData.length == 0) {
                const response = await getAllCategoriesService();

                if (response?.status === 200) {
                    dispatch(setCategoriesData(response?.data));
                } else {
                    toast.error("Error fetching categories", {
                        description: response?.data?.message || "Something went wrong",
                    });
                }
            }
            setLoading(false);
        };

        fetchCategories();
    }, []);

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
                <div className="flex justify-end items-center">
                    <Button onClick={() => openAddCategory()} className="cursor-pointer">
                        Add Category
                    </Button>
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
        </MainLayout>
    );
}
