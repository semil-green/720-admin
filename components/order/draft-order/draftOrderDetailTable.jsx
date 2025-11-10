"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle } from "lucide-react";
import Image from "next/image";
import {
    fetchOrderStatusTypesService,
    getCustomerOrderByIdService,
    updateOrderStatusService,
    updatePaymentStatusService,
} from "@/service/cutomer-order/cutomer-order.service";
import { toast } from "sonner";
import printJS from "print-js";
import { useDispatch, useSelector } from "react-redux";
import { setOrderStatus } from "@/store/slices/order-status/order-status.slice";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { fetchItemLabelService } from "@/service/items/items.service";

const DraftOrderDetailTable = ({ order_id }) => {
    const [orderData, setOrderData] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("0");
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState("");

    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        if (orderData) {
            setSelectedStatus(String(orderData.order_status));
        }
    }, [orderData]);
    const orderStatus = useSelector(
        (state) => state.orderStatusSlice.allOrderStatus
    );

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                setLoading(true);
                const response = await getCustomerOrderByIdService(order_id);

                if (response?.status == 200) {
                    setOrderData(response?.data);
                    setPaymentStatus(response?.data?.payment_status);
                }
            } catch (error) {
                toast.error("Failed to fetch order data");
            } finally {
                setLoading(false);
            }
        };

        if (order_id) {
            fetchOrderData();
        }
    }, [order_id]);

    const fetchOrderStatus = async () => {
        try {
            const res = await fetchOrderStatusTypesService();

            if (res?.status == 200 || res?.status == 201) {
                dispatch(setOrderStatus(res?.data));
            }
        } catch (error) {
            toast.error("Failed to fetch order status");
        }
    };
    useEffect(() => {
        if (!orderStatus || orderStatus.length === 0) {
            fetchOrderStatus();
        }
    }, [orderStatus]);

    const handlePrint = (storeItems) => {
        if (!storeItems || storeItems.length === 0) return;

        const createdDate = new Date(orderData.created_date);
        const formattedDate = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }).format(createdDate);

        const firstItem = storeItems[0];
        const deliveryCharge = parseFloat(firstItem?.delivery_charge) || 0;

        let itemsHtml = "";
        let totalTax = 0;
        let totalItemPrice = 0;

        storeItems.forEach((item) => {
            const gst = parseFloat(item.gst_percentage) || 0;
            const tax = parseFloat(item.gst_amount) || 0;
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

        const discountAmount = parseFloat(orderData?.discount_amount || 0);
        const totalBeforeDiscount = totalItemPrice + deliveryCharge;
        const totalPrice = totalBeforeDiscount - discountAmount;

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
              <p style="margin:5px 0 0 0;">Mobile Number: ${orderData.mobile_no
            }</p>
              <p style="margin:5px 0 0 0;">Pincode: ${orderData.pincode}</p>
            </div>
    
            <hr style="border: none; border-top: 1px dashed #000; margin:10px 0;">
    
            <!-- Items Table -->
            <div style="text-align:left; margin-top:10px;">
              <div style="display:flex; justify-content:space-between; font-weight:bold; margin-bottom:5px;">
                <div>Items</div>
                <div>Qty</div>
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
              <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                <div>Discount:</div>
                <div>₹${discountAmount.toFixed(2)}</div>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:5px; font-weight:bold;">
                <div>Total Price:</div>
                <div>₹${totalPrice.toFixed(2)}</div>
              </div>
            </div>
    
            <hr style="border: none; border-top: 1px dashed #000; margin:10px 0;">
    
            <h4 style="margin:0 0 10px 0;">Thank you for shopping with us!</h4>
            <p style="margin:0;">Dam Good Fish Private Limited</p>
            <p style="margin:0;">Gurugram, HR, 122004</p>
            <p style="margin:0;">hello@damgoodfish.com</p>
            <p style="margin:0;">damgoodfish.com</p>
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

    const handleOrderStatus = async () => {
        try {
            const res = await updateOrderStatusService(order_id, selectedStatus);

            if (res?.status == 200 || res?.status == 201) {
                setOrderData((prev) => ({
                    ...prev,
                    order_status: res?.data?.order_status,
                }));
                toast.success("Order status updated successfully");
                router.push("/draft-orders");
            } else
                toast.error(
                    res?.response?.data?.message || "Failed to update order status"
                );
        } catch (error) {
            toast.error("Failed to update order status");
        }
    };

    const currentStatus = orderStatus.find(
        (s) => s.value === orderData?.order_status
    );

    const handlePrintLabel = async (order_id, product_id) => {
        try {
            const res = await fetchItemLabelService(order_id, product_id);

            const labelData = res?.data;

            if (!labelData) {
                toast.error("No label data found");
                return;
            }

            const {
                product_title,
                order_date,
                order_id: oid,
                ingredients,
                self_life,
                formattedNutrition,
            } = labelData;

            const formattedDate = new Intl.DateTimeFormat("en-GB", {
                year: "numeric",
                month: "short",
                day: "numeric",
            }).format(new Date(order_date));

            const parseLabelValue = (str) => {
                if (!str) return [];
                return str.split(",").map((item) => item.trim());
            };

            const ingredientList = parseLabelValue(ingredients);

            const sectionHtml = (title, lines) => {
                if (!lines.length) return "";
                return `
                  <div style="margin-top:6px; text-align:left;">
                    <p style="margin:0; font-weight:700; font-size:12px;">${title}:</p>
                    ${lines
                        .map(
                            (line) =>
                                `<p style="margin:0; font-size:11px; line-height:1.2;">${line}</p>`
                        )
                        .join("")}
                  </div>
                `;
            };

            const printableHtml = `
            <div style="
              width:260px;
              font-family:'Courier New', monospace;
              font-size:12px;
              font-weight:600;
              color:#000;
              margin:0 auto;
              padding:8px;
              line-height:1.2;
            ">
              <!-- Header Section -->
              <div style="display:flex; justify-content:space-between; align-items:flex-start;  gap:5px;">
                <div style="flex:1; text-align:left; padding-right:5px;">
                  <p style="margin:0; font-weight:900; font-size:13px; word-wrap:break-word;">${product_title}</p>
                </div>
                <div style="text-align:right; white-space:nowrap; font-size:10px; line-height:1.1;">
                  <p style="margin:0; font-size:12px; font-weight:900;">${formattedDate}</p>
                  <p style="margin:2px 0 0 0; font-size:12px; font-weight:600;">Order #${oid}</p>
                </div>
              </div>
                
             <p style="font-weight:900;  font-size:13px;">  Ingredients:<span style="font-weight:530;"> ${ingredientList} </span> </p>

            <p style="font-weight:900;  font-size:13px;"> Nutritional Value: <span style="font-weight:530;">${formattedNutrition}</span> </p>    
    
              <p style="font-weight:900;  font-size:13px;"> Shelf Life: <span style="font-weight:530;">${self_life}</span> </p>

            </div>
            </div>
          `;

            printJS({
                printable: printableHtml,
                type: "raw-html",
                style: `
                  @page { margin: 0; }
                  body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #000;
                    font-weight: 600;
                  }
                  p, div {
                    color: #000 !important;
                  }
                `,
            });
        } catch (err) {
            toast.error(err?.response?.data?.message ?? "Failed to print label");
        }
    };

    const handlePaymentStatus = async () => {
        try {
            const res = await updatePaymentStatusService(order_id, paymentStatus);

            if (res?.status == 200 || res?.status == 201) {
                toast.success("Payment status updated successfully");
                router.push("/draft-orders");
            }
        } catch (err) {
            toast.error("Failed to update payment status");
        }
    };
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
                <div className="col-span-3 bg-white px-3 border shadow py-4">
                    <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-2 rounded-md text-sm font-medium w-fit">
                        <AlertCircle size={16} className="stroke-yellow-700" />
                        <span>{currentStatus?.label || "Unknown"}</span>
                    </div>

                    <div className="px-4 py-3 mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                            <div>
                                <div className="font-semibold text-gray-500">Order Number</div>
                                <div className="text-gray-500">{orderData?.order_id}</div>
                            </div>

                            <div className="mt-2">
                                <div className="font-semibold text-gray-500">
                                    Delivery Method
                                </div>
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
                                <Link
                                    href={`/customer?search=${encodeURIComponent(
                                        orderData?.customer_name
                                    )}`}
                                >
                                    <div className="text-gray-500 cursor-pointer underline">
                                        {orderData?.customer_name}
                                    </div>
                                </Link>
                            </div>
                            <div className="mt-2">
                                <div className="font-semibold text-gray-500">Location</div>
                                <div className="text-gray-500">{orderData?.address}</div>
                            </div>
                            <div className="mt-2">
                                <div className="font-semibold text-gray-500">
                                    Customer Contact
                                </div>
                                <div className="text-gray-500">{orderData?.mobile_no}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {orderData?.items &&
                    Object.entries(orderData.items).map(
                        ([storeId, storeItems], shipmentIndex) => (
                            <div
                                key={storeId}
                                className="col-span-3 bg-white px-3 border shadow py-4"
                            >
                                <div className="flex justify-between items-center border-b pb-2 mb-3">
                                    <p className="font-semibold text-gray-700 px-7">
                                        Shipment: {shipmentIndex + 1} , {storeItems[0]?.store_name}
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
                                        <p>
                                            <Button
                                                onClick={() =>
                                                    handlePrintLabel(food?.order_id, food?.item_id)
                                                }
                                            >
                                                Print Label
                                            </Button>
                                        </p>
                                    </div>
                                ))}

                                <div className="flex justify-center mt-4">
                                    <Button type="button" onClick={() => handlePrint(storeItems)}>
                                        Print
                                    </Button>
                                </div>
                            </div>
                        )
                    )}
            </div>

            <div className="mt-4 border shadow px-3 py-4">
                {orderData?.payment_status == 0 ? (
                    <div className="flex items-center gap-2 bg-gray-300 text-grey-700 px-3 py-2 rounded-md text-sm font-medium w-fit">
                        <CheckCircle size={16} className="stroke-grey-700" />
                        <span> Pending</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 bg-gray-300 text-grey-700 px-3 py-2 rounded-md text-sm font-medium w-fit">
                        <CheckCircle size={16} className="stroke-grey-700 " />
                        <span> Paid</span>
                    </div>
                )}
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
                                {` ₹ ${orderData?.discount_value == null
                                    ? "0"
                                    : orderData?.discount_value
                                    }` || "0"}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 px-4">
                        <div className="grid grid-cols-4 items-start">
                            <p className="col-span-1">Shipping</p>
                            <p className="col-span-2 text-gray-600">-</p>
                            {/* <p className="col-span-1 text-right">
                                ₹ {orderData?.delivery_charges}
                            </p> */}
                            <p className="col-span-1 text-right">
                                ₹{" "}
                                {orderData?.items
                                    ? Object.values(orderData.items).reduce(
                                        (total, storeItems) => {
                                            // assume all items in the same store have same delivery charge
                                            const storeDeliveryCharge =
                                                storeItems[0]?.delivery_charge || 0;
                                            return total + Number(storeDeliveryCharge);
                                        },
                                        0
                                    )
                                    : orderData?.delivery_charges || 0}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 px-4">
                        <div className="grid grid-cols-4 items-start">
                            <p className="col-span-1">Taxes</p>
                            <p className="col-span-2 text-gray-600">Tax details </p>
                            <p className="col-span-1 text-right">
                                ₹ {orderData?.total_gst_amount}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 px-4">
                        <div className="grid grid-cols-4 items-start">
                            <p className="col-span-1 font-semibold">Total</p>
                            <p className="col-span-2 text-gray-600"></p>
                            {/* <p className="col-span-1 text-right font-semibold">
                                ₹ {orderData?.final_price}
                            </p> */}
                            <p className="col-span-1 text-right font-semibold">
                                ₹{" "}
                                {orderData?.items
                                    ? (
                                        Object.values(orderData.items).reduce(
                                            (sum, storeItems) => {
                                                const itemTotal = storeItems.reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        Number(item.price) * Number(item.item_quantity),
                                                    0
                                                );
                                                const deliveryCharge = Number(
                                                    storeItems[0]?.delivery_charge || 0
                                                );
                                                return sum + itemTotal + deliveryCharge;
                                            },
                                            0
                                        ) - Number(orderData?.discount_amount || 0)
                                    ).toFixed(2)
                                    : orderData?.final_price || 0}
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
                            {/* <p className="col-span-1 text-right font-semibold">
                                ₹ {orderData?.final_price}
                            </p> */}
                            <p className="col-span-1 text-right font-semibold">
                                ₹{" "}
                                {orderData?.items
                                    ? (
                                        Object.values(orderData.items).reduce(
                                            (sum, storeItems) => {
                                                const itemTotal = storeItems.reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        Number(item.price) * Number(item.item_quantity),
                                                    0
                                                );
                                                const deliveryCharge = Number(
                                                    storeItems[0]?.delivery_charge || 0
                                                );
                                                return sum + itemTotal + deliveryCharge;
                                            },
                                            0
                                        ) - Number(orderData?.discount_amount || 0)
                                    ).toFixed(2)
                                    : orderData?.final_price || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 items-center mt-4 gap-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">
                        Order Status:
                    </span>
                    <select
                        className="border rounded-md px-3 py-2"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                        {orderStatus.map((status) => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>

                    <Button type="submit" variant="default" onClick={handleOrderStatus}>
                        Submit
                    </Button>
                </div>

                <div className="flex justify-center">
                    <div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-700">
                                Payment Status:
                            </span>
                            <select
                                className="border rounded-md px-3 py-2"
                                value={paymentStatus}
                                onChange={(e) => setPaymentStatus(e.target.value)}
                            >
                                <option value={0}>Unpaid</option>
                                <option value={1}>paid</option>
                            </select>

                            <Button
                                type="submit"
                                variant="default"
                                onClick={handlePaymentStatus}
                            >
                                Update Payment Status
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-3">
                <Link href="/draft-orders">
                    <Button type="button" variant="outline">
                        Back to list
                    </Button>
                </Link>
            </div>
        </>
    );
};

export default DraftOrderDetailTable;
