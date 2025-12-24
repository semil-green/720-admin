export const handleUnauthorized = (err) => {
    const status = err?.response?.status || err?.status;

    if (status === 401) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("role");

        if (typeof window !== "undefined") {
            window.location.href = "/";
        }

        return true;
    }

    return false;
};
