const form = document.getElementById('messageForm');
const nicknameInput = document.getElementById('nickname');
const contentInput = document.getElementById('content');
const listDiv = document.getElementById('messagesList');

async function loadMessages() {
    try {
        const messages = await fetchAPI('/messages');
        if (messages.length === 0) {
            listDiv.innerHTML = '<p class="text-gray-500 text-center py-8">还没有留言，快来抢沙发吧~</p>';
            return;
        }
        listDiv.innerHTML = messages.map(m => `
            <div class="bg-white rounded-lg shadow p-4">
                <div class="flex justify-between items-start mb-2">
                    <span class="font-semibold text-indigo-700">${m.nickname}</span>
                    <span class="text-xs text-gray-400">${new Date(m.created_at).toLocaleString()}</span>
                </div>
                <p class="text-gray-700 whitespace-pre-line">${m.content}</p>
            </div>
        `).join('');
    } catch (err) {
        listDiv.innerHTML = `<p class="text-red-500">加载失败: ${err.message}</p>`;
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nickname = nicknameInput.value.trim();
    const content = contentInput.value.trim();
    if (!nickname || !content) return alert('请填写昵称和内容');
    
    const btn = form.querySelector('button');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>发布中';
    try {
        await fetchAPI('/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nickname, content })
        });
        nicknameInput.value = '';
        contentInput.value = '';
        await loadMessages();
    } catch (err) {
        alert('发布失败: ' + err.message);
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i>发布留言';
    }
});

loadMessages();