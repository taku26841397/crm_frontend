"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/src/components/Sidebar";
import Link from "next/link";

import { authHeaders } from "@/src/lib/api";

export default function CustomerCreatePage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [memo, setMemo] = useState("")
    const [company, setCompany] = useState("");
    const [status, setStatus] = useState("new");
    const router = useRouter();
    const [message, setMessage] = useState("");


    const handleSubmit = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/customers/`,
            {
                method: "POST",
                headers: {
                    ...authHeaders(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    company,
                    status,
                    email,
                    phone,
                    address,
                    memo
                }),
            }
        );


        if (!res.ok) {
            setMessage("登録に失敗しました");
            return;
        }
        const data = await res.json();

        console.log(data);



        router.push("/customers?created=true");
    };


    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <div className="flex-1">
                <div className="max-w-7xl mx-auto p-8">
                    <Link
                        href={`/customers/new`}
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
                        顧客登録
                    </h1>
                    {message && (
                        <p className="text-red-500">
                            {message}
                        </p>
                    )}

                    <div className="grid grid-cols-2 gap-x-6 gap-y-8">

                        <div>
                            <label>顧客名</label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div>
                            <label>メールアドレス</label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div>
                            <label>会社名</label>

                            <input
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div>
                            <label>住所</label>

                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                        </div>

                        <div>
                            <label>ステータス</label>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full border p-2 rounded"
                            >
                                <option value="new">新規</option>
                                <option value="in_progress">対応中</option>
                                <option value="closed">成約</option>
                            </select>
                        </div>
                        <div className="row-span-2">
                            <label>メモ</label>

                            <textarea

                                value={memo}
                                onChange={(e) => setMemo(e.target.value)}
                                className=" w-full h-40 border p-2 rounded"
                            />
                        </div>
                        <div>
                            <label>電話番号</label>

                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border p-2 rounded"
                            />
                        </div>





                    </div>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleSubmit}
                    >
                        登録
                    </button>
                </div>
            </div>
        </div>
    );
}