
import Link from "next/link";
import Sidebar from "@/src/components/Sidebar";

import { Pencil, Trash2 } from "lucide-react";

export default async function CustomerDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customers/${id}/`
    );
    if (!res.ok) {

        return <div>顧客が見つかりません</div>;

    }
    const customer = await res.json();

    const isOverdue = customer.next_action_date && new Date(customer.next_action_date) < new Date();


    const statusColor: any = {
        new: "text-blue-700",
        in_progress: "text-yellow-700",
        closed: "text-green-700",
    };

    const activitiesRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customers/${id}/activities/`
    );

    const activities = await activitiesRes.json();
    console.log(activities);




    return (
        <div className="flex min-h-screen bg-slate-50">

            <Sidebar />

            <div className="flex-1 p-8 ">

                <Link
                    href={`/customers`}
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

                    ←顧客一覧に戻る
                </Link>

                <h1 className="text-3xl font-bold mb-6">
                    顧客詳細
                </h1>

                {/* ヘッダー */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">

                    <div className="flex justify-between items-start">

                        <div className="flex items-center gap-5">

                            <div
                                className="
                            w-20 h-20
                            rounded-full
                            bg-blue-500
                            text-white
                            flex items-center justify-center
                            text-3xl font-bold
                        "
                            >
                                {customer.name.slice(0, 1)}
                            </div>

                            <div>

                                <h2 className="text-3xl font-bold">
                                    {customer.name}
                                </h2>

                                <p className="text-gray-500 mt-1">
                                    {customer.company}
                                </p>

                                <span
                                    className={
                                        customer.status === "new"
                                            ? "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
                                            : customer.status === "in_progress"
                                                ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs"
                                                : "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs"
                                    }
                                >
                                    {customer.status === "new" && "新規"}
                                    {customer.status === "in_progress" && "対応中"}
                                    {customer.status === "closed" && "成約"}
                                </span>

                            </div>

                        </div>

                        <div className="flex gap-2">
                            <Link
                                href={`/customers/${customer.id}/edit`}
                                className=" inline-flex items-center bg-amber-50 text-amber-600 border border-amber-500 px-4   py-1 rounded-lg hover:bg-white transition "
                            >
                                <Pencil size={12} />

                            </Link>
                            <Link
                                href={`/customers/${customer.id}/delete`}
                                className="inline-flex items-center bg-red-50 text-red-600 border border-red-500 px-4 py-1 rounded-lg hover:bg-white transition"

                            >
                                <Trash2 size={12} />

                            </Link>
                        </div>

                    </div>



                </div>

                {/* 2カラム */}
                <div className="grid lg:grid-cols-2 gap-6 mt-6">

                    {/* 顧客情報 */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">

                        <h3 className="font-bold text-lg mb-6">
                            顧客情報
                        </h3>

                        <div className="space-y-4">

                            <div className="flex  items-center gap-30">
                                <span className="text-gray-500 w-24 shrink-0">
                                    顧客ID
                                </span>

                                <span>
                                    {customer.id}
                                </span>
                            </div>

                            <div className="flex items-center gap-30">
                                <span className="text-gray-500 w-24 shrink-0">
                                    会社名
                                </span>

                                <span>
                                    {customer.company}
                                </span>
                            </div>

                            <div className="flex items-center gap-30">
                                <span className="text-gray-500 w-24 shrink-0">
                                    ステータス
                                </span>

                                <span>
                                    <span
                                        className={`${statusColor[customer.status]}`}
                                    >
                                        {customer.status === "new" && "新規"}
                                        {customer.status === "in_progress" && "対応中"}
                                        {customer.status === "closed" && "成約"}
                                    </span>
                                </span>
                            </div>
                            <div className="flex items-center gap-30">
                                <span className="text-gray-500 w-24 shrink-0">
                                    電話番号
                                </span>

                                <span>
                                    {customer.phone}
                                </span>
                            </div>
                            <div className="flex items-center gap-30">
                                <span className="text-gray-500 w-24 shrink-0">
                                    住所
                                </span>

                                <span>
                                    {customer.address}
                                </span>
                            </div>
                            <div className="flex items-center gap-30">
                                <span className="text-gray-500 w-24 shrink-0">
                                    メール
                                </span>

                                <span>
                                    {customer.email}
                                </span>
                            </div>
                            <div className="flex items-center gap-30">
                                <span className="text-gray-500 w-24 shrink-0">
                                    作成日
                                </span>

                                <span>
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
                                </span>
                            </div>
                            <div className="flex items-center gap-30">
                                <span className="text-gray-500 w-24 shrink-0">
                                    最終更新日
                                </span>

                                <span>
                                    {new Date(
                                        customer.updated_at
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
                                </span>
                            </div>
                            <div className="mt-6 border-t border-slate-100 pt-5">

                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <p className="text-xs font-medium text-slate-400 uppercase">
                                            NEXT ACTION
                                        </p>
                                        <p className="text-sm font-semibold text-slate-900 mt-1">
                                            次回アクション
                                        </p>
                                    </div>

                                    <Link
                                        href={`/customers/${id}/next-action/edit/`}
                                        className=" inline-flex items-center bg-amber-50 text-amber-600 border border-amber-500 px-4   py-1 rounded-lg hover:bg-white transition "
                                    >
                                        <Pencil size={12} />

                                    </Link>
                                </div>

                                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">

                                    <p className="font-semibold text-slate-900">
                                        {customer.next_action || "未設定"}
                                    </p>

                                    <p className="text-sm text-slate-500 mt-1">
                                        {customer.next_action_date || "-"}
                                    </p>

                                    {isOverdue && (
                                        <p className="mt-2 text-xs font-medium text-red-600">
                                            ⚠ 期限超過
                                        </p>
                                    )}

                                </div>
                            </div>

                        </div>

                    </div>

                    {/* 対応履歴 */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">

                        <div className="flex justify-between items-center mb-6">

                            <h3 className="font-bold text-lg">
                                対応履歴
                            </h3>
                            <Link
                                href={`/customers/${id}/activities/create/`}
                                className="inline-flex
                                    items-center
                                    gap-2

                                    h-9
                                    px-4

                                    text-sm
                                    font-medium

                                    text-slate-500
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

                        <div className="relative">

                            {activities.results
                                ?.slice(0, 5)
                                .map((activity: any, index: number) => (

                                    <div
                                        key={activity.id}
                                        className="relative flex gap-4 pb-6 last:pb-0"
                                    >

                                        {/* 縦線 */}
                                        {index !== activities.results.slice(0, 5).length - 1 && (
                                            <div className="
                        absolute
                        left-[5px]
                        top-3
                        h-full
                        w-px
                        bg-slate-200
                    " />
                                        )}

                                        {/* ドット */}
                                        <div className="
                    relative
                    z-10
                    mt-1
                    w-3
                    h-3
                    rounded-full
                    bg-blue-500
                    ring-4
                    ring-blue-50
                    shrink-0
                " />

                                        <div className="min-w-0">

                                            <div className="flex items-center gap-3">
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {activity.activity_type}
                                                </p>

                                                <p className="text-xs text-slate-400">
                                                    {new Date(
                                                        activity.created_at
                                                    ).toLocaleString("ja-JP")}
                                                </p>
                                            </div>

                                            <p className="text-sm text-slate-600 mt-1">
                                                {activity.memo}
                                            </p>

                                        </div>

                                    </div>
                                ))}
                        </div>
                        <Link
                            href={`/customers/${id}/activities`}
                            className="inline-flex
                                    items-center
                                    gap-2

                                    h-8
                                    px-4
                                    mt-7
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

                            ←すべての履歴を見る
                        </Link>
                    </div >

                </div >
            </div>
        </div >



    )

}