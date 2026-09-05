<template>
  <section class="py-24 bg-[#F5F5F2] border-b border-gray-200 relative overflow-hidden" dir="rtl" ref="sectionRef">
    
    <!-- Decorative background element -->
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-[#C5162E]/5 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
      
      <div class="flex flex-col xl:flex-row gap-16 items-center xl:items-stretch">
        
        <!-- Right Side: Title Block -->
        <div class="w-full xl:w-[25%] flex flex-col justify-center xl:pr-4 transition-all duration-1000 ease-out"
             :class="isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'">
          <h2 class="text-4xl lg:text-5xl font-black text-[#0B0D10] leading-tight mb-6 tracking-tighter accent-slash inline-block">
            مربیان
          </h2>
          <p class="text-gray-500 font-bold text-sm leading-relaxed mb-10 border-r-2 border-gray-300 pr-4">
            تیم مربیان سایراکس با تجربه میدانی و مدارک معتبر بین‌المللی آماده هدایت شما هستند.
          </p>
          <div>
            <NuxtLink to="/coaches" class="inline-block bg-transparent border-2 border-gray-300 text-[#0B0D10] px-8 py-3 font-bold text-sm text-center hover:border-[#C5162E] hover:text-[#C5162E] transition-all">
              مشاهده همه مربیان
            </NuxtLink>
          </div>
        </div>

        <!-- Left Side: 3 Cards -->
        <div class="w-full xl:w-[75%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div 
            v-for="(coach, index) in coaches" 
            :key="coach.name"
            class="group flex flex-col items-center text-center transition-all duration-700 ease-out cursor-pointer"
            :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'"
            :style="{ transitionDelay: `${index * 150}ms` }"
          >
            <!-- Image Container with offset frame effect -->
            <div class="relative w-full aspect-[4/5] mb-6">
              
              <!-- Offset Red Frame (Appears and shifts on hover) -->
              <div class="absolute inset-0 bg-[#C5162E] clip-coach-img opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-0 translate-y-0 group-hover:translate-x-3 group-hover:translate-y-3 -z-10"></div>
              
              <!-- Main Image Box -->
              <div class="absolute inset-0 overflow-hidden bg-gray-200 clip-coach-img z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2">
                <img :src="coach.image" :alt="coach.name" class="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110">
                <!-- Inner overlay gradient -->
                <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
            
            <!-- Red Accent Line (Static underneath) -->
            <div class="w-full h-[3px] bg-[#C5162E] transform -skew-y-3 origin-left -mt-2 mb-6 group-hover:bg-[#0B0D10] transition-colors duration-500"></div>
            
            <!-- Details -->
            <div class="flex items-center gap-2 mb-2 justify-center w-full">
              <h3 class="text-[#0B0D10] font-black text-xl group-hover:text-[#C5162E] transition-colors duration-300">{{ coach.name }}</h3>
              <!-- Arrow up-right Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400 group-hover:text-[#C5162E] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M7 17L17 7M17 7H9M17 7V15" />
              </svg>
            </div>
            
            <p class="text-gray-900 font-bold text-sm mb-1 transition-colors duration-300">{{ coach.role }}</p>
            <p class="text-gray-500 text-xs font-bold">{{ coach.exp }}</p>
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

const coaches = [
  { 
    name: 'علی محمدی', 
    role: 'مربی نینجوتسو', 
    exp: '۷ سال سابقه تدریس',
    image: '/images/coach-1.jpg' 
  },
  { 
    name: 'امیر رضایی', 
    role: 'مربی جوجیتسو برزیلی', 
    exp: '۵ سال سابقه مسابقه',
    image: '/images/coach-2.jpg' 
  },
  { 
    name: 'سینا احمدی', 
    role: 'مربی آمادگی جسمانی', 
    exp: '۹ سال سابقه تمرین',
    image: '/images/coach-3.jpg' 
  }
]

onMounted(() => {
  // Continuous entrance observer
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

/* Diagonal cut at the bottom */
.clip-coach-img {
  clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
}
</style>
