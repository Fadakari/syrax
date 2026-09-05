<template>
  <section class="py-24 bg-[#F5F5F2] border-b border-gray-200 relative overflow-hidden" dir="rtl" ref="sectionRef">
    
    <!-- Massive decorative quote mark in background -->
    <div class="absolute top-1/2 right-1/4 transform -translate-y-1/2 opacity-[0.03] text-[#0B0D10] pointer-events-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-96 h-96 transform scale-x-[-1]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.017 21v-7.391c0-5.714 4.029-7.55 8.983-8.109l.995 2.151c-2.433.917-3.996 3.635-3.996 5.849h4v10h-9.982zm-14.017 0v-7.391c0-5.714 4.029-7.55 8.983-8.109l.995 2.151c-2.433.917-3.996 3.635-3.996 5.849h4v10h-9.982z" />
      </svg>
    </div>

    <div class="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
      
      <div class="flex flex-col xl:flex-row gap-16 items-center xl:items-stretch">
        
        <!-- Right Side: Title Block -->
        <div class="w-full xl:w-[25%] flex flex-col justify-center xl:pr-4 transition-all duration-1000 ease-out"
             :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'">
          
          <div class="inline-block px-3 py-1 mb-4 text-xs font-bold text-[#0B0D10] bg-gray-200 uppercase tracking-widest font-en w-max border border-gray-300">
            Reviews
          </div>

          <h2 class="text-4xl lg:text-5xl font-black text-[#0B0D10] leading-tight mb-8 tracking-tighter accent-slash inline-block">
            نظرات<br/>ورزشکاران
          </h2>

          <!-- Carousel Controls (Desktop and Mobile) -->
          <div class="flex items-center gap-4 mt-4">
            <button 
              @click="prevSlide" 
              class="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 hover:text-[#C5162E] hover:border-[#C5162E] hover:bg-white transition-all transform hover:-translate-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button 
              @click="nextSlide" 
              class="w-12 h-12 rounded-full border-2 border-[#0B0D10] bg-[#0B0D10] flex items-center justify-center text-white hover:bg-[#C5162E] hover:border-[#C5162E] transition-all transform hover:-translate-x-1 shadow-lg hover:shadow-red-500/30"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Left Side: Quote Carousel -->
        <div class="w-full xl:w-[75%] relative min-h-[300px] flex items-center transition-all duration-1000 delay-300 ease-out"
             :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'">
             
          <transition-group name="slide-fade" tag="div" class="relative w-full h-full flex items-center">
            <div 
              v-for="(quote, index) in quotes" 
              :key="quote.id"
              v-show="currentIndex === index"
              class="absolute top-1/2 transform -translate-y-1/2 w-full flex flex-col xl:pl-20"
            >
              <!-- Small Quote Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-[#C5162E] mb-6 transform scale-x-[-1]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.714 4.029-7.55 8.983-8.109l.995 2.151c-2.433.917-3.996 3.635-3.996 5.849h4v10h-9.982zm-14.017 0v-7.391c0-5.714 4.029-7.55 8.983-8.109l.995 2.151c-2.433.917-3.996 3.635-3.996 5.849h4v10h-9.982z" />
              </svg>
              
              <p class="text-2xl md:text-4xl font-black text-[#0B0D10] leading-[1.6] mb-10 tracking-tight">
                "{{ quote.text }}"
              </p>
              
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full bg-gray-300 overflow-hidden border-2 border-white shadow-md">
                  <img :src="quote.avatar" :alt="quote.author" class="w-full h-full object-cover">
                </div>
                <div class="flex flex-col">
                  <div class="flex items-center gap-2">
                    <span class="text-[#0B0D10] font-black text-lg">{{ quote.author }}</span>
                    <span class="text-[#C5162E] font-bold text-lg">/</span>
                  </div>
                  <span class="text-gray-500 font-bold text-sm">{{ quote.role }}</span>
                </div>
              </div>
            </div>
          </transition-group>
          
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

// Carousel Logic
const currentIndex = ref(0)
const quotes = [
  {
    id: 1,
    text: 'سایراکس فقط یک باشگاه نیست. یک سبک زندگیه. اینجا یاد گرفتم کنترل ذهن و بدنم رو به دست بگیرم.',
    author: 'رضا حسینی',
    role: 'عضو تیم مسابقات',
    avatar: 'https://i.pravatar.cc/150?u=reza'
  },
  {
    id: 2,
    text: 'تکنیک‌هایی که اینجا یاد گرفتم، نه تنها در ورزش، بلکه در تمام چالش‌های زندگی کمکم کرده است.',
    author: 'سارا احمدی',
    role: 'ورزشکار سطح پیشرفته',
    avatar: 'https://i.pravatar.cc/150?u=sara'
  },
  {
    id: 3,
    text: 'محیط حرفه‌ای و مربیان دلسوز سایراکس، بهترین تجربه‌ی تمرینی من تا به امروز بوده است.',
    author: 'امیرعلی کریمی',
    role: 'عضو جدید',
    avatar: 'https://i.pravatar.cc/150?u=amir'
  }
]

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % quotes.length
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? quotes.length - 1 : currentIndex.value - 1
}

// Auto-play (Optional, we'll keep it manual for better UX based on arrows)

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible.value = entry.isIntersecting
    })
  }, {
    threshold: 0.2,
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

/* Slide Fade Transition for Carousel */
.slide-fade-enter-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(-40px) translateY(-50%);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(40px) translateY(-50%);
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateX(0) translateY(-50%);
}
</style>
