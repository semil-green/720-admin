"use client";

import MainLayout from "@/components/layout/mainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from "react-redux";
import { getAllDarkStorePackagingCenter } from "@/service/darkStore-packagingCenter/darkStore-packagingCenter.service";
import { setAllPackagingCenter } from "@/store/slices/packaging-center/packaging-center.slice";
import { getAllVendorsService } from "@/service/vendor-master/vendor-master.service";
import { setAllVendorsData } from "@/store/slices/vendor-master/vendor-master.slice";
import { setAllRawItems } from "@/store/slices/raw-ittem/raw-item.store";
import { getAllRawItemsService } from "@/service/raw-item/raw-item.service";
import { Button } from "@/components/ui/button";
import {
    addNewInwardmaterialService,
    getInwardMaterialByIdService,
    updateInwardMaterialService,
} from "@/service/inward-material/inward-material.service";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getAllInwardMaterials } from "@/store/slices/inward-material/inward-material.slice";
import { Suspense } from "react";


function CreateInwardItem() {
    const [formData, setFormData] = useState({
        packagingstore_id: "",
        rawitem_id: "",
        vendor_id: "",
        batch: "",
        quantity: "",
    });
    const [loading, setLoading] = useState(false);
    const [vendorPage, setVendorPage] = useState(1)
    const [vendorLimit, setVendorLimit] = useState(10000)


    const router = useRouter();
    const dispatch = useDispatch();

    const editId = useSearchParams().get("id");

    useEffect(() => {
        if (!editId) return;
        const fetchEditData = async () => {
            setLoading(true);
            const res = await getInwardMaterialByIdService(editId);

            if (res?.status == 200) {
                setFormData({
                    packagingstore_id: res?.data?.packagingstore_id,
                    rawitem_id: res?.data?.rawitem_id,
                    vendor_id: res?.data?.vendor_id,
                    batch: res?.data?.batch,
                    quantity: res?.data?.quantity,
                });
                setLoading(false);
            }
            else {
                toast.error("Error in fetching inward material data");
                setLoading(false);
            }
        };

        fetchEditData();
    }, [editId]);

    const allPackagingCentersData = useSelector(
        (state) => state.packagingStoreSlice.allPackagingCenters
    );
    const allVendorsData = useSelector(
        (state) => state.vendorMasterSlice.allVendorsData
    );

    const allRawItemsData = useSelector(
        (state) => state.rawItemSlice.allRawItemsData
    );

    useEffect(() => {
        if (!allPackagingCentersData || allPackagingCentersData.length === 0) {
            const fetchData = async () => {
                const result = await getAllDarkStorePackagingCenter({
                    type: "packaging_center",
                    page: 1,
                    limit: 10000,
                });
                if (result?.status === 200) {
                    dispatch(setAllPackagingCenter(result?.data?.data || []));
                }
            };
            fetchData();
        }
    }, []);

    useEffect(() => {
        if (!allVendorsData || allVendorsData.length === 0) {
            const fetchVendors = async () => {
                const result = await getAllVendorsService(vendorPage, vendorLimit);

                if (result?.status === 200) {
                    dispatch(setAllVendorsData(result?.data?.data));
                }
            };
            fetchVendors();
        }
    }, []);

    useEffect(() => {
        if (!allRawItemsData || allRawItemsData.length === 0) {
            const fetchRawItems = async () => {
                const res = await getAllRawItemsService({
                    page: 1,
                    limit: 10000,
                    search: "",
                });
                if (res) {
                    dispatch(setAllRawItems(res?.items || []));
                }
            };
            fetchRawItems();
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.batch) {
            toast.error("Batch is required");
            return
        }

        const payload = {
            packagingstore_id: parseInt(formData.packagingstore_id),
            rawitem_id: parseInt(formData.rawitem_id),
            vendor_id: parseInt(formData.vendor_id),
            batch: formData.batch,
            quantity: parseInt(formData.quantity),
        };

        const addData = await addNewInwardmaterialService(payload);

        if (addData?.status === 200 || addData?.status === 201) {
            toast.success("Added", {
                description: "New Inward material added successfully",
            });
            dispatch(getAllInwardMaterials([]));
            router.push("/inward-items");
        } else {
            toast.error("Error in adding Inward material");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const payload = {
            packagingstore_id: parseInt(formData.packagingstore_id),
            rawitem_id: parseInt(formData.rawitem_id),
            vendor_id: parseInt(formData.vendor_id),
            batch: formData.batch,
            quantity: parseInt(formData.quantity),
        };

        const res = await updateInwardMaterialService(editId, payload);


        if (res?.status === 200 || res?.status === 201) {
            dispatch(getAllInwardMaterials([]))
            toast.success("Updated", {
                description: "Inward material updated successfully",
            });
            router.push("/inward-items");
        }
        else {
            toast.error("Error in updating Inward material");
        }
    }

    return (
        <MainLayout>
            {loading &&
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            }
            <form >
                <div className="flex flex-wrap gap-5 mb-5 grid grid-cols-3">
                    <div className="col-span-1">
                        <Label className="pb-1">Packaging Store</Label>
                        <Select
                            value={formData.packagingstore_id?.toString()}
                            onValueChange={(value) =>
                                setFormData((prev) => ({ ...prev, packagingstore_id: value }))
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a packaging store" />
                            </SelectTrigger>
                            <SelectContent>
                                {allPackagingCentersData?.map((item) => (
                                    <SelectItem key={item.id} value={item.id.toString()}>
                                        {item.store_name}, {item.city?.city_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="col-span-1">
                        <Label className="pb-1">Raw Items</Label>
                        <Select
                            value={formData.rawitem_id?.toString()}
                            onValueChange={(value) =>
                                setFormData((prev) => ({ ...prev, rawitem_id: value }))
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a raw item" />
                            </SelectTrigger>
                            <SelectContent>
                                {allRawItemsData?.map((item) => (
                                    <SelectItem key={item.raw_id} value={item.raw_id.toString()}>
                                        {item.raw_item}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex flex-wrap gap-5 mb-5 grid grid-cols-3">
                    <div className="col-span-1">
                        <Label className="pb-1">Vendor</Label>
                        <Select
                            value={formData.vendor_id?.toString()}
                            onValueChange={(value) =>
                                setFormData((prev) => ({ ...prev, vendor_id: value }))
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a vendor" />
                            </SelectTrigger>
                            <SelectContent>
                                {allVendorsData?.map((vendor) => (
                                    <SelectItem key={vendor.id} value={vendor.id.toString()}>
                                        {vendor.account_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="col-span-1">
                        <Label className="pb-1">Batch</Label>
                        <Input
                            name="batch"
                            value={formData.batch}
                            onChange={handleChange}
                            placeholder="BATCH-2025-02"
                            type="text"
                            required
                        />
                    </div>
                </div>

                <div className="flex gap-2 grid grid-cols-3 mt-4">
                    <div className="col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    <h2 className="text-2xl font-bold">Add Stock</h2>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Label className="pb-1">Quantity</Label>
                                <Input
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    placeholder="120"
                                    type="number"
                                    required
                                />

                                <div className="flex justify-end gap-4 mt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.push("/inward-items")}
                                    >
                                        Cancel
                                    </Button>
                                    {editId != null ? (
                                        <Button type="submit" onClick={handleUpdate}>Update</Button>
                                    ) : (
                                        <Button type="submit" onClick={handleSubmit}>Save</Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </MainLayout>
    );
}

export default function CreateInwardItemPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CreateInwardItem />
        </Suspense>
    );
}