<template>
  <main class="min-h-screen bg-[#F5F5F2] overflow-x-hidden" dir="rtl">
    
    <!-- Hero Section with Brutalist Clip Path -->
    <section 
      ref="heroRef"
      class="relative w-full lg:h-[70vh] min-h-[600px] bg-[#0B0D10] flex items-center"
      style="clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw));"
    >
      <!-- Parallax Background Image -->
      <div v-if="aboutData?.hero_image" class="absolute inset-0 z-0 overflow-hidden">
        <img 
          :src="`${directusUrl}/assets/${aboutData.hero_image}`" 
          alt="درباره ما"
          class="w-full h-full object-cover opacity-50 grayscale mix-blend-overlay transition-transform duration-[20s] ease-linear"
          :class="isHeroVisible ? 'scale-110' : 'scale-100'"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/40 to-transparent"></div>
        <div class="absolute inset-0 bg-[url('/images/noise.png')] opacity-20 mix-blend-overlay"></div>
      </div>
      
      <!-- Loading State -->
      <div v-if="pending" class="absolute inset-0 flex items-center justify-center z-10">
        <div class="w-12 h-12 border-4 border-gray-800 border-t-[#C5162E] rounded-full animate-spin"></div>
      </div>

      <!-- Hero Content -->
      <div v-else-if="aboutData" class="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-8 flex flex-col justify-end pt-32 pb-24">
        <div class="overflow-hidden mb-6">
          <div 
            class="inline-block px-4 py-1.5 text-xs font-bold text-[#C5162E] bg-[#C5162E]/10 uppercase tracking-[0.3em] font-en w-max border border-[#C5162E]/30 backdrop-blur-sm transition-all duration-700 ease-out"
            :class="isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'"
          >
            SYRAX / ABOUT
          </div>
        </div>
        
        <div class="overflow-hidden mb-8">
          <h1 
            class="text-3xl md:text-6xl lg:text-6xl py-2 font-black text-white leading-[1.1] tracking-tighter transition-all duration-1000 delay-200 ease-out"
            :class="isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'"
          >
            {{ aboutData.title }}
          </h1>
        </div>

        <div class="overflow-hidden max-w-3xl">
          <p 
            class="text-gray-300 font-bold text-md md:text-lg lg:text-2xl leading-relaxed border-r-4 border-[#C5162E] pr-6 transition-all duration-1000 delay-400 ease-out"
            :class="isHeroVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'"
          >
            {{ aboutData.mission_statement }}
          </p>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="absolute inset-0 flex items-center justify-center z-10 flex-col gap-4">
        <p class="text-white font-bold bg-red-500/20 px-6 py-3 rounded border border-red-500/50">خطا در بارگذاری اطلاعات</p>
        <p class="text-red-400 text-sm font-en text-center bg-black/50 px-4 py-2 rounded">{{ error.message || error }}</p>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute lg:scale-1 scale-0 bottom-12 left-8 md:left-12 flex flex-col items-center gap-2 z-20 opacity-50 font-en text-white text-xs tracking-widest uppercase">
        <span class="-rotate-90 origin-bottom mb-8">Scroll</span>
        <div class="w-px h-16 bg-white/30 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-full bg-[#C5162E] animate-scroll-line"></div>
        </div>
      </div>
    </section>

    <!-- Content Section -->
    <section ref="contentRef" class="py-32 relative z-20">
      
      <!-- Decorative Background Grid -->
      <div class="absolute inset-0 pointer-events-none" style="background-image: radial-gradient(#d1d5db 1px, transparent 1px); background-size: 40px 40px; opacity: 0.3;"></div>
      
      <div class="max-w-[1400px] mx-auto px-6 lg:px-8 relative">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          <!-- Sidebar (Left side visually in RTL, meaning col-span-3 on the right in code, but flex handles it) -->
          <div class="hidden lg:flex lg:col-span-3 flex-col justify-start relative pt-4">
            <div class="sticky top-32">
              <div class="w-12 h-12 bg-[#0B0D10] flex items-center justify-center mb-8 relative">
                <div class="w-4 h-4 bg-[#C5162E]"></div>
                <!-- Animated decorative lines -->
                <div class="absolute -right-4 top-1/2 w-4 h-px bg-gray-300"></div>
                <div class="absolute -bottom-4 left-1/2 w-px h-4 bg-gray-300"></div>
              </div>
              <h3 class="text-[#0B0D10] font-black text-2xl mb-4 tracking-tight">مسیر قدرت</h3>
              <p class="text-gray-500 font-bold text-sm leading-loose">
                ما در سایراکس معتقدیم که هر مبارزه‌ای ابتدا در ذهن پیروز می‌شود. نظم، استقامت و تمرین مستمر، ارکان اصلی فلسفه‌ی ما هستند.
              </p>
            </div>
          </div>

          <!-- Main Content -->
          <div class="lg:col-span-9">
            <div v-if="pending" class="space-y-6">
              <div class="w-full h-6 bg-gray-200 animate-pulse rounded"></div>
              <div class="w-5/6 h-6 bg-gray-200 animate-pulse rounded"></div>
              <div class="w-4/6 h-6 bg-gray-200 animate-pulse rounded"></div>
            </div>
            
            <div 
              v-else-if="aboutData?.content" 
              class="custom-prose transition-all duration-1000 ease-out bg-white p-8 md:p-12 shadow-[10px_10px_0px_0px_rgba(11,13,16,0.05)] border border-gray-100 relative"
              :class="isContentVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'"
            >
              <!-- Decorative corner piece -->
              <div class="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#C5162E] -mt-1 -mr-1"></div>
              
              <div v-html="aboutData.content"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
    
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
const config = useRuntimeConfig()
const directusUrl = config.public.directus?.rest?.baseUrl || 'http://localhost:8055'

