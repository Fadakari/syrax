<template>
  <main class="min-h-screen bg-[#0B0D10] pt-32 pb-24 font-sans selection:bg-[#C5162E] selection:text-white" dir="rtl">
    
    <!-- Subtle Background Glow -->
    <div class="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C5162E] via-transparent to-transparent pointer-events-none"></div>

    <div class="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-20">
      
      <!-- Page Header -->
      <header class="mb-16 flex flex-col justify-center">
        <h1 class="text-4xl lg:text-5xl font-black text-white leading-tight mb-6 tracking-tighter accent-slash inline-block w-max">
          ژورنال و رسانه
        </h1>
        <p class="text-gray-400 font-bold text-sm leading-relaxed mb-6 max-w-2xl">
          آخرین مقالات آموزشی، تکنیک‌ها، تحلیل مبارزات و ویدیوهای اختصاصی آکادمی نینجا سایراکس.
        </p>
      </header>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="h-[460px] animate-pulse bg-[#121418] clip-aggressive-card border-2 border-gray-800/50"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="border-2 border-[#C5162E] bg-[#121418] p-8 max-w-2xl clip-aggressive-card">
        <h2 class="text-white font-black text-2xl mb-2">خطا در دریافت اطلاعات</h2>
        <p class="text-gray-400 font-bold text-sm">{{ error.message || error }}</p>
      </div>

      <!-- Articles / Media Grid -->
      <div v-else-if="articles && articles.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <NuxtLink 
          v-for="article in articles" 
          :key="article.slug"
          :to="`/articles/${article.slug}`"
          class="group relative flex flex-col bg-[#121418] border-2 border-transparent hover:border-gray-800 transition-all duration-500 ease-out hover:-translate-y-2 clip-aggressive-card"
        >
          <!-- Hover Glow Effect Background -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#C5162E]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <!-- Top Accent Line -->
          <div class="absolute top-0 left-0 w-full h-1 bg-gray-800 group-hover:bg-[#C5162E] transition-colors duration-500 z-10"></div>

          <!-- Media / Cover Area -->
          <div class="relative h-[260px] w-full overflow-hidden bg-black">
            
            <!-- Cover Image -->
            <img 
              v-if="article.cover_image"
              :src="getMediaUrl(article.cover_image)" 
              :alt="article.title" 
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              :class="isVideoType(article.post_type) ? 'grayscale-0' : 'grayscale-[30%] group-hover:grayscale-0'"
            />
            <div v-else class="w-full h-full flex items-center justify-center bg-gray-900 text-gray-700">
              <span class="font-black text-4xl opacity-20">SYRAX</span>
            </div>

            <!-- Gradient overlay for text readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#121418] via-[#121418]/20 to-transparent"></div>

            <!-- TYPE: VIDEO (Play Button Overlay) -->
            <div v-if="isVideoType(article.post_type)" class="absolute inset-0 flex items-center justify-center z-20">
              <div class="w-16 h-16 bg-[#C5162E]/90 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(197,22,46,0.6)] group-hover:scale-110 group-hover:bg-[#C5162E] transition-all duration-500 clip-aggressive-card">
                <svg class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>

            <!-- Post Type Badge -->
            <div class="absolute top-4 right-4 z-20 px-3 py-1.5 text-[11px] font-black uppercase tracking-wider shadow-md backdrop-blur-md"
                 :class="isVideoType(article.post_type) ? 'bg-[#C5162E] text-white' : 'bg-white text-black'">
              {{ article.post_type || 'مقاله' }}
            </div>
          </div>

          <!-- Content Area -->
          <div class="px-6 pb-8 pt-4 flex flex-col flex-1 relative z-10">
            
            <!-- Tags (First 3) -->
            <div v-if="article.tags && article.tags.length" class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="(tag, idx) in article.tags.slice(0, 3)" 
                :key="idx" 
                class="text-xs font-bold text-gray-500 group-hover:text-gray-400 transition-colors"
              >
                #{{ tag }}
              </span>
            </div>

            <!-- Title -->
            <h3 class="text-white font-black text-xl mb-6 leading-snug group-hover:text-[#C5162E] transition-colors duration-300">
              {{ article.title }}
            </h3>

            <!-- Footer: Author & Date -->
            <div class="mt-auto pt-5 border-t border-gray-800/80 flex items-center justify-between">
              
              <!-- Author -->
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-gray-800 overflow-hidden border-2 border-gray-700 shrink-0">
                  <img 
                    v-if="getMediaUrl(article.author_id?.avatar || article.author_id?.image)" 
                    :src="getMediaUrl(article.author_id?.avatar || article.author_id?.image)" 
                    :alt="article.author_id?.name"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center bg-gray-900">
                    <svg class="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                  </div>
                </div>
                <span class="text-sm font-bold text-gray-300 group-hover:text-white transition-colors">
                  {{ article.author_id?.name || 'تحریریه سایراکس' }}
                </span>
              </div>

              <!-- Date -->
              <div class="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span>{{ formatDate(article.date_published) }}</span>
              </div>

            </div>

          </div>

        </NuxtLink>

      </div>

      <!-- Empty State -->
      <div v-else class="border-2 border-gray-800 p-12 text-center bg-[#121418] clip-aggressive-card max-w-2xl mx-auto mt-12">
        <h2 class="text-xl font-bold text-gray-400">هیچ مقاله‌ای یافت نشد.</h2>
      </div>

    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'

useSeoMeta({
  title: 'ژورنال و رسانه | آکادمی نینجا سایراکس',
  description: 'مقالات آموزشی، تحلیل‌های رزمی و ویدیوهای اختصاصی آکادمی سایراکس.',
  ogTitle: 'ژورنال و رسانه | SYRAX Journal',
  ogDescription: 'آخرین محتواهای آموزشی و ویدیوهای تکنیکال هنرهای رزمی نینجا.'
})

const config = useRuntimeConfig()
const directusUrl = config.public.directus?.rest?.baseUrl || 'http://localhost:8055'

const { data: articles, pending, error } = await useAsyncData(
  'articles-page',
  () => useDirectusRest(readItems('articles', {
    fields: ['*', 'author_id.*'],
    sort: ['-date_published']
  }))
)

// Utility to check post type
const isVideoType = (type: string | undefined) => {
  return type === 'ویدئو / رسانه' || type === 'video'
}

// Media Extractor for Covers and Avatars
const getMediaUrl = (mediaItem: any): string => {
  if (!mediaItem) return ''
  if (typeof mediaItem === 'string') {
    return `${directusUrl}/assets/${mediaItem}`
  }
  const fileObj = mediaItem.directus_files_id || mediaItem
  const fileId = typeof fileObj === 'string' ? fileObj : fileObj?.id
  return fileId ? `${directusUrl}/assets/${fileId}` : ''
}

// Format Date
const formatDate = (dateStr: string | undefined | null) => {
  if (!dateStr) return 'نامشخص'
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Tehran'
    }).format(d)
  } catch {
    return dateStr
  }
}
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

.clip-aggressive-card {
  clip-path: polygon(
    20px 0, 
    100% 0, 
    100% calc(100% - 20px), 
    calc(100% - 20px) 100%, 
    0 100%, 
    0 20px
  );
}
</style>
