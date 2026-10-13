
export function getdiffDays(nextActionDate: string | null) {
    const today = new Date();

    const actionDate = nextActionDate
        ? new Date(nextActionDate)
        : null;

    const diffDays = actionDate
        ? Math.ceil(
            (actionDate.getTime() - today.getTime()) /
            (1000 * 60 * 60 * 24)
        )
        : null;

    return diffDays;
}


export function getDateColor(
    nextActionDate: string | null
) {
    const diffDays = getdiffDays(nextActionDate);

    if (diffDays === null) {
        return "text-gray-500";
    }

    if (diffDays < 0) {
        return "text-red-600 font-semibold";
    }

    if (diffDays <= 2) {
        return "text-yellow-600 font-semibold";
    }

    return "text-blue-600";
}
