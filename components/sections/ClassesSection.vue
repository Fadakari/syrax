<template>
  <section class="py-24 bg-[#0B0D10] relative overflow-hidden" dir="rtl" ref="sectionRef">
    <!-- Subtle background pattern/glow -->
    <div class="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C5162E] via-transparent to-transparent pointer-events-none"></div>

    <div class="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
      
      <div class="flex flex-col xl:flex-row gap-12 items-center xl:items-stretch">
        
        <!-- Right Side: Title Block -->
        <div class="w-full xl:w-[20%] flex flex-col justify-center xl:pr-4 transition-all duration-1000 ease-out"
             :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'">
          <h2 class="text-4xl lg:text-5xl font-black text-white leading-tight mb-6 tracking-tighter accent-slash inline-block">
            تمرینات
          </h2>
          <p class="text-gray-400 font-bold text-sm leading-relaxed mb-10">
            برنامه‌های تخصصی برای سطوح و اهداف مختلف.
          </p>
          <div>
            <NuxtLink to="/classes" class="inline-block bg-transparent border-2 border-gray-600 text-white px-8 py-3 font-bold text-sm text-center hover:border-[#C5162E] hover:bg-[#C5162E] hover:text-white transition-all">
              مشاهده همه تمرینات
            </NuxtLink>
          </div>
        </div>

        <!-- Left Side: 4 Cards -->
        <div class="w-full xl:w-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
          <div 
            v-for="(cls, index) in classes" 
            :key="cls.title"
            class="group relative flex flex-col bg-[#121418] transition-all duration-700 ease-out cursor-pointer hover:-translate-y-2 clip-aggressive-card"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'"
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            <!-- Hover Glow Effect Background -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#C5162E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <!-- Red Top Accent Line -->
            <div class="absolute top-0 left-0 w-full h-1 bg-gray-800 group-hover:bg-[#C5162E] transition-colors duration-500 z-10"></div>

            <!-- Image Area -->
            <div class="relative h-[220px] w-full overflow-hidden">
              <img :src="cls.image" :alt="cls.title" class="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700">
              <!-- Dark gradient overlay from bottom -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#121418] via-[#121418]/60 to-transparent"></div>
              
              <!-- Floating Badge -->
              <div class="absolute top-4 right-4 bg-[#C5162E] text-white px-3 py-1 text-[10px] font-black tracking-widest uppercase font-en transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                PRO
              </div>
            </div>

            <!-- Content Area -->
            <div class="px-6 pb-8 pt-2 flex flex-col flex-1 relative z-10">
              <!-- Move title up into the image area overlapping -->
              <h3 class="text-white font-black text-xl mb-2 mt-[-40px] drop-shadow-md group-hover:text-[#C5162E] transition-colors duration-300">
                {{ cls.title }}
              </h3>
              
              <p class="text-gray-400 text-xs font-bold mb-6 group-hover:text-gray-300 transition-colors">
                {{ cls.level }}
              </p>
              
              <div class="mt-auto flex items-center justify-between w-full text-gray-500 text-[11px] font-bold border-t border-gray-800 pt-4">
                <!-- Days -->
                <div class="flex items-center gap-1.5 group-hover:text-gray-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{{ cls.days }}</span>
                </div>
                <!-- Age -->
                <div class="flex items-center gap-1.5 group-hover:text-gray-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{{ cls.age }}</span>
                </div>
              </div>
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

const classes = [
  { 
    title: 'نینجوتسو', 
    level: 'سطح: مبتدی تا پیشرفته', 
    days: '۳ روز در هفته',
    age: '+۱۰ سال',
    image: '/images/class-1.jpg' 
  },
  { 
    title: 'پارکور و فری‌ران', 
    level: 'سطح: مبتدی تا پیشرفته', 
    days: '۲ روز در هفته',
    age: '+۱۰ سال',
    image: '/images/class-2.jpg' 
  },
  { 
    title: 'جوجیتسو برزیلی', 
    level: 'سطح: مبتدی تا پیشرفته', 
    days: '۳ روز در هفته',
    age: '+۲۰ سال',
    image: '/images/class-3.jpg' 
  },
  { 
    title: 'آمادگی جسمانی', 
    level: 'سطح: همه سطوح', 
    days: '۳ روز در هفته',
    age: '+۱۵ سال',
    image: '/images/class-4.jpg' 
  }
]

onMounted(() => {
  // Repeating entrance animation setup
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

/* 
  Cool aggressive clip-path applied to the ENTIRE CARD, 
  cutting the top-left and bottom-right corners (in LTR).
  In RTL: Top-Right and Bottom-Left corners.
*/
.clip-aggressive-card {
  clip-path: polygon(
    20px 0, 
    100% 0, 
    100% calc(100% - 20px), 
    calc(100% - 20px) 100%, 
    0 100%, 
    0 20px
  );
}
</style>
