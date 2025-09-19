"use client";

import { useState, useEffect, Fragment } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, PlusIcon, MinusIcon } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"
import { useSelector, useDispatch } from "react-redux"
import { setAllRawItems } from "@/store/slices/raw-ittem/raw-item.store"
import { getAllRawItemsService } from "@/service/raw-item/raw-item.service"
import { getAllUnitsService } from "@/service/unit/unit.service"
import { getAllItemsService } from "@/service/items/items.service"
import { getAllItemsData } from "@/store/slices/items/items.slice"
import { addNewWorkFlowService, editWorkflowService } from "@/service/work-flow/workflow.service";
import { toast } from "sonner";
import { setWorkFlows } from "@/store/slices/work-flow/workflow.slice";

export default function ItemWorkFlowForm({ editData }) {

    const router = useRouter();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const [workflowName, setWorkflowName] = useState("");
    const [description, setDescription] = useState("");

    const [nutrients, setNutrient] = useState([
        { RawItem: 0, SKU: "", Quantity: "", Unit: 0, Id: Date.now() },
    ]);

    const [outputItem, setOutputItem] = useState([
        { value: "", Id: Date.now() },
    ]);

    const [units, setUnits] = useState([]);
    const allRawItemsData = useSelector(
        (state) => state.rawItemSlice.allRawItemsData
    );
    const allProductsData = useSelector(
        (state) => state.allItemsSlice.allItemsData
    );

    const handleNutrientChange = (index, field, value) => {
        const updated = [...nutrients];
        updated[index][field] = value;
        setNutrient(updated);
    };

    const addNewNutrient = () => {
        setNutrient([
            ...nutrients,
            { RawItem: 0, SKU: "", Unit: 0, Quantity: "", Id: Date.now() },
        ]);
    };

    const removeNutrient = (id) => {
        const newNutrients = nutrients.filter((d) => d.Id !== id);
        setNutrient(newNutrients);
    };

    const handleOutputChange = (index, value) => {
        const updated = [...outputItem];
        updated[index].value = value;
        setOutputItem(updated);
    };

    const addNewOutputProduct = () => {
        setOutputItem([...outputItem, { value: "", Id: Date.now() }]);
    };

    const removeOutputItem = (index) => {
        const updated = outputItem.filter((_, i) => i !== index);
        setOutputItem(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!workflowName?.trim()) {
            toast.error("Workflow name is required");
            return;
        }

        if (!nutrients || nutrients.length === 0) {
            toast.error("At least one input is required");
            return;
        }

        if (!outputItem || outputItem.length === 0) {
            toast.error("At least one output is required");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                workflow_name: workflowName,
                description,
                inputs: nutrients.map((n) => ({
                    raw_id: Number(n.RawItem),
                    quantity: Number(n.Quantity),
                    unit: Number(n.Unit),
                    sku: n.SKU,
                })),
                outputs: outputItem.map((o) => ({
                    product_id: Number(o.value),
                })),
            };


            const saveData = await addNewWorkFlowService(payload);

            if (saveData?.status === 201 || saveData?.status === 200) {
                dispatch(setWorkFlows([]))
                toast.success("Workflow saved successfully");
                router.push("/inward-items");
            }
        } catch (error) {
            toast.error("Failed to save workflow");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!allRawItemsData || allRawItemsData.length === 0) {
            const fetchRawItems = async () => {
                const res = await getAllRawItemsService({ page: 1, limit: 10000 });
                if (res) {
                    dispatch(setAllRawItems(res?.items || []));
                }
            };
            fetchRawItems();
        }
    }, []);

    useEffect(() => {
        if (units.length === 0) {
            const fetchUnitsData = async () => {
                try {
                    const res = await getAllUnitsService();
                    setUnits(res?.data || []);
                } catch (error) {
                    toast.error("Failed to fetch units");
                }
            };
            fetchUnitsData();
        }
    }, []);

    useEffect(() => {
        if (allProductsData?.length === 0) {
            const fetchProductData = async () => {
                const res = await getAllItemsService(1, 10000, "", "", "");
                if (res?.status == 200) {
                    dispatch(getAllItemsData(res?.data?.data));
                }
            };
            fetchProductData();
        }
    }, []);

    // prefill edit data
    useEffect(() => {
        if (editData?.workflow_id) {
            setWorkflowName(editData.workflow_name || "");
            setDescription(editData.description || "");

            if (editData.inputs?.length > 0) {
                setNutrient(
                    editData.inputs.map((input) => ({
                        RawItem: input.raw_id || 0,
                        SKU: input.sku || "",
                        Quantity: input.quantity || "",
                        Unit: input.unit_id || 0,
                        Id: Date.now() + Math.random(),
                    }))
                );
            }

            if (editData.outputs?.length > 0) {
                setOutputItem(
                    editData.outputs.map((o) => ({
                        value: o.product_id?.toString() || "",
                        Id: Date.now() + Math.random(),
                    }))
                );
            }
        }
    }, [editData]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!workflowName?.trim()) {
            toast.error("Workflow name is required");
            return;
        }

        if (!nutrients || nutrients.length === 0) {
            toast.error("At least one input is required");
            return;
        }

        if (!outputItem || outputItem.length === 0) {
            toast.error("At least one output is required");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                workflow_name: workflowName,
                description,
                inputs: nutrients.map((n) => ({
                    raw_id: Number(n.RawItem),
                    quantity: Number(n.Quantity),
                    unit: Number(n.Unit),
                    sku: n.SKU,
                })),
                outputs: outputItem.map((o) => ({
                    product_id: Number(o.value),
                })),
            };

            const res = await editWorkflowService(editData?.workflow_id, payload);

            if (res?.status === 200 || res?.status === 201) {
                toast.success("Workflow updated successfully");
                router.push("/inward-items");
            }
        } catch (error) {
            toast.error("Failed to update workflow");
        } finally {
            setLoading(false);
        }
    };


    return (
        <form >
            <div className="grid gap-5">
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Workflow </h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex-1">
                            <Label className="pb-1">Workflow Name</Label>
                            <Input
                                name="workflow_name"
                                value={workflowName}
                                onChange={(e) => setWorkflowName(e.target.value)}
                                placeholder="Enter workflow name"
                                type="text"
                                required
                            />
                        </div>

                        <div className="flex-1 mt-4">
                            <Label className="pb-1">Workflow Description</Label>
                            <Textarea
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="min-h-[110px]"
                                required
                                placeholder="Enter Workflow Description"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Input Raw Items</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col justify-center gap-2">
                            {nutrients.map((nutrient, index) => (
                                <Fragment key={nutrient.Id}>
                                    {index > 0 && (
                                        <div className="flex-1 flex items-center justify-center">
                                            <PlusIcon className="text-secondary-foreground" />
                                        </div>
                                    )}

                                    <div className="flex-1 flex items-end gap-3">
                                        <div className="flex-1">
                                            <Label className="pb-1">Raw Item</Label>
                                            <Select
                                                value={nutrient.RawItem?.toString()}
                                                onValueChange={(value) => {
                                                    handleNutrientChange(index, "RawItem", value);

                                                    const selectedItem = allRawItemsData.find(
                                                        (item) => String(item.raw_id) === String(value)
                                                    );

                                                    if (selectedItem) {
                                                        handleNutrientChange(index, "SKU", selectedItem.sku);
                                                        handleNutrientChange(index, "Unit", selectedItem.unit_id);
                                                    }
                                                }}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select an Item" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {allRawItemsData?.map((item) => (
                                                        <SelectItem
                                                            key={item.raw_id}
                                                            value={item.raw_id.toString()}
                                                        >
                                                            {item.raw_item}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex-1">
                                            <Label className="pb-1">Unit</Label>
                                            <Select
                                                value={nutrient.Unit?.toString()}
                                                onValueChange={(value) =>
                                                    handleNutrientChange(index, "Unit", value)
                                                }
                                                disabled
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a Unit" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {units?.map((unit) => (
                                                        <SelectItem
                                                            key={unit?.unit_id}
                                                            value={unit?.unit_id.toString()}
                                                        >
                                                            {unit?.unit}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex-1">
                                            <Label className="pb-1">Quantity</Label>
                                            <Input
                                                name="Quantity"
                                                value={nutrient.Quantity}
                                                onChange={(e) =>
                                                    handleNutrientChange(index, e.target.name, e.target.value)
                                                }
                                                placeholder="Quantity"
                                                type="number"
                                                required
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <Label className="pb-1">SKU</Label>
                                            <Input
                                                name="SKU"
                                                value={nutrient.SKU}
                                                onChange={(e) =>
                                                    handleNutrientChange(index, e.target.name, e.target.value)
                                                }
                                                placeholder="SKU"
                                                disabled
                                            />
                                        </div>

                                        {index === 0 ? (
                                            <div
                                                className="rounded-lg size-9 flex justify-center items-center bg-secondary cursor-pointer"
                                                onClick={addNewNutrient}
                                            >
                                                <PlusIcon className="text-secondary-foreground" />
                                            </div>
                                        ) : (
                                            <div
                                                className="rounded-lg size-9 min-w-[36px] flex justify-center items-center bg-secondary cursor-pointer"
                                                onClick={() => removeNutrient(nutrient.Id)}
                                            >
                                                <MinusIcon className="text-secondary-foreground" />
                                            </div>
                                        )}
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>
                            <h2 className="text-2xl font-bold">Output Product</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col justify-center gap-2">
                            {outputItem.map((item, index) => (
                                <Fragment key={item.Id}>
                                    {index > 0 && (
                                        <div className="flex-1 flex items-center justify-center">
                                            <PlusIcon className="text-secondary-foreground" />
                                        </div>
                                    )}

                                    <div className="flex items-end gap-3">
                                        <div className="flex-1">
                                            <Label className="pb-1">Output Product</Label>
                                            <Select
                                                value={item.value}
                                                onValueChange={(value) =>
                                                    handleOutputChange(index, value)
                                                }
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select an output item" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {allProductsData?.map((opt) => (
                                                        <SelectItem
                                                            key={opt?.product_id}
                                                            value={opt?.product_id.toString()}
                                                        >
                                                            {opt?.title}, Qty : {opt?.quantity} , {opt?.unit} ,
                                                            Piece : {opt?.pieces}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* {index === 0 ? (
                                            <div
                                                className="rounded-lg size-9 flex justify-center items-center bg-secondary cursor-pointer"
                                                onClick={addNewOutputProduct}
                                            >
                                                <PlusIcon className="text-secondary-foreground" />
                                            </div>
                                        ) : (
                                            <div
                                                className="rounded-lg size-9 flex justify-center items-center bg-secondary cursor-pointer"
                                                onClick={() => removeOutputItem(index)}
                                            >
                                                <MinusIcon className="text-secondary-foreground" />
                                            </div>
                                        )} */}
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6 flex justify-center gap-4">
                <Link href={"/inward-items"}>
                    <Button type="button" variant="outline">
                        Back to list
                    </Button>
                </Link>

                {
                    !editData?.workflow_id ? (<Button type="submit" disabled={loading} onClick={handleSubmit}>
                        {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                        Save
                    </Button>) : (<Button type="submit" disabled={loading} onClick={handleUpdate}>
                        {loading && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
                        Update
                    </Button>)
                }

            </div>
        </form>
    );
}