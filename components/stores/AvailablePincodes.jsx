"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import {
    addNewPincodeService,
    deletePincodeService,
    updatePincodeService,
} from "@/service/pincode/pincode.service";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
    addDarkStorePaginatedPincodeData,
    setDarkStorePaginatedPincodeData,
    updateDarkStorePaginatedPincodeData,
} from "@/store/slices/dark-store/dark-store.slice";
import { getAllPincodesOfStoreOrPackagingCenter } from "@/service/darkStore-packagingCenter/darkStore-packagingCenter.service";
import { Loader2 } from "lucide-react";
import FilterDropdown from "@/components/items/FilterDropDown";

export default function AvailablePincodes({ editId }) {
    const [pincode, setPincode] = useState("");
    const [deliveryCharge, setDeliveryCharge] = useState("");
    const [pincodeStatus, setPincodeStatus] = useState(true);
    const [isEdit, setIsEdit] = useState(false);
    const [pincodeId, setPincodeId] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [selectedPincodeId, setSelectedPincodeId] = useState(null);

    const [pincodePage, setPincodePage] = useState(1);
    const [pincodeLimit, setPincodeLimit] = useState(10);
    const [pincodeSearch, setPincodeSearch] = useState("");
    const [pincodeCount, setPincodeCount] = useState(0);
    const [isPincodeLoading, setIsPincodeLoading] = useState(false);
    const [storeSort, setStoreSort] = useState(null);

    const router = useRouter();
    const dispatch = useDispatch();

    const fetchAllPincodesOfId = async (
        storeId = editId,
        page = pincodePage,
        limit = pincodeLimit,
        search = pincodeSearch,
        sortBy = storeSort?.sortBy,
        sortOrder = storeSort?.sortOrder
    ) => {
        try {
            setIsPincodeLoading(true);
            const fetchData = await getAllPincodesOfStoreOrPackagingCenter(
                storeId,
                page,
                limit,
                search,
                sortBy,
                sortOrder
            );
            if (fetchData?.status === 200) {
                setPincodeCount(fetchData?.data?.total);
                dispatch(setDarkStorePaginatedPincodeData(fetchData?.data?.data));
            }
        } catch (err) {
            toast.error("Failed to fetch pincodes");
        } finally {
            setIsPincodeLoading(false);
        }
    };


    useEffect(() => {
        if (!editId) return;

        fetchAllPincodesOfId(
            editId,
            pincodePage,
            pincodeLimit,
            pincodeSearch,
            storeSort?.sortBy,
            storeSort?.sortOrder
        );
    }, [editId, pincodePage, pincodeLimit, storeSort, pincodeSearch]);


    const paginatedPincodes = useSelector(
        (state) => state.darkStoreSlice.darkStorePaginatedPincodes
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pincode.trim() || !deliveryCharge.trim()) {
            toast.error("Validation Error", {
                description: "Both pincode and delivery charge are required",
            });
            return;
        }

        const data = {
            packaging_store_dark_store_id: editId,
            pincode,
            delivery_charge: deliveryCharge,
        };

        const res = await addNewPincodeService(data);

        if (res?.status === 200) {


            const newPincode = {
                storeId: editId,
                pincodeData: {
                    id: res.data.id,
                    packaging_store_dark_store_id: res.data.packaging_store_dark_store_id,
                    pincode: res.data.pincode,
                    delivery_charge: res.data.delivery_charge,
                    status: res.data.status,
                    created_at: res.data.created_at,
                    updated_at: res.data.updated_at,
                    created_by: res.data.created_by,
                    updated_by: res.data.updated_by,
                },
            };

            dispatch(addDarkStorePaginatedPincodeData(newPincode));

            toast.success("Added", { description: "Pincode added successfully" });

            setPincode("");
            setDeliveryCharge("");
        } else if (res?.status == 409) {
            toast.error("Pincode already exists");
        } else {
            toast.error("Failed to add pincode");
        }
    };

    const handleEdit = (item) => {

        setPincode(item.pincode?.toString() || "");
        setDeliveryCharge(item.delivery_charge?.toString() || "");
        setIsEdit(true);
        setPincodeId(item.id);
        setPincodeStatus(item.status);
    };

    const handleUpdatePinCode = async (e) => {
        e.preventDefault();

        if (!pincode.trim() || !deliveryCharge.trim()) {
            toast.error("Validation Error", {
                description: "Both pincode and delivery charge are required",
            });
            return;
        }

        if (isNaN(Number(pincode)) || isNaN(Number(deliveryCharge))) {
            toast.error("Validation Error", {
                description: "Pincode and delivery charge must be numbers",
            });
            return;
        }

        const data = {
            packaging_store_dark_store_id: editId,
            pincode,
            delivery_charge: deliveryCharge,
            status: pincodeStatus
        };

        const res = await updatePincodeService(pincodeId, data);

        if (res?.status === 200) {

            const updatedPincode = {
                id: res.data.id,
                pincode: res.data.pincode,
                delivery_charge: res.data.delivery_charge,
                status: res.data.status,
            };

            dispatch(updateDarkStorePaginatedPincodeData(updatedPincode));
            setIsEdit(false);
            setPincode("");
            setDeliveryCharge("");
            setPincodeId("");
            setPincodeSearch("")
            setPincodeStatus(true);
            toast.success("Updated", { description: "Pincode updated successfully" });
        } else {
            toast.error("Failed to update pincode");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault();

        try {
            const res = await deletePincodeService(id);


            if (res?.status === 200) {

                const updatedPincode = {
                    id: res.data.id,
                    pincode: res.data.pincode,
                    delivery_charge: res.data.delivery_charge,
                    status: res.data.status,
                };
                dispatch(updateDarkStorePaginatedPincodeData(updatedPincode));

                toast.success("Deleted", {
                    description: "Pincode deleted successfully",
                });
            } else {
                toast.error("Failed to delete pincode");
            }
        } catch (err) {
            toast.error("Failed to delete pincode");
        }
    };

    const storeColumns = [
        { label: "Pincode", value: "pincode" },
        { label: "Delivery Charge", value: "delivery_charge" },
    ];

    const handleStoreSortChange = (sort) => {
        setStoreSort(sort);
    };

    const handleClear = () => {
        setPincodeSearch("");
        setPincodePage(1);
        fetchAllPincodesOfId(
            editId,
            1,
            pincodeLimit,
            "",
            storeSort?.sortBy,
            storeSort?.sortOrder
        );
    };

    return (
        <div className="flex flex-col gap-2 min-w-[280px]">
            {isPincodeLoading && (
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            )}
            <form className="">
                <div className="flex flex-col  gap-2">
                    <Label htmlFor="pincode" className="sr-only">
                        Pincode
                    </Label>
                    <Input
                        name="pincode"
                        className=""
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="Pincode"
                    />
                    <Input
                        name="delivery_charge"
                        className="mt-2"
                        value={deliveryCharge}
                        onChange={(e) => setDeliveryCharge(e.target.value)}
                        placeholder="Delivery Charge"
                    />

                    <div className="flex flex-col mt-2 mx-2">
                        <span className="text-gray-700">Pincode Status</span>
                        <div className="flex gap-4 mt-1">
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="pincodeStatus"
                                    value="true"
                                    checked={pincodeStatus === true}
                                    onChange={() => setPincodeStatus(true)}
                                    className="accent-primary"
                                />
                                Active
                            </label>

                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="pincodeStatus"
                                    value="false"
                                    checked={pincodeStatus === false}
                                    onChange={() => setPincodeStatus(false)}
                                    className="accent-primary"
                                />
                                Inactive
                            </label>
                        </div>
                    </div>

                    {!isNaN(Number(editId)) && (
                        <div className="flex justify-center">
                            {isEdit ? (
                                <div className="flex gap-2">
                                    <Button
                                        type="submit"
                                        className="cursor-pointer mt-2"
                                        onClick={handleUpdatePinCode}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="cursor-pointer mt-2"
                                        variant={"outline"}
                                        onClick={() => {
                                            setIsEdit(false), setDeliveryCharge(""), setPincode("");
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    type="submit"
                                    className="cursor-pointer mt-2"
                                    onClick={handleSubmit}
                                >
                                    Add
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </form>

            <div className="flex gap-4 mt-4">
                <Input
                    className=""
                    value={pincodeSearch}
                    onChange={(e) => setPincodeSearch(e.target.value)}
                    placeholder="Search pincode"
                />
                <Button
                    type="submit"
                    className="cursor-pointer "
                    onClick={() =>
                        fetchAllPincodesOfId(
                            editId,
                            1,
                            pincodeLimit,
                            pincodeSearch,
                            storeSort?.sortBy,
                            storeSort?.sortOrder
                        )
                    }
                >
                    Search
                </Button>
                <Button type="button" variant="outline" onClick={handleClear}>
                    Clear
                </Button>

                <FilterDropdown
                    columns={storeColumns}
                    onSortChange={handleStoreSortChange}
                />
            </div>
            <table className="min-w-full table-auto border border-gray-300 rounded-md mt-2">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border-b text-center">Pincode</th>
                        <th className="p-2 border-b text-center">Delivery Charge</th>
                        <th className="p-2 border-b text-center">Status</th>
                        <th className="p-2 border-b text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedPincodes?.map((pincodeItem, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="p-2 border-b text-center">
                                <div className="inline-flex items-center gap-1 px-3 py-1 h-6 bg-white text-accent">
                                    {pincodeItem?.pincode}
                                </div>
                            </td>

                            <td className="p-2 border-b border-l border-gray-300 text-center">
                                ₹{pincodeItem?.delivery_charge}
                            </td>

                            <td className="p-2 border-b border-l border-gray-300 text-center">
                                {pincodeItem?.status ? (
                                    <span className="text-green-600">Active</span>
                                ) : (
                                    <span className="text-red-600">Inactive</span>
                                )}
                            </td>

                            <td className="p-2 border-b border-l border-gray-300 text-center flex justify-center gap-2">
                                <Button
                                    size="sm"
                                    variant="link"
                                    onClick={() => handleEdit(pincodeItem)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    size="sm"
                                    variant="link"
                                    onClick={() => {
                                        setSelectedPincodeId(pincodeItem.id);
                                        setOpenAlert(true);
                                    }}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}

                    {paginatedPincodes?.length === 0 && (
                        <tr>
                            <td className="p-2 border-b text-center" colSpan={3}>
                                No Pincodes Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="flex items-center justify-between mt-4 px-4 py-2 w-full">
                <Button
                    variant="outline"
                    onClick={() => setPincodePage((prev) => Math.max(prev - 1, 1))}
                    disabled={pincodePage <= 1}
                >
                    Previous
                </Button>

                <span className="text-sm">
                    Page {pincodePage} of {Math.ceil(pincodeCount / pincodeLimit)}, Total:{" "}
                    {pincodeCount}
                </span>

                <Button
                    variant="outline"
                    onClick={() =>
                        setPincodePage((prev) =>
                            Math.min(prev + 1, Math.ceil(pincodeCount / pincodeLimit))
                        )
                    }
                    disabled={pincodePage >= Math.ceil(pincodeCount / pincodeLimit)}
                >
                    Next
                </Button>
            </div>

            <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Pincode?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this pincode? This action cannot
                            be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={(e) => {
                                handleDelete(e, selectedPincodeId);
                                setOpenAlert(false);
                            }}
                        >
                            Confirm Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
