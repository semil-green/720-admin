"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";
import Image from "next/image";
import { getCustomerOrderByIdService } from "@/service/cutomer-order/cutomer-order.service";
import { toast } from "sonner";
import printJS from "print-js";

const OrderDetailTable = ({ order_id }) => {
    const [orderData, setOrderData] = useState("");

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await getCustomerOrderByIdService(order_id);

                if (response?.status == 200) {
                    setOrderData(response?.data);
                }
            } catch (error) {
                toast.error("Failed to fetch order data");
            }
        };

        if (order_id) {
            fetchOrderData();
        }
    }, [order_id]);

    const handlePrint = (storeItems) => {
        if (!storeItems || storeItems.length === 0) return;

        const createdDate = new Date(orderData.created_date);
        const formattedDate = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(createdDate);

        const firstItem = storeItems[0];
        const pincode = firstItem?.pincode || "";
        const deliveryCharge = parseFloat(firstItem?.delivery_charge) || 0;

        // Build items HTML and calculate total tax and total item price
        let itemsHtml = "";
        let totalTax = 0;
        let totalItemPrice = 0;

        storeItems.forEach((item) => {
            const gst = item.gst_percentage ?? 0;
            const tax = parseFloat(item.tax_amount) || 0;
            totalTax += tax;

            const itemTotal =
                (parseFloat(item.price) || 0) * (item.item_quantity || 0);
            totalItemPrice += itemTotal;

            itemsHtml += `
                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                    <div style="text-align:left;">
                        <p style="margin:0;">${item.title}</p>
                        <p style="margin:0; font-size:12px;">Price: ₹${item.price}</p>
                        <p style="margin:0; font-size:12px;">GST: ${gst}%</p>
                        <p style="margin:0; font-size:12px;">Tax Amount: ₹${tax}</p>
                    </div>
                    <div style="text-align:right; width:40px;">
                        <p style="margin:0;">${item.item_quantity}</p>
                    </div>
                </div>
            `;
        });

        const totalPrice = totalItemPrice + totalTax + deliveryCharge;

        const printableHtml = `
          <div style="width:200px; font-family: 'Courier New', monospace; font-size:14px; text-align:center; margin:0 auto; padding:20px;">
            <h2 style="margin:0 0 10px 0;">DAM GOOD FISH</h2>
            <p style="margin:0;">Order No: ${orderData.order_id}</p>
            <p style="margin-top:10px;">${formattedDate}</p>
    
            <div style="text-align:center; margin-top:10px;">
              <p style="margin:0;">GST:</p>
              <p style="margin:3px 0 0 0;">06AAKCD3257D1ZU</p>
            </div>
    
            <div style="text-align:left; margin-top:15px;">
              <p style="margin:0;">Ship To:</p>
              <p style="margin:5px 0 0 0;">${orderData.customer_name}</p>
              <p style="margin:5px 0 0 0;">${orderData.address}</p>
              <p style="margin:5px 0 0 0;">Mobile Number: ${orderData.mobile_no}</p>
              <p style="margin:5px 0 0 0;">Pincode: ${orderData.pincode}</p>
            </div>
    
            <div style="text-align:left; margin-top:15px;">
              <p style="margin:0;">Bill To:</p>
              <p style="margin:5px 0 0 0;">${orderData.customer_name}</p>
              <p style="margin:5px 0 0 0;">${orderData.address}</p>
              <p style="margin:5px 0 0 0;">Pincode: ${orderData.pincode}</p>
            </div>
    
            <hr style="border: none; border-top: 1px dashed #000; margin:10px 0;">
    
            <!-- Items Table -->
            <div style="text-align:left; margin-top:10px;">
              <div style="display:flex; justify-content:space-between; font-weight:bold; margin-bottom:5px;">
                <div>Items</div>
                <div>Quantity</div>
              </div>
              ${itemsHtml}
            </div>
    
            <hr style="border: none; border-top: 1px dashed #000; margin:10px 0;">
    
            <!-- Order Summary -->
            <div style="text-align:left; margin-top:10px;">
              <div style="display:flex; justify-content:space-between; font-weight:bold; margin-bottom:5px;">
                <div>Order Summary</div>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <div>Total Tax:</div>
                <div>₹${totalTax.toFixed(2)}</div>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <div>Delivery Charge:</div>
                <div>₹${deliveryCharge.toFixed(2)}</div>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:5px; font-weight:bold;">
                <div>Total Price:</div>
                <div>₹${totalPrice.toFixed(2)}</div>
              </div>
            </div>

            <hr style="border: none; border-top: 1px dashed #000; margin:10px 0;">
            
            <h4 style="margin:0 0 10px 0;">Thank you for shopping with us!</h4>

            <h4 style="margin:0 0 10px 0;">Dam Good Fish
                <br/> Dam good fish Private Limited,
                <br/> Gurugram, HR, 122004, India
                hello@damgoodfish.com
                damgoodfish.com
                </h4>
                
          </div>

        `;

        printJS({
            printable: printableHtml,
            type: "raw-html",
            style: `
                @page { margin: 0; }
                body { display:flex; justify-content:center; }
                h2 { font-weight:bold; text-align:center; }
                p { margin:0; }
            `,
        });
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-4 bg-sidebar">
                <div className="col-span-3 bg-white px-3 border shadow py-4">
                    {/* <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-2 rounded-md text-sm font-medium w-fit">
                        <AlertCircle size={16} className="stroke-yellow-700" />
                        <span>Unfulfilled</span>
                    </div> */}

                    <div className="px-4 py-3 mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="space-y-3">
                            <div>
                                <div className="font-semibold text-gray-500">Order Number</div>
                                <div className="text-gray-500">{orderData?.order_id}</div>
                            </div>

                            <div className="mt-2">
                                <div className="font-semibold text-gray-500">Delivery Method</div>
                                <div className="text-gray-500">Standard Shipping</div>
                            </div>

                            <div className="mt-3">
                                <p className="font-semibold text-gray-500">Paid via</p>
                                <p className="text-gray-500">{orderData?.payment_mode}</p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <div className="font-semibold text-gray-500">Customer Name</div>
                                <div className="text-gray-500">{orderData?.customer_name}</div>
                            </div>
                            <div className="mt-2">
                                <div className="font-semibold text-gray-500">Location</div>
                                <div className="text-gray-500">{orderData?.address}</div>
                            </div>
                            <div className="mt-2">
                                <div className="font-semibold text-gray-500">Customer Contact</div>
                                <div className="text-gray-500">{orderData?.mobile_no}</div>
                            </div>
                        </div>
                    </div>

                </div>

                {orderData?.items &&
                    Object.entries(orderData.items).map(([storeId, storeItems], shipmentIndex) => (
                        <div
                            key={storeId}
                            className="col-span-3 bg-white px-3 border shadow py-4"
                        >
                            <div className="flex justify-between items-center border-b pb-2 mb-3">
                                <p className="font-semibold text-gray-700 px-7">
                                    Shipment: {shipmentIndex + 1}
                                </p>
                                <p className="text-sm text-gray-500 px-7">
                                    Status: {storeItems[0]?.tracking_status || "-"}
                                </p>
                            </div>

                            {storeItems.map((food, index) => (
                                <div
                                    key={index}
                                    className="grid grid-cols-12 items-start py-3 border-b last:border-b-0"
                                >
                                    {food?.product_display_image && (
                                        <div className="col-span-1 flex justify-center">
                                            <Image
                                                src={food?.product_display_image}
                                                alt="image"
                                                width={40}
                                                height={40}
                                                className="rounded"
                                            />
                                        </div>
                                    )}

                                    <div className="col-span-5">
                                        <div className="flex flex-col gap-2">
                                            <p className="font-medium">{food?.title}</p>
                                            {food?.sku && (
                                                <p className="text-sm text-gray-500">
                                                    SKU: {food?.sku}
                                                </p>
                                            )}
                                            {food?.free_product && (
                                                <p className="text-xs text-gray-500">
                                                    Free Product: true
                                                </p>
                                            )}
                                            {food?.kite_promo_name && (
                                                <p className="text-xs text-gray-500">
                                                    Kite Promo Name: {food?.kite_promo_name}
                                                </p>
                                            )}
                                            {food?.rule_id && (
                                                <p className="text-xs text-gray-500">
                                                    Rule Id: {food?.rule_id}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <p className="col-span-3 text-center">
                                        ₹{food?.price} × {food?.item_quantity}
                                    </p>

                                    <p className="col-span-1 text-center">
                                        ₹
                                        {(parseFloat(food?.price) || 0) *
                                            (food?.item_quantity || 0)}
                                    </p>

                                    <p className="col-span-1 text-center">
                                        {food?.tracking_status || "-"}
                                    </p>
                                </div>
                            ))}

                            <div className="flex justify-center mt-4">
                                <Button type="button" onClick={() => handlePrint(storeItems)}>
                                    Print
                                </Button>
                            </div>
                        </div>
                    ))}


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
                            <p className="col-span-2 text-gray-600">
                                {orderData?.items?.length} items
                            </p>
                            <p className="col-span-1 text-right">
                                ₹ {orderData?.grand_item_total}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 px-4">
                        <div className="grid grid-cols-4 items-start">
                            <p className="col-span-1">Discount</p>
                            <p className="col-span-2 text-gray-600">
                                {orderData?.discount_code || "-"}
                            </p>
                            <p className="col-span-1 text-right">
                                {" "}
                                {` -₹ ${orderData?.discount_value == null ? "0" : orderData?.discount_value}` || "0"}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 px-4">
                        <div className="grid grid-cols-4 items-start">
                            <p className="col-span-1">Shipping</p>
                            <p className="col-span-2 text-gray-600">
                                Standard Shipping (0.87 kg: Items 0.87 kg, Package 0.0 kg)
                            </p>
                            <p className="col-span-1 text-right">
                                ₹ {orderData?.delivery_charges}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 px-4">
                        <div className="grid grid-cols-4 items-start">
                            <p className="col-span-1">Taxes</p>
                            <p className="col-span-2 text-gray-600">Tax details </p>
                            <p className="col-span-1 text-right">
                                ₹ {orderData?.grand_tax_total}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 px-4">
                        <div className="grid grid-cols-4 items-start">
                            <p className="col-span-1 font-semibold">Total</p>
                            <p className="col-span-2 text-gray-600"></p>
                            <p className="col-span-1 text-right font-semibold">
                                ₹ {orderData?.final_price}
                            </p>
                        </div>
                    </div>

                    {/* Divider before Paid */}
                    <hr className="border-gray-300" />

                    {/* Paid */}
                    <div className="space-y-2 px-4">
                        <div className="grid grid-cols-4 items-start">
                            <p className="col-span-1 font-semibold">Paid</p>
                            <p className="col-span-2 text-gray-600"></p>
                            <p className="col-span-1 text-right font-semibold">
                                ₹ {orderData?.final_price}
                            </p>
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
