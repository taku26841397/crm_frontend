export const authHeaders = () => {
    const token = localStorage.getItem(
        "crm_token"
    );

    return {
        Authorization: `Token ${token}`,
    };
};