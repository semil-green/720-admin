"use client";
import React, { useState } from 'react'

const AddDiscountForm = () => {

    const [showExtraEndDate, setShowExtraEndDate] = useState(false);

    return (
        <>
            <div className="grid grid-cols-3 gap-4 bg-sidebar ">
                {/* left content */}
                <div className="col-span-2  ">
                    <div className="mt-4 bg-white border rounded-md shadow px-4 py-3">
                        <h5 className="text-gray-500 font-semibold">Amount off Order</h5>
                        <div className="flex justify-between mt-4">
                            <p className="text-gray-500 font-medium">Discount Code</p>
                            <p className="text-blue-500 font-medium">Generate Random Code</p>
                        </div>
                        <input
                            className="border shadow px-2 py-2 w-full mt-2 rounded-md"
                            placeholder="NEW100"
                        />
                        <p className="text-gray-500 mt-2 bg-white">
                            Customer must enter this code at checkout
                        </p>
                    </div>

                    <div className="mt-4 bg-white border rounded-md shadow px-4 py-4">
                        <h5 className="text-gray-500 font-semibold">Discount Value</h5>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <select
                                className="w-full border rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 text-gray-700 col-span-2"
                                defaultValue="fixed"
                            >
                                <option value="fixed">Fixed amount</option>
                                <option value="percentage">Percentage</option>
                            </select>

                            <input
                                className="border shadow px-2 py-2 w-full rounded-md col-span-1"
                                placeholder="200"
                            />
                        </div>
                    </div>

                    <div className="mt-4 bg-white border rounded-md shadow px-4 py-3">
                        <h5 className="text-gray-500 font-semibold">Eligibility</h5>

                        <p className="text-gray-500 font-medium mt-2">Redeemable on all sales code you have set up</p>

                        <div className="flex flex-col space-y-2 mt-4">
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="example" value="1" className="form-radio text-blue-600" />
                                <span>All customers</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input type="radio" name="example" value="2" className="form-radio text-blue-600" />
                                <span>Specific customer segment</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="example" value="3" className="form-radio text-blue-600" />
                                <span>Specific customers </span>
                            </label>
                        </div>

                    </div>

                    <div className="mt-4 bg-white border rounded-md shadow px-4 py-3">
                        <h5 className="text-gray-500 font-semibold">Minimum purchase requirements</h5>

                        <div className="flex flex-col space-y-2 mt-4">
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="example" value="1" className="form-radio text-blue-600" />
                                <span>No minimum requirements</span>
                            </label>

                            <label className="flex flex-col items-start space-y-1">
                                <div className="flex items-center space-x-2">
                                    <input type="radio" name="example" value="2" className="form-radio text-blue-600" />
                                    <span>Minimum purchase amount</span>
                                </div>
                                <div className="px-4">

                                    <input type="number" className="border rounded-md px-2 py-1 w-xl" placeholder="Enter amount" />
                                </div>
                                <span className="px-4 text-sm">Applies to all products</span>

                            </label>
                            <label className="flex items-center space-x-2 mt-1">
                                <input type="radio" name="example" value="3" className="form-radio text-blue-600" />
                                <span>Minimum quantity of items</span>
                            </label>
                        </div>
                    </div>

                    <div className="mt-4 bg-white border rounded-md shadow px-4 py-3">
                        <h5 className="text-gray-500 font-semibold">Minimum purchase requirements</h5>

                        <div className="flex flex-col space-y-2 mt-4">
                            <label className="flex flex-col items-start space-y-1">
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" name="example" value="2" className="form-radio text-blue-600" />
                                    <span>Limit number of times this discount can be used in total</span>
                                </div>
                                <div className="px-4">

                                    <input type="number" className="border rounded-md px-2 py-1 w-xl" placeholder="Enter amount" />
                                </div>

                            </label>
                            <label className="flex items-center space-x-2 mt-1">
                                <input type="checkbox" name="example" value="3" className="form-radio text-blue-600" />
                                <span>Limit to one use per customer</span>
                            </label>
                        </div>
                    </div>

                    <div className="mt-4 bg-white border rounded-md shadow px-4 py-3">
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="flex flex-col">
                                <label className="mb-1 text-gray-700 font-medium">Start Date</label>
                                <input
                                    type="date"
                                    className="border rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-1 text-gray-700 font-medium">End Date</label>
                                <input
                                    type="date"
                                    className="border rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
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
                            <div className="mt-4">
                                <div className="flex flex-col">
                                    <label className="mb-1 text-gray-700 font-medium">Extra End Date</label>
                                    <input
                                        type="date"
                                        className="border rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    />
                                </div>
                            </div>
                        )}
                    </div>



                </div>

                {/* right content */}
                <div className="col-span-1 bg-white border shadow px-3 py-3 rounded-md">
                    <div>
                        <h5 className='text-gray-500 font-semibold'>New 100</h5>
                        <p className='text-gray-500 text-sm'>Code</p>
                    </div>

                    <div className='mt-4'>
                        <h5 className='text-gray-500 font-semibold'>Type</h5>
                        <p className='text-gray-500 text-sm'>Amount off order</p>
                    </div>

                    <div className='mt-4'>
                        <h5 className='text-gray-500 font-semibold mb-2'>Details</h5>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 px-4 text-sm">
                            <li>For online store</li>
                            <li>₹200.00 off entire order</li>
                            <li>Minimum purchase of ₹1000</li>
                            <li>All customers</li>
                            <li>No usage limit</li>
                            <li>Can't combine with other discount</li>
                            <li>Active from June 13</li>
                        </ul>
                    </div>

                    <div className='mt-4'>
                        <h5 className='text-gray-500 font-semibold mb-2'>PErformance</h5>
                        <ul className="list-disc list-inside text-gray-700 space-y-1 px-4 text-sm">
                            <li>42 used</li>
                            <li>₹55,090 in sales</li>

                        </ul>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AddDiscountForm