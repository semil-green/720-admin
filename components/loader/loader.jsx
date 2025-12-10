"use client";
import React from "react";

const Loader = () => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="w-14 h-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>

    );
};

export default Loader;
