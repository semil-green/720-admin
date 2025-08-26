"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getItems } from "@/lib/api/inward-items";
import InwardItemTable from "@/components/inward-items/InwardItemTable";
import ItemWorkflowTable from "@/components/inward-items/ItemWorkflowTable";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import MainLayout from "@/components/layout/mainLayout";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { stores, StoreTypes } from "@/lib/constants";
import { useSelector } from "react-redux";
import { getAllInwardMatrialService } from "@/service/inward-material/inward-material.service";
import { useDispatch } from "react-redux";
import { getAllInwardMaterials } from "@/store/slices/inward-material/inward-material.slice";
import { setAllPackagingCenter } from "@/store/slices/packaging-center/packaging-center.slice";
import { getAllDarkStorePackagingCenter } from "@/service/darkStore-packagingCenter/darkStore-packagingCenter.service";

export default function InwardItems() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStore, setSelectedStore] = useState("");

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        getItemsList();
    }, []);

    const getItemsList = async () => {
        setLoading(true);
        const items = await getItems();
        setItems(items);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        toast.success("Deleted", {
            description: "Inward product deleted successfully.",
        });
    };

    const allInwardMaterialsData = useSelector(
        (state) => state.inwardMaterialSlice.allInwardMaterials
    );

    useEffect(() => {
        if (allInwardMaterialsData.length === 0) {
            fetchInwardMaterials();
        }
    }, [page, limit]);

    const fetchInwardMaterials = async (p = page, l = limit, s = searchTerm, st = selectedStore) => {
        setLoading(true);
        const res = await getAllInwardMatrialService(p, l, s, st);

        if (res?.data) {
            dispatch(getAllInwardMaterials(res?.data || []));
        }
        setTotalPages(Math.ceil(res?.total_count / l));

        setLoading(false);
    };


    useEffect(() => {
        fetchInwardMaterials();
    }, [page, limit]);

    useEffect(() => {
        setPage(1);
    }, [searchTerm, selectedStore]);


    const allPackagingCentersData = useSelector(
        (state) => state.packagingStoreSlice.allPackagingCenters
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

    const handleReset = async () => {
        const resetPage = 1;
        const resetSearch = "";
        const resetStore = "";

        setSearchTerm(resetSearch);
        setSelectedStore(resetStore);
        setPage(resetPage);

        await fetchInwardMaterials(resetPage, limit, resetSearch, resetStore);
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

            <Tabs defaultValue="InwardItem">
                <TabsList>
                    <TabsTrigger
                        value="InwardItem"
                        onClick={() => {
                            getItemsList();
                        }}
                    >
                        Inward Materials
                    </TabsTrigger>
                    <TabsTrigger
                        value="ItemWorkflow"
                        onClick={() => {
                            getItemsList();
                        }}
                    >
                        Workflow
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="InwardItem">
                    <div className="space-y-4">
                        <div className="flex justify-end items-center gap-2">
                            <Button
                                onClick={() => router.push("/inward-items/new")}
                                className="cursor-pointer"
                            >
                                Add Inward New Materials
                            </Button>
                        </div>

                        <div className="flex justify-between items-center gap-2 mt-4">
                            <Select
                                value={selectedStore}
                                onValueChange={(value) => setSelectedStore(value)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a packaging store" />
                                </SelectTrigger>
                                <SelectContent>
                                    {allPackagingCentersData?.map((item, index) => (
                                        <SelectItem key={index} value={item.id.toString()}>
                                            {item?.store_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search Items"
                            />

                            <Button className="cursor-pointer" onClick={fetchInwardMaterials}>
                                Search
                            </Button>

                            <Button className="cursor-pointer" onClick={handleReset} variant={"link"}>
                                Reset
                            </Button>
                        </div>

                        <InwardItemTable data={allInwardMaterialsData}
                            totalPages={totalPages}
                            page={page}
                            setPage={setPage}
                            limit={limit} />
                    </div>
                </TabsContent>

                <TabsContent value="ItemWorkflow">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center gap-2">
                            <Select defaultValue={""}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a packaging store" />
                                </SelectTrigger>
                                <SelectContent>
                                    {stores
                                        .filter((f) => f.type == StoreTypes.PackagingCenter)
                                        .map((item) => (
                                            <SelectItem
                                                key={item.value}
                                                value={item.value.toString()}
                                            >
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            <Input defaultValue="" placeholder="Search Items" />
                            <Button
                                onClick={() => router.push("/inward-items/new-workflow")}
                                className="cursor-pointer"
                            >
                                Add Workflow
                            </Button>
                        </div>

                        <ItemWorkflowTable data={items} onDelete={handleDelete} />
                    </div>
                </TabsContent>
            </Tabs>
        </MainLayout>
    );
}
