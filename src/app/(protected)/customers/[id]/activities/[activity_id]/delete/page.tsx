"use client";


import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import Sidebar from "@/src/components/Sidebar";

import { authHeaders } from "@/src/lib/api";

export default function ActivityDeletePage() {

    const [activity, setActivity] = useState<any>(null);

    const router = useRouter();

    const params = useParams();

    const id = params.id as string;
    const activity_id = params.activity_id as string;

    const next = useSearchParams().get("next")

    useEffect(() => {
        const fetchCustomer = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/activities/${activity_id}/`,
                {
                    headers: authHeaders()
                }
            );

            const data = await res.json();

            setActivity(data);
        };

        fetchCustomer();
    }, [activity_id]);

    const handleDelete = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/activities/${activity_id}/delete/`,
            {
                method: "DELETE",
                headers: authHeaders()

            }
        );

        if (!res.ok) {
            alert("削除失敗");
            return;
        }

        router.push(next || `/customers/${id}/activities/`);
    };


    return (
        <div className="flex min-h-screen bg-slate-50">
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
                    <h1 className="text-3xl font-bold mb-6 text-red-600">
                        アクティビティ削除
                    </h1>

                    <div className="bg-white rounded-xl shadow-md px-40 py-8 ">

                        <div className="bg-gray-50 border rounded-lg p-4 mb-6 ">
                            <p className="font-semibold">
                                {activity?.activity_type}
                            </p>

                            <p className="text-gray-500">
                                {activity?.memo}
                            </p>
                        </div>

                        <p className="text-red-600 font-medium mb-6">
                            このアクティビティを削除しますか？

                        </p>

                        <div className="flex gap-3">

                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition cursor-pointer"
                            >
                                削除する
                            </button>


                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}