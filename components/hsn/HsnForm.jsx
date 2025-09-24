"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

import { useSelector, useDispatch } from "react-redux";
import { addNewStateService, updateStateService } from "@/service/state/state.service";
import { addNewState, updateSlice, updateState } from "@/store/slices/state/state.slice";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { addNewHSnCoddeService, updateHsnCodeService } from "@/service/hsn-code/hsn-code.service";
import { addHsnCode, updateHsnCode } from "@/store/slices/hsn-code/hsn-code.slice";

const HsnForm = ({ editStateData, handleClose, setEditData }) => {

    const [loading, setloading] = useState(false);
    const [formData, setFormData] = useState({
        hsn_code: "",
        gst_percentage: "",
        hsn_no: "",
        remarks: ""
    });

    useEffect(() => {
        if (editStateData) {
            setFormData({
                hsn_code: editStateData.hsn_code || "",
                gst_percentage: editStateData.gst_percentage || "",
                hsn_no: editStateData.hsn_no || "",
                remarks: editStateData.remarks || "",
                id: editStateData.id || 0
            });
        }
    }, [editStateData]);


    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.hsn_no.trim()) {
            toast.error("Validation Error", {
                description: "HSN Number is required",
            });
            return;
        }

        if (!formData.gst_percentage.trim()) {
            toast.error("Validation Error", {
                description: "GST Percentage is required",
            });
            return;
        }

        if (!formData.hsn_code.trim()) {
            toast.error("Validation Error", {
                description: "HSN Code is required",
            });
            return;
        }

        setloading(true);
        try {

            const res = await addNewHSnCoddeService(formData)

            if (res?.status == 200 || res?.status == 201) {
                toast.success("Created", {
                    description: "HSN Code created successfully",
                })
                dispatch(addHsnCode(res?.data))
                setEditData(null);
            }
            handleClose();
        } catch (err) {
            toast.error("Something went wrong");
        }
        finally {
            setloading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!formData.hsn_no.trim()) {
            toast.error("Validation Error", {
                description: "HSN Number is required",
            });
            return;
        }

        if (!formData.gst_percentage.trim()) {
            toast.error("Validation Error", {
                description: "GST Percentage is required",
            });
            return;
        }

        if (!formData.hsn_code.trim()) {
            toast.error("Validation Error", {
                description: "HSN Code is required",
            });
            return;
        }

        setloading(true);
        try {
            const res = await updateHsnCodeService(editStateData?.hsn_id, formData)

            if (res?.status == 200 || res?.status == 201) {
                toast.success("Updated", {
                    description: "HSN Code updated successfully",
                })
                dispatch(updateHsnCode(res?.data))
                setEditData(null);

            }
            handleClose();
        }
        catch (eror) {
            toast.error("Something went wrong")
        }
        finally {
            setloading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">


            <Label className="pb-1 mt-3"> HSN Number</Label>
            <input
                type="text"
                value={formData.hsn_no}
                onChange={(e) =>
                    setFormData({ ...formData, hsn_no: e.target.value })
                }
                placeholder="Enter hsn number"
                className="border rounded px-2 py-1"
            />

            <Label className="pb-1 mt-3">GST Percentage</Label>
            <input
                type="text"
                value={formData.gst_percentage}
                onChange={(e) =>
                    setFormData({ ...formData, gst_percentage: e.target.value })
                }
                placeholder="Enter GST percentage"
                className="border rounded px-2 py-1"
            />

            <Label className="pb-1 mt-3">HSN Code</Label>
            <input
                type="text"
                value={formData.hsn_code}
                onChange={(e) =>
                    setFormData({ ...formData, hsn_code: e.target.value })
                }
                placeholder="Enter HSN Code"
                className="border rounded px-2 py-1"
            />

            <Label className="pb-1 mt-3">Remarks</Label>
            <input
                type="text"
                value={formData.remarks}
                onChange={(e) =>
                    setFormData({ ...formData, remarks: e.target.value })
                }
                placeholder="Enter remarks"
                className="border rounded px-2 py-1"
            />

            {editStateData?.hsn_id > 0 ? (
                <Button type="submit" className="mt-3" onClick={handleUpdate} disabled={loading}>
                    {loading ? "Updating..." : "Update"}
                </Button>
            ) : (
                <Button type="submit" className="mt-3" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </Button>
            )}
        </form>
    );
};

export default HsnForm;
