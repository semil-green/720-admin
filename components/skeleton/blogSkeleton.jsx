"use client";

export default function BlogRowSkeleton() {
    return (
        <div className="min-w-[700px] flex items-center gap-4 py-3 px-6 border-b animate-pulse">
            <div className="flex-1 min-w-[300px] flex items-center gap-4">
                <div className="w-20 h-14 bg-gray-300 rounded"></div>
                <div className="flex flex-col gap-2 flex-1">
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                    <div className="h-3 bg-gray-300 rounded w-48"></div>
                </div>
            </div>

            <div className="w-[110px] flex items-center justify-center">
                <div className="w-16 h-4 bg-gray-300 rounded"></div>
            </div>

            <div className="w-[120px] flex items-center justify-center">
                <div className="w-20 h-4 bg-gray-300 rounded"></div>
            </div>

            <div className="w-[40px] flex justify-end">
                <div className="w-6 h-6 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}
