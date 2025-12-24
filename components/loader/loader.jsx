"use client";
import React from "react";

const Loader = () => {
    return (
        // <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        //     <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        // </div>

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <div className="relative flex items-center justify-center">
                    <div className="absolute w-20 h-20 rounded-full bg-primary/20 animate-ping"></div>
                    <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <p className="text-sm font-medium text-white animate-pulse tracking-wide">
                    Loading...
                </p>
                <p className="text-xs text-white animate-pulse">
                    Please do not refresh the page
                </p>

            </div>
        </div>
    );
};

export default Loader;
