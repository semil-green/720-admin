"use client";

export default function BlogRowSkeleton() {
    return (
        <div
            className="
        bg-white
        border-2 border-transparent
        rounded-lg
        shadow-md
        overflow-hidden
        my-4
        animate-pulse
      "
        >
            <div className="flex flex-col sm:flex-row">
                <div className="sm:w-64 w-full flex items-center justify-center px-4 py-4 sm:py-6">
                    <div className="w-full aspect-[4/3] max-h-[180px] bg-gray-200 rounded-lg" />
                </div>

                <div className="flex-1 p-6 sm:pl-8">
                    <div className="flex items-start justify-between gap-4">

                        <div className="flex-1 min-w-0 pr-2">
                            <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
                            <div className="h-5 w-2/3 bg-gray-200 rounded mb-3" />

                            <div className="h-4 w-full bg-gray-200 rounded mb-2" />
                            <div className="h-4 w-5/6 bg-gray-200 rounded mb-4" />

                            <div className="flex items-center gap-3">
                                <div className="h-4 w-24 bg-gray-200 rounded" />
                                <div className="h-5 w-20 bg-gray-200 rounded-full" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 mt-5">
                        <div className="h-9 w-20 bg-gray-200 rounded-lg" />
                        <div className="h-9 w-28 bg-gray-200 rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    );
}
