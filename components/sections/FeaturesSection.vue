<template>
  <section class="py-20 bg-[#F5F5F2] border-b border-gray-200" dir="rtl" ref="sectionRef">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-8">
      
      <!-- Flex container: Features on Right, Title on Left -->
      <div class="flex flex-col xl:flex-row gap-16 items-center xl:items-start justify-between">
        
        <!-- Right Side: The 5 Features -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-6 w-full xl:w-[75%] relative z-10">
          <div 
            v-for="(feat, index) in features" 
            :key="feat.num"
            class="group relative flex flex-col transition-all duration-700 ease-out p-4 -m-4 rounded-xl hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-default"
            :class="[
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12',
              index === 4 ? 'sm:col-span-2 lg:col-span-1' : '' // Last item spans 2 cols on small screens to balance grid
            ]"
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            <!-- Animated Top Line on Hover -->
            <div class="absolute top-0 right-1/2 w-0 h-[2px] bg-[#C5162E] transition-all duration-500 ease-out group-hover:w-1/2 group-hover:right-1/4 rounded-full opacity-0 group-hover:opacity-100"></div>

            <span class="text-[#C5162E] font-black text-2xl mb-3 font-en tracking-tighter transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 transform origin-right inline-block w-max">
              {{ feat.num }}
            </span>
            
            <h3 class="text-[#0B0D10] font-black text-xl mb-3 relative inline-block">
              {{ feat.title }}
              <!-- Subtle underline on hover -->
              <span class="absolute -bottom-1 right-0 w-0 h-[1px] bg-gray-300 transition-all duration-500 group-hover:w-full"></span>
            </h3>
            
            <p class="text-gray-500 text-sm font-bold leading-relaxed transition-colors duration-500 group-hover:text-gray-900">
              {{ feat.desc }}
            </p>
          </div>
        </div>

        <!-- Left Side: Title block -->
        <div 
          class="w-full xl:w-[25%] flex flex-col justify-center xl:border-r border-gray-300 xl:pr-10 transition-all duration-1000 delay-500 ease-out relative z-10"
          :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'"
        >
          <!-- Small decorative dot -->
          <div class="absolute -top-6 right-0 xl:right-[-5px] w-2 h-2 rounded-full bg-[#C5162E] xl:block hidden"></div>

          <h2 class="text-4xl lg:text-5xl font-black text-[#0B0D10] leading-tight mb-8 tracking-tighter accent-slash inline-block">
            ما جنگجو<br/>می‌سازیم،<br/>
            <span class="text-gray-400">نه فقط قهرمان.</span>
          </h2>
          <p class="text-gray-600 font-bold text-sm leading-relaxed border-r-2 border-[#C5162E] pr-4">
            مسیر ما ترکیبی از هنرهای رزمی، آمادگی جسمانی، عملکرد و ذهن جنگجو است.
          </p>
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

const features = [
  { num: '01', title: 'دقت', desc: 'هر حرکت حساب‌شده است. تمرکز روی جزئیات، نتیجه بزرگ می‌سازد.' },
  { num: '02', title: 'انضباط', desc: 'تکرار منظم پایبندی به اصول و ساخت عادت‌های قوی.' },
  { num: '03', title: 'سرعت', desc: 'واکنش سریع، اجرای انفجاری و حرکت رو به جلو.' },
  { num: '04', title: 'کنترل', desc: 'قدرت واقعی از کنترل ذهن و بدن بدست می‌آید.' },
  { num: '05', title: 'آمادگی', desc: 'بدن آماده، ذهن آماده، عملکرد مداوم.' }
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
  width: 60px;
  height: 4px;
  background-color: #C5162E;
  transform: skewX(-20deg);
}
</style>
