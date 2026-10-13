"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { authHeaders } from "@/src/lib/api";

import Link from "next/link";
import Sidebar from "@/src/components/Sidebar";

export default function CustomerEditPage() {
    const router = useRouter();

    const params = useParams();
    const id = params.id as string;



    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [status, setStatus] = useState("new");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [memo, setMemo] = useState("")

    useEffect(() => {
        const fetchCustomer = async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/customers/${id}/`,
                {
                    headers: authHeaders()
                }
            );

            const customer = await res.json();

            console.log(customer);

            setName(customer.name);
            setCompany(customer.company);
            setStatus(customer.status);
            setEmail(customer.email);
            setPhone(customer.phone);
            setAddress(customer.address);
        };

        fetchCustomer();
    }, [id]);

    const handleUpdate = async () => {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/customers/${id}/edit/`,
            {
                method: "PATCH",
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
            alert("更新失敗");
            return;
        }

        router.push(`/customers/${id}`);
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <div className="flex-1">
                <div className="max-w-7xl mx-auto p-8">
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
                        顧客編集
                    </h1>
                    {/* {message && (
                    <p className="text-red-500">
                        {message}
                    </p>
                )} */}

                    <div className="grid grid-cols-2 gap-x-6 gap-y-8">

                        <div>
                            <label>顧客名</label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border p-2 rounded bg-white"
                            />
                        </div>

                        <div>
                            <label>メールアドレス</label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border p-2 rounded bg-white"
                            />
                        </div>

                        <div>
                            <label>会社名</label>

                            <input
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="w-full border p-2 rounded bg-white"
                            />
                        </div>

                        <div>
                            <label>住所</label>

                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full border p-2 rounded bg-white"
                            />
                        </div>

                        <div>
                            <label>ステータス</label>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full border p-2 rounded bg-white"
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
                                className=" w-full h-40 border p-2 rounded bg-white"
                            />
                        </div>
                        <div>
                            <label>電話番号</label>

                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full border p-2 rounded bg-white"
                            />
                        </div>





                    </div>
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={handleUpdate}
                    >
                        更新
                    </button>
                </div>
            </div>
        </div>
    );
}