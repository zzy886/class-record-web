(async function loadClassmates() {
    const grid = document.getElementById('classmatesGrid');
    try {
        const classmates = await fetchData('/classmates');
        grid.innerHTML = classmates.map(c => `
            <div class="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
                <img src="${c.avatar || '/default-avatar.png'}" alt="${c.name}" class="w-24 h-24 rounded-full object-cover mb-3 border-2 border-indigo-200">
                <h3 class="text-xl font-semibold">${c.name}</h3>
                <p class="text-gray-600 text-sm mt-1">${c.bio || '暂无简介'}</p>
                ${c.contact ? `<p class="text-indigo-500 text-xs mt-2">📧 ${c.contact}</p>` : ''}
            </div>
        `).join('');
    } catch (err) {
        grid.innerHTML = '<p class="text-red-500 col-span-full">加载失败，请稍后重试</p>';
    }
})();