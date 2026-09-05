<template>
  <footer class="bg-bone text-obsidian relative overflow-hidden" dir="rtl">
    
    <!-- پس‌زمینه محو و مینیمال برای القای حس لوکس بودن -->
    <div class="absolute inset-0 pointer-events-none opacity-20">
      <div class="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-obsidian/20 to-transparent"></div>
    </div>

    <!-- TOP BLOCK: The Final CTA (قدرتمند، مینیمال، باوقار) -->
    <div class="relative py-24 md:py-32 px-6 lg:px-8 flex flex-col items-center justify-center text-center">
      
      <!-- شعار اصلی -->
      <h2 class="font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter uppercase text-obsidian mb-6 relative">
        <span class="absolute -top-8 -right-6 md:-top-10 md:-right-8 text-accent/20 text-7xl md:text-9xl select-none">"</span>
        آماده‌ی ورود به میدان هستی؟
      </h2>
      
      <p class="font-bold text-coolgray text-base md:text-lg max-w-2xl mb-12">
        زمان آن رسیده که از حاشیه خارج شوی و کنترل واقعی را در دست بگیری. سایراکس منتظر توست.
      </p>

      <!-- دکمه پریمیوم با افکت‌های نرم و حرفه‌ای -->
      <button class="group relative px-10 py-5 bg-obsidian text-bone font-black text-lg md:text-xl rounded-xl overflow-hidden transition-all duration-500 hover:shadow-[0_10px_40px_-10px_rgba(11,13,16,0.5)] hover:-translate-y-1">
        <span class="absolute inset-0 w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full"></span>
        <span class="relative flex items-center gap-3">
          شروع مسیر قهرمانی
          <svg class="w-5 h-5 transform transition-transform duration-500 group-hover:-translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
        </span>
      </button>
    </div>

    <!-- BOTTOM BLOCK: Information Grid -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-12 border-t border-obsidian/10">
        
        <!-- Cell 1: Location -->
        <div class="flex flex-col">
          <h3 class="font-black text-xl mb-4 text-obsidian tracking-tight flex items-center gap-2">
            <span class="w-1.5 h-6 bg-accent rounded-full"></span>
            پایگاه مرکزی
          </h3>
          <p class="font-bold text-coolgray text-sm md:text-base leading-relaxed">
            تهران، شهرک غرب، بلوار فرحزادی<br>
            مجتمع ورزشی سایراکس (درب اختصاصی A)
          </p>
        </div>

        <!-- Cell 2: Contact -->
        <div class="flex flex-col">
          <h3 class="font-black text-xl mb-4 text-obsidian tracking-tight flex items-center gap-2">
            <span class="w-1.5 h-6 bg-obsidian/20 rounded-full"></span>
            ارتباط مستقیم
          </h3>
          <div class="flex flex-col gap-3 font-mono font-bold text-coolgray">
            <a href="tel:+982188888888" class="hover:text-accent transition-colors w-fit flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span dir="ltr">+98 21 8888 8888</span>
            </a>
            <a href="tel:+989120000000" class="hover:text-accent transition-colors w-fit flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              <span dir="ltr">+98 912 000 0000</span>
            </a>
            <a href="mailto:info@syraxteam.com" class="hover:text-accent transition-colors w-fit flex items-center gap-2 text-accent">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              INFO@SYRAXTEAM.COM
            </a>
          </div>
        </div>

        <!-- Cell 3: Socials -->
        <div class="flex flex-col">
          <h3 class="font-black text-xl mb-4 text-obsidian tracking-tight flex items-center gap-2">
            <span class="w-1.5 h-6 bg-obsidian/20 rounded-full"></span>
            شبکه‌های اجتماعی
          </h3>
          <div class="flex flex-col gap-3 font-mono font-bold text-coolgray">
            <a href="#" class="hover:text-accent transition-colors w-fit flex items-center gap-2">INSTAGRAM</a>
            <a href="#" class="hover:text-accent transition-colors w-fit flex items-center gap-2">TELEGRAM</a>
            <a href="#" class="hover:text-accent transition-colors w-fit flex items-center gap-2">YOUTUBE</a>
          </div>
        </div>

      </div>

      <!-- Copyright Bottom Bar -->
      <div class="pt-8 border-t border-obsidian/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="font-mono text-xs font-bold text-coolgray tracking-widest uppercase">
          © 2026 SYRAX MARTIAL ARTS. ALL RIGHTS RESERVED.
        </div>
        <div class="flex gap-4 text-xs font-bold text-coolgray">
          <a href="#" class="hover:text-obsidian transition-colors">قوانین و مقررات</a>
          <a href="#" class="hover:text-obsidian transition-colors">حریم خصوصی</a>
        </div>
      </div>
    </div>

  </footer>
</template>

<script setup lang="ts">
// AppFooter - Premium Sleek Design
</script>
