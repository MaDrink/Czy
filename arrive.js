document.addEventListener('DOMContentLoaded', function() {
    const folderInput = document.getElementById('folderInput');
    const photoGrid = document.querySelector('.photo-grid');
    
    folderInput.addEventListener('change', function(e) {
        // 清空现有的图片
        photoGrid.innerHTML = '';
        
        const files = Array.from(e.target.files);
        
        // 过滤出图片文件
        const imageFiles = files.filter(file => 
            file.type.startsWith('image/')
        );
        
        // 创建并添加图片元素
        imageFiles.forEach(file => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item';
            
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            
            // 图片加载完成后释放URL
            img.onload = () => {
                URL.revokeObjectURL(img.src);
            };
            
            photoItem.appendChild(img);
            photoGrid.appendChild(photoItem);
        });
    });

    // 添加音乐播放控制
    const logo = document.querySelector('.logo');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    logo.addEventListener('click', function() {
        if (!isPlaying) {
            bgMusic.play();
            isPlaying = true;
        } else {
            bgMusic.pause();
            bgMusic.currentTime = 0; // 重置播放位置
            isPlaying = false;
        }
    });
}); 