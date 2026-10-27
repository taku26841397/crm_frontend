"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

    return <>{children}</>;
}