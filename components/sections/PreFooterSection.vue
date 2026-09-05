<template>
  <section class="py-16 bg-[#0B0D10] border-b border-gray-800" dir="rtl">
    <div class="max-w-[1400px] mx-auto px-6 lg:px-8">
      
      <div class="flex flex-col md:flex-row items-center justify-between gap-8">
        
        <!-- Right: Button -->
        <div class="order-3 md:order-1">
          <NuxtLink to="/contact" class="inline-block bg-[#C5162E] text-white px-8 py-4 font-bold text-sm text-center hover:bg-red-700 transition-colors">
            ثبت نام و رزرو جلسه مشاوره
          </NuxtLink>
        </div>

        <!-- Center: Text -->
        <div class="order-2 md:order-2 text-center md:text-right flex-1 md:pr-10">
          <h2 class="text-3xl font-black text-white mb-2 tracking-tighter">
            شروع حرکت از همین‌جاست
          </h2>
          <p class="text-gray-400 font-bold text-sm">
            قدم اول را بردار. ما مسیر را با تو می‌رویم.
          </p>
        </div>

        <!-- Left: Logo -->
        <div class="order-1 md:order-3 flex justify-end">
          <svg class="w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M75 20L35 55L45 55L25 80L65 45L55 45L75 20Z" fill="#FFFFFF" />
            <path d="M42 55L68 45L62 55H42Z" fill="#C5162E"/>
          </svg>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
// Pre-footer simple CTA
</script>
