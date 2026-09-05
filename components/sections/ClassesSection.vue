<template>
  <section id="training" class="py-24 bg-obsidian relative overflow-hidden" dir="rtl" ref="sectionRef">
    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(#F5F5F2 1.5px, transparent 1.5px); background-size: 32px 32px;"></div>
    
    <!-- Decorative glow in the background -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
      
      <!-- Section Header -->
      <div 
        :class="['text-center mb-16 transition-all duration-1000 ease-out',
                 isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']"
      >
        <span class="text-accent font-black tracking-[0.3em] text-xs uppercase font-en">Training Programs</span>
        <h2 class="text-3xl md:text-5xl font-black text-bone mt-3 tracking-tighter">دوره‌های تمرینی سایراکس</h2>
        <div class="w-16 h-1 bg-accent mx-auto mt-6 rounded-full opacity-80"></div>
      </div>

      <!-- Classes Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <!-- Class Card -->
        <div 
          v-for="(course, index) in courses" 
          :key="course.id" 
          class="group relative bg-[#121418] border border-coolgray/10 p-8 transition-all duration-500 hover:border-accent/50 hover:bg-[#16191f] shadow-lg hover:shadow-[0_20px_60px_-15px_rgba(197,22,46,0.15)] flex flex-col btn-sharp"
          :style="{ transitionDelay: `${index * 150}ms` }"
          :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'"
        >
          <!-- Red Top border hover effect -->
          <div class="absolute top-0 right-0 w-0 h-1 bg-accent transition-all duration-500 ease-out group-hover:w-full"></div>
          
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-2xl font-black text-bone tracking-tight">{{ course.title }}</h3>
            <span class="bg-accent/10 text-accent px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm border border-accent/20">
              {{ course.level }}
            </span>
          </div>
          
          <p class="text-coolgray text-sm mb-8 min-h-[60px] leading-relaxed font-bold">
            {{ course.description }}
          </p>
          
          <ul class="space-y-4 mb-10 mt-auto">
            <li class="flex items-center text-sm text-bone/80 font-bold">
              <div class="w-8 h-8 rounded-sm bg-obsidian flex items-center justify-center ml-3 border border-coolgray/10 group-hover:border-accent/30 transition-colors">
                <!-- Users Icon -->
                <svg class="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span>محدوده سنی: {{ course.age }}</span>
            </li>
            <li class="flex items-center text-sm text-bone/80 font-bold">
              <div class="w-8 h-8 rounded-sm bg-obsidian flex items-center justify-center ml-3 border border-coolgray/10 group-hover:border-accent/30 transition-colors">
                <!-- Clock Icon -->
                <svg class="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span dir="rtl">{{ course.time }}</span>
            </li>
            <li class="flex items-center text-sm text-bone/80 font-bold">
              <div class="w-8 h-8 rounded-sm bg-obsidian flex items-center justify-center ml-3 border border-coolgray/10 group-hover:border-accent/30 transition-colors">
                <!-- Map Pin Icon -->
                <svg class="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span>{{ course.location }}</span>
            </li>
          </ul>
          
          <NuxtLink 
            to="/register" 
            class="w-full bg-bone text-obsidian font-black text-sm py-4 flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-all duration-300 btn-sharp group/btn"
          >
            <span>درخواست ثبت‌نام</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transform transition-transform duration-300 group-hover/btn:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </NuxtLink>
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

const courses = [
  { 
    id: 1, 
    title: 'نینجا فاندامنتال', 
    level: 'مبتدی', 
    description: 'آموزش پایه‌ای حرکات، افت‌ها، ضربات اولیه و ساخت آمادگی جسمانی پایه برای ورود به دنیای رزمی.', 
    age: '۷ تا ۱۵ سال', 
    time: 'روزهای زوج - ۱۷:۰۰ الی ۱۸:۳۰', 
    location: 'سالن اصلی قهرمانان' 
  },
  { 
    id: 2, 
    title: 'کلاسیک کامبت', 
    level: 'متوسط', 
    description: 'تمرکز بر تکنیک‌های درگیری، دفاع شخصی پیشرفته شهری و کار با سلاح‌های پایه نینجوتسو.', 
    age: '۱۵ سال به بالا', 
    time: 'روزهای فرد - ۱۸:۳۰ الی ۲۰:۰۰', 
    location: 'سالن شماره ۲ (تکنیک)' 
  },
  { 
    id: 3, 
    title: 'سایراکس الیت', 
    level: 'پیشرفته / قهرمانی', 
    description: 'ویژه اعضای تیم مسابقات. تمرینات پرفشار فیزیکی، استراتژی مبارزه حرفه‌ای و آکروبات.', 
    age: 'انتخابی (تست فیزیکی)', 
    time: 'همه روزه - ۲۰:۰۰ الی ۲۲:۰۰', 
    location: 'کمپ اختصاصی تیم' 
  }
]

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true
      if (sectionRef.value && observer) {
        observer.unobserve(sectionRef.value)
      }
    }
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -10% 0px'
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

.btn-sharp {
  border-radius: 0;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%);
}
</style>
