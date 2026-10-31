"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { authHeaders } from "@/src/lib/api";
import { useRouter } from "next/navigation";

const fetchProfile = async () => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/`,
        {
            headers: authHeaders(),
        }
    );

    return res.json();
};


export default function ProfilePage() {


    const [image, setImage] =
        useState<File | null>(null);

    const [saving, setSaving] =
        useState(false);

    const { data: profile } = useQuery({
        queryKey: ["profile"],
        queryFn: fetchProfile,
    });


    const [previewUrl, setPreviewUrl] =
        useState<string | null>(null);

    const router = useRouter();

    const handleSave = async () => {
        if (!image) return;

        setSaving(true);

        const formData = new FormData();

        formData.append(
            "image",
            image
        );

        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/profile/`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Token ${localStorage.getItem(
                        "crm_token"
                    )}`,
                },
                body: formData,
            }
        );

        setSaving(false);

        alert("プロフィール画像を更新しました");
        router.push(`/dashbord/`)

    };

    return (
        <main className="md:ml-56 p-8">
            <div
                className="
                    max-w-lg
                    bg-white
                    rounded-xl
                    shadow
                    p-6
                "
            >
                <h1
                    className="
                        text-2xl
                        font-bold
                        mb-6
                    "
                >
                    プロフィール設定
                </h1>

                <div className="flex flex-col items-center">

                    <div
                        className="
        w-28
        h-28
        rounded-full
        overflow-hidden
        bg-slate-600

        flex
        items-center
        justify-center
    "
                    >
                        {previewUrl ? (
                            <img
                                src={previewUrl}
                                alt="preview"
                                className="
                w-full
                h-full
                object-cover
            "
                            />
                        ) : profile?.image ? (
                            <img
                                src={profile.image}
                                alt="profile"
                                className="
                w-full
                h-full
                object-cover
            "
                            />
                        ) : (
                            <span
                                className="
                text-white
                text-xl
                font-bold
            "
                            >
                                ?
                            </span>
                        )}
                    </div>

                    <label
                        className="
        inline-flex
        items-center
        justify-center

        px-4
        py-2
        mt-4
        mb-4

        bg-slate-700
        text-white

        rounded-lg
        cursor-pointer

        hover:bg-slate-800
        transition
    "
                    >
                        ファイルを選択

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file =
                                    e.target.files?.[0];

                                if (!file) return;

                                setImage(file);

                                setPreviewUrl(
                                    URL.createObjectURL(file)
                                );
                            }}
                        />
                    </label>

                    {image && (
                        <p className="text-sm text-slate-500">
                            {image.name}
                        </p>
                    )}

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="
                            bg-blue-600
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            hover:bg-blue-700
                            transition
                        "
                    >
                        {saving
                            ? "保存中..."
                            : "画像を更新"}
                    </button>

                </div>
            </div>
        </main>
    );
}