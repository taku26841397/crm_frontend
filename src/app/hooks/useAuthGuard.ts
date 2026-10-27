
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
    const router = useRouter();

    useEffect(() => {
        const token =
            localStorage.getItem("crm_token");

        if (!token) {
            router.push("/login");
        }
    }, [router]);
}