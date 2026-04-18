const form = document.getElementById('blessingForm');
const authorInput = document.getElementById('author');
const contentInput = document.getElementById('blessingContent');
const listDiv = document.getElementById('blessingsList');

async function loadBlessings() {
    try {
        const blessings = await fetchAPI('/blessings');
        if (blessings.length === 0) {
            listDiv.innerHTML = '<p class="text-gray-500 text-center py-8">暂无寄语，写下第一条祝福吧~</p>';
            return;
        }
        listDiv.innerHTML = blessings.map(b => `
            <div class="bg-white rounded-lg shadow p-5 border-l-4 border-pink-400">
                <p class="text-gray-800 text-lg italic">“${b.content}”</p>
                <p class="text-right text-indigo-600 mt-3">—— ${b.author}</p>
                <p class="text-xs text-gray-400 text-right">${new Date(b.created_at).toLocaleString()}</p>
            </div>
        `).join('');
    } catch (err) {
        listDiv.innerHTML = `<p class="text-red-500">加载失败: ${err.message}</p>`;
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const author = authorInput.value.trim();
    const content = contentInput.value.trim();
    if (!author || !content) return alert('请填写名字和寄语内容');
    
    const btn = form.querySelector('button');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>发送中';
    try {
        await fetchAPI('/blessings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author, content })
        });
        authorInput.value = '';
        contentInput.value = '';
        await loadBlessings();
    } catch (err) {
        alert('发送失败: ' + err.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-heart mr-2"></i>送出祝福';
    }
});

loadBlessings();