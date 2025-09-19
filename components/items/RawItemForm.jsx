"use client";
import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { addNewRawItem, setRawItems, updateRawItem } from "@/store/slices/raw-ittem/raw-item.store";
const RawItemForm = ({ handleClose, units, setEditRawItem }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        raw_item: setEditRawItem ? setEditRawItem.raw_item : "",
        sku: setEditRawItem ? setEditRawItem.sku : "",
        unit_id: setEditRawItem ? setEditRawItem.unit_id : "",
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await addNewRawItemService(formData);

        if (res?.status == 200 || res?.status == 201) {
            toast.success("Created", {
                description: "Raw Item created successfully",
            });
            const newRawItem = { ...formData, raw_id: res.data.raw_id };

            dispatch(addNewRawItem(newRawItem));
            handleClose();
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const res = await updateRawItemService(setEditRawItem?.raw_id, formData)

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
                <input type="hidden" name="ItemId" value={formData.ItemId} />
                <Label className="pb-2">Raw Item</Label>
                <Input
                    name="raw_item"
                    value={formData.raw_item}
                    onChange={handleChange}
                    required
                />

            </div>

            <div>
                <input type="hidden" name="ItemId" value={formData.ItemId} />
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

            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => { handleClose(); setEditRawItem }}
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
