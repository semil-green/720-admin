"use client";
import MainLayout from "@/components/layout/mainLayout";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { addNewFeedbackService, getFeedbackByIdService, updateFeedbackService } from "@/service/feedback/feedback.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addNewFeedback, updateFeedback } from "@/store/slices/feedback/feedback.slice";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const Page = () => {
    const [formData, setFormData] = useState({
        feedback: "",
        customer_name: "",
        feedback_upload: null,
        feedback_upload_preview: "",
    });

    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const feedbackId = searchParams.get("id");

    const dispatch = useDispatch();
    const router = useRouter();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData((prev) => ({
                ...prev,
                feedback_upload: file,
                feedback_upload_preview: imageUrl,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.feedback?.trim()) {
            toast.error("Feedback is required!");
            return;
        }

        if (!formData.customer_name?.trim()) {
            toast.error("Customer name is required!");
            return;
        }

        if (!formData.feedback_upload) {
            toast.error("Image is required!");
            return;
        }

        try {
            setLoading(true);

            const data = new FormData();
            data.append("feedback", formData.feedback);
            data.append("customer_name", formData.customer_name);

            if (formData.feedback_upload) {
                data.append("feedback_upload", formData.feedback_upload);
            }

            const res = await addNewFeedbackService(data);

            if (res?.status == 201) {
                toast.success("Feedback submitted successfully!");
                dispatch(addNewFeedback(res?.data));
                router.push("/feedback");
            } else
                toast.error(res?.response?.data?.message || "Failed to add feedback");
        } catch (err) {
            toast.error("Failed to submit feedback!");
        } finally {
            setLoading(false);
        }
    };

    const getFeedbackById = async (feedbackId) => {
        try {
            setLoading(true);
            const res = await getFeedbackByIdService(feedbackId);

            setFormData({
                feedback: res?.data?.feedback || "",
                customer_name: res?.data?.customer_name || "",
                feedback_upload: null,
                feedback_upload_preview: res?.data?.feedback_upload || "",
            });
        } catch (error) {
            toast.error("Failed to fetch feedback!");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!feedbackId) return;
        getFeedbackById(feedbackId);
    }, [feedbackId]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const data = new FormData();
            data.append("feedback", formData.feedback);
            data.append("customer_name", formData.customer_name);

            if (formData.feedback_upload) {
                data.append("feedback_upload", formData.feedback_upload);
            } else if (formData.feedback_upload_preview) {

                const urlParts = formData.feedback_upload_preview.split("/");
                const imageName = urlParts[urlParts.length - 1];
                data.append("feedback_upload", imageName);
            }

            const res = await updateFeedbackService(feedbackId, data);

            if (res?.status === 200) {
                toast.success("Feedback updated successfully!");
                dispatch(updateFeedback(res?.data));
                router.push("/feedback");
            } else
                toast.error(res?.response?.data?.message || "Failed to update feedback");
        } catch (err) {
            toast.error("Failed to update feedback!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <MainLayout>

            {loading && (
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            )}

            <form className=" w-[50%]  px-4 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm flex-1" >
                {!feedbackId ? (
                    <h4 className="font-semibold text-lg my-2 text-center">
                        Add New Feedback
                    </h4>
                ) : (
                    <h4 className="font-semibold text-lg my-2 text-center">
                        Update Feedback
                    </h4>
                )}

                <div>
                    <Label className="pb-1">Feedback <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        name="feedback"
                        value={formData.feedback}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <Label className="pb-1">Customer Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        name="customer_name"
                        value={formData.customer_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <Label className="pb-1">Profile Picture <span className="text-red-500">*</span>
                    </Label>
                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                    {formData.feedback_upload_preview && (
                        <div className="mt-2">
                            <Image
                                src={formData.feedback_upload_preview}
                                alt="Profile"
                                width={80}
                                height={80}
                                className="rounded-full object-cover"
                            />
                        </div>
                    )}
                </div>

                <div className="flex gap-4 justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/feedback")}
                        disabled={loading}
                    >
                        Back to list
                    </Button>
                    {!feedbackId ? (
                        <Button type="submit" disabled={loading} onClick={handleSubmit}>
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    ) : (
                        <Button type="submit" disabled={loading} onClick={handleUpdate}>
                            {loading ? "Updating..." : "Update"}
                        </Button>
                    )}
                </div>
            </form>
        </MainLayout>
    );
};


export default function AddFeedbackPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Page />
        </Suspense>
    );
}
