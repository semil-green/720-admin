"use client";
import React, { useState } from 'react'

const DiscountDatatTable = () => {
    const [activeTab, setActiveTab] = useState('All');

    const tabs = ['All', 'Active', 'Scheduled', 'Expired'];

    const discounts = [
        {
            title: "Get your favourite @₹10 only!",
            status: "Active",
            method: "Automatic",
            type: "Free-Gift",
        },
        {
            title: "SHANAINF1",
            description: "100% off entire order",
            status: "Expired",
            method: "Code",
            type: "Amount off order",
        },
        {
            title: "NEW1000",
            description: "₹200.00 off entire order • Minimum purchase of ₹1,000.00",
            status: "Expired",
            method: "Automatic",
            type: "Amount off order",
        },
        {
            title: "NEW1000",
            description: "₹200.00 off entire order • Minimum purchase of ₹1,000.00",
            status: "Active",
            method: "Code",
            type: "Amount off order",
        },
        {
            title: "INF5",
            description: "100% off entire order",
            status: "Expired",
            method: "Code",
            type: "Amount off order",
        },
        {
            title: "INF4",
            description: "100% off entire order",
            status: "Expired",
            method: "Code",
            type: "Amount off order",
        },
    ];


    const StatusBadge = ({ status }) => (
        <span
            className={`text-sm px-2 py-1 rounded-full font-medium ${status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                }`}
        >
            {status}
        </span>
    );

    return (
        <>
            <div className=' flex justify-between items-end px-3 py-3 rounded border shadow	mt-4'>

                <div className="flex gap-4">
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`cursor-pointer px-4 py-2 rounded ${activeTab === tab ? 'bg-gray-500 text-white' : 'bg-gray-200'
                                }`}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
                <div className=''>
                    <input placeholder='search here..' className='border rounded-md px-2 py-2' />
                </div>
            </div>


            <div className="overflow-x-auto p-4">
                <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Title</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Status</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Method</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Type</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {discounts.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-2">
                                    <div className="font-medium text-gray-800">{item.title}</div>
                                    {item.description && (
                                        <div className="text-sm text-gray-500">{item.description}</div>
                                    )}
                                </td>
                                <td className="px-4 py-2">
                                    <StatusBadge status={item.status} />
                                </td>
                                <td className="px-4 py-2 text-sm text-gray-700">{item.method}</td>
                                <td className="px-4 py-2 text-sm text-gray-700">{item.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default DiscountDatatTable