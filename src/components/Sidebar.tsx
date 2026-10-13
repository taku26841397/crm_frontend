
"use client";

import Link from "next/link";

import {
    LayoutDashboard,
    Users,
    UserPlus,
    ClipboardList,
    Settings,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";

export default function Sidebar() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* =========================
                モバイル用ヘッダー
            ========================= */}
            <div className="
                fixed
                top-0
                left-0
                right-0
                z-40
                flex
                items-center
                h-14
                px-4
                bg-slate-900
                text-white
                md:hidden
                
            ">

                <button
                    onClick={() => setIsOpen(true)}
                    className="
                        p-2
                        rounded-lg
                        hover:bg-slate-800
                        transition
                    "
                    aria-label="メニューを開く"
                >
                    <Menu size={24} />
                </button>

                <h1 className="ml-3 text-lg font-bold">
                    CRM
                </h1>

            </div>


            {/* =========================
                背景（メニュー表示時）
            ========================= */}
            {isOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/40
                        md:hidden
                    "
                    onClick={() => setIsOpen(false)}
                />
            )}


            {/* =========================
                Sidebar
            ========================= */}
            <aside
                className={`
                    fixed
                    md:relative
                    z-50

                    top-0
                    left-0

                    w-56
                    min-h-screen

                    bg-gradient-to-b
                    from-slate-900
                    to-slate-950

                    text-white
                    p-4

                    transform
                    transition-transform
                    duration-300

                    ${isOpen
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }
                `}
            >

                {/* モバイル用閉じるボタン */}
                <div className="
                    flex
                    items-center
                    justify-between
                    mb-8
                ">

                    <h1 className="text-2xl font-bold">
                        CRM
                    </h1>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="
                            p-2
                            rounded-lg
                            hover:bg-slate-800
                            transition
                            md:hidden
                        "
                        aria-label="メニューを閉じる"
                    >
                        <X size={22} />
                    </button>

                </div>


                {/* =========================
                    ナビゲーション
                ========================= */}
                <nav className="space-y-2">

                    <Link
                        href="/dashbord"
                        onClick={() => setIsOpen(false)}
                        className="
                            text-sm
                            flex
                            items-center
                            gap-2
                            px-4
                            py-3
                            rounded-lg
                            hover:bg-slate-800
                            transition
                        "
                    >
                        <LayoutDashboard size={18} />
                        ダッシュボード
                    </Link>


                    <Link
                        href="/customers"
                        onClick={() => setIsOpen(false)}
                        className="
                            text-sm
                            flex
                            items-center
                            gap-2
                            px-4
                            py-3
                            rounded-lg
                            hover:bg-slate-800
                            transition
                        "
                    >
                        <Users size={18} />
                        顧客一覧
                    </Link>


                    <Link
                        href="/customers/new"
                        onClick={() => setIsOpen(false)}
                        className="
                            text-sm
                            flex
                            items-center
                            gap-2
                            px-4
                            py-3
                            rounded-lg
                            hover:bg-slate-800
                            transition
                        "
                    >
                        <UserPlus size={18} />
                        顧客登録
                    </Link>


                    <Link
                        href="/dashbord/activities"
                        onClick={() => setIsOpen(false)}
                        className="
                            text-sm
                            flex
                            items-center
                            gap-2
                            px-4
                            py-3
                            rounded-lg
                            hover:bg-slate-800
                            transition
                        "
                    >
                        <ClipboardList size={18} />
                        対応履歴
                    </Link>

                </nav>
                <button
                    onClick={() => {
                        localStorage.removeItem("crm_token");
                        window.location.href = "/login";
                    }}
                    className="
        w-full
        mt-4
        px-4
        py-2

        text-sm
        font-medium

        text-red-600
        bg-red-50

        rounded-lg

        hover:bg-red-100

        transition
    "
                >
                    ログアウト
                </button>

                {/* =========================
                    プロフィール
                ========================= */}
                <div className="
                    absolute
                    bottom-4
                    left-4
                    right-4
                    border-t
                    border-slate-700
                    pt-4
                ">

                    <div className="flex items-center gap-3">

                        <div className="
                            w-10
                            h-10
                            rounded-full
                            bg-slate-600
                            flex
                            items-center
                            justify-center
                            font-bold
                        ">
                            田
                        </div>

                        <div>

                            <p className="text-sm font-medium">
                                田鎖 透
                            </p>

                            <p className="text-xs text-slate-400">
                                admin@example.com
                            </p>

                        </div>

                    </div>

                </div>

            </aside>
        </>
    );
}