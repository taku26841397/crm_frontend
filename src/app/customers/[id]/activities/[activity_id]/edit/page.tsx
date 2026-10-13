"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/src/components/Sidebar";
import { authHeaders } from "@/src/lib/api";


export default function ActivityEditPage() {
    const router = useRouter();

    const params = useParams();
    const id = params.id as string;
    const activity_id = params.activity_id as string;

    const [activity_type, setActivity_type] = useState("");
    const [memo, setMemo] = useState("");


    const next = useSearchParams().get("next")

    useEffect(() => {
        const fetchActivity = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/activities/${activity_id}/`,
                {
                    headers: authHeaders()
                }
            );

            const activity = await res.json();
            console.log("これは編集です")
            console.log(activity)
            setActivity_type(activity.activity_type);
            setMemo(activity.memo);

        };

        fetchActivity();
    }, [activity_id]);

    const handleUpdate = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/customers/${id}/activities/${activity_id}/edit/`,
            {
                method: "PATCH",
                headers: {
                    ...authHeaders(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    activity_type,
                    memo,

                }),
            }
        );

        if (!res.ok) {
            alert("更新失敗");
            return;
        }

        router.push(next || `/customers/${id}/activities/`);
    };

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <div className="flex-1">
                <div className="max-w-7xl mx-auto p-8">
                    <Link
                        href={next || `/customers/${id}/activities`}
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

                        ←戻る
                    </Link>
                    <h1 className="text-3xl font-bold mb-6">
                        顧客編集
                    </h1>

                    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">

                        <div className="mb-4">
                            <label className="block text-sm text-gray-500 mb-2">
                                対応種別
                            </label>

                            <select
                                value={activity_type}
                                onChange={(e) => setActivity_type(e.target.value)}
                                className="w-full border p-2 rounded"
                            >
                                <option value="電話">電話</option>
                                <option value="メール">メール</option>
                                <option value="訪問">訪問</option>
                                <option value="商談">商談</option>
                                <option value="その他">その他</option>
                            </select>
                        </div>


                        <div className="mb-6">
                            <label className="block text-sm text-gray-500 mb-2">
                                メモ
                            </label>

                            <textarea
                                value={memo}
                                onChange={(e) => setMemo(e.target.value)}
                                rows={5}
                                className="w-full border p-2 rounded  min-w-xl"
                            />
                        </div>

                        <button
                            onClick={handleUpdate}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                        >
                            更新
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}