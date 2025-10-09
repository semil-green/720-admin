"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { getAllItemsService } from "@/service/items/items.service";
import { getAllItemsData } from "@/store/slices/items/items.slice";
import { getAllCollectionsService } from "@/service/collections/collections.service";
import { setAllCollectionsData, setCollections } from "@/store/slices/collections/collections.slice";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/shadcn/MultiSelect";
import { addNewDiscount, getDiscountByIdService, updateDiscountService } from "@/service/discount/discount.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const AddDiscountForm = () => {
    const [showExtraEndDate, setShowExtraEndDate] = useState(false);
    const [discountType, setDiscountType] = useState("fixed");
    const [selectedAppliedTo, setSelectedAppliedTo] = useState("collection");

    const editId = useSearchParams().get("id");
    const [selectedProduct, setSelectedProduct] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        discount_code: "",
        discount_type: "fixed",
        discount_value: "",
        max_discount_cap: "",
        eligibility_type: "all customer",
        min_requirement_type: "NONE",
        min_purchase_amount: "",
        min_purchase_quantity: "",
        has_usage_limit: false,
        usage_limit: "",
        is_single_use: false,
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
        products: [],
        collections: [],
    });

    const dispatch = useDispatch();
    const router = useRouter();

    const allProductsData = useSelector(
        (state) => state.allItemsSlice.allItemsData
    );
    const allCollectionsData = useSelector(
        (state) => state.collectionsSlice.allCollectionsData
    );

    useEffect(() => {
        const fetchProductData = async () => {
            const res = await getAllItemsService(1, 10000, "", "", "");
            if (res?.status === 200) {
                dispatch(getAllItemsData(res?.data?.data));
            }
        };
        fetchProductData();
    }, []);

    useEffect(() => {
        const fetchCollectionData = async () => {
            try {
                const res = await getAllCollectionsService(1, 1000000);
                if (res?.data) {
                    dispatch(setAllCollectionsData(res?.data?.data));
                }
            } catch (error) {
                toast.error("Error in fetching collections");
            }
        };
        fetchCollectionData();
    }, []);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleProductChange = (values) => {
        setSelectedProduct(values);
        setFormData((prev) => ({
            ...prev,
            products: values.map((val) => parseInt(val)),
        }));
    };

    const handleCollectionChange = (values) => {
        setSelectedCollection(values);
        setFormData((prev) => ({
            ...prev,
            collections: values.map((val) => parseInt(val)),
        }));
    };

    const formatTime = (time) => {
        if (!time) return null;
        if (/^\d{2}:\d{2}$/.test(time)) {
            return `${time}:00`;
        }
        return time;
    };

    const sanitizeNumber = (value) => {
        if (value === "" || value === null) return null;
        const num = Number(value);
        return isNaN(num) ? null : num;
    };

    const handleSubmit = async (e) => {

        try {
            e.preventDefault();

            if (!formData?.discount_code) {
                toast.error("Discount code is required");
                return
            }

            if (!formData?.discount_type) {
                toast.error("Discount value is required");
                return
            }

            if (!formData?.discount_value) {
                toast.error("Discount value is required");
                return
            }

            if (!formData?.start_date) {
                toast.error("Start date is required");
                return
            }

            if (!formData?.start_time) {
                toast.error("Start time is required");
                return
            }

            setLoading(true);
            const min_purchase_amount =
                formData.min_requirement_type === "AMOUNT"
                    ? sanitizeNumber(formData.min_purchase_amount)
                    : null;

            const min_purchase_quantity =
                formData.min_requirement_type === "QUANTITY"
                    ? sanitizeNumber(formData.min_purchase_quantity)
                    : null;

            const max_discount_cap =
                formData.discount_type === "percent"
                    ? sanitizeNumber(formData.max_discount_cap)
                    : null;

            const payload = {
                discount_code: formData.discount_code,
                discount_type: formData.discount_type,
                discount_value: sanitizeNumber(formData.discount_value),
                max_discount_cap,
                eligibility_type: formData.eligibility_type,
                min_requirement_type: formData.min_requirement_type,
                min_purchase_amount,
                min_purchase_quantity,
                has_usage_limit: formData.has_usage_limit,
                usage_limit: sanitizeNumber(formData.usage_limit),
                is_single_use: formData.is_single_use,
                start_date: formData.start_date,
                start_time: formatTime(formData.start_time),
                end_date: formData.end_date ?? null,
                end_time: formatTime(formData.end_time),
                products: selectedProduct.length > 0 ? selectedProduct : null,
                collections: selectedCollection.length > 0 ? selectedCollection : null,
            };

            const res = await addNewDiscount(payload);

            if (res?.status === 200) {
                toast.success("Discount added successfully");
                router.push("/discount");
                setLoading(false);
            }
            else {
                setLoading(false);
                toast.error("Failed to add discount");
            }
        }
        catch (error) {
            toast.error("Failed to add discount");
        }
        finally {
            setLoading(false);
        }

    };


    useEffect(() => {
        if (!editId) return;

        const fetchDiscountData = async (editId) => {
            setLoading(true);

            const res = await getDiscountByIdService(editId);

            if (res?.status === 200 && res?.data) {
                const data = res.data;

                setFormData({
                    discount_code: data.discount_code || "",
                    discount_type: data.discount_type || "fixed",
                    discount_value: data.discount_value || "",
                    max_discount_cap: data.max_discount_cap || "",
                    eligibility_type: data.eligibility_type || "all customer",
                    min_requirement_type: data.min_requirement_type || "NONE",
                    min_purchase_amount: data.min_purchase_amount || "",
                    min_purchase_quantity: data.min_purchase_quantity || "",
                    has_usage_limit: data.has_usage_limit || false,
                    usage_limit: data.usage_limit || "",
                    is_single_use: data.is_single_use || false,
                    start_date: data.start_date ? data.start_date.split("T")[0] : "",
                    start_time: data.start_time || "",
                    end_date: data.end_date ? data.end_date.split("T")[0] : "",
                    end_time: data.end_time || "",
                    products: data.products?.map((p) => p.product_id) || [],
                    collections: data.collections?.map((c) => c.collection_id) || [],

                });

                setDiscountType(data.discount_type || "fixed");

                setSelectedProduct(
                    data.products?.map((p) => p.product_id.toString()) || []
                );

                setSelectedCollection(
                    data.collections?.map((c) => c.collection_id.toString()) || []
                );

                if (data.end_date || data.end_time) {
                    setShowExtraEndDate(true);
                }

                if (data.products && data.products.length > 0) {
                    setSelectedAppliedTo("product");
                } else if (data.collections && data.collections.length > 0) {
                    setSelectedAppliedTo("collection");
                } else {
                    setSelectedAppliedTo("collection");
                }

                setLoading(false);
            }
        };

        fetchDiscountData(editId);
    }, [editId]);


    const handleUpdate = async (e) => {

        e.preventDefault();

        if (!formData?.discount_code) {
            toast.error("Discount code is required");
            return
        }

        if (!formData?.discount_type) {
            toast.error("Discount value is required");
            return
        }

        if (!formData?.discount_value) {
            toast.error("Discount value is required");
            return
        }

        if (!formData?.start_date) {
            toast.error("Start date is required");
            return
        }

        if (!formData?.start_time) {
            toast.error("Start time is required");
            return
        }

        setLoading(true);
        const min_purchase_amount =
            formData.min_requirement_type === "AMOUNT"
                ? sanitizeNumber(formData.min_purchase_amount)
                : null;

        const min_purchase_quantity =
            formData.min_requirement_type === "QUANTITY"
                ? sanitizeNumber(formData.min_purchase_quantity)
                : null;

        const max_discount_cap =
            formData.discount_type === "percent"
                ? sanitizeNumber(formData.max_discount_cap)
                : null;

        const payload = {
            discount_code: formData.discount_code,
            discount_type: formData.discount_type,
            discount_value: sanitizeNumber(formData.discount_value),
            max_discount_cap,
            eligibility_type: formData.eligibility_type,
            min_requirement_type: formData.min_requirement_type,
            min_purchase_amount,
            min_purchase_quantity,
            has_usage_limit: formData.has_usage_limit,
            usage_limit: sanitizeNumber(formData.usage_limit),
            is_single_use: formData.is_single_use,
            start_date: formData.start_date,
            start_time: formatTime(formData.start_time),
            end_date: formData.end_date,
            end_time: formatTime(formData.end_time),
            products: selectedProduct.length > 0 ? selectedProduct : null,
            collections: selectedCollection.length > 0 ? selectedCollection : null,
        };

        const updateDiscount = await updateDiscountService(editId, payload);


        if (updateDiscount?.data?.status === 200) {
            toast.success("Discount updated successfully")
            router.push("/discount")
            setLoading(false);
        }
        else {
            toast.error("Failed to update discount")
            setLoading(false);
        }

    }
    return (
        <>
            {loading && (
                <div className="fixed flex w-full h-full top-0 left-0 z-10">
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            )}
            <div className="grid grid-cols-3 gap-4 bg-sidebar">
                <div className="col-span-2">
                    <div className="mt-4 bg-white border rounded-md shadow px-4 py-3">
                        <h5 className="text-gray-500 font-semibold">Amount off Order</h5>
                        <div className="flex justify-between mt-4">
                            <p className="text-gray-500 font-medium">Discount Code <span className="text-red-500">*</span>
                            </p>
                        </div>
                        <input
                            className="border shadow px-2 py-2 w-full mt-2 rounded-md"
                            placeholder="NEW100"
                            value={formData.discount_code}
                            onChange={(e) =>
                                handleInputChange("discount_code", e.target.value)
                            }
                        />
                        <p className="text-gray-500 mt-2 bg-white">
                            Customer must enter this code at checkout
                        </p>
                    </div>

                    <div className="mt-4 bg-white border rounded-md shadow px-4 py-4">
                        <h5 className="text-gray-500 font-semibold">Discount Value <span className="text-red-500">*</span>
                        </h5>
                        <div className="grid grid-cols-4 gap-4 mt-4">
                            <select
                                className="w-full border rounded-md px-2 py-2 col-span-2"
                                value={formData.discount_type}
                                onChange={(e) => {
                                    setDiscountType(e.target.value);
                                    handleInputChange("discount_type", e.target.value);
                                    if (e.target.value === "fixed") {
                                        handleInputChange("max_discount_cap", "");
                                    }
                                }}
                            >
                                <option value="fixed">Fixed amount</option>
                                <option value="percent">Percentage</option>
                            </select>

                            <input
                                className="border shadow px-2 py-2 w-full rounded-md"
                                placeholder="Amount / Percent Off"
                                value={formData.discount_value}
                                onChange={(e) =>
                                    handleInputChange("discount_value", e.target.value)
                                }
                            />

                            {discountType === "percent" && (
                                <input
                                    className="border shadow px-2 py-2 w-full rounded-md"
                                    placeholder="Max cap for discount"
                                    value={formData.max_discount_cap}
                                    onChange={(e) =>
                                        handleInputChange("max_discount_cap", e.target.value)
                                    }
                                />
                            )}
                        </div>

                        <div className="mt-4">
                            <h5 className="text-gray-500 font-semibold">Applies to</h5>
                            <div className="mt-4">
                                <select
                                    className="w-full border rounded-md px-2 py-2"
                                    value={selectedAppliedTo}
                                    onChange={(e) => setSelectedAppliedTo(e.target.value)}
                                >
                                    <option value="collection">Collection</option>
                                    <option value="product">Product</option>
                                </select>
                                <div className="mt-2">
                                    {selectedAppliedTo === "product" ? (
                                        <>
                                            <Label className="mt-4">Select Product</Label>
                                            <MultiSelect
                                                options={
                                                    allProductsData?.map((item) => ({
                                                        label: item.title,
                                                        value: item.product_id.toString(),
                                                    })) || []
                                                }
                                                onValueChange={handleProductChange}
                                                defaultValue={selectedProduct}
                                                placeholder="Select Products"
                                                variant="secondary"
                                                animation={0}
                                                modalPopover={true}
                                                maxCount={3}
                                                className="w-full mt-2"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <Label className="mt-4">Select Collection</Label>
                                            <MultiSelect
                                                options={
                                                    allCollectionsData?.map((item) => ({
                                                        label: item.title,
                                                        value: item.collection_id.toString(),
                                                    })) || []
                                                }
                                                onValueChange={handleCollectionChange}
                                                defaultValue={selectedCollection}
                                                placeholder="Select Collection"
                                                variant="secondary"
                                                animation={0}
                                                modalPopover={true}
                                                maxCount={3}
                                                className="w-full mt-2"
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="mt-4 bg-white border rounded-md shadow px-4 py-3">
                        <h5 className="text-gray-500 font-semibold">Eligibility</h5>
                        <p className="text-gray-500 font-medium mt-2">
                            Redeemable on all sales code you have set up
                        </p>
                        <div className="flex flex-col space-y-2 mt-4">
                            {["all customer", "segment", "specific"].map((type, i) => (
                                <label key={i} className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="eligibility"
                                        value={type}
                                        checked={formData.eligibility_type === type}
                                        onChange={(e) =>
                                            handleInputChange("eligibility_type", e.target.value)
                                        }
                                        className="form-radio text-blue-600"
                                    />
                                    <span>
                                        {type === "all customer"
                                            ? "All customers"
                                            : type === "segment"
                                                ? "Specific customer segment"
                                                : "Specific customers"}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div> */}

                    <div className="mt-4 bg-white border rounded-md shadow px-4 py-3">
                        <h5 className="text-gray-500 font-semibold">
                            Minimum purchase requirements
                        </h5>
                        <div className="flex flex-col space-y-2 mt-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="minReq"
                                    value="NONE"
                                    checked={formData.min_requirement_type === "NONE"}
                                    onChange={(e) => {
                                        handleInputChange("min_requirement_type", e.target.value);
                                        handleInputChange("min_purchase_amount", "");
                                        handleInputChange("min_purchase_quantity", "");
                                    }}
                                    className="form-radio text-blue-600"
                                />
                                <span>No minimum requirements</span>
                            </label>

                            <label className="flex flex-col items-start space-y-1">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="minReq"
                                        value="AMOUNT"
                                        checked={formData.min_requirement_type === "AMOUNT"}
                                        onChange={(e) => {
                                            handleInputChange("min_requirement_type", e.target.value);
                                            handleInputChange("min_purchase_quantity", "");
                                        }}
                                        className="form-radio text-blue-600"
                                    />
                                    <span>Minimum purchase amount</span>
                                </div>
                                {formData.min_requirement_type === "AMOUNT" && (
                                    <div className="px-4">
                                        <input
                                            type="number"
                                            className="border rounded-md px-2 py-1 w-xl"
                                            placeholder="Enter amount"
                                            value={formData.min_purchase_amount}
                                            onChange={(e) =>
                                                handleInputChange("min_purchase_amount", e.target.value)
                                            }
                                        />
                                    </div>
                                )}
                            </label>

                            <label className="flex flex-col items-start space-y-1">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="minReq"
                                        value="QUANTITY"
                                        checked={formData.min_requirement_type === "QUANTITY"}
                                        onChange={(e) => {
                                            handleInputChange("min_requirement_type", e.target.value);
                                            handleInputChange("min_purchase_amount", "");
                                        }}
                                        className="form-radio text-blue-600"
                                    />
                                    <span>Minimum quantity of items</span>
                                </div>
                                {formData.min_requirement_type === "QUANTITY" && (
                                    <div className="px-4">
                                        <input
                                            type="number"
                                            className="border rounded-md px-2 py-1 w-xl"
                                            placeholder="Enter quantity of items"
                                            value={formData.min_purchase_quantity}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "min_purchase_quantity",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>

                    <div className="mt-4 bg-white border rounded-md shadow px-4 py-3">
                        <h5 className="text-gray-500 font-semibold">Usage limits</h5>
                        <div className="flex flex-col space-y-2 mt-4">
                            <label className="flex flex-col items-start space-y-1">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={formData.has_usage_limit}
                                        onChange={(e) =>
                                            handleInputChange("has_usage_limit", e.target.checked)
                                        }
                                        className="form-checkbox text-blue-600"
                                    />
                                    <span>
                                        Limit number of times this discount can be used in total
                                    </span>
                                </div>
                                <div className="px-4">
                                    <input
                                        type="number"
                                        className="border rounded-md px-2 py-1 w-xl"
                                        placeholder="Enter amount"
                                        value={formData.usage_limit}
                                        onChange={(e) =>
                                            handleInputChange("usage_limit", e.target.value)
                                        }
                                    />
                                </div>
                            </label>
                            <label className="flex items-center space-x-2 mt-1">
                                <input
                                    type="checkbox"
                                    checked={formData.is_single_use}
                                    onChange={(e) =>
                                        handleInputChange("is_single_use", e.target.checked)
                                    }
                                    className="form-checkbox text-blue-600"
                                />
                                <span>Limit to one use per customer</span>
                            </label>
                        </div>
                    </div>

                    <div className="mt-4 bg-white border rounded-md shadow px-4 py-3">
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="flex flex-col">
                                <label className="mb-1 text-gray-700 font-medium">
                                    Start Date <span className="text-red-500">*</span>

                                </label>
                                <input
                                    type="date"
                                    value={formData.start_date}
                                    onChange={(e) =>
                                        handleInputChange("start_date", e.target.value)
                                    }
                                    className="border rounded-md px-2 py-2"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="mb-1 text-gray-700 font-medium">
                                    Start Time <span className="text-red-500">*</span>

                                </label>
                                <input
                                    type="time"
                                    value={formData.start_time}
                                    onChange={(e) =>
                                        handleInputChange("start_time", e.target.value)
                                    }
                                    className="border rounded-md px-2 py-2"
                                />
                            </div>
                        </div>

                        <label className="flex items-center space-x-2 mt-4">
                            <input
                                type="checkbox"
                                className="form-checkbox text-blue-600"
                                onChange={(e) => setShowExtraEndDate(e.target.checked)}
                            />
                            <span>Set end date</span>
                        </label>

                        {showExtraEndDate && (
                            <div className="mt-4 grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="mb-1 text-gray-700 font-medium">
                                        End Date
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.end_date}
                                        onChange={(e) =>
                                            handleInputChange("end_date", e.target.value)
                                        }
                                        className="border rounded-md px-2 py-2"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="mb-1 text-gray-700 font-medium">
                                        End Time
                                    </label>
                                    <input
                                        type="time"
                                        value={formData.end_time}
                                        onChange={(e) =>
                                            handleInputChange("end_time", e.target.value)
                                        }
                                        className="border rounded-md px-2 py-2"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="col-span-1 bg-white border shadow px-3 py-3 rounded-md">
                    <div>
                        <h5 className="text-gray-500 font-semibold">
                            {formData.discount_code || "New 100"}
                        </h5>
                        <p className="text-gray-500 text-sm">Code</p>
                    </div>

                    <div className="mt-4">
                        <h5 className="text-gray-500 font-semibold">Type</h5>
                        <p className="text-gray-500 text-sm">
                            {formData.discount_type === "percent"
                                ? "Percentage discount"
                                : "Amount off order"}
                        </p>
                    </div>

                    <div className="mt-4">
                        <h5 className="text-gray-500 font-semibold mb-2">Details</h5>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 px-4 text-sm">
                            <li>For online store</li>
                            <li>
                                {formData.discount_type === "percent"
                                    ? `${formData.discount_value}% off`
                                    : `₹${formData.discount_value} off`}{" "}
                                entire order
                            </li>
                            {formData.min_requirement_type === "AMOUNT" && (
                                <li>Minimum purchase of ₹{formData.min_purchase_amount}</li>
                            )}
                            {formData.min_requirement_type === "QUANTITY" && (
                                <li>Minimum {formData.min_purchase_quantity} items</li>
                            )}
                            <li>{formData.eligibility_type}</li>
                            <li>
                                {formData.has_usage_limit
                                    ? `Usage limit ${formData.usage_limit}`
                                    : "No usage limit"}
                            </li>
                            <li>
                                {formData.is_single_use
                                    ? "One use per customer"
                                    : "Multiple uses allowed"}
                            </li>
                            <li>
                                Active from {formData.start_date} {formData.start_time}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-4">
                <Link href={"/discount"}>
                    <Button type="button" variant="outline">
                        Back to list
                    </Button>
                </Link>
                {
                    editId ? (<Button type="submit" className="cursor-pointer" onClick={handleUpdate} disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </Button>) : (<Button type="submit" className="cursor-pointer" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </Button>)
                }

            </div>
        </>
    );
};

export default AddDiscountForm;
