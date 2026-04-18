const API_BASE = '/api';

async function fetchAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, options);
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.error || `请求失败 (${response.status})`);
        }
        return await response.json();
    } catch (err) {
        console.error('API 错误:', err);
        throw err;
    }
}