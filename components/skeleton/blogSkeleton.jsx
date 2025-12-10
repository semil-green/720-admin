"use client";

export default function BlogRowSkeleton() {
    return (
        <div className="min-w-max flex items-center gap-6 py-4 px-6 border-b animate-pulse">
            <div className="flex items-center gap-4 flex-[2] min-w-0">
                <div className="w-20 h-14 bg-gray-300 rounded"></div>

                <div className="flex flex-col gap-2 w-full">
                    <div className="h-4 bg-gray-300 rounded w-40"></div>
                    <div className="h-3 bg-gray-300 rounded w-64"></div>
                </div>
            </div>

            <div className="flex items-center gap-6 flex-[1.2] min-w-0">
                <div className="w-20 h-6 bg-gray-300 rounded"></div>
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
            </div>

            <div className="flex items-center justify-end flex-[0.8] shrink-0">
                <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}
