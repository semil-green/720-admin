"use client";

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useMemo } from "react";
import { Button } from "../ui/button";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AverageOrderValue = ({ chartData, startDate, endDate }) => {
    const labels = chartData?.data?.map((item) => item?.order_date);
    const values = chartData?.data?.map((item) => Number(item?.avg_order_value));

    const data = {
        labels,
        datasets: [
            {
                label: "Total Sales Amount",
                data: values,
                borderColor: "rgba(37, 99, 235, 1)",
                backgroundColor: "rgba(37, 99, 235, 0.2)",
                tension: 0.3,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Sales Over Time",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Order Date",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Total Amount (₹)",
                },
                beginAtZero: true,
            },
        },
    };

    const columns = useMemo(
        () => [
            {
                header: "Date",
                accessorKey: "order_date",
            },
            {
                header: "Orders",
                accessorKey: "total_orders",
            },
            {
                header: "Average Order Value",
                accessorKey: "avg_order_value",
            },
        ],
        []
    );

    const table = useReactTable({
        data: chartData?.data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const exportToExcel = () => {
        const dataToExport = table?.getRowModel().rows.map((row) => {
            const rowData = {};
            row.getVisibleCells().forEach((cell) => {
                rowData[cell.column.columnDef.header] = cell.getValue();
            });
            return rowData;
        });

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Report");

        XLSX.writeFile(wb, "average-order-value.xlsx");
    };

    return (
        <>

            <div className="my-2">
                <h1 className="font-md text-lg underline underline-offset-4 ">Average Order Value :</h1>
                <p className="my-2 font-bold text-xl">₹ {chartData?.summary?.avg_order_value}</p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-4 mt-6">
                <Line data={data} options={options} />
            </div>

            <div className="flex justify-center my-2">
                <Button onClick={exportToExcel}>Export</Button>
            </div>

            <Table className="bg-white shadow-md border-2  rounded-2xl my-0 ">
                <TableHeader>
                    {table?.getHeaderGroups()?.map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    <div className="!px-3 !py-3">
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody className="px-2 py-2">
                    {table?.getRowModel().rows?.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    <div className="!px-3 !py-3">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}

                    {/* <TableRow className="font-bold bg-gray-200">
                        <TableCell>
                            <div>
                                {startDate?.toLocaleDateString()} -{" "}
                                {endDate?.toLocaleDateString()}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="!px-3 !py-3">{chartData?.summary?.total_tax}</div>
                        </TableCell>
                        <TableCell>
                            <div className="!px-3 !py-3">
                                {chartData?.summary?.total_amount}
                            </div>
                        </TableCell>
                    </TableRow> */}
                </TableBody>
            </Table>
        </>
    );
};

export default AverageOrderValue;
