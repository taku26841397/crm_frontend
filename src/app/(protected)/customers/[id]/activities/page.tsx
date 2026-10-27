"use client"


import Link from "next/link";
import Sidebar from "@/src/components/Sidebar";
import { ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { Pencil, Trash2 } from "lucide-react";

import { authHeaders } from "@/src/lib/api";

const fetchActivities = async (id: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customers/${id}/activities/`,
        {
            headers: authHeaders(),
        }
    );

    if (!res.ok) {
        throw new Error("アクティビティが見つかりません");
    }

    return res.json();
}

export default function ActivityDetailPage() {
    const params = useParams();
    const id = params.id as string;


    const {
        data: activities,
        isLoading
    } = useQuery({
        queryKey: ["activities", id],
        queryFn: () => fetchActivities(id),
        enabled: !!id,
    });

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (!activities) {
        return <div>アクティビティが見つかりません</div>;
    }


    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1  bg-white rounded-xl shadow overflow-hidden p-8">
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
                    ← 顧客詳細へ戻る
                </Link>
                <h1 className="text-2xl font-bold text-center">
                    対応履歴
                </h1>
                <div className="flex justify-between items-center mb-4">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-gray-200 text-sm text-gray-500">

                                <th className="text-left px-6 py-4">
                                    日付
                                </th>

                                <th className="text-left px-6 py-4">
                                    対応種別
                                </th>
                                <th className="text-left px-6 py-4">
                                    メモ
                                </th>


                            </tr>

                        </thead>

                        <tbody>

                            {activities?.results?.map((activity: any) => (

                                <tr
                                    key={activity.id}
                                    className="
                        border-b
                        border-gray-100
                        hover:bg-blue-50
                        transition
                        duration-150
                    "
                                >





                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(
                                            activity.created_at
                                        ).toLocaleString(
                                            "ja-JP",
                                            {
                                                year: "numeric",
                                                month: "2-digit",
                                                day: "2-digit",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {activity.activity_type}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 truncate max-w-xs">
                                        {activity.memo}
                                    </td>

                                    <td className="flex justify-center gap-1 items-center px-6 py-4">


                                        <Link
                                            href={`/customers/${id}/activities/${activity.id}/edit`}
                                            className=" inline-flex items-center bg-amber-50 text-amber-600 border border-amber-500 px-4   py-1 rounded-lg hover:bg-white transition "
                                        >
                                            <Pencil size={12} />

                                        </Link>
                                        <Link
                                            href={`/customers/${id}/activities/${activity.id}/delete`}
                                            className="inline-flex items-center bg-red-50 text-red-600 border border-red-500 px-4 py-1 rounded-lg hover:bg-white transition"

                                        >
                                            <Trash2 size={12} />

                                        </Link>

                                    </td>


                                </tr>

                            ))}

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );

}