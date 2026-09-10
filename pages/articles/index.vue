<template>
  <div class="min-h-screen bg-gray-50 pt-[8rem] pb-32 font-sans selection:bg-[#C5162E] selection:text-white" dir="rtl">
    
    <!-- Header Section -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8 mb-16 relative">
      <div class="flex flex-col items-center text-center">
        <h1 class="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
          ژورنال و <span class="text-[#C5162E]">رسانه</span>
        </h1>
        <p class="text-gray-600 max-w-2xl text-lg font-medium leading-relaxed">
          جدیدترین مقالات آموزشی، تحلیل‌های رزمی و ویدیوهای اختصاصی آکادمی نینجا سایراکس را در این بخش دنبال کنید.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="animate-pulse bg-white border border-gray-200 h-[400px] flex flex-col">
          <div class="h-56 bg-gray-200"></div>
          <div class="p-6 flex-1 flex flex-col gap-4">
            <div class="h-6 bg-gray-200 w-3/4"></div>
            <div class="h-4 bg-gray-200 w-1/2"></div>
            <div class="mt-auto h-10 bg-gray-200 w-full"></div>
          </div>
        </div>
      </div>

      <!-- Articles Grid -->
      <div v-else-if="articles && articles.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <NuxtLink 
          v-for="article in articles" 
          :key="article.id"
          :to="`/articles/${article.slug}`"
          class="group block relative h-full focus:outline-none focus:ring-4 focus:ring-[#C5162E]/30"
        >
          <!-- ============================== -->
          <!-- DESIGN 1: MEDIA / GALLERY CARD -->
          <!-- ============================== -->
          <div v-if="isVideoType(article.post_type)" class="relative h-[420px] w-full overflow-hidden bg-gray-900 shadow-lg hover:shadow-2xl transition-all duration-500">
            <!-- Cover Image -->
            <img 
              v-if="article.cover_image"
              :src="getMediaUrl(article.cover_image)" 
              :alt="article.title" 
              class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-700"
            />
            
            <!-- Dark Gradient for Text Readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

            <!-- Play / Gallery Icon Center -->
            <div class="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <div class="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-[#C5162E] group-hover:scale-110 transition-all duration-500 shadow-xl">
                <svg v-if="article.post_type === 'video'" class="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                <svg v-else class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
            </div>

            <!-- Text Content overlay -->
            <div class="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col">
              <div class="px-3 py-1 mb-3 text-[10px] font-black uppercase tracking-widest bg-[#C5162E] text-white self-start">
                رسانه تصویری
              </div>
              <h3 class="text-white font-black text-xl leading-snug group-hover:text-red-400 transition-colors">
                {{ article.title }}
              </h3>
              <div class="mt-3 flex items-center gap-2 text-xs font-medium text-gray-300">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span>{{ formatDate(article.date_published) }}</span>
              </div>
            </div>
          </div>

          <!-- ============================== -->
          <!-- DESIGN 2: STANDARD ARTICLE CARD -->
          <!-- ============================== -->
          <div v-else class="flex flex-col h-full bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group-hover:-translate-y-1">
            <!-- Top Red Line on Hover -->
            <div class="absolute top-0 left-0 w-full h-1 bg-transparent group-hover:bg-[#C5162E] transition-colors z-20"></div>

            <!-- Cover Image Area -->
            <div class="relative h-56 w-full overflow-hidden bg-gray-100">
              <img 
                v-if="article.cover_image"
                :src="getMediaUrl(article.cover_image)" 
                :alt="article.title" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
                <span class="font-black text-3xl opacity-50">SYRAX</span>
              </div>
              
              <!-- Badge -->
              <div class="absolute top-4 right-4 z-20 px-3 py-1 text-[10px] font-black uppercase tracking-wider bg-white text-gray-900 shadow-sm">
                {{ article.post_type || 'مقاله' }}
              </div>
            </div>

            <!-- Content Area -->
            <div class="px-6 pb-6 pt-5 flex flex-col flex-1 relative z-10">
              
              <div v-if="article.tags && article.tags.length" class="flex flex-wrap gap-2 mb-3">
                <span 
                  v-for="(tag, idx) in article.tags.slice(0, 3)" 
                  :key="idx" 
                  class="text-[11px] font-bold text-[#C5162E]"
                >
                  #{{ tag }}
                </span>
              </div>

              <h3 class="text-gray-900 font-black text-xl mb-4 leading-snug group-hover:text-[#C5162E] transition-colors duration-300">
                {{ article.title }}
              </h3>

              <!-- Footer -->
              <div class="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                <!-- Author -->
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-gray-100 overflow-hidden shrink-0">
                    <img 
                      v-if="getMediaUrl(article.author_id?.avatar || article.author_id?.image)" 
                      :src="getMediaUrl(article.author_id?.avatar || article.author_id?.image)" 
                      :alt="article.author_id?.name"
                      class="w-full h-full object-cover"
                    />
                  </div>
                  <span class="text-sm font-bold text-gray-700">
                    {{ article.author_id?.name || 'آکادمی سایراکس' }}
                  </span>
                </div>

                <!-- Date -->
                <div class="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                  <span>{{ formatDate(article.date_published) }}</span>
                </div>
              </div>

            </div>
          </div>
        </NuxtLink>

      </div>

      <!-- Empty State -->
      <div v-else class="border border-gray-200 p-12 text-center bg-white shadow-sm max-w-2xl mx-auto mt-12">
        <h2 class="text-xl font-bold text-gray-500">مقاله‌ای یافت نشد.</h2>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAsyncData, useRuntimeConfig, useSeoMeta } from '#imports'

useSeoMeta({
  title: 'ژورنال و رسانه | آکادمی نینجا سایراکس',
  description: 'مقالات آموزشی، تحلیل‌های رزمی و ویدیوهای اختصاصی آکادمی سایراکس.',
  ogTitle: 'ژورنال و رسانه | SYRAX Journal',
  ogDescription: 'آخرین محتواهای آموزشی و ویدیوهای تکنیکال هنرهای رزمی نینجا.'
})

const config = useRuntimeConfig()
const directusUrl = config.public.directus?.rest?.baseUrl || 'http://localhost:8055'

const { data: response, error, pending } = await useAsyncData(
  'all-articles',
  async () => {
    const url = import.meta.server ? `${directusUrl}/items/articles` : `/api/directus/items/articles`
    const res = await $fetch<{ data: any[] }>(url, {
      params: {
        'fields': '*',
        'sort': '-date_published'
      }
    })
    return res
  }
)

if (error.value) {
  console.error('Directus Fetch Error on index:', error.value)
}

const articles = computed(() => response.value?.data || [])

function isVideoType(type: string | undefined) {
  return type === 'ویدئو / رسانه' || type === 'video'
}

function getMediaUrl(mediaItem: any): string {
  if (!mediaItem) return ''
  if (typeof mediaItem === 'string') {
    return `${directusUrl}/assets/${mediaItem}`
  }
  const fileObj = mediaItem.directus_files_id || mediaItem
  const fileId = typeof fileObj === 'string' ? fileObj : fileObj?.id
  return fileId ? `${directusUrl}/assets/${fileId}` : ''
}

function formatDate(dateStr: string | undefined | null) {
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
/* No specific styles needed anymore, Tailwind handles the layout! */
</style>
