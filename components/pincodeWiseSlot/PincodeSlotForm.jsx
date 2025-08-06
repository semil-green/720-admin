"use client";
import React, { useEffect, useState } from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PinCodeTable from "./PinCodeTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllDarkStorePackagingCenter } from "@/service/darkStore-packagingCenter/darkStore-packagingCenter.service";
import {
    getAllPincodesWiseSlot,
    allDarkStorePackagingCenter,
    addnewPincodeSlot,
    updatePincodeSlot,
} from "@/store/slices/picode-wise-slot/picode-wise-slot.service";
import { Loader2 } from "lucide-react";
import { addNewSlotService, getAllSlotsforPincodeService, updateSlotService } from "@/service/picode-wise-slot/picode-wise-slot.service";
import { toast } from "sonner"

const PincodeSlotForm = () => {
    const [loading, setLoading] = useState(true);
    const [slotLoading, setSlotLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10000);
    const [dark_store_packaging_center_id, set_dark_store_packaging_center_id] = useState(null);
    const [pincode_id, setPincode_id] = useState(null);
    const [slotName, setSlotName] = useState("");
    const [fromTime, setFromTime] = useState("");
    const [toTime, setToTime] = useState("");
    const [isEdit, setisEdit] = useState(false)
    const [editSlotId, setEditSlotId] = useState(null)


    const dispatch = useDispatch();

    const alPackagingCenterDarkStore = useSelector(
        (state) => state.pincodeWiseSlotSlice.allDarkStorePackagingCenter
    );

    const selectedItemPincode = alPackagingCenterDarkStore.find(
        (item) => item.id === dark_store_packaging_center_id
    );

    const allSlotsOfPincode = useSelector(
        (state) => state.pincodeWiseSlotSlice.allPincodeswiseSlots
    );

    useEffect(() => {
        const fetchDarkStores = async () => {
            try {
                setLoading(true);
                const result = await getAllDarkStorePackagingCenter({
                    page,
                    limit,
                });

                const list = result?.data?.data || [];

                if (result?.status === 200) {
                    dispatch(allDarkStorePackagingCenter(list));
                } else {
                    toast.error("Error fetching dark stores", {
                        description: result?.data?.message || "Something went wrong",
                    });
                }
            } catch (error) {
                toast.error("Error fetching dark stores & packaging center");
            } finally {
                setLoading(false);
            }
        };

        fetchDarkStores();
    }, [page]);

    useEffect(() => {
        const fetchSlotData = async () => {
            if (dark_store_packaging_center_id && pincode_id) {
                setSlotLoading(true);
                try {
                    const result = await getAllSlotsforPincodeService(
                        dark_store_packaging_center_id,
                        pincode_id
                    );

                    if (result?.status === 200) {
                        dispatch(getAllPincodesWiseSlot(result?.data));
                    } else {

                        toast.error("Failed to fetch slot data");
                    }
                } catch (error) {
                    toast.error("Failed to fetch slot data");
                }
            }
            setSlotLoading(false);
        };

        fetchSlotData();
    }, [dark_store_packaging_center_id, pincode_id]);

    const handleAddSlot = async () => {
        const payload = {
            slot_name: slotName,
            from_time: fromTime,
            to_time: toTime,
            dark_store_packaging_center_id,
            pincode_id,
        };
        const res = await addNewSlotService(payload);

        if (res?.status === 200) {
            toast.success("Slot added successfully");
            dispatch(addnewPincodeSlot(res?.data));
            setSlotName("");
            setFromTime("");
            setToTime("");
        }
        else {
            toast.error("Failed to add slot");
        }
    };

    const handleEditSlot = (slot) => {
        setSlotName(slot.slot_name || "");
        setFromTime(slot.from_time || "");
        setToTime(slot.to_time || "");
        setisEdit(true)
        setEditSlotId(slot.id)
    };

    const handleSlotUpdate = async () => {

        const payload = {
            slot_name: slotName,
            from_time: fromTime,
            to_time: toTime,
            dark_store_packaging_center_id,
            pincode_id,
        };

        const res = await updateSlotService(editSlotId, payload);

        if (res?.status === 200) {
            dispatch(updatePincodeSlot({ id: editSlotId, data: res?.data }));
            setSlotName("");
            setFromTime("");
            setToTime("");
            setisEdit(false)
        }
        else {
            toast.error("Failed to update slot");
        }

    }
    return (
        <div className="bg-white border rounded-md shadow px-4 py-4 ">
            <div className="flex gap-4  items-center">
                <div>Store / PC</div>
                <div className="w-[50%]">
                    <Select
                        disabled={loading}
                        onValueChange={(value) => set_dark_store_packaging_center_id(value)}
                    >
                        <SelectTrigger className="w-full">
                            {loading ? (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Loader2 className="animate-spin h-4 w-4 text-primary" />
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                <SelectValue placeholder="Select a packaging store or Dark Store" />
                            )}
                        </SelectTrigger>
                        <SelectContent>
                            {alPackagingCenterDarkStore?.map((item, index) => (
                                <SelectItem key={index} value={item?.id}>
                                    {item?.store_name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="mt-4 flex  items-center gap-4">
                <div className="w-20">Pin Code</div>
                <div className="w-[50%]">
                    <Select
                        defaultValue={""}
                        onValueChange={(value) => setPincode_id(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Pin Code" />
                        </SelectTrigger>
                        <SelectContent>
                            {selectedItemPincode?.pincodes?.length ? (
                                selectedItemPincode?.pincodes?.map((item, index) => (
                                    <SelectItem key={index} value={item?.id}>
                                        {item?.pincode}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem disabled>No Pincode Found</SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <h4 className="font-semibold text-lg mt-6">Schedule Slots</h4>

            <div className="flex mt-4 gap-4">
                <div>
                    <Label className="pb-1">Slot Name</Label>
                    <Input
                        name="slot_name"
                        placeholder="Slot Name"
                        type="text"
                        value={slotName}
                        onChange={(e) => setSlotName(e.target.value)}
                    />
                </div>
                <div>
                    <Label className="pb-1">From</Label>
                    <Input
                        name="from_time"
                        placeholder="From"
                        type="time"
                        value={fromTime}
                        onChange={(e) => setFromTime(e.target.value)}
                    />{" "}
                </div>
                <div>
                    <Label className="pb-1">To</Label>
                    <Input
                        name="to_time"
                        placeholder="To"
                        type="time"
                        value={toTime}
                        onChange={(e) => setToTime(e.target.value)}
                    />{" "}
                </div>
            </div>


            {
                !isEdit ? (<div className="flex justify-center mt-4">
                    <Button className="cursor-pointer " onClick={handleAddSlot}>
                        Save
                    </Button>
                </div>) : (
                    <div className="flex justify-center mt-4 gap-4">
                        <Button className="cursor-pointer " onClick={handleSlotUpdate}>
                            Update
                        </Button>

                        <Button className="cursor-pointer " variant="secondary" onClick={() => {
                            setSlotName("")
                            setFromTime("")
                            setToTime("")
                            setisEdit(false)
                        }}>
                            Cancel
                        </Button>
                    </div>
                )
            }


            <PinCodeTable
                allSlotsOfPincode={allSlotsOfPincode}
                isLoading={slotLoading}
                onEdit={handleEditSlot}
            />
        </div>
    );
};

export default PincodeSlotForm;
