"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Sidebar from "@/src/components/Sidebar";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        const token =
            localStorage.getItem("crm_token");

        if (!token) {
            router.push("/login");
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-slate-50">
            <Sidebar />


            <div className="md:ml-56">
                {children}
            </div>

        </div>
    );
}