"use client";

import MainLayout from "@/components/layout/mainLayout";
import React, { useState, Fragment, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { PlusIcon, MinusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addNewCustomerService, getCustomerByIdService, updateCustomerService } from "@/service/customer/customer.service";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const CustomerPageContent = () => {

    const searchParams = useSearchParams();

    const idParam = searchParams.get("id");
    const editItemId = idParam !== null && !isNaN(Number(idParam))
        ? Number(idParam)
        : null;

    const [loading, setLoading] = useState(false)
    const [customerName, setCustomerName] = useState("")
    const [customerContact, setCustomerContact] = useState("")
    const [addresses, setAddresses] = useState([
        {
            id: Date.now(),
            address: "",
            pincode: "",
            latitude: "",
            longitude: "",
            building_name: "",
            nearby_landmark: "",
            address_type: "",
            is_default_address: false,
        },
    ]);

    const router = useRouter();

    const address_types = [
        { name: "Home", value: 1 },
        { name: "Work", value: 2 },
        { name: "Other", value: 3 },
    ];

    const handleAddressChange = (index, field, value) => {
        setAddresses((prev) => {
            let updated = [...prev];

            if (field === "is_default_address") {
                updated = updated.map((item, i) => ({
                    ...item,
                    is_default_address: i === index ? value : false,
                }));
            } else {
                updated[index][field] = value;
            }

            return updated;
        });
    };

    const addNewAddress = () =>
        setAddresses((prev) => [
            ...prev,
            {
                id: Date.now(),
                address: "",
                pincode: "",
                latitude: "",
                longitude: "",
                building_name: "",
                nearby_landmark: "",
                address_type: "",
                is_default_address: false,
            },
        ]);

    const removeAddress = (id) => {
        setAddresses((prev) => {
            const updated = prev.filter((a) => a.id !== id);

            const hasDefault = updated.some((a) => a.is_default_address);

            if (!hasDefault && updated.length > 0) {
                updated[0].is_default_address = true;
            }

            return updated;
        });
    };

    const handleSubmit = async () => {
        try {

            for (let i = 0; i < addresses.length; i++) {
                const address = addresses[i];

                if (!address.pincode?.trim()) {
                    toast.error(`Pincode is required in address ${i + 1}`);
                    return;
                }
                if (!address.building_name?.trim()) {
                    toast.error(`Building name is required in address ${i + 1}`);
                    return;
                }

                if (!address.nearby_landmark?.trim()) {
                    toast.error(`Nearby landmark is required in address ${i + 1}`);
                    return;
                }
                if (!address.address_type?.trim()) {
                    toast.error(`Address type is required in address ${i + 1}`);
                    return;
                }
            }

            setLoading(true)
            const payload = {
                customer_name: customerName,
                mobile_no: customerContact,
                addresses
            }

            const addData = await addNewCustomerService(payload)

            if (addData?.status === 200 || addData?.status === 201) {
                toast.success("Customer added successfully")
                router.push("/customer")
            }
        }
        catch (err) {
            toast.error("Failed to add customer")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        if (!editItemId) return

        const fetchCustomerData = async () => {
            try {
                const customerData = await getCustomerByIdService(editItemId)
                if (customerData?.status === 200 || customerData?.status === 201) {

                    setCustomerName(customerData?.data?.customer_name ?? "")
                    setCustomerContact(customerData?.data?.mobile_no ?? "")

                    setAddresses(
                        customerData?.data?.addresses?.length > 0
                            ? customerData.data.addresses.map(addr => ({
                                id: addr.address_id ?? Date.now(),
                                address: addr.address ?? "",
                                pincode: addr.pincode ?? "",
                                latitude: addr.latitude ?? "",
                                longitude: addr.longitude ?? "",
                                building_name: addr.building_name ?? "",
                                nearby_landmark: addr.nearby_landmark ?? "",
                                address_type: addr.address_type ? addr.address_type.toString() : "",
                                is_default_address: Boolean(addr.is_default_address),
                            }))
                            : [
                                {
                                    id: Date.now(),
                                    address: "",
                                    pincode: "",
                                    latitude: "",
                                    longitude: "",
                                    building_name: "",
                                    nearby_landmark: "",
                                    address_type: "",
                                    is_default_address: false,
                                },
                            ]
                    );

                }
            }
            catch (err) {
                toast.error("Failed to fetch customer data")
            }
        }

        fetchCustomerData()

        return () => {
            if (editItemId) {
                setCustomerName("")
                setCustomerContact("")
                setAddresses([])
            }
        }

    }, [editItemId])

    const handleUpdate = async () => {

        try {

            for (let i = 0; i < addresses.length; i++) {
                const address = addresses[i];

                if (!address.pincode?.trim()) {
                    toast.error(`Pincode is required in address ${i + 1}`);
                    return;
                }
                if (!address.building_name?.trim()) {
                    toast.error(`Building name is required in address ${i + 1}`);
                    return;
                }

                if (!address.nearby_landmark?.trim()) {
                    toast.error(`Nearby landmark is required in address ${i + 1}`);
                    return;
                }
                if (!address.address_type?.trim()) {
                    toast.error(`Address type is required in address ${i + 1}`);
                    return;
                }
            }

            setLoading(true)
            const payload = {
                customer_name: customerName,
                mobile_no: customerContact,
                addresses
            }

            const updateData = await updateCustomerService(editItemId, payload)

            if (updateData?.status == 200 || updateData?.status == 201) {
                toast.success("Customer updated successfully")
                router.push("/customer")
            }
        }
        catch (err) {
            toast.error("Failed to update customer")
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <>
            {loading && (
                <div className="fixed inset-0 bg-black/40 z-[999999] flex justify-center items-center">
                    <Loader2 className="h-12 w-12 animate-spin text-white" />
                </div>
            )}
            <MainLayout>
                {loading && (
                    <div className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                )}

                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Create Customer</h2>
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <Label className="pb-1">Customer Name</Label>
                                <Input
                                    placeholder="Enter customer name"
                                    required
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                />
                            </div>

                            <div className="flex-1">
                                <Label className="pb-1">Customer Mobile Number</Label>
                                <Input placeholder="9876543210" required type="number"
                                    value={customerContact}
                                    onChange={(e) => setCustomerContact(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-6 border rounded-lg p-3 flex flex-col gap-5">
                            <h3 className="text-lg font-medium">Customer Addresses</h3>

                            {addresses?.map((item, index) => (
                                <Fragment key={index}>
                                    <div className="border p-4 rounded-md flex flex-col gap-4 bg-gray-50">
                                        <div className="flex gap-3">
                                            <div className="flex-1">
                                                <Label className="pb-1">Customer Address</Label>
                                                <Textarea
                                                    className="min-h-[110px]"
                                                    value={item.address}
                                                    onChange={(e) =>
                                                        handleAddressChange(index, "address", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <Label className="pb-1">Pincode</Label>
                                                <Input
                                                    type="number"
                                                    placeholder="384201"
                                                    value={item.pincode}
                                                    onChange={(e) =>
                                                        handleAddressChange(index, "pincode", e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <div className="flex-1">
                                                <Label className="pb-1">Latitude</Label>
                                                <Input
                                                    type="number"
                                                    placeholder="0.0000"
                                                    value={item.latitude}
                                                    onChange={(e) =>
                                                        handleAddressChange(index, "latitude", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <Label className="pb-1">Longitude</Label>
                                                <Input
                                                    type="number"
                                                    placeholder="0.0000"
                                                    value={item.longitude}
                                                    onChange={(e) =>
                                                        handleAddressChange(index, "longitude", e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <div className="flex-1">
                                                <Label className="pb-1">Building Name</Label>
                                                <Input
                                                    type="text"
                                                    value={item.building_name}
                                                    onChange={(e) =>
                                                        handleAddressChange(index, "building_name", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <Label className="pb-1">Nearby Landmark</Label>
                                                <Input
                                                    type="text"
                                                    value={item.nearby_landmark}
                                                    onChange={(e) =>
                                                        handleAddressChange(index, "nearby_landmark", e.target.value)
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <div className="flex-1">
                                                <Label className="pb-1">
                                                    Address Type <span className="text-red-500">*</span>
                                                </Label>

                                                <Select
                                                    value={item.address_type}
                                                    onValueChange={(value) =>
                                                        handleAddressChange(index, "address_type", value)
                                                    }
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Type" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        {address_types?.map((t) => (
                                                            <SelectItem key={t.value} value={t.value.toString()}>
                                                                {t.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="flex-1 flex items-center mt-6">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={item.is_default_address}
                                                        onChange={(e) =>
                                                            handleAddressChange(
                                                                index,
                                                                "is_default_address",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                    <span>Is Default Address</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            {index === 0 ? (
                                                <button
                                                    onClick={addNewAddress}
                                                    className="rounded-lg size-9 flex justify-center items-center bg-blue-200 cursor-pointer"
                                                >
                                                    <PlusIcon />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => removeAddress(item?.id)}
                                                    className="rounded-lg size-9 flex justify-center items-center bg-red-200 cursor-pointer"
                                                >
                                                    <MinusIcon />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </CardContent>
                </Card>
                <div className="flex justify-center mt-6 gap-4">

                    <Link href={'/customer'}>
                        <Button type="button" variant="outline" >
                            Back to list
                        </Button>
                    </Link>

                    {
                        !editItemId ? (
                            <Button disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading ? "Saving..." : "Save"}
                            </Button>
                        ) : (
                            <Button disabled={loading}
                                onClick={handleUpdate}
                            >
                                {loading ? "Updating..." : "Update"}
                            </Button>
                        )
                    }

                </div>
            </MainLayout>
        </>
    );
};


export default function CustomerPage() {
    return (
        <Suspense
            fallback={
                <div className="fixed inset-0 flex justify-center items-center bg-black/40">
                    <Loader2 className="h-12 w-12 animate-spin text-white" />
                </div>
            }
        >
            <CustomerPageContent />
        </Suspense>
    );
}
