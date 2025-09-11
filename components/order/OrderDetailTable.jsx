"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "../layout/mainLayout";
import Link from "next/link";
import { Button } from "../ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";
import Image from "next/image";
import { getCustomerOrderByIdService } from "@/service/cutomer-order/cutomer-order.service";
import { toast } from "sonner"
const OrderDetailTable = ({ order_id }) => {

    const [orderData, setOrderData] = useState("")

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await getCustomerOrderByIdService(order_id);

                if (response?.status == 200) {
                    setOrderData(response?.data)
                }
            } catch (error) {
                toast.error("Failed to fetch order data");
            }
        };

        if (order_id) {
            fetchOrderData();
        }
    }, [order_id]);

    return (
        <>

            <div className="grid grid-cols-3 gap-4 bg-sidebar">
                <div className="col-span-3 bg-white px-3 border shadow py-4">
                    <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-2 rounded-md text-sm font-medium w-fit">
                        <AlertCircle size={16} className="stroke-yellow-700" />
                        <span>Unfulfilled</span>
                    </div>

                    <div className="px-4 py-3 mt-2">
                        <div>
                            <div className="font-semibold text-gray-500">Location</div>
                            <div className="text-gray-500">
                                {orderData?.address}
                            </div>
                        </div>

                        <div className="mt-2">
                            <div className="font-semibold text-gray-500">Delivery Method</div>
                            <div className="text-gray-500">Standard Shipping</div>
                        </div>

                        <div className="mt-3">
                            <p className="font-semibold text-gray-500">Paid via</p>
                            <p className="text-gray-500">{orderData?.payment_mode}</p>
                        </div>

                        <div className="mt-4">
                            {orderData?.items?.map((food, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-12 items-start py-3 "
                                >

                                    {
                                        food?.product_display_image &&
                                        <div className="col-span-1 flex justify-center">
                                            <Image
                                                src={food?.product_display_image}
                                                alt="image"
                                                width={40}
                                                height={40}
                                                className="rounded"
                                            />
                                        </div>
                                    }

                                    <div className="col-span-5">
                                        <div className="flex flex-col gap-2">
                                            <p className="font-medium">{food?.title}</p>
                                            {food?.sku && (
                                                <p className="text-sm text-gray-500">SKU: {food?.sku}</p>
                                            )}

                                            {food?.free_product && (
                                                <p className="text-xs text-gray-500">
                                                    Free Product : true
                                                </p>
                                            )}
                                            {food?.kite_promo_name && (
                                                <p className="text-xs text-gray-500">
                                                    Kite Promo Name : {food?.kite_promo_name}
                                                </p>
                                            )}
                                            {food?.rule_id && (
                                                <p className="text-xs text-gray-500">
                                                    Rule Id : {food?.rule_id}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <p className="col-span-3 text-center">
                                        ₹{food?.price} × {food?.item_quantity}
                                    </p>

                                    <p className="col-span-1 text-center">
                                        ₹{food?.price * food?.item_quantity}
                                    </p>

                                    <p className="col-span-1 text-center">
                                        {food?.tracking_status}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 border shadow px-3 py-4">
                <div className="flex items-center gap-2 bg-gray-300 text-grey-700 px-3 py-2 rounded-md text-sm font-medium w-fit">
                    <CheckCircle size={16} className="stroke-grey-700" />
                    <span>Paid</span>
                </div>
                <div className="mt-4 space-y-4 border rounded-md shadow px-4 py-4">
                    <div className="space-y-2 px-4">
                        <div className="grid grid-cols-4 items-start">
                            <p className="col-span-1">Subtotal</p>
                            <p className="col-span-2 text-gray-600">{orderData?.items?.length} items</p>
                            <p className="col-span-1 text-right">₹ {orderData?.grand_item_total}</p>
                        </div>
                    </div>

                    <div className="space-y-2 px-4">
                        <div className="grid grid-cols-4 items-start">
                            <p className="col-span-1">Discount</p>
                            <p className="col-span-2 text-gray-600">{orderData?.discount_code || "-"}</p>
                            <p className="col-span-1 text-right"> {` -₹ orderData?.discount_value` || "0"}</p>
                        </div>
                    </div>

                    <div className="space-y-2 px-4">
                        <div className="grid grid-cols-4 items-start">
                            <p className="col-span-1">Shipping</p>
                            <p className="col-span-2 text-gray-600">
                                Standard Shipping (0.87 kg: Items 0.87 kg, Package 0.0 kg)
                            </p>
                            <p className="col-span-1 text-right">₹ {orderData?.delivery_charges}</p>
                        </div>
                    </div>

                    <div className="space-y-2 px-4">
                        <div className="grid grid-cols-4 items-start">
                            <p className="col-span-1">Taxes</p>
                            <p className="col-span-2 text-gray-600">Tax details ↓</p>
                            <p className="col-span-1 text-right">₹ {orderData?.grand_tax_total}</p>
                        </div>
                    </div>

                    <div className="space-y-2 px-4">
                        <div className="grid grid-cols-4 items-start">
                            <p className="col-span-1 font-semibold">Total</p>
                            <p className="col-span-2 text-gray-600"></p>
                            <p className="col-span-1 text-right font-semibold">₹ {orderData?.final_price}</p>
                        </div>
                    </div>

                    {/* Divider before Paid */}
                    <hr className="border-gray-300" />

                    {/* Paid */}
                    <div className="space-y-2 px-4">
                        <div className="grid grid-cols-4 items-start">
                            <p className="col-span-1 font-semibold">Paid</p>
                            <p className="col-span-2 text-gray-600"></p>
                            <p className="col-span-1 text-right font-semibold">₹ {orderData?.final_price}</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex justify-center items-center gap-4 mt-4">
                <Link href={"/orders"}>
                    <Button type="button" variant="outline">
                        Back to list
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default OrderDetailTable;
