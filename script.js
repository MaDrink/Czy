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
    const slidesToShow = 3;
    const slideWidth = slides[0].getBoundingClientRect().width;
    
    const gap = 10; // 设置间距为20px

    // 设置slide位置，把每个slide的位置设置为：幻灯片的宽度乘以index 并转化成px单位
    //slides.forEach((slide, index) => {
        //slide.style.left = (slideWidth * index + gap * index) + 'px';
    //}); 直接从css样式写入
    // 设置幻灯片的容器移动到下一个幻灯片的函数 传入参数是一个索引
    // 通过 style 属性可以动态地修改元素的 CSS 样式，transform 是 CSS 中的一个属性，用于对元素进行 2D 或 3D 变换，比如移动、旋转、缩放等
    // 通过移动track来达到作品移动的目的，二者移动方向相反时效果相同
    // 负值表示左移，translateX接收一个字符串参数(有效的 CSS 长度值（如像素 px、百分比 %、em 等)
    // 反引号和${}表示模板字符串可以直接计算
    // 注意，每次偏移量都是从初始值计算(偏移量不保存只用来显示页面)，所以左移多算一个长度，右移少算一个长度
    const moveToSlide = (currentIndex) => {
        track.style.transform = `translateX(-${currentIndex * (slideWidth + gap)}px)`;
    };
    // 给按钮添加移动到下一个幻灯片的事件，检测是否越界，计算应该的偏移量，进行偏移
    nextButton.addEventListener('click', () => {
        if (currentIndex < slides.length - slidesToShow) {
            currentIndex++;
            moveToSlide(currentIndex);
        }
    });
    // 给按钮添加移动到上一个幻灯片的事件
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            moveToSlide(currentIndex);
        }
    });
}); 