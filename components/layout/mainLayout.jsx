"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./header";
import Sidebar from "./sidebar";
import Loader from "../loader/loader";

export default function MainLayout({ children }) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (!role) {
            router.push("/");
        } else {
            setIsAuthenticated(true);
        }
        setIsChecking(false);
    }, []);


    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 overflow-hidden">
                <Header />
                <main className="flex-1 overflow-auto bg-background px-8 py-2">{children}</main>
            </div>
        </div>
    );
}
