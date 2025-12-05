"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./header";
import Sidebar from "./sidebar";

export default function MainLayout({ children }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isChecking, setIsChecking] = useState(true);

    // useEffect(() => {
    //     const role = localStorage.getItem("role");
    //     if (!role) {
    //         router.replace("/login"); // Redirect if not logged in
    //     } else {
    //         setIsAuthenticated(true);
    //     }
    //     setIsChecking(false);
    // }, []);

    // if (isChecking) {
    //     return null; // Optionally show a loader
    // }

    // if (!isAuthenticated) {
    //     return null; // Prevent rendering protected layout
    // }

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto bg-background p-8">{children}</main>
            </div>
        </div>
    );
}
