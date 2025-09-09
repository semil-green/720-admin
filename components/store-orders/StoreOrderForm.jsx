import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { addNewOrderRequestService, updateOrderRequestService } from "@/service/order-request/order-requet.service";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addNewOrderRequest, updateOrderRequest } from "@/store/slices/order-request/order-request.slice";
const StoreOrderForm = ({
    handleCose,
    allProductsData,
    packagingCenterData,
    allDarkStoresOfUser,
    editData,
}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        dark_store_id: "",
        packaging_center_id: "",
        product_id: "",
        quantity: "",
        remarks: "",
    });

    useEffect(() => {
        if (editData) {
            setFormData({
                dark_store_id: editData.dark_store_id
                    ? editData.dark_store_id.toString()
                    : "",
                packaging_center_id: editData.packaging_center_id
                    ? editData.packaging_center_id.toString()
                    : "",
                product_id: editData.product_id ? editData.product_id.toString() : "",
                quantity: editData.quantity?.toString() || "",
                remarks: editData.remarks || "",
            });
        }
    }, [editData]);

    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                dark_store_id: Number(formData.dark_store_id),
                packaging_center_id: Number(formData.packaging_center_id),
                product_id: Number(formData.product_id),
                quantity: Number(formData.quantity),
                remarks: formData.remarks,
            };

            const res = await addNewOrderRequestService(payload);

            if (res?.status === 200) {
                dispatch(addNewOrderRequest(res?.data));
                toast.success(editData ? "Updated" : "Added", {
                    description: editData
                        ? "Order request updated successfully"
                        : "Order request added successfully",
                });
                handleCose();
            }
        } catch (err) {
            toast.error("Failed to add order request");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {

            const payload = {
                dark_store_id: Number(formData.dark_store_id),
                packaging_center_id: Number(formData.packaging_center_id),
                product_id: Number(formData.product_id),
                quantity: Number(formData.quantity),
                remarks: formData.remarks,
            };

            const res = await updateOrderRequestService(editData?.id, payload);

            if (res?.status == 200) {
                dispatch(updateOrderRequest(res?.data))
                toast.success("Updated", {
                    description: "Order request updated successfully",
                })
                handleCose();
            }
        }
        catch (error) {
            toast.error("Failed to update order request");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <form className="grid gap-4" >
            <div>
                <Label className="pb-2">Select Store</Label>
                <Select
                    key={formData.dark_store_id || "store"}
                    value={formData.dark_store_id || ""}
                    onValueChange={(value) => handleChange("dark_store_id", value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a store" />
                    </SelectTrigger>
                    <SelectContent>
                        {(allDarkStoresOfUser || []).map((item) => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                                {item.store_name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label className="pb-2">Packaging Center</Label>
                <Select
                    key={formData.packaging_center_id || "packaging"}
                    value={formData.packaging_center_id}
                    onValueChange={(value) => handleChange("packaging_center_id", value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a packaging center" />
                    </SelectTrigger>
                    <SelectContent>
                        {packagingCenterData?.map((item) => (
                            <SelectItem key={item.id} value={item.id.toString()}>
                                {item.store_name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label className="pb-2">Product</Label>
                <Select
                    key={formData.product_id || "product"}
                    value={formData.product_id}
                    onValueChange={(value) => handleChange("product_id", value)}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                        {(allProductsData || []).map((item) => (
                            <SelectItem
                                key={item.product_id}
                                value={item.product_id.toString()}
                            >
                                {item.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label className="pb-2">Quantity</Label>
                <Input
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleChange("quantity", e.target.value)}
                    required
                />
            </div>

            <div>
                <Label className="pb-2">Remarks</Label>
                <Input
                    name="remarks"
                    value={formData.remarks}
                    onChange={(e) => handleChange("remarks", e.target.value)}
                />
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

                {!editData?.id ? (
                    <Button type="submit" disabled={loading} onClick={handleSubmit}>
                        {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                        {loading ? "Saving..." : "Save"}
                    </Button>
                ) : (
                    <Button type="submit" disabled={loading} onClick={handleUpdate}>
                        {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                        {loading ? "Updating..." : "update"}
                    </Button>
                )}
            </div>
        </form>
    );
};

export default React.memo(StoreOrderForm);
