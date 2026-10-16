"use client";

export const dynamic = "force-dynamic";



import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link"
import Sidebar from "../../components/Sidebar";
import { getdiffDays, getDateColor } from "@/src/lib/date";
import { authHeaders } from "@/src/lib/api";

import { keepPreviousData } from "@tanstack/react-query";








const fetchCustomers = async ({ query, status, sort, page }: any) => {
    const params = new URLSearchParams({
        search: query,
        status,
        sort,
        page,
    });


    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customers/?${params.toString()}`,
        {
            headers: authHeaders()
        }
    );
    return res.json();
};

export default function CustomerListPage() {
    const [query, setQuery] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("updated_desc");
    const [page, setPage] = useState(1);


    const router = useRouter();

    useEffect(() => {
        const token =
            localStorage.getItem("crm_token");

        if (!token) {
            router.push("/login");
        }
    }, []);



    const { data, isLoading } = useQuery({
        queryKey: ["customers", query, status, sort, page],
        queryFn: () => fetchCustomers({ query, status, sort, page }),
        placeholderData: keepPreviousData,
    });

    const statusColor: any = {
        new: "bg-blue-100 text-blue-700",
        in_progress: "bg-yellow-100 text-yellow-700",
        closed: "bg-green-100 text-green-700",
    };
    const created = useSearchParams().get("created")




    return (


        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1 px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-8">

                        <div>

                            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
                                顧客一覧
                            </h1>

                            <p className="text-sm text-slate-500 mt-1">
                                顧客情報の検索・管理
                            </p>

                        </div>
                        <Link
                            href={`/customers/new`}
                            className="inline-flex
                                    items-center
                                    gap-2

                                    h-10
                                    px-4

                                    text-sm
                                    font-medium

                                    text-slate-600
                                    bg-blue-100

                                    border
                                    border-slate-200

                                    rounded-lg

                                    hover:bg-slate-50
                                    hover:border-slate-300
                                    hover:text-slate-900

                                    transition-all
                                    duration-200"
                        >

                            ＋ 新規作成
                        </Link>
                    </div>
                </div>



                {created === "true" && (<div className="bg-green-100 text-green-700 p-3 rounded mb-4"> ✅ 顧客を登録しました </div>)}
                {created === "false" && (<div className="bg-green-100 text-red-700 p-3 rounded mb-4">  顧客を削除しました </div>)}
                {/* 検索・フィルタ */}
                <div className="flex gap-3 mb-6">
                    <input
                        type="text"
                        placeholder="名前・会社名で検索"
                        className="border rounded px-3 py-2 w-full"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />

                    <select
                        className="border rounded px-3 py-2"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">ステータス</option>
                        <option value="new">新規</option>
                        <option value="in_progress">対応中</option>
                        <option value="closed">成約</option>
                    </select>

                    <select
                        className="border rounded px-3 py-2"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="updated_desc">更新日（新しい順）</option>
                        <option value="updated_asc">更新日（古い順）</option>
                        <option value="name_asc">名前（A→Z）</option>
                        <option value="overdue">要対応順</option>
                    </select>
                </div>

                {isLoading && <p>読み込み中...</p>}

                {/* 顧客カード一覧 */}
                {/* 顧客一覧テーブル */}
                <div className="bg-white rounded-xl shadow overflow-hidden">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-gray-200 text-xs font-medium text-slate-400">

                                <th className="text-left px-6 py-4">
                                    顧客
                                </th>



                                <th className="text-left px-6 py-4">
                                    ステータス
                                </th>

                                <th className="text-left px-6 py-4">
                                    最終更新
                                </th>

                                <th className="text-left px-6 py-4">
                                    次回アクション予定日
                                </th>
                                <th className="text-left px-6 py-4">
                                    操作
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {data?.results?.map((customer: any) => (

                                <tr
                                    key={customer.id}
                                    className="
                        border-b
                        border-gray-100
                    
                        transition
                        duration-150
                    "
                                >

                                    <td className="px-4 py-3">

                                        <div className="flex items-center gap-3">

                                            <div
                                                className="
                w-8 h-8
                rounded-full
                bg-blue-500
                text-white
                flex
                items-center
                justify-center
                text-xs
                font-bold
                    "
                                            >
                                                {customer.name.slice(0, 1)}
                                            </div>

                                            <div>

                                                <p className="font-semibold text-slate-800">
                                                    {customer.name}
                                                </p>

                                                <p className="text-xs text-slate-400">
                                                    {customer.company}
                                                </p>

                                            </div>

                                        </div>

                                    </td>



                                    <td className="px-6 py-4">

                                        <span
                                            className={` inline-flex justify-center w-15 px-3 py-1 text-xs rounded-full ${statusColor[customer.status]}`}
                                        >
                                            {customer.status === "new" && "新規"}
                                            {customer.status === "in_progress" && "対応中"}
                                            {customer.status === "closed" && "成約"}
                                        </span>

                                    </td>

                                    <td className="px-6 py-4 text-sm text-slate-400 whitespace-nowrap">
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
                                    <td className="px-6 py-4 text-sm whitespace-nowrap">

                                        <span className={getDateColor(customer.next_action_date)}>
                                            {
                                                customer.next_action_date
                                                    ? new Date(
                                                        customer.next_action_date
                                                    ).toLocaleDateString(
                                                        "ja-JP",
                                                        {
                                                            year: "numeric",
                                                            month: "2-digit",
                                                            day: "2-digit",
                                                        }
                                                    )
                                                    : "未定"
                                            }
                                        </span>
                                        {
                                            getdiffDays(customer.next_action_date) !== null &&
                                            getdiffDays(customer.next_action_date)! < 0 && (
                                                <span className="text-xs text-red-400 font-normal mt-1 pl-3">
                                                    ⚠️期限超過
                                                </span>
                                            )
                                        }



                                    </td>
                                    <td className="px-6 py-4">

                                        <Link
                                            className=" inline-flex items-center justify-center
                                                        w-20
                                                        py-2.5
                                                        text-xs
                                                        font-medium
                                                        text-slate-600   
                                                        bg-slate-100

                                                        rounded-md
                                                        hover:bg-blue-50
                                                        hover:text-blue-600
                                                        transition group"
                                            href={`/customers/${customer.id}`}>

                                            詳細
                                            <ChevronRight size={18} className="
transition-transform
group-hover:translate-x-1
" />
                                        </Link>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* ページネーション */}
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-3 py-2 border rounded disabled:opacity-50"
                    >
                        前へ
                    </button>

                    <span>{page}</span>

                    <button
                        disabled={!data?.next}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-3 py-2 border rounded disabled:opacity-50"
                    >
                        次へ
                    </button>
                </div>
            </div>
        </div >
    );
}
