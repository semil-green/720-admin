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
import { getALlWorkFlowService } from "@/service/work-flow/workflow.service";
import { setWorkFlows } from "@/store/slices/work-flow/workflow.slice";
import FilterDropdown from "@/components/items/FilterDropDown";

export default function InwardItems() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Inward states
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStore, setSelectedStore] = useState("");
    const [inwarItemSort, setInwardItemSort] = useState("");

    // Workflow states
    const [workFlowPage, setWorkFlowPage] = useState(1);
    const [workFlowLimit, setWorkFlowLimit] = useState(5);
    const [workFlowTotalPages, setWorkFlowTotalPages] = useState(1);
    const [searchWorkFlow, setSearchWorkFlow] = useState("");
    const [workfloeSort, setWorkFlowSort] = useState("");

    const router = useRouter();
    const dispatch = useDispatch();

    // ========== INWARD MATERIALS ==========
    const allInwardMaterialsData = useSelector(
        (state) => state.inwardMaterialSlice.allInwardMaterials
    );

    useEffect(() => {
        if (allInwardMaterialsData.length === 0) {
            fetchInwardMaterials();
        }
    }, []);

    const fetchInwardMaterials = async (
        p = page,
        l = limit,
        s = searchTerm,
        st = selectedStore,
        sortBy = inwarItemSort?.sortBy,
        sortOrder = inwarItemSort?.sortOrder
    ) => {
        setLoading(true);
        const res = await getAllInwardMatrialService(p, l, s, st, sortBy, sortOrder);

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
        if (inwarItemSort) {
            setPage(1);
            fetchInwardMaterials(1, limit, searchTerm, selectedStore, inwarItemSort.sortBy, inwarItemSort.sortOrder);
        }
    }, [inwarItemSort]);

    useEffect(() => {
        setPage(1);
    }, [searchTerm, selectedStore]);

    const handleReset = async () => {
        setSearchTerm("");
        setSelectedStore("");
        setPage(1);
        await fetchInwardMaterials(1, limit, "", "");
    };

    // ========== PACKAGING CENTERS ==========
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

    // ========== WORKFLOW ==========
    const allWorkFlowData = useSelector((state) => state.workflowSlice.allWorkFlows);
    const fetchWorkflows = async (
        p = workFlowPage,
        l = workFlowLimit,
        s = searchWorkFlow,
        sortBy = workfloeSort?.sortBy,
        sortOrder = workfloeSort?.sortOrder
    ) => {
        setLoading(true);
        const res = await getALlWorkFlowService(p, l, s, sortBy, sortOrder);
        if (res?.status === 200) {
            dispatch(setWorkFlows(res?.data || []));
            setWorkFlowTotalPages(Math.ceil(res?.data?.total_count / l));
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchWorkflows();
    }, [workFlowPage, workFlowLimit]);

    useEffect(() => {
        if (workfloeSort) {
            setWorkFlowPage(1);
            fetchWorkflows(1, workFlowLimit, searchWorkFlow, workfloeSort.sortBy, workfloeSort.sortOrder);
        }
    }, [workfloeSort]);

    const handleWorkflowSearch = async () => {
        setWorkFlowPage(1);
        await fetchWorkflows(1, workFlowLimit, searchWorkFlow);
    };

    const handleWorkflowReset = async () => {
        setSearchWorkFlow("");
        setWorkFlowPage(1);
        await fetchWorkflows(1, workFlowLimit, "");
    };

    const inwardMaterialColumns = [
        { label: "raw item", value: "ri.raw_item" },
        { label: "sku", value: "ri.sku" },
        { label: "vendor name", value: "vm.vendor_name" },
        { label: "batch", value: "im.batch" },
        { label: "created date", value: "im.created_date" },
    ];

    const handleRawItemSortChange = (data) => {
        setInwardItemSort(data);
    }


    const workflowColumns = [
        { label: "workflow name", value: "wf.workflow_name" },
        { label: "description", value: "wf.description" },
        { label: "title", value: "p.title" },
    ];

    const handleWorkflowSortChange = (data) => {
        setWorkFlowSort(data);
    }
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
                    <TabsTrigger value="InwardItem">Inward Materials</TabsTrigger>
                    <TabsTrigger value="ItemWorkflow">Workflow</TabsTrigger>
                </TabsList>

                {/* ====== INWARD TAB ====== */}
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

                            <Button className="cursor-pointer" onClick={() => fetchInwardMaterials()}>
                                Search
                            </Button>

                            <Button className="cursor-pointer" onClick={handleReset} variant="link">
                                Reset
                            </Button>

                            <FilterDropdown
                                columns={inwardMaterialColumns}
                                onSortChange={handleRawItemSortChange}
                            />
                        </div>

                        <InwardItemTable
                            data={allInwardMaterialsData}
                            totalPages={totalPages}
                            page={page}
                            setPage={setPage}
                            limit={limit}
                        />
                    </div>
                </TabsContent>

                {/* ====== WORKFLOW TAB ====== */}
                <TabsContent value="ItemWorkflow">
                    <div className="flex justify-end">
                        <Button
                            onClick={() => router.push("/inward-items/new-workflow")}
                            className="cursor-pointer"
                        >
                            Add Workflow
                        </Button>
                    </div>
                    <div className="space-y-4 mt-4">
                        <div className="flex justify-between items-center gap-2">
                            <Input
                                value={searchWorkFlow}
                                onChange={(e) => setSearchWorkFlow(e.target.value)}
                                placeholder="Search Workflow"
                            />
                            <Button className="cursor-pointer" onClick={handleWorkflowSearch}>
                                Search
                            </Button>
                            <Button className="cursor-pointer" onClick={handleWorkflowReset} variant="link">
                                Reset
                            </Button>

                            <FilterDropdown
                                columns={workflowColumns}
                                onSortChange={handleWorkflowSortChange}
                            />
                        </div>

                        <ItemWorkflowTable
                            data={allWorkFlowData?.data}
                            totalPages={workFlowTotalPages}
                            page={workFlowPage}
                            setPage={setWorkFlowPage}
                            limit={workFlowLimit}
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </MainLayout>
    );
}


