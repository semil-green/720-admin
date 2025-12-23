"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { addNewCategoryService, updateCategoryService } from "@/service/category/category.service";
import { useDispatch } from "react-redux";
import { addPaginatedCategory, updatedPaginatedCategory } from "@/store/slices/category/category.slice";
const generateSlug = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

const CategoryForm = ({ editCategoryData, handleClose }) => {
    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        description: "",
        tags: [],
        status: true,
    });
    const [tagsInput, setTagsInput] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (editCategoryData) {
            setFormData({
                name: editCategoryData.name || "",
                slug: editCategoryData.slug || "",
                description: editCategoryData.description || "",
                tags: editCategoryData.tags || [],
                status: editCategoryData.status ?? true,

            });
            setTagsInput((editCategoryData.tags || []).join(", "));
        }
    }, [editCategoryData]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            slug: generateSlug(prev.name),
        }));
    }, [formData.name]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            toast.error("Please enter category name");
            return;
        }
        try {
            const payload = {
                ...formData,
                tags: tagsInput
                    .split(",")
                    .map(tag => tag.trim())
                    .filter(Boolean),
            };

            const addCategory = await addNewCategoryService(payload);

            if (addCategory?.status == 200) {
                dispatch(addPaginatedCategory(addCategory?.data?.result))
                toast.success("Category added successfully");
                handleClose();
            }

        } catch (err) {
            toast.error("Something went wrong. Failed to add category.");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            toast.error("Please enter category name");
            return;
        }
        try {
            const payload = {
                id: editCategoryData._id,
                ...formData,
                tags: tagsInput
                    .split(",")
                    .map(tag => tag.trim())
                    .filter(Boolean),
            };

            const res = await updateCategoryService(payload);
            if (res?.status === 200) {
                dispatch(updatedPaginatedCategory(res?.data?.result))
                toast.success("Category updated successfully");
                handleClose();
            }
        } catch (err) {
            toast.error("Something went wrong. Failed to update category.");
        }
    };


    return (
        <form className="flex flex-col gap-4">

            <div className="flex flex-col gap-2">
                <Label>
                    Enter Category Name <span className="text-red-500">*</span>
                </Label>
                <Input
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Category name"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label>Slug</Label>
                <Textarea
                    value={formData.slug}
                    disabled
                    rows={2}
                    className="bg-muted cursor-not-allowed resize-none"
                    placeholder="Category slug"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Textarea
                    value={formData.description}
                    onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Category description"
                    rows={4}
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label>Tags</Label>
                <Input
                    placeholder="Enter tags separated by commas"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    onBlur={() =>
                        setFormData({
                            ...formData,
                            tags: tagsInput
                                .split(",")
                                .map(tag => tag.trim())
                                .filter(Boolean),
                        })
                    }

                />
            </div>

            <div className="flex flex-col gap-2">
                <Label>Status</Label>
                <Select
                    value={formData.status ? "active" : "inactive"}
                    onValueChange={(value) =>
                        setFormData({
                            ...formData,
                            status: value === "active",
                        })
                    }
                >
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {
                editCategoryData ?
                    (
                        <Button type="submit" className="mt-3" onClick={handleUpdate}>
                            Update
                        </Button>
                    ) : (
                        <Button type="submit" className="mt-3" onClick={handleSubmit}>
                            Add
                        </Button>
                    )
            }

        </form>
    );
};

export default CategoryForm;
