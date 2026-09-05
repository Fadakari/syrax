<template>
  <header 
    class="fixed top-0 w-full z-50 transition-all duration-300" 
    :class="{'bg-bone/95 backdrop-blur-md shadow-sm': scrolled, 'bg-transparent': !scrolled}"
    dir="rtl"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        
        <!-- Logo Area -->
        <div class="flex items-center gap-3">
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <!-- Custom SVG Logo -->
            <svg class="w-10 h-10 transition-transform group-hover:scale-105" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M75 20L35 55L45 55L25 80L65 45L55 45L75 20Z" :fill="scrolled ? '#0B0D10' : '#F5F5F2'" class="transition-colors duration-300" />
              <path d="M42 55L68 45L62 55H42Z" fill="#C5162E"/>
            </svg>
            <div class="flex flex-col">
              <span class="font-black text-xl tracking-widest uppercase font-en" :class="scrolled ? 'text-obsidian' : 'text-bone'">SYRAX</span>
              <span class="text-[10px] font-bold transition-colors duration-300" :class="scrolled ? 'text-coolgray' : 'text-bone/70'">نینجا سایراکس</span>
            </div>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8 space-x-reverse">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.name" 
            :to="item.href" 
            class="text-sm font-bold transition-colors hover:text-accent" 
            :class="scrolled ? 'text-obsidian' : 'text-bone'"
          >
            {{ item.name }}
          </NuxtLink>
        </nav>

        <!-- CTA Button -->
        <div class="hidden md:flex">
          <NuxtLink to="/contact" class="bg-accent text-white px-6 py-2.5 font-bold text-sm tracking-wide btn-sharp flex items-center gap-2 hover:bg-accent/90">
            ثبت‌نام
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="focus:outline-none transition-colors duration-300" :class="scrolled ? 'text-obsidian' : 'text-bone'">
            <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <transition name="slide-down">
      <div v-show="mobileMenuOpen" class="md:hidden bg-obsidian text-bone absolute top-20 left-0 w-full shadow-xl border-t border-coolgray/20">
        <div class="px-4 pt-2 pb-6 space-y-1 flex flex-col">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.name" 
            :to="item.href" 
            class="block px-3 py-3 text-base font-medium border-b border-coolgray/10 hover:text-accent transition-colors" 
            @click="mobileMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            @click="mobileMenuOpen = false" 
            class="w-full mt-4 bg-accent text-white px-6 py-3 font-bold text-sm btn-sharp text-center hover:bg-accent/90"
          >
            ثبت‌نام در دوره‌ها
          </NuxtLink>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const mobileMenuOpen = ref(false)

const menuItems = [
  { name: 'خانه', href: '/' },
  { name: 'درباره سایراکس', href: '/about' },
  { name: 'تمرینات', href: '/classes' },
  { name: 'مربیان', href: '/coaches' },
  { name: 'رسانه', href: '/media' },
  { name: 'مقالات', href: '/blog' },
  { name: 'تماس', href: '/contact' },
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Check initial scroll position
  handleScroll()
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
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
  transition: all 0.3s ease;
}

.btn-sharp:hover {
  transform: translateY(-2px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
