"use client";
import FeedbackTable from "@/components/feedback/feedbackTable";
import MainLayout from "@/components/layout/mainLayout";
import { getFeedbackService } from "@/service/feedback/feedback.service";
import { setFeedback } from "@/store/slices/feedback/feedback.slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import FilterDropdown from "@/components/items/FilterDropDown";
import { toast } from "sonner";

const page = () => {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [feedbackSort, setFeedbackSort] = useState("");

    const dispatch = useDispatch();
    const router = useRouter();

    const allFeedbackData = useSelector(
        (state) => state.feedbackSlice.paginatedFeedback
    );

    const fetchFeedbackData = async (
        page,
        limit,
        search,
        sort = feedbackSort?.sortBy,
        sortBy = feedbackSort?.sortOrder
    ) => {
        try {
            setLoading(true);
            const res = await getFeedbackService(page, limit, search, sort, sortBy);

            if (res?.status === 200) {
                dispatch(setFeedback(res?.data?.data));
                setTotalPages(Math.ceil(res?.data?.total / limit));
            } else
                toast.error(res?.response?.data?.message || "Failed to fetch feedback");
        } catch (error) {
            toast.error("Error in fetching feedback");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchFeedbackData(page, limit, search, feedbackSort?.sortBy, feedbackSort?.sortOrder);

    }, [page, feedbackSort]);

    const feedbackColumns = [
        { label: "Customer Name", value: "customer_name" },
        { label: "Feedback", value: "feedback" },
    ];
    const handleFeedbackSortChange = (sort) => {
        setFeedbackSort(sort);
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

            <div className="flex justify-end mb-4">
                <Button onClick={() => router.push("/feedback/new")}>
                    Add Feedback
                </Button>
            </div>

            <div className="flex justify-between">
                <div className="flex gap-4">
                    <Input
                        placeholder="Search feedback"
                        className="w-2xl"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                fetchFeedbackData(page, limit, search, feedbackSort?.sortBy, feedbackSort?.sortOrder)
                            }
                        }}
                    />
                    <Button
                        onClick={() => fetchFeedbackData(page, limit, search, feedbackSort?.sortBy, feedbackSort?.sortOrder)}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            setSearch("");
                            setPage(1);
                            setFeedbackSort("");
                            fetchFeedbackData(1, limit, "");
                        }}
                        variant={"link"}
                    >
                        Clear
                    </Button>
                </div>
                <div className="flex justify-end">
                    <FilterDropdown
                        columns={feedbackColumns}
                        onSortChange={handleFeedbackSortChange}
                    />
                </div>
            </div>

            <div className="my-4">
                <FeedbackTable
                    data={allFeedbackData}
                    page={page}
                    totalPages={totalPages}
                    setPage={setPage}
                />
            </div>
        </MainLayout>
    );
};

export default page;
