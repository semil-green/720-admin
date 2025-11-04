import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import {
    addNewCategoryService,
    updateCategoryService
} from "@/service/category/category.service";
import { useDispatch } from "react-redux";
import {
    addNewCategory,
    updateCategory
} from "@/store/slices/category/category.slice";
import { toast } from "sonner";

const CategoryForm = ({ initialData, handleCose, editcategoryData }) => {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        CategoryId: 0,
        category_name: "",
        category_image: null,
        ImagePreview: "",
        ParentCategoryId: 0,
    });

    const dispatch = useDispatch();
    useEffect(() => {
        if (editcategoryData) {
            setFormData({
                CategoryId: editcategoryData.category_id || 0,
                category_name: editcategoryData.category_name || "",
                category_image: editcategoryData.category_image || "",
                ImagePreview: editcategoryData.category_image || "",
            });
        } else if (initialData) {
            setFormData({
                CategoryId: initialData.CategoryId || 0,
                category_name: initialData.category_name || "",
                category_image: initialData.category_image || "",
                ImagePreview: initialData.category_image || "",
            });
        }
    }, [editcategoryData, initialData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setFormData((prev) => ({
                ...prev,
                category_image: file,
                ImagePreview: previewUrl,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.category_name?.trim()) {
            toast.error("Category name is required");

            return;
        }

        if (!(formData.category_image instanceof File)) {
            toast.error("Category image is required");
            return;
        }

        setLoading(true);
        const formDataToSend = new FormData();
        formDataToSend.append("category_name", formData.category_name);

        if (formData.category_image instanceof File) {
            formDataToSend.append("category_image", formData.category_image);
        }

        const res = await addNewCategoryService(formDataToSend);

        if (res?.status == 200) {
            dispatch(addNewCategory(res?.data));
            toast.success("Added", { description: "Category added successfully" });
        } else
            toast.error(res?.response?.data?.message || "Failed to add category");

        handleCose();
        setLoading(false);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();


        if (!formData.category_name?.trim()) {
            toast.error("Category name is required");
            return;
        }

        // if (!(formData.category_image instanceof File)) {
        //     toast.error("Category image is required");
        //     return;
        // }

        if (!formData.category_image) {
            toast.error("Category image is required");
            return;
        }


        setLoading(true);

        const formDataToSend = new FormData();
        formDataToSend.append("category_name", formData.category_name);

        if (formData.category_image instanceof File) {
            formDataToSend.append("category_image", formData.category_image);
        } else if (typeof formData.category_image === "string" && formData.category_image) {
            const fileName = formData.category_image.split("/").pop();
            formDataToSend.append("category_image", fileName);
        }

        const res = await updateCategoryService(
            editcategoryData.category_id,
            formDataToSend
        );

        if (res?.status === 200) {
            dispatch(updateCategory(res?.data));
            toast.success("Updated", { description: "Category updated successfully" });
        } else {
            toast.error("Error updating category", { description: res?.data?.message || "Something went wrong" });
        }

        setLoading(false);
        handleCose();
    };

    return (
        <form className="grid gap-4">
            <input type="hidden" name="CategoryId" value={formData.CategoryId} />

            <div>
                <Label className="pb-2">Category <span className="text-red-500">*</span>
                </Label>
                <Input
                    name="category_name"
                    value={formData.category_name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <Label className="pb-2">Category Image <span className="text-red-500">*</span>
                </Label>
                <Input type="file" accept="image/*" onChange={handleFileChange} />
                {formData.ImagePreview && (
                    <div className="mt-2">
                        <Image
                            src={formData.ImagePreview}
                            alt="Category"
                            width={80}
                            height={80}
                            className="rounded-full"
                        />
                    </div>
                )}
            </div>

            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleCose}
                    disabled={loading}
                >
                    Cancel
                </Button>

                {!editcategoryData?.category_id ? (
                    <Button type="submit" disabled={loading} onClick={handleSubmit}>
                        {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                        Save
                    </Button>
                ) : (
                    <Button type="submit" disabled={loading} onClick={handleUpdate}>
                        {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                        Update
                    </Button>
                )}
            </div>
        </form>
    );
};

export default CategoryForm;
