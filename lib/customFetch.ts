export async function customFetch(input: RequestInfo, init: RequestInit = {}) {
    const headers = {
        ...(init.headers || {}),
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
    };

    return fetch(input, {
        ...init,
        headers,
    });
}
