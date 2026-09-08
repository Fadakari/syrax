<template>
  <main class="min-h-screen bg-[#0B0D10] pt-24 pb-32 font-sans selection:bg-[#C5162E] selection:text-white" dir="rtl">
    
    <!-- Background Glow -->
    <div class="fixed top-0 right-0 w-full h-[600px] opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C5162E] via-transparent to-transparent pointer-events-none"></div>

    <!-- Loading State -->
    <div v-if="pending" class="max-w-5xl mx-auto px-6 lg:px-8 mt-12 animate-pulse">
      <div class="w-full h-[50vh] bg-[#121418] clip-aggressive-card mb-8"></div>
      <div class="w-3/4 h-12 bg-[#121418] mb-6"></div>
      <div class="w-1/2 h-6 bg-[#121418] mb-12"></div>
      <div class="space-y-4">
        <div class="w-full h-4 bg-[#121418]"></div>
        <div class="w-full h-4 bg-[#121418]"></div>
        <div class="w-5/6 h-4 bg-[#121418]"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !article" class="max-w-2xl mx-auto px-6 mt-32 text-center">
      <h1 class="text-6xl font-black text-[#C5162E] mb-6 tracking-tighter">404</h1>
      <h2 class="text-2xl font-bold text-white mb-8">مقاله‌ای با این آدرس پیدا نشد یا خطایی رخ داده است.</h2>
      
      <!-- Debug Info for the Developer -->
      <div class="mb-8 p-4 bg-black text-left border border-red-500 text-xs overflow-auto" dir="ltr">
        <div v-if="error" class="text-red-400">Fetch Error: {{ error }}</div>
        <div v-if="!article" class="text-yellow-400">
          State: Article is null.<br/>
          Evaluated Slug: "{{ slug }}"<br/>
          ArticleData from Directus: {{ articleData || 'undefined' }}
        </div>
      </div>

      <NuxtLink to="/articles" class="inline-flex items-center gap-2 bg-gray-800 hover:bg-[#C5162E] text-white px-8 py-4 font-black transition-colors duration-300 clip-aggressive-card">
        بازگشت به ژورنال
        <svg class="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </NuxtLink>
    </div>

    <!-- Article Content -->
    <article v-else-if="article" class="max-w-5xl mx-auto px-6 lg:px-8 relative z-20 mt-8">
      
      <!-- Top Breadcrumb / Badge -->
      <div class="flex items-center gap-4 mb-8">
        <NuxtLink to="/articles" class="text-gray-500 hover:text-white font-bold text-sm transition-colors flex items-center gap-1.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          بازگشت به مطالب
        </NuxtLink>
        <div class="w-1.5 h-1.5 rounded-full bg-gray-800"></div>
        <span class="text-[#C5162E] text-xs font-black uppercase tracking-wider bg-[#C5162E]/10 px-3 py-1">
          {{ article.post_type || 'مقاله' }}
        </span>
      </div>

      <!-- Hero Section (Differentiated by Type) -->
      <div class="w-full mb-12 shadow-2xl relative group bg-black clip-aggressive-card overflow-hidden">
        
        <!-- VIDEO HERO -->
        <template v-if="isVideoType(article.post_type) && article.media_file">
          <div class="relative w-full aspect-video bg-black flex items-center justify-center border-4 border-gray-900 group-hover:border-gray-700 transition-colors duration-500">
            <video 
              controls 
              :poster="getMediaUrl(article.cover_image)" 
              class="w-full h-full object-contain outline-none focus:outline-none"
            >
              <source :src="getMediaUrl(article.media_file)" type="video/mp4" />
              مرورگر شما از پخش این ویدیو پشتیبانی نمی‌کند.
            </video>
          </div>
        </template>

        <!-- ARTICLE IMAGE HERO -->
        <template v-else>
          <div class="relative w-full h-[40vh] md:h-[60vh] bg-gray-900 border-b-4 border-[#C5162E]">
            <img 
              v-if="article.cover_image"
              :src="getMediaUrl(article.cover_image)" 
              :alt="article.title" 
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700"
            />
            <div v-else class="w-full h-full flex items-center justify-center text-gray-800 font-black text-6xl">SYRAX</div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-transparent to-transparent"></div>
          </div>
        </template>
        
      </div>

      <!-- Header Information (Title, Author, Meta) -->
      <header class="mb-14 border-b-2 border-gray-800/60 pb-10">
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-8 drop-shadow-md">
          {{ article.title }}
        </h1>

        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <!-- Author Profile (E-E-A-T) -->
          <div class="flex items-center gap-4 bg-[#121418] border-2 border-gray-800 p-3 pr-4 clip-aggressive-card w-max">
            <div class="w-12 h-12 bg-black border-2 border-[#C5162E] overflow-hidden shrink-0 transform -rotate-3">
              <img 
                v-if="getMediaUrl(article.author_id?.avatar || article.author_id?.image)" 
                :src="getMediaUrl(article.author_id?.avatar || article.author_id?.image)" 
                :alt="article.author_id?.name"
                class="w-full h-full object-cover transform rotate-3 scale-110"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gray-900 text-[#C5162E]">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
            </div>
            <div>
              <p class="text-xs text-gray-500 font-bold mb-0.5">نگارنده / استاد</p>
              <p class="text-white font-black text-sm">{{ article.author_id?.name || 'تحریریه آکادمی سایراکس' }}</p>
            </div>
          </div>

          <!-- Meta Info -->
          <div class="flex items-center gap-6 text-sm font-bold text-gray-400">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-[#C5162E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              <span>{{ formatDate(article.date_published) }}</span>
            </div>
          </div>

        </div>
      </header>

      <!-- Main Content (WYSIWYG) -->
      <div v-if="article.content" class="article-content" v-html="article.content"></div>
      <div v-else class="text-gray-500 font-bold italic py-8">
        متنی برای این محتوا درج نشده است.
      </div>

      <!-- Footer Tags -->
      <footer class="mt-20 pt-8 border-t-2 border-gray-800">
        <h3 class="text-white font-black text-lg mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-[#C5162E]" fill="currentColor" viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.41l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.36-.36.59-.86.59-1.41s-.23-1.06-.59-1.41zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>
          برچسب‌های مرتبط:
        </h3>
        <div v-if="parsedTags.length" class="flex flex-wrap gap-3">
          <span 
            v-for="(tag, idx) in parsedTags" 
            :key="idx" 
            class="bg-[#121418] border border-gray-800 px-4 py-2 text-sm font-bold text-gray-400 hover:text-white hover:border-[#C5162E] transition-colors cursor-pointer"
          >
            #{{ tag }}
          </span>
        </div>
        <p v-else class="text-gray-600 text-sm font-bold">برچسبی یافت نشد.</p>
      </footer>

    </article>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useAsyncData, useRuntimeConfig, useSeoMeta, createError } from '#imports'

const config = useRuntimeConfig()
const directusUrl = config.public.directus?.rest?.baseUrl || 'http://localhost:8055'

const route = useRoute()
let rawSlug = route.params.slug
if (Array.isArray(rawSlug)) rawSlug = rawSlug[0]

// Deterministic URL extraction to survive Vue Router hydration lag
let currentPath = route.path
if (import.meta.client) {
  currentPath = window.location.pathname
}
const pathSegments = currentPath.split('/').filter(Boolean)
const slug = (rawSlug || pathSegments.pop() || '').trim()

// The key MUST be unique to the slug to prevent hydration mismatch and router hanging
const { data: articleData, pending, error } = await useAsyncData(
  `article-${slug}`,
  () => useDirectusRest(readItems('articles', {
    filter: { slug: { _eq: slug } },
    fields: ['*', 'author_id.*']
  }))
)

// Extract the single article object from the returned array
const article = computed(() => {
  if (articleData.value && Array.isArray(articleData.value) && articleData.value.length > 0) {
    return articleData.value[0]
  }
  return null
})

// Dynamic SEO Meta Tags based on Article Content
useSeoMeta({
  title: () => article.value ? `${article.value.title} | آکادمی سایراکس` : 'مقاله یافت نشد',
  ogTitle: () => article.value?.title || '',
  description: () => {
    if (!article.value?.content) return ''
    // Strip HTML tags for SEO description
    const plainText = article.value.content.replace(/<[^>]*>?/gm, '')
    return plainText.substring(0, 160) + '...'
  },
  ogImage: () => getMediaUrl(article.value?.cover_image)
})

// Utility Check Post Type
const isVideoType = (type: string | undefined) => {
  return type === 'ویدئو / رسانه' || type === 'video'
}

// Extractor for directus files
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

// Parse Tags properly (CSV string or Array)
const parsedTags = computed(() => {
  const tagsData = article.value?.tags
  if (!tagsData) return []
  if (Array.isArray(tagsData)) return tagsData
  if (typeof tagsData === 'string') return tagsData.split(',').map(t => t.trim()).filter(Boolean)
  return []
})

import { onMounted } from 'vue'
import { useNuxtApp } from '#imports'
const nuxtApp = useNuxtApp()
onMounted(() => {
  console.log('--- SYRAX DEBUG ---')
  console.log('Slug:', slug)
  console.log('Key:', `article-${slug}`)
  console.log('Has Payload Data?', !!nuxtApp.payload.data[`article-${slug}`])
  console.log('Payload Data:', nuxtApp.payload.data[`article-${slug}`])
  console.log('Article Data State:', articleData.value)
  console.log('Error State:', error.value)
  console.log('-------------------')
})
</script>

<style>
/* 
  WYSIWYG Global Styles specifically for the article content wrapper 
  (Not scoped so v-html inner elements get targeted reliably)
*/
.article-content {
  color: #D1D5DB; /* text-gray-300 */
  font-weight: 700;
  line-height: 2;
  font-size: 1.05rem;
}

.article-content h1, 
.article-content h2, 
.article-content h3, 
.article-content h4 {
  color: #FFFFFF;
  font-weight: 900;
  margin-top: 2.5rem;
  margin-bottom: 1.25rem;
  line-height: 1.4;
}

.article-content h1 { font-size: 2.25rem; }
.article-content h2 { font-size: 1.875rem; border-bottom: 2px solid rgba(197, 22, 46, 0.3); padding-bottom: 0.5rem; }
.article-content h3 { font-size: 1.5rem; color: #C5162E; }

.article-content p {
  margin-bottom: 1.5rem;
}

.article-content img {
  border: 4px solid #1f2937; /* gray-800 */
  width: 100%;
  max-height: 500px;
  object-fit: contain;
  background-color: #000;
  margin: 2.5rem 0;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
}

.article-content a {
  color: #C5162E;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.article-content a:hover {
  border-bottom-color: #C5162E;
}

.article-content ul, 
.article-content ol {
  padding-right: 1.5rem;
  margin-bottom: 1.5rem;
  background-color: rgba(255, 255, 255, 0.02);
  border-right: 4px solid #374151; /* gray-700 */
  padding: 1.5rem 1.5rem 1.5rem 1rem;
}

.article-content ul { list-style-type: none; }
.article-content ol { list-style-type: decimal; }

.article-content ul li {
  position: relative;
  margin-bottom: 0.75rem;
}

.article-content ul li::before {
  content: '';
  position: absolute;
  right: -1.25rem;
  top: 0.75rem;
  width: 6px;
  height: 6px;
  background-color: #C5162E;
  transform: rotate(45deg);
}

.article-content blockquote {
  border-right: 4px solid #C5162E;
  padding-right: 1.5rem;
  color: #9CA3AF;
  font-style: italic;
  background-color: #121418;
  padding: 1.5rem;
  margin: 2.5rem 0;
  font-size: 1.1rem;
}

.article-content strong, 
.article-content b {
  color: #FFFFFF;
  font-weight: 900;
  background-color: rgba(197, 22, 46, 0.1);
  padding: 0 4px;
}
</style>
