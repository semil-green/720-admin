"use client";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useSelector, useDispatch } from "react-redux";
import { getAllStatesService } from "@/service/state/state.service";
import { setAllStates } from "@/store/slices/state/state.slice";
import { Label } from "@/components/ui/label";
import { addNewCityService, updateCityService } from "@/service/citiy/city.slice";
import { toast } from "sonner";
import { addNewPaginatedCityData, setPaginatedCityData, updatedPaginatedCity } from "@/store/slices/city/city.slice";


const CityForm = ({ editCityData, handleClose }) => {
    const [formData, setFormData] = useState({
        id: editCityData?.id || 0,
        city_name: editCityData?.city_name || "",
        state_id: editCityData?.state_id?.toString() || "",
    });

    const dispatch = useDispatch();
    const allStates = useSelector((state) => state.stateSlice.allStates);

    useEffect(() => {
        const fetchStates = async () => {
            if (!allStates?.length) {
                const data = await getAllStatesService();
                if (data?.status === 200) {
                    dispatch(setAllStates(data?.data?.data));
                } else {
                    toast.error("Failed to get all states");
                }
            }
        };
        fetchStates();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.city_name.trim() || !formData.state_id) {
            toast.error("Validation Error", {
                description: "City name and state are required",
                duration: 3000,
            });
            return;
        }

        const payload = {
            city_name: formData.city_name,
            state_id: Number(formData.state_id),
        };

        try {
            if (formData.id > 0) {
                const res = await updateCityService(formData.id, payload);

                if (res?.status === 200) {
                    dispatch(updatedPaginatedCity(res?.data))
                    toast.success("Updated", {
                        description: "City updated successfully",
                    });
                } else {
                    toast.error("Failed to update city");
                }
            } else {
                const res = await addNewCityService(payload);

                if (res?.status === 200 || res?.status === 201) {
                    dispatch(addNewPaginatedCityData(res?.data))
                    toast.success("Added", {
                        description: "City added successfully",
                    });
                } else {
                    toast.error("Failed to add city");
                }
            }
            handleClose();
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <Label className="pb-1">Select State</Label>
            <Select
                value={formData.state_id}
                onValueChange={(value) =>
                    setFormData({ ...formData, state_id: value })
                }
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                    {allStates?.map((item, index) => (
                        <SelectItem key={index} value={item.id.toString()}>
                            {item?.state_name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Label className="pb-1 mt-3">Enter City Name</Label>
            <input
                type="text"
                value={formData.city_name}
                onChange={(e) =>
                    setFormData({ ...formData, city_name: e.target.value })
                }
                placeholder="City Name"
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

export default CityForm;
