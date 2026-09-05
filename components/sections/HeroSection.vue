<template>
  <section 
    class="relative min-h-[100dvh] flex items-center justify-center overflow-hidden" 
    dir="rtl" 
    ref="heroRef"
  >
    
    <!-- Dynamic Parallax Background -->
    <div 
      class="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
      :style="{
        backgroundImage: `url('https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2070&auto=format&fit=crop')`,
        transform: `translateY(${scrollY * 0.4}px) scale(${1 + scrollY * 0.0005})`,
        transformOrigin: 'top center'
      }"
    ></div>
    
    <!-- Dark Gradient Overlay for perfect contrast and brand feel -->
    <div class="absolute inset-0 z-1 bg-gradient-to-b from-obsidian/90 via-obsidian/70 to-obsidian/95 pointer-events-none"></div>
    
    <div class="relative z-10 text-center px-6 max-w-5xl mx-auto pt-32 pb-28 w-full flex flex-col items-center justify-center min-h-[100dvh]">
      
      <!-- Animated SVG Logo -->
      <div 
        :class="['mb-8 flex justify-center transition-all duration-1000 ease-out', 
                 isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90']"
      >
        <svg class="w-20 h-20 md:w-28 md:h-28 drop-shadow-[0_0_30px_rgba(197,22,46,0.15)]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M75 20L35 55L45 55L25 80L65 45L55 45L75 20Z" fill="#F5F5F2" />
            <path d="M42 55L68 45L62 55H42Z" fill="#C5162E"/>
        </svg>
      </div>

      <!-- Super Title (English Accent for Premium Feel) -->
      <div 
        :class="['mb-6 overflow-hidden transition-all duration-1000 delay-300 ease-out',
                 isVisible ? 'opacity-100' : 'opacity-0']"
      >
        <span class="inline-block text-accent font-black tracking-[0.3em] text-[10px] md:text-xs uppercase font-en">
          Elite Martial Arts Academy
        </span>
      </div>
      
      <!-- Standardized Main Title -->
      <h1 
        :class="['text-4xl md:text-5xl lg:text-6xl font-black text-bone mb-6 tracking-tighter leading-[1.2] transition-all duration-1000 delay-500 ease-out', 
                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
      >
        دقت. <span class="text-accent">انضباط.</span> پیروزی.
      </h1>
      
      <!-- Powerful Description -->
      <p 
        :class="['text-base md:text-xl text-bone/80 font-bold mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ease-out', 
                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
      >
        سایراکس تنها یک باشگاه ورزشی نیست؛ یک مکتب انسان‌سازی است. ما با استانداردهای جهانی، شما را برای سخت‌ترین نبردهای زندگی آماده می‌کنیم.
      </p>
      
      <!-- Call to Actions -->
      <div 
        :class="['flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-1000 ease-out w-full sm:w-auto', 
                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']"
      >
        <NuxtLink to="/contact" class="bg-accent text-white px-8 py-4 font-black text-base btn-sharp hover:bg-accent/90 shadow-[0_0_40px_-10px_rgba(197,22,46,0.5)] w-full sm:w-auto transition-all flex items-center justify-center gap-3 group">
          شروع مسیر قهرمانی
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </NuxtLink>
        <NuxtLink to="/about" class="bg-transparent border border-bone/20 text-bone px-8 py-4 font-black text-base btn-sharp hover:border-bone hover:bg-bone hover:text-obsidian w-full sm:w-auto transition-all flex items-center justify-center">
          آشنایی با سیستم سایراکس
        </NuxtLink>
      </div>
    </div>
    
    <!-- Seamless blend gradient into the next section -->
    <div class="absolute bottom-0 left-0 right-0 h-[10%] bg-gradient-to-t from-bone to-transparent z-20 pointer-events-none"></div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const scrollY = ref(0)
const heroRef = ref<HTMLElement | null>(null)

const handleScroll = () => {
  if (heroRef.value && window.scrollY < window.innerHeight * 1.5) {
    scrollY.value = window.scrollY
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  
  // Trigger animations shortly after component mounts
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.font-en {
  font-family: system-ui, -apple-system, sans-serif;
}

.btn-sharp {
  border-radius: 0;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.btn-sharp:hover {
  transform: translateY(-4px);
}
</style>