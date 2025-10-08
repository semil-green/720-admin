"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import {
    addNewRawItemService,
    getAllRawItemsService,
    updateRawItemService,
} from "@/service/raw-item/raw-item.service";
import { toast } from "sonner";
import { addNewRawItem, setRawItems, updateRawItem } from "@/store/slices/raw-ittem/raw-item.store";
import { useSelector, useDispatch } from "react-redux";
import { addNewTagService, fetchAlltagsService } from "@/service/store-order/tags.service";
import { addNewTag, setTags } from "@/store/slices/tags/tags.slice";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const RawItemForm = ({ handleClose, units, setEditRawItem }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        raw_item: setEditRawItem?.raw_item || "",
        sku: setEditRawItem?.sku || "",
        unit_id: setEditRawItem?.unit_id || "",
    });

    const [selectedTags, setSelectedTags] = useState([]);
    const [searchtag, setSearchTag] = useState("");
    const [opentagsModal, setOopentagsModal] = useState(false);

    useEffect(() => {
        if (setEditRawItem && setEditRawItem.tags) {
            setSelectedTags(setEditRawItem.tags);
        }
    }, [setEditRawItem]);


    const alltagsData = useSelector((state) => state.tagsSlice.alltagsData);

    const filteredTags = alltagsData.filter((tag) =>
        tag.tag_name.toLowerCase().includes(searchtag.toLowerCase())
    );

    const handleTagSelect = (tagId) => {
        setSelectedTags((prev) => {
            const isSelected = prev.some((t) => t.tag_id === tagId);
            if (isSelected) {
                return prev.filter((t) => t.tag_id !== tagId);
            } else {
                return [...prev, { tag_id: tagId }];
            }
        });
    };

    const productTags = filteredTags.filter(tag =>
        selectedTags.some(selected => selected.tag_id === tag.id)
    );

    const handleAddNewTag = async () => {
        try {
            const res = await addNewTagService(searchtag);

            if (res?.status == 200 || res?.status == 201) {
                dispatch(addNewTag(res?.data));
                toast.success("Tag added successfully");
                setSearchTag("");
            }
        } catch (err) {
            toast.error("Failed to add new tag");
        }
    };

    useEffect(() => {
        if (alltagsData?.length === 0) {
            const fetchData = async () => {
                try {
                    const res = await fetchAlltagsService();

                    if (res?.status == 200) {
                        dispatch(setTags(res?.data));
                    }
                } catch (err) {
                    toast.error("Failed to fetch tags");
                }
            };

            fetchData();
        }
    }, []);


    useEffect(() => {
        if (setEditRawItem) {
            setFormData({
                raw_item: setEditRawItem.raw_item || "",
                sku: setEditRawItem.sku || "",
                unit_id: setEditRawItem.unit_id || "",
            });
        }
    }, [setEditRawItem]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tagIds = selectedTags.map(tag => tag.tag_id);

        const payload = {
            ...formData,
            tag_ids: tagIds,
        };

        const res = await addNewRawItemService(payload);

        if (res?.status == 200 || res?.status == 201) {
            toast.success("Created", {
                description: "Raw Item created successfully",
            });

            dispatch(addNewRawItem(res?.data));
            handleClose();
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const tagIds = selectedTags.map(tag => tag.tag_id);

        const payload = {
            ...formData,
            tag_ids: tagIds,
        };

        const res = await updateRawItemService(setEditRawItem?.raw_id, payload)

        if (res?.status == 200 || res?.status == 200) {
            toast.success("Updated", {
                description: "Raw Item updated successfully",
            });
            handleClose();
            const newRawItem = { ...formData, raw_id: res.data.raw_id };
            dispatch(updateRawItem(newRawItem));

            const allRawItems = await getAllRawItemsService(1, 10);
            dispatch(setRawItems(allRawItems?.items || []));

            handleClose();
        }
    }

    return (
        <form className="grid gap-4">
            <div>
                <input type="hidden" name="ItemId" value={formData?.ItemId} />
                <Label className="pb-2">Raw Item</Label>
                <Input
                    name="raw_item"
                    value={formData.raw_item}
                    onChange={handleChange}
                    required
                />

            </div>

            <div>
                <input type="hidden" name="sku" value={formData.ItemId} />
                <Label className="pb-2">SKU</Label>
                <Input
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    required
                />
            </div>

            <div>
                <input type="hidden" name="ItemId" value={formData.ItemId} />
                <Label className="pb-1">Unit</Label>
                <Select
                    value={formData.unit_id?.toString() || ""}
                    onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, unit_id: parseInt(value) }))
                    }
                >

                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Unit" />
                    </SelectTrigger>
                    <SelectContent>
                        {units.map((unit) => (
                            <SelectItem key={unit.unit_id} value={unit.unit_id.toString()}>
                                {unit.unit}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex gap-4 items-center ">

                <Label className="pb-1">Tags</Label>

                <Button type="button" onClick={() => setOopentagsModal(true)} className="!h-7" size={"sm"}>
                    Add Tags
                </Button>


                <Dialog open={opentagsModal} onOpenChange={setOopentagsModal}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-center">
                                Select or Add Tag
                            </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-4">
                            <Input
                                placeholder="Search for a tag..."
                                value={searchtag}
                                onChange={(e) => setSearchTag(e.target.value)}
                            />

                            <div className="max-h-60 overflow-y-auto border rounded-md p-2 space-y-2">
                                {filteredTags.length > 0
                                    ? filteredTags.map((tag) => (
                                        <div
                                            key={tag.id}
                                            className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 cursor-pointer"
                                            onClick={() => handleTagSelect(tag.id)}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedTags.some((t) => t.tag_id === tag.id)}
                                                onChange={() => handleTagSelect(tag.id)}
                                                className="w-4 h-4 accent-blue-600 cursor-pointer"
                                            />
                                            <span>{tag.tag_name}</span>
                                        </div>
                                    ))
                                    :
                                    searchtag && (
                                        <div className="p-2 text-sm text-center">
                                            No tags found.
                                            <Button
                                                variant="link"
                                                className="text-blue-600"
                                                onClick={handleAddNewTag}
                                            >
                                                Add new tag: "{searchtag}"
                                            </Button>
                                        </div>
                                    )}
                            </div>


                        </div>

                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setOopentagsModal(false)}
                            >
                                Close
                            </Button>
                            <Button
                                onClick={() => {
                                    setOopentagsModal(false);
                                }}
                            >
                                Save
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>

            <div className="mt-0">
                <Textarea
                    name="seo_description"
                    className="min-h-[110px]"
                    value={productTags.map(tag => tag.tag_name).join(", ")}
                    readOnly
                />
            </div>

            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleClose()}
                    disabled={loading}
                >
                    Cancel
                </Button>

                {
                    !setEditRawItem?.raw_id ? (<Button type="submit" disabled={loading} onClick={handleSubmit}>
                        {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                        Save
                    </Button>) : (<Button type="submit" disabled={loading} onClick={handleUpdate}>
                        {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                        Update
                    </Button>)
                }

            </div>
        </form>
    );
};

export default React.memo(RawItemForm);
