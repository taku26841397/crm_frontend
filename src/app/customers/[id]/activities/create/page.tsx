"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/src/components/Sidebar";

import { authHeaders } from "@/src/lib/api";

export default function ActivityCreatePage() {
    const router = useRouter();

    const params = useParams();
    const id = params.id as string;

    const [activityType, setActivityType] = useState("電話");
    const [memo, setMemo] = useState("");

    // next_action 追加
    const [nextAction, setNextAction] = useState("")
    const [nextActionDate, setNextActionDate] = useState("")

    const handleSubmit = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/customers/${id}/activities/`,
            {
                method: "POST",
                headers: {
                    ...authHeaders(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({

                    activity_type: activityType,
                    memo: memo,
                }),
            }
        );

        if (!res.ok) {
            alert("対応履歴の登録に失敗しました");
            return;
        }

        // router.push(`/customers/${id}/`);
        if (nextAction || nextActionDate) {
            const nextRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/customers/${id}/edit/`,
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

            // if (!nextRes.ok) {
            //     alert("次回アクションの更新に失敗しました");
            //     return;
            // }


        }
        router.push(`/customers/${id}/`);
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex min-h-screen bg-slate-50">

                <Sidebar />

                <div className="flex-1 p-8 ">

                    <Link
                        href={`/customers/${id}`}
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
                        対応履歴追加
                    </h1>

                    <div className="bg-white rounded-xl shadow-md p-6">

                        <div className="mb-4">
                            <label className="block text-sm text-gray-500 mb-2">
                                対応種別
                            </label>

                            <select
                                value={activityType}
                                onChange={(e) => setActivityType(e.target.value)}
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
                                className="w-full border p-2 rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-500 mb-2">
                                次回アクション
                                <span className="ml-2 inline-flex items-center rounded-md text-xs px-2 py-0.5 bg-blue-50 text-slate-400 font-normal"> 任意 </span>
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
                                <span className="ml-2 inline-flex items-center rounded-md text-xs px-2 py-0.5 bg-blue-50 text-slate-400 font-normal"> 任意 </span>
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
    );
}