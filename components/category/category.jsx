'use client';
import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import CategoryForm from './categoryForm';
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from 'react-redux';
import { setPaginatedCategories } from '@/store/slices/category/category.slice';
import { fetchAllCategoriesService } from '@/service/category/category.service';
import { toast } from 'sonner';
import CategoryTable from './categoryTable';
import { CommonPagination } from '../common-pagination/commonPagination';
import Loader from '../loader/loader';
import { handleUnauthorized } from '@/lib/lib/handleUnauthorized';
import { Input } from '../ui/input';
import TableSkeleton from '../skeleton/tableSkeleton';

const Category = () => {

    const [loading, setLoading] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });
    const [editingCategory, setEditingCategory] = useState(null);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const dispatch = useDispatch();
    const openCategoryModal = () => {
        setIsCategoryModalOpen(true);
    };

    const paginatedCategoriesData = useSelector((state) => state.categorySlice.paginatedCategories);
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const res = await fetchAllCategoriesService(
                pagination.page,
                pagination.limit,
                search
            );

            if (res) {
                dispatch(setPaginatedCategories(res?.categories || []));

                setPagination((prev) => ({
                    ...prev,
                    ...res?.pagination,
                }));
            }
        } catch (err) {

            const handled = handleUnauthorized(err);

            if (!handled) {

                toast.error("Something went wrong. Failed to fetch categories.");
            }
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    useEffect(() => {
        fetchCategories();
    }, [pagination.page, , debouncedSearch]);


    return (
        <div>

            <div className="flex justify-end mb-4">
                <Button onClick={openCategoryModal}>Add Category</Button>
            </div>



            <Dialog open={isCategoryModalOpen} onOpenChange={(open) => {
                setIsCategoryModalOpen(open);
                if (!open) setEditingCategory(null);
            }}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>
                            {editingCategory ? "Update Category" : "Add Category"}
                        </DialogTitle>
                        <DialogDescription>
                            {editingCategory
                                ? "Update a category"
                                : "Add a new category"}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-2">
                        <CategoryForm
                            editCategoryData={editingCategory}
                            handleClose={() => {
                                setIsCategoryModalOpen(false);
                                setEditingCategory(null)
                            }}

                        />
                    </div>
                </DialogContent>
            </Dialog>

            <div className="mb-5">
                <Input
                    type="text"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPagination((prev) => ({
                            ...prev,
                            page: 1,
                        }));
                    }}
                    placeholder="search by category name"
                    className="max-w-md"
                />
            </div>

            {loading ?
                <TableSkeleton
                    columns={6}
                    rows={6}
                /> :

                <CategoryTable
                    data={paginatedCategoriesData}
                    onEdit={(category) => {
                        setEditingCategory(category);
                        setIsCategoryModalOpen(true);
                    }}
                />
            }

            <CommonPagination
                pagination={pagination}
                onPageChange={(page) =>
                    setPagination((prev) => ({ ...prev, page }))
                }
            />

        </div>
    )
}

export default Category