import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 注册插件
gsap.registerPlugin(ScrollTrigger);

// 页面加载动画
export function initPageAnimations() {
  // Hero 区域动画已经在 CSS 中实现
  // 这里可以添加额外的动画效果
}

// 卡片入场动画
export function initCardAnimations() {
  gsap.utils.toArray('.card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      duration: 0.8,
      y: 50,
      opacity: 0,
      delay: i * 0.1,
      ease: 'power2.out'
    });
  });
}

// 滚动视差效果
export function initParallaxEffect() {
  // Hero 区域视差
  gsap.to('.hero', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 100,
    opacity: 0.5
  });

  // 装饰圆圈视差
  gsap.to('.circle-1', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: -50,
    x: 30
  });

  gsap.to('.circle-2', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: -30,
    x: -20
  });

  gsap.to('.circle-3', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: -40
  });
}

// 统计数字动画
export function initStatsAnimation() {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = parseInt(stat.textContent) || 0;
    if (target === 0) return; // 跳过非数字
    
    gsap.from(stat, {
      scrollTrigger: {
        trigger: stat,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      duration: 1.5,
      textContent: 0,
      snap: { textContent: 1 },
      ease: 'power2.out'
    });
  });
}

// 标签悬停动画
export function initTagAnimations() {
  const tags = document.querySelectorAll('.card-tag');
  
  tags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      gsap.to(tag, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    tag.addEventListener('mouseleave', () => {
      gsap.to(tag, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
}

// 链接悬停动画
export function initLinkAnimations() {
  const links = document.querySelectorAll('.card-link');
  
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
}

// 初始化所有动画
export function initAllAnimations() {
  initPageAnimations();
  initCardAnimations();
  initParallaxEffect();
  initStatsAnimation();
  initTagAnimations();
  initLinkAnimations();
}
