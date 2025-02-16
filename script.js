// 平滑滚动  获取每个锚点链接，对每个锚点链接禁用原来的功能，添加点击事件，点击后平滑滚动到对应的元素
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 轮播图功能
//定义一个结构加载完成就执行某个函数的逻辑
//函数：把幻灯片的容器赋值给track，把幻灯片的子元素赋值给slides(转化成数组)，把下一个按钮赋值给nextButton，把上一个按钮赋值给prevButton，
//设置当前的index为0，设置每次显示的幻灯片数为3，设置幻灯片的宽度为第一个幻灯片的宽度，

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');
    
    let currentIndex = 0;
    const slidesToShow = window.innerWidth <= 768 ? 1 : 3;  // 移动端显示1张，桌面端显示3张
    const slideWidth = slides[0].getBoundingClientRect().width;
    const gap = window.innerWidth <= 768 ? 15 : 10;  // 移动端间距15px，桌面端10px
    
    // 更新活动幻灯片的样式
    const updateActiveSlide = () => {
        if (window.innerWidth <= 768) {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                if (index === currentIndex) {
                    slide.classList.add('active');
                }
            });
        }
    };

    const moveToSlide = (currentIndex) => {
        if (window.innerWidth <= 768) {
            // 移动端下的滑动逻辑
            const slideAndGap = slideWidth + gap;
            track.style.transform = `translateX(-${currentIndex * slideAndGap}px)`;
            updateActiveSlide();
        } else {
            // 桌面端下的原有滑动逻辑
            track.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;
        }
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

    // 初始化活动幻灯片
    updateActiveSlide();

    // 监听窗口大小变化
    window.addEventListener('resize', () => {
        // 重新计算滑动距离并更新显示
        moveToSlide(currentIndex);
    });
});

// 汉堡菜单功能
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {  // 确保元素存在
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();  // 阻止默认行为
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            console.log('Hamburger clicked');  // 添加调试日志
        });

        // 点击导航链接后关闭菜单
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});

// 音乐播放控制
document.addEventListener('DOMContentLoaded', function() {
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