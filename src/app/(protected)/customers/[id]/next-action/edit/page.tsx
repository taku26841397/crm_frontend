"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

import Sidebar from "@/src/components/Sidebar";

import { authHeaders } from "@/src/lib/api";

export default function NextActionEditPage() {
    const router = useRouter();
    const params = useParams();
    const edit_id = params.id as string;

    const [nextAction, setNextAction] = useState("");
    const [nextActionDate, setNextActionDate] = useState("")


    useEffect(() => {
        const fetchCustomer = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/customers/${edit_id}/`,
                {
                    headers: authHeaders()
                }
            );

            const customer = await res.json();

            setNextAction(customer.next_action || "");
            setNextActionDate(customer.next_action_date || "");

        };

        fetchCustomer();
    }, [edit_id]);

    const handleSubmit = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/customers/${edit_id}/edit/`,
            {
                method: "PATCH",
                headers: {
                    ...authHeaders(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    next_action: nextAction,
                    next_action_date: nextActionDate,

                }),
            }
        );

        if (!res.ok) {
            alert("更新失敗");
            return;
        }

        router.push(`/customers/${edit_id}`);
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1">
                <div className="max-w-2xl mx-auto p-6">
                    <Link
                        href={`/customers/${edit_id}`}
                        className="inline-flex
                                    items-center
                                    gap-2

                                    h-8
                                    px-4

                                    text-sm
                                    font-medium

                                    text-slate-600
                                    

                                    border
                                    border-slate-200

                                    rounded-lg
                                    bg-slate-50
                                    hover:bg-blue-100
                                    hover:border-slate-300
                                    hover:text-slate-900

                                    transition-all
                                    duration-200
                                    mb-4"
                    >

                        ←顧客詳細に戻る
                    </Link>
                    <h1 className="text-3xl font-bold mb-6">
                        次回アクション追加
                    </h1>

                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="mb-4">
                            <label className="block text-sm text-gray-500 mb-2">
                                次回アクション
                            </label>

                            <input
                                type="text"
                                value={nextAction}
                                onChange={(e) => setNextAction(e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm text-gray-500 mb-2">
                                実施予定日
                            </label>

                            <input
                                type="date"
                                value={nextActionDate}
                                onChange={(e) => setNextActionDate(e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            保存
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
