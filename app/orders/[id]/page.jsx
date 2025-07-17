import MainLayout from '@/components/layout/mainLayout'
import UserAllTables from '@/components/user-all-orders/UserAllOrders'
import React from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react';
import Image from 'next/image';

const page = () => {

    const foodList = [
        {
            image: "/images/seafood-bg.png",
            name: "tilapia kali mirche [ Boneless cubes ], Nt wt 300g",
            price: 280,
            skuCode: "SKU-MR-TK-82",
            quantity: 1,
            free_product: false,
            kite_promo_name: false,
            rule_id: false
        },
        {
            image: "/images/seafood-bg.png",
            name: "marinated Basa Finger Wt 420-470g",
            price: 475,
            skuCode: "SKU-GF-TY-45",
            quantity: 1,
            free_product: false,
            kite_promo_name: false,
            rule_id: false
        },
        {
            image: "/images/seafood-bg.png",
            name: "Cajuan spice marinated basa fish finger Nt Wt 100g",
            price: 100,
            skuCode: "SKU-BG-SS-34",
            quantity: 1,
            free_product: true,
            kite_promo_name: "Get your favourite @ 10% off ",
            rule_id: "BUY_ANY_PRODUCT_FROM_COLLECTION"
        }
    ]

    const summaryData = [
        { label: 'Subtotal', description: '3 items', amount: '₹855.00' },
        { label: 'Discount', description: 'Get your favourite @₹10 only!', amount: '-₹90.00' },
        { label: 'Shipping', description: 'Standard Shipping (0.87 kg: Items 0.87 kg, Package 0.0 kg)', amount: '₹0.00' },
        { label: 'Taxes', description: 'Tax details ↓', amount: '₹76.64' },
        { label: 'Total', description: '', amount: '₹765.00', bold: true },
        { label: 'Paid', description: '', amount: '₹765.00', bold: true }
    ];
    return (
        <MainLayout>
            {/* <UserAllTables /> */}

            <div className='grid grid-cols-3 gap-4 bg-sidebar'>
                <div className='col-span-2 bg-white px-3 border shadow py-4'>

                    <div className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-2 rounded-md text-sm font-medium w-fit">
                        <AlertCircle size={16} className="stroke-yellow-700" />
                        <span>Unfulfilled</span>
                    </div>

                    <div className='px-4 py-3 mt-2'>
                        <div>
                            <div className='font-semibold text-gray-500' >Location</div>
                            <div className='text-gray-500'>Damm goood fish Private Limited</div>
                        </div>

                        <div className='mt-2'>
                            <div className='font-semibold text-gray-500'>Delivery Method</div>
                            <div className='text-gray-500'>Standard Shipping</div>
                        </div>

                        <div className="mt-4">
                            {foodList?.map((food, index) => (
                                <div key={index} className="grid grid-cols-12 items-start py-3 ">
                                    <div className="col-span-1 flex justify-center">
                                        <Image src={food.image} alt="image" width={40} height={40} className="rounded" />
                                    </div>

                                    <div className="col-span-5">
                                        <div className='flex flex-col gap-2'>

                                            <p className="font-medium">{food?.name}</p>
                                            {food?.sku && <p className="text-sm text-gray-500">SKU: {food.sku}</p>}

                                            {
                                                food?.free_product &&
                                                <p className="text-xs text-gray-500">Free Product : true</p>
                                            }
                                            {
                                                food?.kite_promo_name &&
                                                <p className="text-xs text-gray-500">Kite Promo Name : {food?.kite_promo_name}</p>
                                            }
                                            {
                                                food?.rule_id &&
                                                <p className="text-xs text-gray-500">Rule Id : {food?.rule_id}</p>
                                            }
                                        </div>
                                    </div>

                                    <p className="col-span-3 text-center">
                                        ₹{food?.price} × {food?.quantity}
                                    </p>

                                    <p className="col-span-3 text-center">
                                        ₹{food?.price * food?.quantity}
                                    </p>
                                </div>
                            ))}
                        </div>


                    </div>

                </div>


                <div className='col-span-1 bg-white px-2 py-2 border shadow'>

                    <div className='px-2'>
                        <h5 className='font-semibold'>Notes</h5>
                        <p className='text-gray-500'>No notes from customer</p>
                    </div>

                    <div className='px-2 mt-3'>
                        <h5 className='font-semibold'>Additoonal Information</h5>

                        <div className='px-2 mt-3'>
                            <p className='font-semibold text-gray-500'>Paid via</p>
                            <p className='text-gray-500'>Razorpay Magic Checkout</p>
                        </div>

                        <div className='px-2 mt-2'>
                            <p className='font-semibold text-gray-500'>Device_details_ip</p>
                            <p className='text-gray-500'> 223.223.202.119</p>
                        </div>

                        <div className='px-2 mt-2'>
                            <p className='font-semibold text-gray-500'>cart_token</p>
                            <p className='text-gray-500'>cart_token_1_abcd</p>
                        </div>

                        <div className='px-2 mt-2'>
                            <p className='font-semibold text-gray-500'>payment_method</p>
                            <p className='text-gray-500'>upi</p>
                        </div>

                        <div className='px-2 mt-2'>
                            <p className='font-semibold text-gray-500'>delivery date</p>
                            <p className='text-gray-500'>July 16, 2025</p>
                        </div>

                        <div className='px-2 mt-2'>
                            <p className='font-semibold text-gray-500'>delivery time</p>
                            <p className='text-gray-500'>5:330 p.m - 8:30 p.m</p>
                        </div>

                        <div className='px-2 mt-2'>
                            <p className='font-semibold text-gray-500'>delivery method</p>
                            <p className='text-gray-500'>delivery</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-4 border shadow px-3 py-4'>

                <div className="flex items-center gap-2 bg-gray-300 text-grey-700 px-3 py-2 rounded-md text-sm font-medium w-fit">
                    <CheckCircle size={16} className="stroke-grey-700" />
                    <span>Paid</span>
                </div>

                <div className="mt-4 space-y-4 border rounded-md shadow px-4 py-4">
                    {summaryData.map((item, index) => (
                        <div key={index} className="space-y-2 px-4">
                            {item.label === 'Paid' && <hr className="border-gray-300" />}
                            <div className="grid grid-cols-4 items-start">
                                <p className={`col-span-1 ${item.bold ? 'font-semibold' : ''}`}>{item.label}</p>
                                <p className="col-span-2 text-gray-600">{item.description}</p>
                                <p className={`col-span-1 text-right ${item.bold ? 'font-semibold' : ''}`}>{item.amount}</p>
                            </div>
                        </div>
                    ))}
                </div>



            </div>
        </MainLayout>
    )
}

export default page