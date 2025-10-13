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
import { handleStoreOrderTransferService } from "@/service/store-order/store-order.service";
import { updateStoreOrderRequest } from "@/store/slices/store-order/store-order.slice";
const StoreOrderForm = ({
    handleCose,
    allProductsData,
    packagingCenterData,
    allDarkStoresOfUser,
    editData,
    displayTransferFields,
    setDisplayTransferFields,
    setEditData
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
        transferred_quantity: "",
        transferred_remarks: "",
    });

    useEffect(() => {
        if (editData) {
            setFormData({
                dark_store_id: editData.dark_store?.id?.toString() || "",
                packaging_center_id: editData.packaging_center?.id?.toString() || "",
                product_id: editData.product?.product_id?.toString() || "",
                quantity: editData.quantity?.toString() || "",
                remarks: editData.remarks || "",
                transferred_quantity: editData.transferred_quantity?.toString() || "",
                transferred_remarks: editData.transferred_remarks || "",
            });
        }
    }, [editData]);


    const handleChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.dark_store_id) {
            toast.error("Dark store is required");
            return;
        }
        if (!formData.packaging_center_id) {
            toast.error("Packaging center is required");
            return;
        }
        if (!formData.product_id) {
            toast.error("Product is required");
            return;
        }
        if (!formData.quantity || Number(formData.quantity) <= 0) {
            toast.error("Quantity must be greater than 0");
            return;
        }

        if (displayTransferFields && (!formData.transferred_quantity || Number(formData.transferred_quantity) <= 0)) {
            toast.error("Transferred quantity must be greater than 0");
            return;
        }
        setLoading(true);
        try {
            const payload = {
                dark_store_id: Number(formData.dark_store_id),
                packaging_center_id: Number(formData.packaging_center_id),
                product_id: Number(formData.product_id),
                quantity: Number(formData.quantity),
                remarks: formData.remarks,
                transferred_quantity: Number(formData.transferred_quantity),
                transferred_remarks: formData.transferred_remarks
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

        if (!formData.dark_store_id) {
            toast.error("Dark store is required");
            return;
        }
        if (!formData.packaging_center_id) {
            toast.error("Packaging center is required");
            return;
        }
        if (!formData.product_id) {
            toast.error("Product is required");
            return;
        }
        if (!formData.quantity || Number(formData.quantity) <= 0) {
            toast.error("Quantity must be greater than 0");
            return;
        }

        if (displayTransferFields && (!formData.transferred_quantity || Number(formData.transferred_quantity) <= 0)) {
            toast.error("Transferred quantity must be greater than 0");
            return;
        }

        try {
            setLoading(true);
            const payload = {
                id: editData?.id,
                dark_store_id: Number(formData.dark_store_id),
                packaging_center_id: Number(formData.packaging_center_id),
                product_id: Number(formData.product_id),
                quantity: Number(formData.quantity),
                remarks: formData.remarks,
                created_by: editData?.created_by,
                transferred_quantity: Number(formData?.transferred_quantity),
                transferred_remarks: formData?.transferred_remarks,
                transferred_by: "",
                updated_by: ""
            };

            if (displayTransferFields) {
                const res = await handleStoreOrderTransferService(payload);


                if (res?.status == 200) {
                    dispatch(updateStoreOrderRequest(res?.data?.data))
                    toast.success("Updated", {
                        description: "Order request updated successfully",
                    })
                    handleCose();
                }
            }
            else {
                const res = await updateOrderRequestService(editData?.id, payload);

                if (res?.status == 200) {
                    dispatch(updateOrderRequest(res?.data))
                    toast.success("Updated", {
                        description: "Order request updated successfully",
                    })
                    handleCose();
                }
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

            {
                !displayTransferFields &&
                <div>
                    <Label className="pb-2">Select Store <span className="text-red-500">*</span>
                    </Label>
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
            }


            {
                !displayTransferFields &&
                <div>
                    <Label className="pb-2">Packaging Center <span className="text-red-500">*</span>
                    </Label>
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


            }


            {
                !displayTransferFields &&
                <div>
                    <Label className="pb-2">Product <span className="text-red-500">*</span>
                    </Label>
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
            }


            {
                displayTransferFields &&

                <div>
                    <Label className="pb-2">Store <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        name="Store"
                        type="text"
                        value={editData?.dark_store?.store_name}
                        required
                        disabled={displayTransferFields}
                    />
                </div>

            }

            {
                displayTransferFields &&

                <div>
                    <Label className="pb-2">Packaging Center <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        name="Store"
                        type="text"
                        value={editData?.packaging_center?.store_name}
                        required
                        disabled={displayTransferFields}
                    />
                </div>

            }


            {
                displayTransferFields &&

                <div>
                    <Label className="pb-2">Product <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        name="Store"
                        type="text"
                        value={editData?.product?.title}
                        required
                        disabled={displayTransferFields}
                    />
                </div>

            }

            <div>
                <Label className="pb-2">Quantity <span className="text-red-500">*</span>
                </Label>
                <Input
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleChange("quantity", e.target.value)}
                    required
                    disabled={displayTransferFields}
                />
            </div>

            <div>
                <Label className="pb-2">Remarks</Label>
                <Input
                    name="remarks"
                    value={formData.remarks}
                    onChange={(e) => handleChange("remarks", e.target.value)}
                    disabled={displayTransferFields}
                />
            </div>


            {displayTransferFields &&
                <div>
                    <Label className="pb-2">Transfer Quantity <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        name="transferred_quantity"
                        type="number"
                        value={formData.transferred_quantity}
                        onChange={(e) => handleChange("transferred_quantity", e.target.value)}
                        required
                    />
                </div>
            }

            {displayTransferFields &&
                <div>
                    <Label className="pb-2">Transfer Remarks</Label>
                    <Input
                        name="transferred_remarks"
                        type="text"
                        value={formData.transferred_remarks}
                        onChange={(e) => handleChange("transferred_remarks", e.target.value)}
                        required
                    />
                </div>
            }

            <div className="flex justify-end gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        handleCose();
                        setDisplayTransferFields(false);
                    }}
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
