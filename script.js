
// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 移动端菜单切换
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    renderNews();
});

// 视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// 修改滚轮滑动功能
document.addEventListener('DOMContentLoaded', () => {
    const taleWindow = document.querySelector('.tale-window');
    const slider = document.querySelector('.tale-grid');
    const cards = document.querySelectorAll('.tale-card');
    const progressBar = document.querySelector('.tale-progress-bar');
    const progressContainer = document.querySelector('.tale-progress');
    let currentIndex = 0;

    // 更新滑动位置的函数
    const updateSliderPosition = (index) => {
        const totalCards = cards.length;
        const maxIndex = totalCards - 3; // 一次显示3张卡片
        
        // 限制索引范围
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 卡片间距
        const scrollDistance = currentIndex * (cardWidth + gap);
        
        // 平滑滑动效果
        slider.style.transition = 'transform 0.3s ease';
        slider.style.transform = `translateX(-${scrollDistance}px)`;
        
        // 更新进度条
        const progress = (currentIndex / maxIndex) * 100;
        progressBar.style.transform = `translateX(${progress}%)`;
    };

    // 鼠标滚轮事件
    let isHovered = false;

    // 鼠标进入滑动窗口
    taleWindow.addEventListener('mouseenter', () => {
        isHovered = true;
    });

    // 鼠标离开滑动窗口
    taleWindow.addEventListener('mouseleave', () => {
        isHovered = false;
    });

    // 滚轮事件
    window.addEventListener('wheel', (e) => {
        if (!isHovered) return; // 只在鼠标悬停时处理滚动

        e.preventDefault(); // 阻止默认滚动
        
        // 根据滚动方向决定是前进还是后退
        if (e.deltaY > 0) {
            // 向下滚动，前进一个卡片
            updateSliderPosition(currentIndex + 1);
        } else {
            // 向上滚动，后退一个卡片
            updateSliderPosition(currentIndex - 1);
        }
    }, { passive: false });

    // 进度条点击事件
    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const maxIndex = cards.length - 3;
        const newIndex = Math.round((x / rect.width) * maxIndex);
        updateSliderPosition(newIndex);
    });

    // 初始化位置
    updateSliderPosition(0);
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    
    let currentIndex = 0;
    const slidesToShow = 3;
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    // 设置slide位置
    slides.forEach((slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    });
    
    const moveToSlide = (currentIndex) => {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    };
    
    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - slidesToShow) {
            currentIndex++;
            moveToSlide(currentIndex);
        }
    });
    
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            moveToSlide(currentIndex);
        }
    });
}); 