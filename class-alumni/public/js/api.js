const API_BASE = '/api';

async function fetchData(url, options = {}) {
    const response = await fetch(`${API_BASE}${url}`, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}