"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import Image from "next/image";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { getAllCollectionsService } from "@/service/collections/collections.service";
import {
    addNewSliderService,
    getSliderByIdService,
    updateSliderService,
} from "@/service/slider/slider.service";
import { setSliders } from "@/store/slices/slider/slider.slice";

export default function SliderForm({ editId }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        slider_name: "",
        collection_id: "",
        slider_image: null,
        slider_image_preview: "",
    });
    const [allCollections, setAllCollections] = useState([]);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        if (allCollections?.length == 0) {
            const fetchCollectionData = async () => {
                const res = await getAllCollectionsService(1, 100000);
                if (res?.data) {
                    setAllCollections(res?.data?.data);
                } else {
                    toast.error("Failed to fetch collections");
                }
            };
            fetchCollectionData();
        }
    }, []);
    useEffect(() => {
        if (!editId) return;

        const fetchSliderData = async () => {
            const res = await getSliderByIdService(editId);
            setEditData(res?.data);
        };

        fetchSliderData();
    }, [editId]);

    useEffect(() => {
        if (editData?.slider_id) {
            setFormData({
                slider_name: editData.slider_name || "",
                collection_id: editData.collection_id?.toString() || "",
                slider_image: null,
                slider_image_preview: editData.slider_image || "",
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setFormData((prev) => ({
                ...prev,
                slider_image: file,
                slider_image_preview: previewUrl,
            }));
        }
    };

    const handleRemoveImage = () => {
        setFormData((prev) => ({
            ...prev,
            slider_image: null,
            slider_image_preview: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.slider_name) {
            toast.error("Slider name is required");
            return;
        }

        if (!formData.collection_id) {
            toast.error("Select a collection");
            return;
        }

        if (!formData.slider_image) {
            toast.error("Slider image is required");
            return;
        }

        try {
            const payload = new FormData();
            payload.append("slider_name", formData.slider_name);
            payload.append("collection_id", formData.collection_id);
            if (formData.slider_image) {
                payload.append("slider_image", formData.slider_image);
            }

            const res = await addNewSliderService(payload);

            if (res?.status == 200 || res?.status == 201) {
                dispatch(setSliders([]));
                toast.success("Added", { description: "Slider added successfully" });
                router.push("/slider");
            }
        } catch (error) {
            toast.error("Failed to add slider");
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!formData.slider_name) {
            toast.error("Slider name is required");
            return;
        }

        if (!formData.collection_id) {
            toast.error("Select a collection");
            return;
        }

        if (!formData.slider_image) {
            toast.error("Slider image is required");
            return;
        }

        try {
            const payload = new FormData();
            payload.append("slider_name", formData.slider_name);
            payload.append("collection_id", formData.collection_id);
            if (formData.slider_image) {
                payload.append("slider_image", formData.slider_image);
            }

            const res = await updateSliderService(editId, payload);

            if (res?.status == 200 || res?.status == 201) {
                dispatch(setSliders([]));
                toast.success("Updated", {
                    description: "Slider updated successfully",
                });
                router.push("/slider");
            }
        } catch (error) {
            toast.error("Failed to update slider");
        }
    };

    return (
        <form className="grid gap-6">
            <div>
                <Label className="pb-1">Slider Title <span className="text-red-500">*</span>
                </Label>
                <Input
                    name="slider_name"
                    value={formData.slider_name}
                    onChange={handleChange}
                    placeholder="Freshwater Fish Combo"
                    required
                />
            </div>

            <div>
                <Label className="pb-1">Select Collection <span className="text-red-500">*</span>
                </Label>
                <Select
                    value={formData.collection_id}
                    onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, collection_id: value }))
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a collection" />
                    </SelectTrigger>

                    <SelectContent>
                        {allCollections?.map((item, index) => (
                            <SelectItem key={index} value={item?.collection_id.toString()}>
                                {item?.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label className="pb-1">Slider Image <span className="text-red-500">*</span>
                </Label>
                <Input type="file" accept="image/*" onChange={handleImageChange} />
                {formData?.slider_image_preview && (
                    <div className="mt-2 relative inline-block">
                        <Image
                            src={formData.slider_image_preview}
                            alt="Slider Preview"
                            width={200}
                            height={120}
                            className="rounded-lg"
                        />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-1 right-1 bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow hover:bg-gray-200"
                        >
                            X
                        </button>
                    </div>
                )}
            </div>

            <div className="flex justify-center gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/slider")}
                >
                    Back to list
                </Button>

                {!editData?.slider_id ? (
                    <Button type="submit" onClick={handleSubmit}>
                        Save
                    </Button>
                ) : (
                    <Button type="submit" onClick={handleUpdate}>
                        Update
                    </Button>
                )}
            </div>
        </form>
    );
}
