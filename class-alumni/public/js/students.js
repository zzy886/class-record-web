(async function loadClassmates() {
    const grid = document.getElementById('classmatesGrid');
    try {
        const classmates = await fetchAPI('/classmates');
        if (classmates.length === 0) {
            grid.innerHTML = '<p class="text-gray-500 col-span-full text-center py-12">暂无同学信息，请联系管理员添加。</p>';
            return;
        }
        grid.innerHTML = classmates.map(c => `
            <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col items-center text-center">
                <img src="${c.avatar || '/default-avatar.png'}" alt="${c.name}" class="w-28 h-28 rounded-full object-cover mb-4 border-4 border-indigo-100">
                <h3 class="text-xl font-semibold text-gray-800">${c.name}</h3>
                <p class="text-gray-600 text-sm mt-2 min-h-[40px]">${c.bio || '这家伙很懒，什么都没写~'}</p>
                ${c.contact ? `<p class="text-indigo-500 text-xs mt-3 flex items-center"><i class="far fa-envelope mr-1"></i>${c.contact}</p>` : ''}
            </div>
        `).join('');
    } catch (err) {
        grid.innerHTML = `<p class="text-red-500 col-span-full text-center py-12">加载失败: ${err.message}</p>`;
    }
})();