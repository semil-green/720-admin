"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addNewPaginatedAuthor, setPaginatedAuthors, updatePaginatedAuthor } from "@/store/slices/author/author.slice";
import { addNewAuthorService, updateAuthorService } from "@/service/author/author.service";
import { handleUnauthorized } from "@/lib/lib/handleUnauthorized";


const generateSlug = (text = "") =>
    text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");

const AuthorForm = ({ editAuthorData, handleClose }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        status: true,
    });

    useEffect(() => {
        if (editAuthorData) {
            setFormData({
                name: editAuthorData.name || "",
                slug: editAuthorData.slug || "",
                status: editAuthorData.status ?? true,
            });
        }
    }, [editAuthorData]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            slug: generateSlug(prev.name),
        }));
    }, [formData.name]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            toast.error("Please enter author name");
            return;
        }

        if (!formData.name.trim()) {
            toast.error("Please enter author name");
            return;
        }

        try {
            const payload = {
                ...formData,
                name: formData.name.trim(),
                slug: generateSlug(formData.name.trim()),
            };

            const res = await addNewAuthorService(payload);

            if (res?.status === 200) {
                dispatch(addNewPaginatedAuthor(res?.data?.result));
                toast.success("Author added successfully");
                handleClose();
            }
        } catch (err) {

            const handled = handleUnauthorized(err);

            if (!handled) {

                toast.error("Something went wrong. Failed to add author.");
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            toast.error("Please enter author name");
            return;
        }

        if (!formData.name.trim()) {
            toast.error("Please enter author name");
            return;
        }

        try {
            const trimmedName = formData.name.trim();

            const payload = {
                id: editAuthorData._id,
                ...formData,
                name: trimmedName,
                slug: generateSlug(trimmedName),
            };

            const res = await updateAuthorService(payload);

            if (res?.status === 200) {
                dispatch(updatePaginatedAuthor(res?.data?.result));
                toast.success("Author updated successfully");
                handleClose();
            }
        } catch (err) {


            const handled = handleUnauthorized(err);

            if (!handled) {
                toast.error("Something went wrong. Failed to update author.");
            }
        }
    };


    return (
        <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label>
                    Author Name <span className="text-red-500">*</span>
                </Label>
                <Input
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Author name"
                />
            </div>

            <div className="flex flex-col gap-2">
                <Label>Slug</Label>
                <Input
                    value={formData.slug}
                    disabled
                    className="bg-muted cursor-not-allowed"
                    placeholder="Author slug"
                />
            </div>

            <div className="flex flex-col gap-2 ">
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
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {editAuthorData ? (
                <Button type="submit" className="mt-3" onClick={handleUpdate}>
                    Update
                </Button>
            ) : (
                <Button type="submit" className="mt-3" onClick={handleSubmit}>
                    Add
                </Button>
            )}
        </form>
    );
};

export default AuthorForm;
