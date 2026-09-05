<template>
  <section id="about" class="py-24 bg-bone relative" dir="rtl">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <h2 class="text-3xl md:text-5xl font-black text-obsidian mb-8 accent-slash inline-block">
            قدرت در سکوت ساخته می‌شود.
          </h2>
          <p class="text-coolgray text-lg md:text-xl leading-relaxed mb-10 font-bold">
            سایراکس فراتر از یک تیم ورزشی است؛ ما یک سیستم تمرینی مبتنی بر دقت، کنترل ذهن و بدن، و انضباط آهنین هستیم. هویت ما نه در هیاهو، بلکه در تکرار بی‌نقص تکنیک‌ها و ارتقای مداوم فیزیکی و ذهنی نهفته است.
          </p>
          
          <div class="grid grid-cols-2 gap-x-6 gap-y-10">
            <!-- Item 1 -->
            <div class="flex flex-col">
              <div class="w-12 h-12 bg-obsidian flex items-center justify-center text-accent mb-4 rounded-sm shadow-sm transition-transform hover:scale-105 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="22" x2="18" y1="12" y2="12"/><line x1="6" x2="2" y1="12" y2="12"/><line x1="12" x2="12" y1="6" y2="2"/><line x1="12" x2="12" y1="22" y2="18"/>
                </svg>
              </div>
              <h3 class="font-black text-obsidian text-lg md:text-xl mb-1">انضباط</h3>
              <p class="text-sm font-bold text-coolgray leading-relaxed">نظم ساختاری در تمرین و ذهن</p>
            </div>
            
            <!-- Item 2 -->
            <div class="flex flex-col">
              <div class="w-12 h-12 bg-obsidian flex items-center justify-center text-accent mb-4 rounded-sm shadow-sm transition-transform hover:scale-105 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <h3 class="font-black text-obsidian text-lg md:text-xl mb-1">کنترل فیزیک</h3>
              <p class="text-sm font-bold text-coolgray leading-relaxed">تسلط کامل بر حرکات و بدن</p>
            </div>

            <!-- Item 3 -->
            <div class="flex flex-col">
              <div class="w-12 h-12 bg-obsidian flex items-center justify-center text-accent mb-4 rounded-sm shadow-sm transition-transform hover:scale-105 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <h3 class="font-black text-obsidian text-lg md:text-xl mb-1">تمرکز</h3>
              <p class="text-sm font-bold text-coolgray leading-relaxed">حضور کامل ذهن در لحظه</p>
            </div>

            <!-- Item 4 -->
            <div class="flex flex-col">
              <div class="w-12 h-12 bg-obsidian flex items-center justify-center text-accent mb-4 rounded-sm shadow-sm transition-transform hover:scale-105 duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
                </svg>
              </div>
              <h3 class="font-black text-obsidian text-lg md:text-xl mb-1">مهارت</h3>
              <p class="text-sm font-bold text-coolgray leading-relaxed">ارتقای پیوسته تکنیک‌ها</p>
            </div>
          </div>
        </div>
        
        <div class="relative mt-8 lg:mt-0">
          <!-- Diagonal decorative element -->
          <div class="absolute -inset-4 bg-obsidian transform -skew-x-12 z-0 opacity-5"></div>
          
          <!-- Local High Quality Image -->
          <img 
            src="/images/about-syrax.jpg" 
            alt="تمرینات نینجا سایراکس" 
            class="relative z-10 w-full h-[400px] md:h-[500px] lg:h-[550px] object-cover grayscale hover:grayscale-0 transition-all duration-700 img-brand-filter btn-sharp shadow-xl"
            loading="lazy"
          >
          
          <!-- Accent badge -->
          <div class="absolute -bottom-6 -right-6 lg:-right-8 bg-accent text-white p-6 z-20 btn-sharp shadow-[0_10px_30px_rgba(197,22,46,0.3)]">
            <span class="block text-4xl lg:text-5xl font-black font-en tracking-tighter mb-1">10+</span>
            <span class="text-sm font-bold opacity-90 tracking-wide">سال تجربه آموزش</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Vue Component logic if needed
</script>

<style scoped>
.font-en {
  font-family: system-ui, -apple-system, sans-serif;
}

.btn-sharp {
  border-radius: 0;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%);
}

.accent-slash {
  position: relative;
}
.accent-slash::after {
  content: '';
  position: absolute;
  bottom: -12px;
  right: 0;
  width: 50px;
  height: 6px;
  background-color: #C5162E;
  transform: skewX(-20deg);
}

.img-brand-filter {
  filter: contrast(1.1) saturate(0.8);
}
</style>
