"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
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
import { fetchItemLabelService } from "@/service/items/items.service";

const OrderDetailTable = ({ order_id }) => {
    const [orderData, setOrderData] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("0");
    const [paymentStatus, setPaymentStatus] = useState("");
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter()
    useEffect(() => {
        if (orderData) {
            setSelectedStatus(String(orderData.order_status));
        }
    }, [orderData]);
    const orderStatus = useSelector((state) => state.orderStatusSlice.allOrderStatus)

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                setLoading(true)
                const response = await getCustomerOrderByIdService(order_id);

                if (response?.status == 200) {
                    setOrderData(response?.data);
                    setPaymentStatus(response?.data?.payment_status)
                }
            } catch (error) {
                toast.error("Failed to fetch order data");
            }
            finally {
                setLoading(false)
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
                dispatch(setOrderStatus(res?.data))
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

            const itemTotal = (parseFloat(item.price) || 0) * (item.item_quantity || 0);
            totalItemPrice += itemTotal;

            itemsHtml += `
            <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
              <div style="text-align:left; width:140px; word-wrap:break-word;">
                <p style="margin:0; font-size:12px; font-weight:600;">${item.title}</p>
                <p style="margin:0; font-size:11px;">Price: ₹${item.price}</p>
                <p style="margin:0; font-size:11px;">GST: ${gst}%</p>
                <p style="margin:0; font-size:11px;">Tax Amt: ₹${tax}</p>
              </div>
              <div style="text-align:right; width:30px;">
                <p style="margin:0; font-size:12px; font-weight:600;">${item.item_quantity}</p>
              </div>
            </div>
          `;
        });

        const discountAmount = parseFloat(orderData?.discount_amount || 0);
        const totalBeforeDiscount = totalItemPrice + deliveryCharge;
        const totalPrice = totalBeforeDiscount - discountAmount;

        const printableHtml = `
          <div style="
            width:260px; 
            font-family:'Courier New', monospace; 
            font-size:12px; 
            font-weight:600; 
            text-align:center; 
            margin:0 auto; 
            padding:8px; 
            color:#000;
          ">
            <h2 style="margin:0 0 4px 0; font-size:15px; font-weight:700;">DAM GOOD FISH</h2>
            <p style="margin:0;">Order No: ${orderData.order_id}</p>
            <p style="margin-top:5px;">${formattedDate}</p>
      
            <div style="margin-top:6px;">
              <p style="margin:0;">GSTIN: 06AAKCD3257D1ZU</p>
            </div>
      
            <div style="text-align:left; margin-top:8px; line-height:1.2;">
              <p style="margin:0;">Ship To:</p>
              <p style="margin:2px 0 0 0;">${orderData.customer_name}</p>
              <p style="margin:2px 0 0 0;">${orderData.address}</p>
              <p style="margin:2px 0 0 0;">Mobile: ${orderData.mobile_no}</p>
              <p style="margin:2px 0 0 0;">Pincode: ${orderData.pincode}</p>
            </div>
      
            <hr style="border:none; border-top:1px dashed #000; margin:6px 0;">
      
            <div style="text-align:left;">
              <div style="display:flex; justify-content:space-between; font-weight:700; margin-bottom:3px;">
                <div>Items</div>
                <div>Qty</div>
              </div>
              ${itemsHtml}
            </div>
      
            <hr style="border:none; border-top:1px dashed #000; margin:6px 0;">
      
            <div style="text-align:left;">
              <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                <div>Total Tax:</div>
                <div>₹${totalTax.toFixed(2)}</div>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                <div>Delivery Charge:</div>
                <div>₹${deliveryCharge.toFixed(2)}</div>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:2px;">
                <div>Discount:</div>
                <div>₹${discountAmount.toFixed(2)}</div>
              </div>
              <div style="display:flex; justify-content:space-between; font-weight:700; font-size:13px; margin-top:4px;">
                <div>Total Price:</div>
                <div>₹${totalPrice.toFixed(2)}</div>
              </div>
            </div>
      
            <hr style="border:none; border-top:1px dashed #000; margin:6px 0;">
      
            <p style="margin:0; font-size:12px; font-weight:700;">Thank you for shopping with us!</p>
            <p style="margin:2px 0 0 0;">Dam Good Fish Pvt Ltd</p>
            <p style="margin:0;">Gurugram, HR - 122004</p>
            <p style="margin:0;">hello@damgoodfish.com</p>
            <p style="margin:0;">damgoodfish.com</p>
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
            h2, p, div {
              color: #000 !important;
            }
          `,
        });
    };


    const handleOrderStatus = async () => {
        try {

            const res = await updateOrderStatusService(order_id, selectedStatus);


            if (res?.status == 200 || res?.status == 201) {

                setOrderData((prev) => ({
                    ...prev,
                    order_status: res?.data?.order_status
                }))
                toast.success("Order status updated successfully");
                router.push("/orders")
            }
        }
        catch (error) {
            toast.error("Failed to update order status");
        }
    }

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

            const printableHtml = `
            <div style="
              width:100%;
              max-width:800px;
              font-family:'Courier New', monospace;
              font-size:12px;
              font-weight:600;
              color:#000;
              margin:0 auto;
              padding:20px;
              line-height:1.3;
              box-sizing:border-box;
            ">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:5px;">
                <div style="flex:1; text-align:left; padding-right:5px;">
                  <p style="margin:0; font-weight:900; font-size:13px; word-wrap:break-word;">${product_title}</p>
                </div>
                <div style="text-align:right; white-space:nowrap; font-size:10px; line-height:1.1;">
                  <p style="margin:0; font-size:12px; font-weight:900;">${formattedDate}</p>
                  <p style="margin:2px 0 0 0; font-size:12px; font-weight:600;">Order #${oid}</p>
                </div>
              </div>
      
              <p style="font-weight:900; font-size:13px; margin-top:10px;">
                Ingredients: <span style="font-weight:540;">${ingredientList}</span>
              </p>
      
              <p style="font-weight:900; font-size:13px;">
                Nutritional Value: <span style="font-weight:540;">${formattedNutrition}</span>
              </p>
      
              <p style="font-weight:900; font-size:13px;">
                Shelf Life: <span style="font-weight:540;">${self_life}</span>
              </p>
            </div>
          `;

            printJS({
                printable: printableHtml,
                type: "raw-html",
                style: `
              @page {
                size: A4;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: flex-start;
                background: #fff;
                color: #000;
                font-weight: 600;
                font-family: 'Courier New', monospace;
              }
              div, p {
                color: #000 !important;
              }
            `,
            });
        } catch (err) {
            toast.error(err?.response?.data?.message ?? "Failed to print label");
        }
    };



    const handlePrintInvoice = (storeItems) => {

        if (!storeItems || storeItems.length === 0) return;

        const createdDate = new Date(orderData.created_date);
        const formattedDate = new Intl.DateTimeFormat("en-IN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
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

            const itemTotal = (parseFloat(item.price) || 0) * (item.item_quantity || 0);
            totalItemPrice += itemTotal;
            itemsHtml += `
    <tr>
        <td style="text-align:center; font-size:12px;">${item.item_quantity} x </td>

        <td style="padding:5px 0; font-size:12px;">
            <strong>${item.title}</strong>
            <br>
            <span style="font-size:10px;">GST ${gst}%</span>
        </td>

        <td style="text-align:right; font-size:12px;">₹${tax.toFixed(2)}</td>

        <td style="text-align:right; font-size:12px;">₹${item.price}</td>
    </tr>
`;

        });

        const discountAmount = parseFloat(orderData?.discount_amount || 0);
        const totalBeforeDiscount = totalItemPrice + deliveryCharge;
        const totalPrice = totalBeforeDiscount - discountAmount;

        const printableHtml = `
          <div style="width:280px; font-family:'Courier New', monospace; margin:0 auto;">
            
            <!-- HEADER BLOCK LEFT/RIGHT -->
            <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:8px;">
                <!-- LEFT SIDE -->
                <div style="text-align:left; line-height:15px;">
                    <strong style="font-size:20px;">Dam Good Fish </strong><br>
                    Dam Good Fish Private Limited<br>
                    Gurugram HR 122004<br>
                    India<br>
                    GST #06AAKCD3257D1ZU<br>
                    Date: ${formattedDate}
                    <br/>
Time : ${firstItem?.from_time} - ${firstItem?.to_time}
                </div>
    
                <!-- RIGHT SIDE -->
                <div style="text-align:right; font-size:12px;">
                    <strong>Invoice #${orderData.order_id}</strong>
                </div>
            </div>
    
            <hr style="border:none; border-top:1px solid #000; margin:6px 0;">
    
            <!-- Customer Section -->
            <h3 style="font-size:14px; margin:0 0 4px 0;">Customer Details</h3>
    
            <div style="border:1px solid #000; padding:8px; font-size:12px; line-height:15px;">
                <strong>${orderData.customer_name}</strong><br>
                 ${orderData?.building_name} , ${orderData.address} , ${orderData?.nearby_landmark}<br>${orderData.pincode}<br>
                Mobile: ${orderData.mobile_no}<br>
                ${orderData.email || ""}
            </div>
    
            <!-- Item Details -->
            <h3 style="margin-top:10px; font-size:14px;">Item Details</h3>
    
            <div style="border:1px solid #000; padding:8px; margin-top:8px;">
    <table style="width:100%; font-size:12px; border-collapse:collapse;">
        <tr style="border-bottom:1px solid #000;">
            <th style="text-align:center; width:12%;">Qty</th>
            <th style="text-align:left; width:45%;">Item</th>
            <th style="text-align:right; width:18%;">Taxes</th>
            <th style="text-align:right; width:20%;">Price</th>
        </tr>
        ${itemsHtml}
    </table>
</div>


    
            <!-- Payment -->
            <h3 style="margin-top:10px; font-size:14px;">Payment Details</h3>
    
            <table style="width:100%; font-size:12px; line-height:18px; border-collapse: collapse; border:1px solid #000;">
    <tr style="border-bottom:1px solid #000;">
        <td style="border:1px solid #000; padding:2px 8px;">Subtotal price:</td>
        <td style="text-align:right; border:1px solid #000; padding:4px 8px;">₹${totalItemPrice.toFixed(2)}</td>
    </tr>

    <tr style="border-bottom:1px solid #000;">
        <td style="border:1px solid #000; padding:2px 8px;">Total tax:</td>
        <td style="text-align:right; border:1px solid #000; padding:4px 8px;">₹${totalTax.toFixed(2)}</td>
    </tr>

    <tr style="border-bottom:1px solid #000;">
        <td style="border:1px solid #000; padding:2px 8px;">Shipping:</td>
        <td style="text-align:right; border:1px solid #000; padding:4px 8px;">₹${deliveryCharge.toFixed(2)}</td>
    </tr>

    <tr style="font-weight:bold; border-top:1px solid #000;">
        <td style="border:1px solid #000; padding:2px 8px;">Total price:</td>
        <td style="text-align:right; border:1px solid #000; padding:4px 8px;">₹${totalPrice.toFixed(2)}</td>
    </tr>
</table>


    
            <div style="margin-top:10px; font-size:12px;">If you have any questions, please send an email to hello@damgoodfish.com or
Whatsapp to +91 989978330  </div>
          </div>
        `;

        printJS({
            printable: printableHtml,
            type: "raw-html",
            style: `
              @page { margin: 10px; }
              body { font-family: 'Courier New', monospace; }
            `
        });
    };

    const handlePaymentStatus = async () => {

        try {

            const res = await updatePaymentStatusService(order_id, paymentStatus);

            if (res?.status == 200 || res?.status == 201) {
                toast.success("Payment status updated successfully");
                router.push("/orders")
            }
        }
        catch (err) {
            toast.error("Failed to update payment status");
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

                            <div className="mt-3">
                                <p className="font-semibold text-gray-500">Office / Building Name</p>
                                <p className="text-gray-500">{orderData?.building_name}</p>
                            </div>

                            <div className="mt-3">
                                <p className="font-semibold text-gray-500">Nearby Landmark</p>
                                <p className="text-gray-500">{orderData?.nearby_landmark || "-"}</p>
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
                                        Shipment: {shipmentIndex + 1} , {storeItems[0]?.store_name},
                                        <span className="ml-2">
                                            Delivery:{" "}
                                            {storeItems[0]?.exp_delivery_datetime ? (
                                                <>
                                                    {
                                                        new Date(
                                                            storeItems[0].exp_delivery_datetime
                                                        ).toLocaleString("en-IN", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                        })
                                                    }
                                                    {"  "}
                                                    {storeItems[0]?.from_time && storeItems[0]?.to_time && (
                                                        <span className="text-gray-600">
                                                            ({storeItems[0].from_time} – {storeItems[0].to_time})
                                                        </span>
                                                    )}
                                                </>
                                            ) : (
                                                "-"
                                            )}
                                        </span>
                                    </p>

                                    <p className="text-sm text-gray-500 px-7">
                                        Status: {storeItems[0]?.tracking_status || "-"}
                                    </p>
                                </div>

                                {/* ===== Items Loop ===== */}
                                {storeItems.map((food, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-12 items-start py-3 border-b last:border-b-0"
                                    >
                                        {food?.product_display_image && (
                                            <div className="col-span-1 flex justify-center">
                                                <Image
                                                    src={food.product_display_image}
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
                                                        SKU: {food.sku}
                                                    </p>
                                                )}

                                                {food?.free_product && (
                                                    <p className="text-xs text-gray-500">
                                                        Free Product: true
                                                    </p>
                                                )}

                                                {food?.kite_promo_name && (
                                                    <p className="text-xs text-gray-500">
                                                        Kite Promo Name: {food.kite_promo_name}
                                                    </p>
                                                )}

                                                {food?.rule_id && (
                                                    <p className="text-xs text-gray-500">
                                                        Rule Id: {food.rule_id}
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

                                <div className="flex  justify-center gap-4">

                                    <div className="flex justify-center mt-4">
                                        <Button type="button" onClick={() => handlePrint(storeItems)}>
                                            Print
                                        </Button>
                                    </div>


                                    <div className="flex justify-center mt-4">
                                        <Button type="button" onClick={() => handlePrintInvoice(storeItems)}>
                                            Print invoice
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        )
                    )}

            </div>

            <div className="mt-4 border shadow px-3 py-4">

                {
                    orderData?.payment_status == 0 ? (
                        <div className="flex items-center gap-2 bg-gray-300 text-grey-700 px-3 py-2 rounded-md text-sm font-medium w-fit">
                            <CheckCircle size={16} className="stroke-grey-700" />
                            <span>  Pending</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 bg-gray-300 text-grey-700 px-3 py-2 rounded-md text-sm font-medium w-fit">
                            <CheckCircle size={16} className="stroke-grey-700 " />
                            <span >  Paid</span>
                        </div>
                    )
                }

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
                                    : orderData?.discount_amount
                                    }` || "0"}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-2 px-4">
                        <div className="grid grid-cols-4 items-start">
                            <p className="col-span-1">Shipping</p>
                            <p className="col-span-2 text-gray-600">
                                -
                            </p>
                            {/* <p className="col-span-1 text-right">
                                ₹ {orderData?.delivery_charges}
                            </p> */}
                            <p className="col-span-1 text-right">
                                ₹{" "}
                                {orderData?.items
                                    ? Object.values(orderData.items).reduce((total, storeItems) => {
                                        // assume all items in the same store have same delivery charge
                                        const storeDeliveryCharge = storeItems[0]?.delivery_charge || 0;
                                        return total + Number(storeDeliveryCharge);
                                    }, 0)
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
                                {/* {orderData?.items
                                    ? (
                                        Object.values(orderData.items).reduce((sum, storeItems) => {
                                            // sum of item prices for this store
                                            const itemTotal = storeItems.reduce(
                                                (acc, item) => acc + Number(item.price) * Number(item.item_quantity),
                                                0
                                            );
                                            // add store delivery charge (assume first item has delivery charge)
                                            const deliveryCharge = Number(storeItems[0]?.delivery_charge || 0);
                                            return sum + itemTotal + deliveryCharge;
                                        }, 0)
                                    ).toFixed(2)
                                    : orderData?.final_price || 0} */}

                                {orderData?.items
                                    ? (
                                        (
                                            Object.values(orderData.items).reduce((sum, storeItems) => {
                                                // total item price per store
                                                const itemTotal = storeItems.reduce(
                                                    (acc, item) => acc + Number(item.price) * Number(item.item_quantity),
                                                    0
                                                );
                                                // delivery charge (from first item)
                                                const deliveryCharge = Number(storeItems[0]?.delivery_charge || 0);
                                                return sum + itemTotal + deliveryCharge;
                                            }, 0)
                                            - Number(orderData?.discount_amount || 0) //  subtract discount if present
                                        ).toFixed(2)
                                    )
                                    : (orderData?.final_price || 0)}

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
                                        (
                                            Object.values(orderData.items).reduce((sum, storeItems) => {
                                                const itemTotal = storeItems.reduce(
                                                    (acc, item) => acc + Number(item.price) * Number(item.item_quantity),
                                                    0
                                                );
                                                const deliveryCharge = Number(storeItems[0]?.delivery_charge || 0);
                                                return sum + itemTotal + deliveryCharge;
                                            }, 0)
                                            - Number(orderData?.discount_amount || 0)
                                        ).toFixed(2)
                                    )
                                    : (orderData?.final_price || 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 items-center mt-4 gap-4">
                <div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-gray-700">
                            Order Status:
                        </span>
                        <select className="border rounded-md px-3 py-2"
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
                            Update Order Status
                        </Button>
                    </div>

                </div>

                <div className="flex justify-center">
                    <div>

                        {
                            orderData?.payment_mode == "COD" && <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">
                                    Payment Status:
                                </span>
                                <select className="border rounded-md px-3 py-2"
                                    value={paymentStatus}
                                    onChange={(e) => setPaymentStatus(e.target.value)}
                                >
                                    <option value={0}>Unpaid</option>
                                    <option value={1}>paid</option>
                                </select>

                                <Button type="submit" variant="default" onClick={handlePaymentStatus}>
                                    Update Payment Status
                                </Button>
                            </div>
                        }


                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-3">
                <Link href="/orders">
                    <Button type="button" variant="outline">
                        Back to list
                    </Button>
                </Link>
            </div>

        </>
    );
};

export default OrderDetailTable;
