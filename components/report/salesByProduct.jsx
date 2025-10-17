"use client";

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
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
import { useMemo, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import * as XLSX from "xlsx";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SalesByProduct = ({ chartData }) => {
    const chartRef = useRef(null);

    const labels = chartData?.map((item) => item?.product_name);
    const values = chartData?.map((item) => Number(item?.net_sales_amount));

    const data = {
        labels,
        datasets: [
            {
                label: "Total Sales (₹)",
                data: values,
                backgroundColor: "rgba(37, 99, 235, 0.6)",
                borderColor: "rgba(37, 99, 235, 1)",
                borderWidth: 1,
                borderRadius: 8,
                barThickness: 28,
            },
        ],
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Sales by Product",
                font: { size: 18 },
            },
            tooltip: {
                callbacks: {
                    label: (context) => `₹${context.parsed.x}`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Total Sales (₹)",
                },
                beginAtZero: true,
            },
            y: {
                ticks: {
                    display: false,
                },
            },
        },
    };

    const productLabelPlugin = {
        id: "productLabelAboveBar",
        afterDatasetsDraw: (chart) => {
            const { ctx, chartArea } = chart;

            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);

                meta.data.forEach((bar, index) => {
                    const productName = chart.data.labels[index];
                    const value = dataset.data[index];

                    ctx.save();
                    ctx.fillStyle = "#111";
                    ctx.font = "bold 12px sans-serif";
                    ctx.textAlign = "left";
                    ctx.textBaseline = "bottom";

                    const padding = 4;

                    ctx.fillText(productName, chartArea.left + padding, bar.y - 20);

                    ctx.fillText(`₹${value}`, chartArea.left + padding, bar.y - 35);

                    ctx.restore();
                });
            });
        },
    };

    useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
            chart.update();
        }
    }, [chartData]);

    const columns = useMemo(
        () => [
            {
                header: "Product",
                accessorKey: "product_name",
                cell: ({ row }) => {
                    const product = row.original;
                    return (
                        <div className="flex items-center gap-2">
                            <img
                                src={product?.thumbnail_image}
                                alt={product?.product_name}
                                className="w-10 h-10 object-cover rounded"
                            />
                            <span>{product?.product_name}</span>
                        </div>
                    );
                },
            },
            { header: "Net Sales (₹)", accessorKey: "net_sales_amount" },
            { header: "Tax Amount (₹)", accessorKey: "tax_amount" },
            { header: "Total Sales Amount (₹)", accessorKey: "total_sales" },
        ],
        []
    );



    const table = useReactTable({
        data: chartData ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const exportToExcel = () => {
        const dataToExport = table.getRowModel().rows.map((row) => {
            const rowData = {};
            row.getVisibleCells().forEach((cell) => {
                rowData[cell.column.columnDef.header] = cell.getValue();
            });
            return rowData;
        });

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
        XLSX.writeFile(wb, "sales-by-product.xlsx");
    };

    return (
        <>
            <div className="bg-white shadow-md rounded-xl p-4 mt-6">
                <Bar
                    ref={chartRef}
                    data={data}
                    options={options}
                    plugins={[productLabelPlugin]}
                />
            </div>

            <div className="flex justify-center my-4">
                <Button onClick={exportToExcel}>Export</Button>
            </div>

            <Table className="bg-white shadow-md border-2 rounded-2xl my-0">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
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

                <TableBody>
                    {table.getRowModel().rows.map((row) => (
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
                </TableBody>
            </Table>
        </>
    );
};

export default SalesByProduct;
