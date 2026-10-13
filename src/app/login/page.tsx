"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")


    const handleLogin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        setError("")

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            }
        );

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem(
                "crm_token",
                data.key
            );

            router.push("/dashbord");
        } else {
            setError(
                "ログインに失敗しました"
            );
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">

            <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">

                <h1 className="text-3xl font-semibold tracking-tight mb-6">
                    CRM Login
                </h1>

                <form
                    onSubmit={handleLogin}
                    className="space-y-4"
                >

                    <input
                        type="text"
                        placeholder="ユーザー名"
                        value={username}
                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    <input
                        type="password"
                        placeholder="パスワード"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        className="w-full border rounded-lg px-4 py-3"
                    />

                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="
                            w-full
                            bg-blue-500
                            text-white
                            py-3
                            rounded-lg
                            hover:bg-blue-600
                            transition
                        "
                    >
                        ログイン
                    </button>

                </form>

            </div>

        </div>
    );
}
