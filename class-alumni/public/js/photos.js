const showBtn = document.getElementById('showUploadBtn');
const cancelBtn = document.getElementById('cancelUploadBtn');
const uploadPanel = document.getElementById('uploadPanel');
const photoForm = document.getElementById('photoForm');
const grid = document.getElementById('photosGrid');

showBtn.addEventListener('click', () => uploadPanel.classList.remove('hidden'));
cancelBtn.addEventListener('click', () => uploadPanel.classList.add('hidden'));

async function loadPhotos() {
    try {
        const photos = await fetchAPI('/photos');
        if (photos.length === 0) {
            grid.innerHTML = '<p class="text-gray-500 col-span-full text-center py-12">暂无照片，点击"上传照片"添加回忆吧。</p>';
            return;
        }
        grid.innerHTML = photos.map(p => `
            <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <img src="${p.image_url}" alt="${p.title}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h3 class="font-semibold text-lg truncate">${p.title}</h3>
                    <p class="text-gray-500 text-sm mt-1">${p.description || ''}</p>
                    <p class="text-xs text-gray-400 mt-2">${new Date(p.created_at).toLocaleDateString()}</p>
                </div>
            </div>
        `).join('');
    } catch (err) {
        grid.innerHTML = `<p class="text-red-500 col-span-full text-center py-12">加载失败: ${err.message}</p>`;
    }
}

photoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('photoTitle').value.trim();
    const description = document.getElementById('photoDesc').value.trim();
    const fileInput = document.getElementById('photoFile');
    const file = fileInput.files[0];
    if (!title || !file) return alert('请填写标题并选择图片');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', file);

    const btn = photoForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = '上传中...';
    try {
        await fetch('/api/photos', { method: 'POST', body: formData });
        uploadPanel.classList.add('hidden');
        photoForm.reset();
        await loadPhotos();
    } catch (err) {
        alert('上传失败: ' + err.message);
    } finally {
        btn.disabled = false;
        btn.textContent = '上传';
    }
});

loadPhotos();