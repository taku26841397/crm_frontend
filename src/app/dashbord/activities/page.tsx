import Link from "next/link";
import Sidebar from "@/src/components/Sidebar";

export default async function ActivityDashbordPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const activitiesRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/activities/`
    );

    const activities = await activitiesRes.json();

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1  bg-white rounded-xl shadow overflow-hidden p-8">
                <Link
                    href={`/dashbord`}
                    className="inline-block mb-6 text-blue-600 hover:text-blue-800"
                >
                    ← ダッシュボードへ戻る
                </Link>
                <h1 className="text-2xl font-bold text-center">
                    全対応履歴
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
                                            className="mt-4 inline-flex items-center justify-center gap-2
                                        bg-amber-500 text-white px-4 py-2 rounded-lg text-sm
                                        hover:bg-blue-600 transition"
                                            href={`/customers/${activity.customer}/activities/${activity.id}/edit?next=/dashbord/activities`}>

                                            編集

                                        </Link>
                                        <Link
                                            className="mt-4 inline-flex items-center justify-center gap-2
                                        bg-red-500 text-white px-4 py-2 rounded-lg text-sm
                                        hover:bg-blue-600 transition"
                                            href={`/customers/${activity.customer}/activities/${activity.id}/delete?next=/dashbord/activities`}>

                                            削除

                                        </Link>

                                    </td>


                                </tr>

                            ))}

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}