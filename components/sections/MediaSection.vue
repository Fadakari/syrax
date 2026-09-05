<template>
  <section class="py-24 bg-white relative overflow-hidden" dir="rtl" ref="sectionRef">
    
    <!-- Decorative background typography (Outline/Stroke effect) -->
    <div class="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-[10%] text-[150px] lg:text-[250px] font-black font-en pointer-events-none whitespace-nowrap opacity-80"
         style="-webkit-text-stroke: 3px #F3F4F6; color: transparent; z-index: 0;">
      SYRAX MEDIA
    </div>

    <div class="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
      
      <div class="flex flex-col xl:flex-row gap-16 items-center xl:items-stretch">
        
        <!-- Right Side: Title Block -->
        <div class="w-full xl:w-[30%] flex flex-col justify-center xl:pr-4 transition-all duration-1000 ease-out"
             :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'">
          <div class="inline-block px-3 py-1 mb-4 text-xs font-bold text-[#C5162E] bg-red-50 uppercase tracking-[0.2em] font-en border border-red-100 w-max">
            Visual Story
          </div>
          <h2 class="text-4xl lg:text-6xl font-black text-[#0B0D10] leading-tight mb-6 tracking-tighter accent-slash inline-block">
            رسانه و<br/>لحظات
          </h2>
          <p class="text-gray-500 font-bold text-sm leading-relaxed mb-10 border-r-2 border-gray-200 pr-4">
            ثبت لحظاتی از تمرینات سخت، مسابقات نفس‌گیر و رویدادهای سایراکس. قاب‌هایی از اراده و پیروزی.
          </p>
          <div>
            <NuxtLink to="/media" class="group relative inline-flex items-center justify-center bg-transparent border-2 border-[#0B0D10] text-[#0B0D10] px-8 py-3.5 font-bold text-sm transition-all overflow-hidden hover:border-[#C5162E] hover:text-white hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(11,13,16,1)] hover:shadow-[6px_6px_0px_0px_rgba(197,22,46,1)]">
              <span class="relative z-10">مشاهده گالری کامل</span>
              <div class="absolute inset-0 w-full h-full bg-[#C5162E] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
            </NuxtLink>
          </div>
        </div>

        <!-- Left Side: Dynamic Asymmetrical Gallery -->
        <div class="w-full xl:w-[70%] h-[600px] grid grid-cols-12 grid-rows-6 gap-3 md:gap-4">
          
          <!-- Box 1 (Large Main Image) -->
          <div 
            class="col-span-12 md:col-span-7 row-span-3 md:row-span-4 overflow-hidden bg-gray-200 group relative cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 ease-out hover:z-20"
            :class="isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'"
            style="transition-delay: 100ms;"
            @click="openLightbox('/images/gallery-1.jpg')"
          >
            <img src="/images/gallery-1.jpg" alt="Gallery 1" class="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <span class="text-white font-black text-xl flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#C5162E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
                بزرگنمایی
              </span>
            </div>
          </div>

          <!-- Box 2 (Top Right Small) -->
          <div 
            class="col-span-6 md:col-span-5 row-span-2 md:row-span-2 overflow-hidden bg-gray-200 group relative cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 ease-out hover:z-20 md:-mt-6"
            :class="isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'"
            style="transition-delay: 200ms;"
            @click="openLightbox('/images/gallery-2.jpg')"
          >
            <img src="/images/gallery-2.jpg" alt="Gallery 2" class="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110">
            <div class="absolute inset-0 bg-[#C5162E]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white transform scale-50 group-hover:scale-100 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>

          <!-- Box 3 (Middle Right Wide) -->
          <div 
            class="col-span-6 md:col-span-5 row-span-2 md:row-span-2 overflow-hidden bg-gray-200 group relative cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 ease-out hover:z-20 md:-ml-8 z-10"
            :class="isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'"
            style="transition-delay: 300ms;"
            @click="openLightbox('/images/gallery-3.jpg')"
          >
            <div class="absolute top-0 right-0 w-full h-1 bg-[#C5162E] z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img src="/images/gallery-3.jpg" alt="Gallery 3" class="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110">
            <div class="absolute inset-0 bg-[#0B0D10]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <span class="text-white font-bold tracking-widest text-sm uppercase">View</span>
            </div>
          </div>

          <!-- Box 4 (Bottom Left Tall) -->
          <div 
            class="col-span-6 md:col-span-4 row-span-3 md:row-span-2 overflow-hidden bg-gray-200 group relative cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 ease-out hover:z-20 md:-mt-8 lg:mt-0 z-10"
            :class="isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'"
            style="transition-delay: 400ms;"
            @click="openLightbox('/images/gallery-4.jpg')"
          >
            <img src="/images/gallery-4.jpg" alt="Gallery 4" class="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110">
            <div class="absolute inset-0 bg-[#C5162E]/70 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>

          <!-- Box 5 (Bottom Right Wide) -->
          <div 
            class="col-span-6 md:col-span-8 row-span-2 md:row-span-2 overflow-hidden bg-gray-200 group relative cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 ease-out hover:z-20 md:mb-6"
            :class="isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'"
            style="transition-delay: 500ms;"
            @click="openLightbox('/images/gallery-5.jpg')"
          >
            <img src="/images/gallery-5.jpg" alt="Gallery 5" class="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/90 via-[#0B0D10]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="absolute top-1/2 right-8 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-8 group-hover:translate-x-0 text-right">
              <span class="block text-white font-black text-2xl mb-1">مسابقات کشوری</span>
              <span class="block text-[#C5162E] font-bold text-sm">بزرگنمایی تصویر</span>
            </div>
          </div>

        </div>

      </div>

    </div>

    <!-- Lightbox Modal (Fullscreen Image Viewer) -->
    <transition name="fade">
      <div 
        v-if="selectedImage" 
        class="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0D10]/95 backdrop-blur-md"
        @click="closeLightbox"
      >
        <!-- Close Button -->
        <button 
          class="absolute top-6 right-6 text-white hover:text-[#C5162E] bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50"
          @click.stop="closeLightbox"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <!-- Image Container -->
        <div class="relative w-full max-w-5xl h-full max-h-[80vh] p-4 flex items-center justify-center" @click.stop>
          <img 
            :src="selectedImage" 
            alt="Gallery Preview" 
            class="max-w-full max-h-full object-contain shadow-2xl rounded-sm border border-gray-800"
          >
        </div>
        
        <!-- Hint Text -->
        <p class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 font-bold text-sm tracking-widest font-en uppercase pointer-events-none">
          Click anywhere to close
        </p>
      </div>
    </transition>

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

// Lightbox state
const selectedImage = ref<string | null>(null)

const openLightbox = (imgSrc: string) => {
  selectedImage.value = imgSrc
  // Prevent background scrolling
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  selectedImage.value = null
  // Restore background scrolling
  document.body.style.overflow = ''
}

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
  // Ensure scroll is restored if component unmounts while modal is open
  document.body.style.overflow = ''
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

/* Lightbox Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
