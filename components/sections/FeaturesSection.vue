<template>
  <section class="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 py-24 overflow-hidden" dir="rtl">
    
    <div 
      ref="headerRef"
      :class="['mb-12 border-b-2 border-obsidian/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 transition-all duration-1000 ease-out', 
               isHeaderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12']"
    >
      <div>
        <h2 class="text-3xl md:text-5xl font-black text-obsidian tracking-tighter uppercase mb-2">استانداردِ <span class="text-accent">سایراکس</span></h2>
        <p class="text-coolgray font-mono text-sm tracking-widest uppercase mt-2">Premium Martial Arts Infrastructure</p>
      </div>
      <p class="text-obsidian/70 font-bold max-w-md text-sm md:text-base leading-relaxed text-justify">
        ما صرفاً یک باشگاه ورزشی نیستیم؛ سایراکس با در اختیار داشتن برترین اساتید هنرهای رزمی و تجهیزات استاندارد جهانی، مسیر رسیدن به قهرمانی را برای شما تضمین می‌کند.
      </p>
    </div>

    <!-- شبکه‌ی ویژگی‌ها - گرید بنتو با ساختار دقیق استیل مهفا (لایت‌مود پریمیوم) -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-1 auto-rows-[180px] md:auto-rows-[280px] bg-obsidian/5 p-1 rounded-xl">
      
      <article 
        ref="box1Ref"
        :class="['md:col-span-2 group bg-white p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-1000', 
                 isBox1Visible ? 'opacity-100' : 'opacity-0']"
      >
        <div class="absolute top-0 right-0 w-16 h-16 bg-accent/5 group-hover:bg-accent/10 border-l border-b border-obsidian/5 transition-colors flex items-center justify-center">
           <span class="font-mono text-coolgray text-xs">01</span>
        </div>
        <div class="relative z-10 mt-auto md:mt-0">
          <h3 class="text-2xl font-black text-obsidian mb-3 tracking-tight">دقت در آموزش (بدون حاشیه)</h3>
          <p class="text-coolgray text-sm leading-relaxed max-w-sm">
            تمرکز کامل روی جزئیات بیومکانیک و اجرای صحیح تکنیک‌ها. ما با حذف تمرینات منسوخ، <strong>سریع‌ترین مسیر رشد فیزیکی و ذهنی</strong> را بر اساس استانداردهای مدرن طراحی کرده‌ایم.
          </p>
        </div>
        <div class="h-1 w-0 bg-accent group-hover:w-full transition-all duration-500 absolute bottom-0 right-0"></div>
      </article>

      <article 
        ref="box2Ref"
        :class="['md:col-span-1 group bg-white p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-1000 delay-100', 
                 isBox2Visible ? 'opacity-100' : 'opacity-0']"
      >
        <div class="absolute top-0 right-0 w-12 h-12 bg-obsidian/5 border-l border-b border-obsidian/5 flex items-center justify-center">
           <span class="font-mono text-coolgray text-xs">02</span>
        </div>
        <div class="relative z-10 mt-auto">
          <h3 class="text-lg font-black text-obsidian mb-2">انضباط ذهنی</h3>
          <p class="text-coolgray text-xs leading-relaxed">ایجاد روتین‌های تمرینی سخت‌گیرانه اما اصولی برای <strong>ساخت ذهنیت یک مبارز واقعی</strong> و تسلط بر احساسات.</p>
        </div>
      </article>

      <article 
        ref="box3Ref"
        :class="['md:col-span-1 group bg-white p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-1000 delay-200', 
                 isBox3Visible ? 'opacity-100' : 'opacity-0']"
      >
        <div class="absolute top-0 right-0 w-12 h-12 bg-obsidian/5 border-l border-b border-obsidian/5 flex items-center justify-center">
           <span class="font-mono text-coolgray text-xs">03</span>
        </div>
        <div class="relative z-10 mt-auto">
          <h3 class="text-lg font-black text-obsidian mb-2">تجهیزات پریمیوم</h3>
          <p class="text-coolgray text-xs leading-relaxed">محیط تمرینی مجهز به کیسه‌های استاندارد، تاتامی‌های ضد شوک و <strong>فضای ریکاوری تخصصی</strong> ورزشکاران.</p>
        </div>
      </article>

      <article 
        ref="box4Ref"
        :class="['md:col-span-4 group bg-white p-8 flex flex-col md:flex-row items-start md:items-center justify-between relative overflow-hidden transition-all duration-1000 delay-300', 
                 isBox4Visible ? 'opacity-100' : 'opacity-0']"
      >
        
        <div class="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMwQjBEMTAiLz48L3N2Zz4=')]"></div>

        <div class="relative z-10 md:w-2/3">
          <h3 class="text-xl font-black text-obsidian mb-2 uppercase tracking-wide">پیروزی در رقابت‌ها و ساخت جامعه‌ای قدرتمند</h3>
          <p class="text-coolgray text-sm leading-relaxed">
            پیوستن به سایراکس، ورود به جامعه‌ای از مبارزان حرفه‌ای است. با برگزاری دوره‌های شبیه‌سازی مسابقات و <strong>آنالیز دقیق عملکرد</strong>، شما را برای سخت‌ترین رقابت‌های کشوری و بین‌المللی آماده می‌کنیم.
          </p>
        </div>
        
        <div class="relative z-10 mt-6 md:mt-0 shrink-0 border-r-4 border-accent pr-4">
           <span class="block text-3xl font-mono font-black text-obsidian tracking-tighter">100%</span>
           <span class="block text-xs font-bold text-coolgray uppercase tracking-widest mt-1">تضمین آمادگی</span>
        </div>
      </article>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const headerRef = ref<HTMLElement | null>(null)
const isHeaderVisible = ref(false)

const box1Ref = ref<HTMLElement | null>(null)
const isBox1Visible = ref(false)

const box2Ref = ref<HTMLElement | null>(null)
const isBox2Visible = ref(false)

const box3Ref = ref<HTMLElement | null>(null)
const isBox3Visible = ref(false)

const box4Ref = ref<HTMLElement | null>(null)
const isBox4Visible = ref(false)

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const target = entry.target as HTMLElement
      
      if (entry.isIntersecting) {
        if (target === headerRef.value) isHeaderVisible.value = true
        if (target === box1Ref.value) isBox1Visible.value = true
        if (target === box2Ref.value) isBox2Visible.value = true
        if (target === box3Ref.value) isBox3Visible.value = true
        if (target === box4Ref.value) isBox4Visible.value = true
      } else {
        if (target === headerRef.value) isHeaderVisible.value = false
        if (target === box1Ref.value) isBox1Visible.value = false
        if (target === box2Ref.value) isBox2Visible.value = false
        if (target === box3Ref.value) isBox3Visible.value = false
        if (target === box4Ref.value) isBox4Visible.value = false
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '-5% 0px -5% 0px'
  })

  if (headerRef.value) observer.observe(headerRef.value)
  if (box1Ref.value) observer.observe(box1Ref.value)
  if (box2Ref.value) observer.observe(box2Ref.value)
  if (box3Ref.value) observer.observe(box3Ref.value)
  if (box4Ref.value) observer.observe(box4Ref.value)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
/* Empty style block to fix Vite SFC parsing issue */
</style>
