<template>
  <footer class="bg-white pt-20 pb-8 border-t border-gray-200" dir="rtl">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-8">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        <!-- Col 1: Contact -->
        <div>
          <h4 class="text-[#0B0D10] font-black text-lg mb-6">اطلاعات تماس</h4>
          <ul class="space-y-4 text-sm font-bold text-gray-500">
            <li class="flex items-center gap-3">
              <span class="text-[#C5162E] font-en">021-12345678</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="font-en">info@syraxteam.com</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="font-en">@syrax_team</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="leading-relaxed">تهران، خیابان آزادی، نبش خیابان ۱۲، باشگاه نینجا سایراکس</span>
            </li>
          </ul>
        </div>

        <!-- Col 2: Info -->
        <div>
          <h4 class="text-[#0B0D10] font-black text-lg mb-6">اطلاعات</h4>
          <ul class="space-y-4 text-sm font-bold text-gray-500">
            <li><NuxtLink to="/media" class="hover:text-[#C5162E] transition-colors">رسانه</NuxtLink></li>
            <li><NuxtLink to="/blog" class="hover:text-[#C5162E] transition-colors">مقالات</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-[#C5162E] transition-colors">تماس با ما</NuxtLink></li>
            <li><NuxtLink to="/faq" class="hover:text-[#C5162E] transition-colors">سوالات متداول</NuxtLink></li>
          </ul>
        </div>

        <!-- Col 3: Quick Links -->
        <div>
          <h4 class="text-[#0B0D10] font-black text-lg mb-6">دسترسی سریع</h4>
          <ul class="space-y-4 text-sm font-bold text-gray-500">
            <li><NuxtLink to="/" class="hover:text-[#C5162E] transition-colors">خانه</NuxtLink></li>
            <li><NuxtLink to="/about" class="hover:text-[#C5162E] transition-colors">درباره ما</NuxtLink></li>
            <li><NuxtLink to="/classes" class="hover:text-[#C5162E] transition-colors">تمرینات</NuxtLink></li>
            <li><NuxtLink to="/coaches" class="hover:text-[#C5162E] transition-colors">مربیان</NuxtLink></li>
            <li><NuxtLink to="/tournaments" class="hover:text-[#C5162E] transition-colors">مسابقات</NuxtLink></li>
          </ul>
        </div>

        <!-- Col 4: Brand -->
        <div class="flex flex-col items-start lg:items-end text-right lg:text-left">
          <NuxtLink to="/" class="flex items-center gap-2 mb-6">
            <!-- Custom SVG Logo -->
            <svg class="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M75 20L35 55L45 55L25 80L65 45L55 45L75 20Z" fill="#0B0D10" />
              <path d="M42 55L68 45L62 55H42Z" fill="#C5162E"/>
            </svg>
            <div class="flex flex-col justify-center text-right">
              <span class="font-black text-xl tracking-widest uppercase font-en leading-none text-[#0B0D10]">SYRAX</span>
              <span class="text-[10px] font-bold text-[#0B0D10] mt-1 leading-none">نینجا سایراکس</span>
            </div>
          </NuxtLink>
          <p class="text-gray-500 text-xs font-bold leading-relaxed mb-8 max-w-[250px] lg:mr-0 text-right">
            تیم رزمی و آمادگی جسمانی مدرن. دقت در تکنیک، انضباط در تمرین، پیشرفت در مسیر پیروزی.
          </p>
          
          <!-- Social Icons -->
          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#C5162E] hover:border-[#C5162E] transition-colors">
              IN
            </a>
            <a href="#" class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#C5162E] hover:border-[#C5162E] transition-colors">
              TG
            </a>
            <a href="#" class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#C5162E] hover:border-[#C5162E] transition-colors">
              EM
            </a>
          </div>
        </div>

      </div>

      <!-- Copyright -->
      <div class="pt-8 border-t border-gray-100 flex justify-center">
        <p class="text-gray-400 font-en text-xs tracking-wider">
          © 2026 SYRAX Training Team. All rights reserved.
        </p>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer logic
</script>

<style scoped>
.font-en {
  font-family: system-ui, -apple-system, sans-serif;
}
</style>
