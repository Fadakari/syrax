<template>
  <section class="py-24 bg-white border-b border-gray-100 relative overflow-hidden" dir="rtl" ref="sectionRef">
    
    <div class="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
      
      <div class="flex flex-col xl:flex-row gap-16 items-center xl:items-stretch">
        
        <!-- Right Side: Title Block -->
        <div class="w-full xl:w-[25%] flex flex-col justify-center xl:pr-4 transition-all duration-1000 ease-out"
             :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'">
          
          <div class="inline-block px-3 py-1 mb-4 text-xs font-bold text-[#C5162E] bg-red-50 uppercase tracking-[0.2em] font-en w-max border border-red-100">
            Journal
          </div>

          <h2 class="text-4xl lg:text-5xl font-black text-[#0B0D10] leading-tight mb-8 tracking-tighter accent-slash inline-block">
            آخرین<br/>مقالات
          </h2>

          <p class="text-gray-500 font-bold text-sm leading-relaxed mb-10 border-r-2 border-gray-200 pr-4">
            دانش، تکنیک‌ها و اخبار دنیای هنرهای رزمی و تناسب اندام را از مربیان سایراکس بیاموزید.
          </p>
          
          <div>
            <NuxtLink to="/blog" class="group relative inline-flex items-center justify-center bg-transparent border-2 border-[#0B0D10] text-[#0B0D10] px-8 py-3.5 font-bold text-sm transition-all overflow-hidden hover:border-[#C5162E] hover:text-white shadow-[4px_4px_0px_0px_rgba(11,13,16,1)] hover:shadow-[6px_6px_0px_0px_rgba(197,22,46,1)] hover:-translate-y-1">
              <span class="relative z-10">مشاهده همه مقالات</span>
              <div class="absolute inset-0 w-full h-full bg-[#C5162E] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></div>
            </NuxtLink>
          </div>
        </div>

        <!-- Left Side: 3 Blog Cards -->
        <div class="w-full xl:w-[75%] grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          <div 
            v-for="(post, index) in posts" 
            :key="post.title"
            class="group flex flex-col transition-all duration-700 ease-out cursor-pointer hover:-translate-y-2"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'"
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            <!-- Image Container -->
            <div class="relative w-full aspect-[4/3] overflow-hidden bg-gray-200 mb-6 clip-blog-img shadow-sm group-hover:shadow-xl transition-shadow duration-500">
              <img :src="post.image" :alt="post.title" class="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110">
              
              <!-- Red overlay tint on hover -->
              <div class="absolute inset-0 bg-[#C5162E]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <!-- Category Tag (Slides in on hover) -->
              <div class="absolute bottom-0 right-0 bg-[#C5162E] text-white px-5 py-2 text-xs font-black tracking-wider shadow-lg transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                {{ post.category }}
              </div>
            </div>
            
            <!-- Meta Data (Date & Reading Time) -->
            <div class="flex items-center gap-4 text-gray-400 text-xs font-bold mb-3">
              <div class="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300 group-hover:text-[#C5162E] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{{ post.date }}</span>
              </div>
              <span class="text-gray-300">|</span>
              <div class="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300 group-hover:text-[#C5162E] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ post.readTime }}</span>
              </div>
            </div>

            <!-- Title -->
            <h3 class="text-[#0B0D10] font-black text-xl mb-4 leading-snug group-hover:text-[#C5162E] transition-colors duration-300 relative inline-block">
              {{ post.title }}
              <!-- Animated underline -->
              <span class="absolute -bottom-2 right-0 w-0 h-[2px] bg-[#C5162E] transition-all duration-300 group-hover:w-full"></span>
            </h3>
            
            <!-- Excerpt -->
            <p class="text-gray-500 text-sm font-bold leading-relaxed mb-6 line-clamp-2">
              {{ post.excerpt }}
            </p>

            <!-- Read More Link -->
            <div class="mt-auto flex items-center gap-2 text-[#0B0D10] font-black text-sm group-hover:text-[#C5162E] transition-colors duration-300">
              <span>ادامه مطلب</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform group-hover:-translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>
            
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const posts = [
  { 
    title: '۵ نکته برای آمادگی ذهنی در مسابقات', 
    category: 'مسابقات', 
    date: '۲۵ فروردین ۱۴۰۳',
    readTime: '۴ دقیقه مطالعه',
    excerpt: 'برای پیروزی در یک مسابقه، قدرت بدن کافی نیست. در این مقاله به ۵ تکنیک حیاتی برای کنترل استرس و افزایش تمرکز می‌پردازیم.',
    image: '/images/blog-1.jpg' 
  },
  { 
    title: 'چگونه استقامت بی‌هوازی خود را افزایش دهیم؟', 
    category: 'آمادگی جسمانی', 
    date: '۲۰ فروردین ۱۴۰۳',
    readTime: '۶ دقیقه مطالعه',
    excerpt: 'تمرینات اینتروال (HIIT) یکی از بهترین روش‌ها برای افزایش استقامت در مبارزات طولانی است. با این برنامه تمرینی شروع کنید.',
    image: '/images/blog-2.jpg' 
  },
  { 
    title: 'اصول پایه‌ در هنر رزمی نینجوتسو', 
    category: 'آموزش', 
    date: '۱۵ فروردین ۱۴۰۳',
    readTime: '۵ دقیقه مطالعه',
    excerpt: 'حرکت در سکوت و استفاده از محیط پیرامون. نینجوتسو فراتر از یک ورزش، یک روش کامل برای هماهنگی با طبیعت است.',
    image: '/images/blog-3.jpg' 
  }
]

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible.value = entry.isIntersecting
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.font-en {
  font-family: system-ui, -apple-system, sans-serif;
}

.accent-slash {
  position: relative;
}
.accent-slash::after {
  content: '';
  position: absolute;
  bottom: -15px;
  right: 0;
  width: 40px;
  height: 3px;
  background-color: #C5162E;
  transform: skewX(-20deg);
}

/* Subtle corner cut for blog images */
.clip-blog-img {
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
