"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

import { useSelector, useDispatch } from "react-redux";
import { addNewStateService, updateStateService } from "@/service/state/state.service";
import { addNewState, updateSlice, updateState } from "@/store/slices/state/state.slice";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";


const StateForm = ({ editStateData, handleClose }) => {
    const [formData, setFormData] = useState({
        state_name: ""
    });

    useEffect(() => {
        if (editStateData) {
            setFormData(editStateData);
        }
    }, [editStateData]);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.state_name.trim()) {
            toast.error("Validation Error", {
                description: "State name is required",
            });
            return;
        }

        const payload = {
            state_name: formData.state_name
        };

        try {
            if (formData.id > 0) {
                const res = await updateStateService(formData.id, payload);
                if (res?.status === 200) {
                    dispatch(updateState({
                        id: res?.data?.id,
                        state_name: payload.state_name
                    }))
                    toast.success("Updated", {
                        description: "State updated successfully",
                    });
                } else {
                    toast.error("Failed to update state");
                }
            } else {
                const res = await addNewStateService(payload);

                if (res?.status === 200 || res?.status === 201) {

                    dispatch(addNewState({
                        id: res?.data?.id,
                        state_name: payload.state_name
                    }))

                    toast.success("Added", {
                        description: "State added successfully",
                    });
                } else {
                    toast.error("Failed to add new state");
                }
            }
            handleClose();
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">


            <Label className="pb-1 mt-3">Enter State Name <span className="text-red-500">*</span>
            </Label>
            <input
                type="text"
                value={formData.state_name}
                onChange={(e) =>
                    setFormData({ ...formData, state_name: e.target.value })
                }
                placeholder="State Name"
                className="border rounded px-2 py-1"
            />

            {formData?.id > 0 ? (
                <Button type="submit" className="mt-3">
                    Update
                </Button>
            ) : (
                <Button type="submit" className="mt-3">
                    Add
                </Button>
            )}
        </form>
    );
};

export default StateForm;