// Fetch the about_us singleton data via Directus REST API
const { data: aboutData, pending, error } = await useAsyncData('about-us-page', async () => {
  try {
    // During client-side navigation, use the Nuxt proxy to bypass CORS.
    // During SSR (refresh), hit Directus directly.
    const url = import.meta.client ? '/api/directus/items/about_us' : `${directusUrl}/items/about_us`
    const response = await $fetch<{ data: any }>(url)
    return response.data
  } catch (err) {
    console.error('Failed to fetch about_us data from Directus:', err)
    throw err
  }
})

// Scroll Animations
const heroRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const isHeroVisible = ref(false)
const isContentVisible = ref(false)

let observer: IntersectionObserver

onMounted(() => {
  // We trigger hero animation immediately on mount so it's always seen
  setTimeout(() => {
    isHeroVisible.value = true
  }, 100)

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === contentRef.value && entry.isIntersecting) {
        isContentVisible.value = true
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  if (contentRef.value) observer.observe(contentRef.value)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style>
/* Font */
.font-en {
  font-family: system-ui, -apple-system, sans-serif;
}

/* Animations */
@keyframes scroll-line {
  0% { transform: translateY(-100%); }
  50% { transform: translateY(0%); }
  100% { transform: translateY(100%); }
}
.animate-scroll-line {
  animation: scroll-line 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}

/* 
  Custom styling for WYSIWYG content to match the Neo-Brutalist & Elegant Syrax branding 
*/
.custom-prose {
  color: #4B5563; /* text-gray-600 */
  font-weight: 700;
  line-height: 2;
  font-size: 1.125rem;
}

.custom-prose h1, 
.custom-prose h2, 
.custom-prose h3, 
.custom-prose h4 {
  color: #0B0D10;
  font-weight: 900;
  letter-spacing: -0.025em;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Add a red square before all H2s in the content */
.custom-prose h2::before {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: #C5162E;
}

.custom-prose h1 { font-size: 2.5rem; }
.custom-prose h2 { font-size: 2rem; }
.custom-prose h3 { font-size: 1.5rem; }

.custom-prose p {
  margin-bottom: 1.5rem;
}

.custom-prose a {
  color: #C5162E;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.custom-prose a:hover {
  border-bottom-color: #C5162E;
}

.custom-prose strong, 
.custom-prose b {
  color: #0B0D10;
  font-weight: 900;
  background-color: #f3f4f6;
  padding: 0 4px;
}

.custom-prose ul {
  list-style-type: none;
  padding-right: 1.5rem;
  margin-bottom: 2rem;
}

.custom-prose ul li {
  position: relative;
  margin-bottom: 0.75rem;
}

.custom-prose ul li::before {
  content: '';
  position: absolute;
  right: -1.25rem;
  top: 0.6rem;
  width: 6px;
  height: 6px;
  background-color: #C5162E;
  transform: rotate(45deg);
}

.custom-prose ol {
  list-style-type: decimal;
  padding-right: 1.5rem;
  margin-bottom: 2rem;
}

.custom-prose ol li {
  margin-bottom: 0.75rem;
}

.custom-prose blockquote {
  border-right: 4px solid #C5162E;
  background-color: #f9fafb;
  padding: 1.5rem 2rem;
  margin: 2.5rem 0;
  font-style: italic;
  color: #111827; 
  position: relative;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.02);
}

.custom-prose blockquote::before {
  content: '"';
  position: absolute;
  top: -10px;
  right: 10px;
  font-size: 4rem;
  color: #C5162E;
  opacity: 0.2;
  font-family: serif;
}

.custom-prose img {
  width: 100%;
  border-radius: 0px; 
  box-shadow: 15px 15px 0px 0px rgba(11,13,16,0.1);
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;
  border: 2px solid #0B0D10;
  transition: transform 0.5s ease;
}

.custom-prose img:hover {
  transform: translate(-5px, -5px);
  box-shadow: 20px 20px 0px 0px rgba(197,22,46,0.2);
}
</style>
