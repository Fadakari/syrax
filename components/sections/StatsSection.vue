<template>
  <section class="relative bg-[#0B0D10] overflow-hidden border-t border-gray-900" dir="rtl" ref="sectionRef">
    
    <!-- Decorative faint grid -->
    <div class="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

    <div class="max-w-[1400px] mx-auto px-6 lg:px-8">
      
      <div class="flex flex-col-reverse lg:flex-row items-center justify-between min-h-[300px]">
        
        <!-- Right Side: Stats (Takes up ~60% on desktop) -->
        <div class="w-full lg:w-[60%] grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-12 py-16 z-10 relative">
          <div 
            v-for="(stat, index) in stats" 
            :key="stat.label"
            class="group flex flex-col items-center justify-center text-center transition-all duration-700 ease-out cursor-default"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            <!-- Glowing background on hover -->
            <div class="absolute inset-0 bg-[#C5162E]/0 group-hover:bg-[#C5162E]/5 rounded-2xl transition-colors duration-500 blur-xl pointer-events-none -z-10"></div>
            
            <div class="flex items-center text-4xl lg:text-5xl font-black font-en tracking-tighter mb-3 transition-transform duration-500 group-hover:scale-110">
              <span class="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-500">
                {{ displayStats[index] }}
              </span>
              <span class="text-[#C5162E] ml-1 transform transition-transform duration-500 group-hover:rotate-90 group-hover:scale-125 inline-block">+</span>
            </div>
            
            <p class="text-gray-400 text-xs sm:text-sm font-bold w-[90%] mx-auto transition-colors duration-300 group-hover:text-gray-200">
              {{ stat.label }}
            </p>

            <!-- Subtle red line underneath that expands -->
            <div class="w-0 h-[2px] bg-[#C5162E] mt-4 transition-all duration-500 ease-out group-hover:w-8 rounded-full opacity-0 group-hover:opacity-100"></div>
          </div>
        </div>

        <!-- Left Side: Image blending into background -->
        <div class="w-full lg:w-[40%] h-[250px] lg:h-[300px] relative lg:absolute lg:top-0 lg:left-0 overflow-hidden">
          <div class="w-full h-full relative fade-img-left">
            <img 
              src="/images/stats-bg.jpg" 
              alt="Syrax Victory" 
              class="w-full h-full object-cover object-center grayscale transition-transform duration-[10000ms] ease-out"
              :class="isVisible ? 'scale-110 opacity-70' : 'scale-100 opacity-0'"
            >
            <!-- Dark overlay to ensure it blends nicely with the background -->
            <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/80 via-transparent to-transparent mix-blend-multiply"></div>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const isVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const stats = [
  { target: 120, label: 'مدال کشوری و بین‌المللی' },
  { target: 35, label: 'مربی و دستیار متخصص' },
  { target: 850, label: 'ورزشکار فعال' },
  { target: 7, label: 'سال تجربه حرفه‌ای' }
]

const displayStats = ref(stats.map(() => 0))
let animationFrameId: number | null = null

const animateNumbers = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  
  const duration = 2000 // 2 seconds
  const start = performance.now()
  
  const update = (time: number) => {
    const elapsed = time - start
    const progress = Math.min(elapsed / duration, 1)
    
    // easeOutExpo for a very satisfying snap at the end
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
    
    displayStats.value = stats.map(stat => Math.floor(stat.target * easeProgress))
    
    if (progress < 1) {
      animationFrameId = requestAnimationFrame(update)
    }
  }
  
  animationFrameId = requestAnimationFrame(update)
}

watch(isVisible, (newVal) => {
  if (newVal) {
    animateNumbers()
  } else {
    // Optional: Reset numbers to 0 when out of view so they count up again
    displayStats.value = stats.map(() => 0)
    if (animationFrameId) cancelAnimationFrame(animationFrameId)
  }
})

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
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style scoped>
.font-en {
  font-family: system-ui, -apple-system, sans-serif;
}

/* 
  Fades the right side of the image into the black background 
  (in RTL layout, the image is on the left, so we fade its right edge).
*/
@media (min-width: 1024px) {
  .fade-img-left {
    mask-image: linear-gradient(to right, black 50%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, black 50%, transparent 100%);
  }
}
</style>
