<template>
  <section 
    class="relative bg-white min-h-screen flex items-center pt-20 overflow-hidden" 
    dir="rtl" 
    ref="sectionRef"
  >
    
    <!-- Background Grid / Texture (Subtle) -->
    <div class="absolute inset-0 z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30"></div>

    <!-- Floating Particles (Creative touch) -->
    <div class="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-[#C5162E] blur-[1px] opacity-60 animate-float-slow z-0"></div>
    <div class="absolute top-1/3 left-1/3 w-2 h-2 rounded-full bg-[#0B0D10] blur-[1px] opacity-40 animate-float-fast z-0"></div>
    <div class="absolute bottom-1/4 right-1/3 w-4 h-4 rounded-full bg-[#C5162E] blur-[2px] opacity-30 animate-float-medium z-0"></div>

    <!-- Image Background Wrapper (Left Side) -->
    <div 
      class="absolute top-0 left-0 w-full h-full lg:w-[60%] z-0 transition-all duration-[1500ms] ease-out transform origin-left"
      :class="isVisible ? 'opacity-60 lg:opacity-100' : 'opacity-0'"
    >
      <div class="w-full h-full relative lg:[clip-path:polygon(0_0,100%_0,75%_100%,0_100%)]">
        <!-- The actual image with a slow zoom effect -->
        <img 
          src="/images/hero-light.jpg" 
          alt="Syrax Ninja" 
          class="w-full h-full object-cover object-center grayscale transition-transform duration-[10000ms] ease-linear"
          :class="isVisible ? 'opacity-100' : 'opacity-0'"
        >
        <!-- Dark Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/80 via-[#0B0D10]/40 to-transparent mix-blend-multiply"></div>
      </div>
    </div>

    <!-- Content (Right Side) -->
    <div class="relative z-10 max-w-[1400px] w-full mx-auto px-6 lg:px-8">
      <div class="max-w-2xl text-center lg:text-right flex flex-col items-center lg:items-start">
        
        <!-- Badge -->
        <div 
          class="inline-block px-4 py-1.5 mb-6 text-sm font-bold text-white bg-[#0B0D10] uppercase tracking-[0.2em] font-en transition-all duration-700 ease-out"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          style="transition-delay: 100ms;"
        >
          Premium Dojo
        </div>

        <!-- Main Title -->
        <h1 class="text-5xl md:text-7xl font-black text-[#0B0D10] leading-[1.1] tracking-tighter mb-4 flex flex-col">
          <span 
            class="block transition-all duration-700 ease-out lg:w-[80%] w-[100%]"
            :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'"
            style="transition-delay: 300ms;"
          >
            بی‌رحم در تمرین،
          </span>
          <span 
            class="block text-transparent pb-2 bg-clip-text bg-gradient-to-r from-[#C5162E] to-red-800 transition-all duration-700 ease-out"
            :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'"
            style="transition-delay: 500ms;"
          >
            قهرمان در میدان.
          </span>
        </h1>
        
        <p 
          class="text-md md:text-xl text-gray-500 font-bold mb-10 max-w-xl leading-relaxed transition-all duration-700 ease-out"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          style="transition-delay: 700ms;"
        >
          سایراکس فراتر از یک باشگاه است؛ اینجا محل پرورش جنگجویان مدرن است. با متدهای انحصاری، قدرت درون خود را بیدار کنید و به بهترین نسخه خود تبدیل شوید.
        </p>
        
        <!-- Buttons -->
        <div 
          class="flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
          style="transition-delay: 900ms;"
        >
          <NuxtLink to="/register" class="group relative overflow-hidden bg-[#0B0D10] text-white px-8 py-4 font-bold text-sm flex items-center justify-center gap-3 transition-transform hover:-translate-y-1 shadow-lg">
            <span class="relative z-10">شروع ماجراجویی</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 relative z-10 transform transition-transform group-hover:-translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <div class="absolute inset-0 h-full w-full bg-[#C5162E] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
          </NuxtLink>
          
          <NuxtLink to="/classes" class="group bg-transparent border-2 border-gray-300 text-[#0B0D10] px-8 py-4 font-bold text-sm flex items-center justify-center transition-all hover:border-[#0B0D10] hover:bg-gray-50">
            مشاهده دوره‌ها
          </NuxtLink>
        </div>

      </div>
    </div>

    <!-- Scroll Down Indicator -->
    <div 
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 scale-0 lg:scale-100 flex flex-col items-center gap-2 transition-all duration-1000 ease-in-out"
      :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
      style="transition-delay: 1200ms;"
    >
      <span class="text-[10px] font-bold text-gray-400 font-en uppercase tracking-widest">Scroll</span>
      <div class="w-[2px] h-12 bg-gray-200 overflow-hidden">
        <div class="w-full h-1/2 bg-[#C5162E] animate-scroll-drop"></div>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  // Using IntersectionObserver to trigger animation EVERY TIME the section enters/leaves the viewport
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // Toggle visibility based on whether it's intersecting
      isVisible.value = entry.isIntersecting
    })
  }, {
    // 0.1 threshold means animation triggers when 10% of the section is visible
    threshold: 0.5
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

/* Animations for Floating Particles */
@keyframes float {
  0% { transform: translateY(0px) translateX(0px); }
  50% { transform: translateY(-20px) translateX(10px); }
  100% { transform: translateY(0px) translateX(0px); }
}

.animate-float-slow {
  animation: float 6s ease-in-out infinite;
}
.animate-float-medium {
  animation: float 4s ease-in-out infinite;
  animation-delay: -2s;
}
.animate-float-fast {
  animation: float 3s ease-in-out infinite;
  animation-delay: -1s;
}

/* Scroll down line drop animation */
@keyframes scrollDrop {
  0% { transform: translateY(-100%); }
  50% { transform: translateY(100%); }
  100% { transform: translateY(100%); }
}

.animate-scroll-drop {
  animation: scrollDrop 1.5s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}
</style>