<template>
  <header 
    class="fixed top-0 w-full z-50 transition-all duration-500 ease-in-out" 
    :class="[
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white py-4',
      isScrollingDown ? '-translate-y-full' : 'translate-y-0'
    ]"
    dir="rtl"
  >
    <div class="max-w-[1400px] mx-auto px-6 lg:px-8">
      <div class="flex justify-between items-center h-[60px] md:h-[70px]">
        
        <!-- Logo Area (Right side in RTL) -->
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="flex items-center gap-3 group">
            <!-- Custom SVG Logo -->
            <svg class="w-10 h-10 md:w-12 md:h-12 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M75 20L35 55L45 55L25 80L65 45L55 45L75 20Z" fill="#0B0D10" class="transition-colors duration-300 group-hover:fill-[#C5162E]" />
              <path d="M42 55L68 45L62 55H42Z" fill="#C5162E"/>
            </svg>
            <div class="flex flex-col justify-center">
              <span class="font-black text-xl md:text-2xl tracking-[0.15em] uppercase font-en leading-none text-[#0B0D10] transition-colors duration-300">SYRAX</span>
              <span class="text-[10px] md:text-xs font-bold text-gray-500 mt-1.5 leading-none tracking-wide">نینجا سایراکس</span>
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation (Center) -->
        <nav class="hidden lg:flex items-center gap-10">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.name" 
            :to="item.href" 
            class="relative text-[15px] font-bold text-[#0B0D10] hover:text-[#C5162E] transition-colors py-2 group overflow-hidden"
            active-class="text-[#C5162E]"
          >
            {{ item.name }}
            <!-- Active/Hover Underline -->
            <span 
              class="absolute bottom-0 left-0 w-full h-[3px] bg-[#C5162E] transform origin-right transition-transform duration-300 ease-out"
              :class="$route.path === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
            ></span>
          </NuxtLink>
        </nav>

        <!-- CTA Button (Left side in RTL) -->
        <div class="hidden lg:flex items-center">
          <NuxtLink to="/contact" class="group relative overflow-hidden bg-[#C5162E] text-white px-8 py-3.5 font-bold text-sm transition-all duration-300 shadow-[0_4px_14px_0_rgba(197,22,46,0.39)] hover:shadow-[0_6px_20px_rgba(197,22,46,0.23)] hover:-translate-y-0.5 rounded-sm">
            <span class="relative z-10">ثبت نام و مشاوره</span>
            <!-- Button Hover Effect (Shine) -->
            <div class="absolute inset-0 h-full w-full bg-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out z-0"></div>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Hamburger Button -->
        <div class="lg:hidden flex items-center">
          <button 
            @click="mobileMenuOpen = true" 
            class="focus:outline-none p-2 -mr-2 text-[#0B0D10] hover:text-[#C5162E] transition-colors"
            aria-label="Open Menu"
          >
            <!-- Animated Hamburger Icon -->
            <div class="w-6 flex flex-col gap-1.5 items-end">
              <span class="w-6 h-0.5 bg-current transition-all duration-300"></span>
              <span class="w-4 h-0.5 bg-current transition-all duration-300"></span>
              <span class="w-6 h-0.5 bg-current transition-all duration-300"></span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer Overlay -->
    <transition name="fade">
      <div v-if="mobileMenuOpen" @click="mobileMenuOpen = false" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"></div>
    </transition>

    <!-- Mobile Menu Drawer (Slides from Right in RTL) -->
    <transition name="slide-side">
      <div v-if="mobileMenuOpen" class="fixed top-0 right-0 h-screen w-[85%] max-w-sm bg-white z-[70] lg:hidden shadow-2xl flex flex-col">
        
        <!-- Drawer Header -->
        <div class="flex justify-between items-center p-6 border-b border-gray-100">
          <div class="flex items-center gap-2">
            <svg class="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M75 20L35 55L45 55L25 80L65 45L55 45L75 20Z" fill="#0B0D10" />
              <path d="M42 55L68 45L62 55H42Z" fill="#C5162E"/>
            </svg>
            <span class="font-black text-lg tracking-widest uppercase font-en">SYRAX</span>
          </div>
          <button @click="mobileMenuOpen = false" class="p-2 text-gray-400 hover:text-[#C5162E] bg-gray-50 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Drawer Links -->
        <div class="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-2">
          <NuxtLink 
            v-for="(item, index) in menuItems" 
            :key="item.name" 
            :to="item.href" 
            class="flex items-center justify-between py-4 border-b border-gray-50 text-[16px] font-black text-[#0B0D10] hover:text-[#C5162E] transition-colors animate-slide-up-fade"
            active-class="text-[#C5162E]"
            @click="mobileMenuOpen = false"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <span>{{ item.name }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Drawer Footer (Contact/CTA) -->
        <div class="p-6 border-t border-gray-100 bg-gray-50 mt-auto">
          <NuxtLink 
            to="/contact" 
            @click="mobileMenuOpen = false" 
            class="flex items-center justify-center w-full bg-[#C5162E] text-white px-6 py-4 font-bold text-sm hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20"
          >
            ثبت نام و مشاوره
          </NuxtLink>
          <div class="mt-6 flex items-center justify-center gap-6">
            <a href="#" class="text-gray-400 hover:text-[#0B0D10] transition-colors font-en text-sm font-bold">Insta</a>
            <a href="#" class="text-gray-400 hover:text-[#0B0D10] transition-colors font-en text-sm font-bold">Tele</a>
            <a href="#" class="text-gray-400 hover:text-[#0B0D10] transition-colors font-en text-sm font-bold">Mail</a>
          </div>
        </div>

      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

const mobileMenuOpen = ref(false)
const route = useRoute()

const isScrolled = ref(false)
const isScrollingDown = ref(false)
let lastScrollPosition = 0

const menuItems = [
  { name: 'خانه', href: '/' },
  { name: 'درباره ما', href: '/about' },
  { name: 'تمرینات', href: '/classes' },
  { name: 'مربیان', href: '/coaches' },
  { name: 'مسابقات', href: '/tournaments' },
  { name: 'رسانه', href: '/media' },
  { name: 'مقالات', href: '/blog' },
  { name: 'تماس', href: '/contact' },
]

const handleScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  
  // Set isScrolled if we've scrolled past 50px
  isScrolled.value = currentScrollPosition > 50

  // Determine scroll direction (with a small threshold to prevent jitter)
  if (currentScrollPosition < 50) {
    isScrollingDown.value = false
  } else if (currentScrollPosition > lastScrollPosition + 10) {
    isScrollingDown.value = true // Scrolling down
  } else if (currentScrollPosition < lastScrollPosition - 10) {
    isScrollingDown.value = false // Scrolling up
  }

  lastScrollPosition = currentScrollPosition
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.font-en {
  font-family: system-ui, -apple-system, sans-serif;
}

/* Animations for Mobile Drawer Overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Animations for Mobile Drawer sliding from Right */
.slide-side-enter-active,
.slide-side-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-side-enter-from,
.slide-side-leave-to {
  transform: translateX(100%);
}

/* Staggered animation for links inside drawer */
@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-slide-up-fade {
  opacity: 0;
  animation: slideUpFade 0.4s ease forwards;
}
</style>
