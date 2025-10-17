"use client";

import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/mainLayout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { salesByProductService, salesOverTimeService } from "@/service/report/report.service";
import { toast } from "sonner";
import SalesOverTimeChart from "@/components/report/saleOverTime";
import { Loader2 } from "lucide-react";
import TotalOrdersChart from "@/components/report/totalOrdersChart";
import AverageOrderValue from "@/components/report/averageOrderValue";
import SalesByProduct from "@/components/report/salesByProduct";

const Page = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false)
    const [chartData, setChartData] = useState([]);

    const formdattedStartDate = startDate?.toISOString().split("T")[0]
    const formattedEndDate = endDate?.toISOString().split("T")[0]

    const dropdownOptions = [
        { name: "Total sales over time", value: "sales-over-time" },
        { name: "Total orders over time", value: "total-orders" },
        { name: "AOV", value: "aov" },
        { name: "Total sales by product", value: "sales-by-product" },
        { name: "Best performing product", value: "2" },
        { name: "Margin report", value: "3" },
        { name: "Reorder product level", value: "4" },
        { name: "Orders by location/pincode", value: "5" },
    ];

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        setChartData([]);
    };

    useEffect(() => {
        if (!startDate || !endDate) {
            const today = new Date();
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(today.getMonth() - 1);

            setStartDate(oneMonthAgo);
            setEndDate(today);
        }
    }, []);

    const handleDateButtonClick = () => {
        setShowDatePicker((prev) => !prev);
    };

    const fetchSalesOverTimeData = async (startDate, endDate) => {

        try {
            setLoading(true)

            let res;
            if (selectedOption === "sales-over-time") {
                res = await salesOverTimeService(startDate, endDate);
            } else if (selectedOption === "total-orders") {
                res = await salesOverTimeService(startDate, endDate);
            } else if (selectedOption === "aov") {
                res = await salesOverTimeService(startDate, endDate);
            }
            setChartData(res?.data)
        }

        catch (error) {
            toast.error("Error in fetching sales over time data");
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        if (!["sales-over-time", "total-orders", "aov"].includes(selectedOption)) return;

        if (!formdattedStartDate || !formattedEndDate) return

        fetchSalesOverTimeData(formdattedStartDate, formattedEndDate)
    }, [selectedOption, formdattedStartDate, formattedEndDate])


    const fetchSalesByproductData = async (startDate, endDate) => {

        try {
            setLoading(true)
            const res = await salesByProductService(startDate, endDate)

            setChartData(res?.data)
        }
        catch (error) {
            toast.error("Error in fetching sales by product data");
        }
        finally {
            setLoading(false)
        }
    }
    useEffect(() => {

        if (selectedOption !== "sales-by-product") return;

        fetchSalesByproductData(formdattedStartDate, formattedEndDate)

    }, [
        selectedOption, formdattedStartDate, formattedEndDate
    ])

    return (
        <MainLayout>
            <div className="p-4 flex flex-col gap-4">
                <div className="flex items-start gap-4 relative">
                    <div>
                        <label htmlFor="report" className="block mb-2 font-semibold">
                            Select Report:
                        </label>
                        <select
                            id="report"
                            value={selectedOption}
                            onChange={handleOptionChange}
                            className="border p-2 rounded"
                        >
                            <option value="" disabled>
                                -- Choose an option --
                            </option>
                            {dropdownOptions.map((option, index) => (
                                <option key={index} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-6 relative">
                        <button
                            onClick={handleDateButtonClick}
                            className="border p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Select Date Range
                        </button>

                        {showDatePicker && (
                            <div className="absolute left-0 top-full mt-2 z-50 shadow-lg bg-white border rounded">
                                <DatePicker
                                    selected={startDate}
                                    onChange={(dates) => {
                                        const [start, end] = dates;
                                        setStartDate(start);
                                        setEndDate(end);

                                        if (start && end) setShowDatePicker(false);
                                    }}
                                    startDate={startDate}
                                    endDate={endDate}
                                    selectsRange
                                    inline
                                    monthsShown={1}
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {startDate && endDate && (
                    <div className="flex gap-2">
                        <p>Selected Range :</p>
                        {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                    </div>
                )}

                {loading && (
                    <div className="fixed flex w-full h-full top-0 left-0 z-10">
                        <div className="flex-1 flex justify-center items-center">
                            <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        </div>
                    </div>
                )}

                {selectedOption === "sales-over-time" && (
                    <SalesOverTimeChart
                        chartData={chartData}
                        startDate={startDate}
                        endDate={endDate}
                    />
                )}

                {selectedOption === "total-orders" && (
                    <TotalOrdersChart
                        chartData={chartData}
                        startDate={startDate}
                        endDate={endDate}
                    />
                )}

                {selectedOption === "aov" && (
                    <AverageOrderValue
                        chartData={chartData}
                        startDate={startDate}
                        endDate={endDate}
                    />
                )}


                {selectedOption === "sales-by-product" && (
                    <SalesByProduct
                        chartData={chartData}
                        startDate={startDate}
                        endDate={endDate}
                    />
                )}
            </div>
        </MainLayout>
    );
};

export default Page;
