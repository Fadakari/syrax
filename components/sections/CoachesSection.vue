<template>
  <section id="coaches" class="py-24 bg-bone relative" dir="rtl" ref="sectionRef">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      
      <!-- Header -->
      <div 
        :class="['text-center mb-20 transition-all duration-1000 ease-out',
                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']"
      >
        <span class="text-accent font-black tracking-[0.3em] text-[10px] md:text-xs uppercase font-en">Leadership</span>
        <br>
        <h2 class="text-3xl md:text-5xl font-black text-obsidian mt-2 accent-slash inline-block tracking-tighter">تیم رهبری و مربیان</h2>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <!-- Coach Card -->
        <div 
          v-for="(coach, index) in coaches" 
          :key="coach.name" 
          class="group cursor-pointer flex flex-col"
          :style="{ transitionDelay: `${index * 150}ms` }"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12', 'transition-all duration-700 ease-out'"
        >
          <div class="relative overflow-hidden mb-6 btn-sharp bg-obsidian shadow-lg">
            <img 
              :src="coach.image" 
              :alt="coach.name" 
              class="w-full h-[400px] object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              loading="lazy"
            >
            <!-- Overlay Gradient for moody feel -->
            <div class="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"></div>
            
            <!-- Floating Social Icons on Hover -->
            <div class="absolute bottom-6 right-6 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <div class="w-10 h-10 bg-accent text-white flex items-center justify-center btn-sharp shadow-lg hover:bg-white hover:text-accent transition-colors duration-300">
                <!-- Instagram Icon -->
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.88z"/></svg>
              </div>
            </div>
          </div>
          
          <h3 class="text-2xl font-black text-obsidian mb-1 tracking-tight">{{ coach.name }}</h3>
          <p class="text-accent font-bold mb-4 text-sm">{{ coach.role }}</p>
          <p class="text-coolgray text-sm leading-relaxed font-bold">{{ coach.bio }}</p>
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

const coaches = [
  {
    name: 'سنسی سعید احمدی',
    role: 'بنیان‌گذار و سرمربی',
    bio: 'دارای دان ۵ نینجوتسو، مربی رسمی فدراسیون با بیش از ۱۵ سال سابقه آموزش حرفه‌ای و قهرمان اسبق مسابقات کشوری.',
    image: '/images/coach-1.jpg'
  },
  {
    name: 'سنسی محمد کریمی',
    role: 'مربی ارشد کامبت و سلاح',
    bio: 'متخصص درگیری‌های نزدیک و سلاح‌های سرد، مسئول آموزش تیم‌های عملیاتی و بادیگاردی.',
    image: '/images/coach-2.jpg'
  },
  {
    name: 'سنسی رضا طاهری',
    role: 'مربی آکروبات و فیتنس',
    bio: 'متخصص آماده‌سازی جسمانی، تمرینات فانکشنال و حرکات نمایشی پیشرفته ویژه مسابقات.',
    image: '/images/coach-3.jpg'
  }
]

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true
      if (sectionRef.value && observer) {
        observer.unobserve(sectionRef.value)
      }
    }
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
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

.btn-sharp {
  border-radius: 0;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%);
}

.accent-slash {
  position: relative;
}
.accent-slash::after {
  content: '';
  position: absolute;
  bottom: -10px;
  right: 0;
  width: 40px;
  height: 5px;
  background-color: #C5162E;
  transform: skewX(-20deg);
}
</style>
