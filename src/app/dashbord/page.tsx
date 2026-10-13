"use client";


import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link"
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/navigation";

import { authHeaders } from "@/src/lib/api";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import {
    Users,
    UserPlus,
    Clock3,
    CircleCheck,
} from "lucide-react";





const fetchDashboard = async () => {



    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/dashboard/`,
        {
            headers: authHeaders()
        }
    );

    return res.json();
};

const fetchCustomers = async () => {

    const token = localStorage.getItem("crm_token");

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customers/`,
        {
            headers: authHeaders()
        }
    );

    return res.json();
};

export default function CustomerDashbordPage() {
    const router = useRouter();

    const { data: dashboard, isLoading } = useQuery({
        queryKey: ["dashboard"],
        queryFn: fetchDashboard,
    });

    const { data: customers } = useQuery({
        queryKey: ["customers"],
        queryFn: fetchCustomers,
    });

    if (isLoading) {
        return (
            <div className="p-6">
                読み込み中...
            </div>
        );
    }



    const chartData = [
        {
            name: "新規",
            value: dashboard?.new ?? 0,
        },
        {
            name: "対応中",
            value: dashboard?.in_progress ?? 0,
        },
        {
            name: "成約",
            value: dashboard?.closed ?? 0,
        },
    ];

    const COLORS = [
        "#3B82F6",
        "#EAB308",
        "#22C55E",
    ];

    return (
        <div className="flex min-h-screen bg-slate-50">

            <Sidebar />

            {/* メインエリア */}
            <main className="flex-1 pt-20 px-8 pb-8 md:p-8 md:pt-8 border-l border-slate-200">

                <h1 className="text-4xl font-semibold tracking-tight">
                    ダッシュボード
                </h1>



                {/* KPIカード */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5 sm:grid-cols-2 xl:grid-cols-4 ">

                    <div className="bg-white rounded-2xl shadow p-4 border-slate-100 hover:shadow-md hover:-translate-y-1 transition">

                        <div className="flex justify-between">

                            <div>
                                <p className="text-slate-500 text-sm font-medium">
                                    総顧客数
                                </p>

                                <p className="text-5xl font-bold tracking-tight text-black mt-2">
                                    {dashboard?.total}
                                </p>
                                <p className="text-xs text-green-500 mt-1">
                                    前月比 +12
                                </p>
                            </div>

                            <div
                                className="
                                        w-12 h-12
                                        rounded-xl
                                        bg-blue-100
                                        flex
                                        items-center
                                        justify-center
                                    "
                            >
                                <Users
                                    className="text-blue-600"
                                    size={24}
                                />
                            </div>

                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">
                                    新規
                                </p>

                                <p className="text-5xl tracking-tight font-bold text-blue-500 mt-2">
                                    {dashboard?.new}
                                </p>
                                <p className="text-xs text-blue-500 mt-1">
                                    前月比 +12
                                </p>
                            </div>
                            <div className="w-12 h-12
                                        rounded-xl
                                        bg-blue-100
                                        flex
                                        items-center
                                        justify-center">
                                <UserPlus
                                    className="text-blue-400"
                                    size={24}
                                />
                            </div>
                        </div>

                    </div>

                    <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">
                                    対応中
                                </p>

                                <p className="text-5xl tracking-tight font-bold text-yellow-500 mt-2">
                                    {dashboard?.in_progress}
                                </p>
                                <p className="text-xs text-green-500 mt-1">
                                    前月比 +12
                                </p>
                            </div>
                            <div className="w-12 h-12
                                        rounded-xl
                                        bg-yellow-100
                                        flex
                                        items-center
                                        justify-center">
                                <Clock3
                                    className="text-yellow-400"
                                    size={24}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl shadow-sm p-4 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition">
                        <div className="flex justify-between">
                            <div>
                                <p className="text-slate-500 text-sm font-medium">
                                    成約
                                </p>

                                <p className="text-5xl tracking-tight font-bold text-green-500 mt-2">
                                    {dashboard?.closed}
                                </p>
                                <p className="text-xs text-green-500 mt-1">
                                    前月比 +12
                                </p>
                            </div>
                            <div className="w-12 h-12
                                        rounded-xl
                                        bg-green-100
                                        flex
                                        items-center
                                        justify-center">
                                <CircleCheck
                                    className="text-green-400 "
                                    size={24}
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-4">

                    {/* 最近の顧客 */}
                    <div className="bg-white rounded-2xl shadow-sm lg:col-span-3">
                        <div className="flex justify-between items-center px-4 py-3">
                            <h2 className="text-lg font-semibold text-slate-900">
                                最近の顧客
                                <span className="ml-2 text-sm text-slate-400">
                                    ({customers?.results?.length ?? 0})
                                </span>
                            </h2>
                            <Link
                                href="/customers"
                                className="
        text-sm
        font-medium
        text-slate-600
        px-3
        py-2
        rounded-lg
        hover:bg-slate-100
        transition
    "
                            >
                                すべて表示 →
                            </Link>
                        </div>
                        <table className="w-full">

                            <thead>
                                <tr className="border-b border-gray-300 text-xs font-medium text-slate-500 uppercase tracking-wide">

                                    <th className="text-left px-4 py-3">
                                        顧客名
                                    </th>

                                    <th className="text-left px-4 py-3">
                                        会社名
                                    </th>

                                    <th className="text-left px-4 py-3">
                                        ステータス
                                    </th>

                                    <th className="text-left px-4 py-3">
                                        最終更新
                                    </th>



                                </tr>
                            </thead>

                            <tbody className="text-sm">

                                {customers?.results
                                    ?.slice(0, 5)
                                    .map((customer: any) => (

                                        <tr
                                            key={customer.id}
                                            className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition"
                                            onClick={() => router.push(`/customers/${customer.id}`)}
                                        >
                                            <td className="px-4 py-3 font-semibold">

                                                <div className="flex items-center gap-3">

                                                    <div
                                                        className="
                w-8 h-8
                rounded-full
                bg-blue-500
                text-white
                flex items-center justify-center
                text-xs font-bold
            "
                                                    >
                                                        {customer.name.slice(0, 1)}
                                                    </div>

                                                    {customer.name}

                                                </div>

                                            </td>


                                            <td className="px-4 py-3 text-gray-600">
                                                {customer.company}
                                            </td>

                                            <td className="px-4 py-3 flex justify-center">

                                                <span
                                                    className={
                                                        customer.status === "new"
                                                            ? "bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs"
                                                            : customer.status === "in_progress"
                                                                ? "bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs"
                                                                : "bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                                                    }
                                                >
                                                    {customer.status === "new" && "新規"}
                                                    {customer.status === "in_progress" && "対応中"}
                                                    {customer.status === "closed" && "成約"}
                                                </span>

                                            </td>
                                            <td className="px-4 py-3 text-gray-500">
                                                {new Date(
                                                    customer.created_at
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

                                        </tr>


                                    ))}

                            </tbody>

                        </table>

                    </div>

                    {/* 右側の空きエリア */}
                    <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2">

                        <h2 className="text-xl font-bold mb-4">
                            ステータス別顧客数
                        </h2>
                        <p className="text-sm text-gray-500">
                            顧客ステータスの割合
                        </p>


                        {/* グラフ */}
                        <div className="grid grid-cols-3 gap-2 items-center">

                            {/* グラフ */}
                            <div className="col-span-2 relative h-72">

                                <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                >

                                    <PieChart>

                                        <Pie
                                            data={chartData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={65}
                                            outerRadius={100}
                                        >

                                            {chartData.map((entry, index) => (

                                                <Cell
                                                    key={index}
                                                    fill={COLORS[index]}
                                                />

                                            ))}

                                        </Pie>

                                        <Tooltip />

                                    </PieChart>

                                </ResponsiveContainer>

                                <div
                                    className="
                absolute
                inset-0
                flex
                flex-col
                items-center
                justify-center
                pointer-events-none
            "
                                >
                                    <p className="text-sm text-gray-500">
                                        合計
                                    </p>

                                    <p className="text-3xl font-bold">
                                        {dashboard?.total}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        顧客
                                    </p>

                                </div>

                            </div>

                            {/* 凡例 */}
                            <div className="space-y-5">

                                <div>

                                    <div className="flex items-center gap-2">

                                        <div className="w-3 h-3 rounded-full bg-blue-500" />

                                        <span className="font-medium text-sm">
                                            新規
                                        </span>

                                    </div>

                                    <p className="ml-5 text-sm text-gray-600">

                                        {dashboard?.new}人

                                        {" "}

                                        (
                                        {(
                                            (
                                                dashboard?.new /
                                                dashboard?.total
                                            ) * 100
                                        ).toFixed(1)}
                                        %)

                                    </p>

                                </div>

                                <div>

                                    <div className="flex items-center gap-2">

                                        <div className="w-3 h-3 rounded-full bg-yellow-500" />

                                        <span className="font-medium text-sm">
                                            対応中
                                        </span>

                                    </div>

                                    <p className="ml-5 text-sm text-gray-600">

                                        {dashboard?.in_progress}人

                                        {" "}

                                        (
                                        {(
                                            (
                                                dashboard?.in_progress /
                                                dashboard?.total
                                            ) * 100
                                        ).toFixed(1)}
                                        %)

                                    </p>

                                </div>

                                <div>

                                    <div className="flex items-center gap-2">

                                        <div className="w-3 h-3 rounded-full bg-green-500" />

                                        <span className="font-medium text-sm">
                                            成約
                                        </span>

                                    </div>

                                    <p className="ml-5 text-sm text-gray-600">

                                        {dashboard?.closed}人

                                        {" "}

                                        (
                                        {(
                                            (
                                                dashboard?.closed /
                                                dashboard?.total
                                            ) * 100
                                        ).toFixed(1)}
                                        %)

                                    </p>

                                </div>

                            </div>

                        </div>





                    </div>

                </div>
            </main>
        </div>
    )
}