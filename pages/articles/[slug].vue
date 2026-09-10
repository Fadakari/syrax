<template>
  <div class="min-h-screen bg-gray-50 pt-24 pb-32 font-sans selection:bg-[#C5162E] selection:text-white" dir="rtl">
    
    <!-- Loading State -->
    <div v-if="pending" class="max-w-5xl mx-auto px-6 mt-12 text-center">
      <div class="animate-pulse flex flex-col gap-8">
        <div class="h-12 bg-gray-200 w-1/3 mx-auto"></div>
        <div class="h-[40vh] bg-gray-200 w-full"></div>
        <div class="h-6 bg-gray-200 w-full"></div>
        <div class="h-6 bg-gray-200 w-5/6"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error || !article" class="max-w-3xl mx-auto px-6 mt-32 text-center text-gray-900">
      <h1 class="text-7xl font-black mb-4 text-gray-300">404</h1>
      <p class="text-xl mb-8 font-medium">مقاله‌ای با این آدرس پیدا نشد یا خطایی رخ داده است.</p>
      <NuxtLink to="/articles" class="inline-block px-8 py-4 bg-[#C5162E] text-white font-bold hover:bg-red-700 transition-colors">
        بازگشت به ژورنال
      </NuxtLink>
    </div>

    <!-- Article & Media Layout -->
    <div v-else>
      
      <!-- ============================================== -->
      <!-- LAYOUT 1: MEDIA & GALLERY (isVideoType == true) -->
      <!-- ============================================== -->
      <div v-if="isVideoType(article.post_type)" class="w-full">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 mt-8">
          
          <div class="mb-12 text-center">
            <span class="inline-block px-3 py-1 mb-4 text-[11px] font-black uppercase tracking-widest bg-[#C5162E] text-white rounded-full">
              گالری رسانه
            </span>
            <h1 class="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-4">{{ article.title }}</h1>
            <div class="flex items-center justify-center gap-4 text-sm font-bold text-gray-500">
              <span>{{ article.author_id?.name || 'آکادمی سایراکس' }}</span>
              <span>•</span>
              <span>{{ formatDate(article.date_published) }}</span>
            </div>
          </div>

          <!-- Cover Image / Main Video -->
          <div v-if="article.cover_image || article.media_file" class="relative w-full max-w-5xl mx-auto aspect-video bg-black shadow-xl mb-16 rounded-xl overflow-hidden group">
            <video 
              v-if="article.media_file && article.media_file.type?.startsWith('video')" 
              :src="getMediaUrl(article.media_file.id)" 
              controls 
              class="w-full h-full object-cover"
              :poster="getMediaUrl(article.cover_image)"
            ></video>
            <img 
              v-else-if="article.cover_image"
              :src="getMediaUrl(article.cover_image)" 
              :alt="article.title" 
              class="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-700"
              @click="openLightbox(getMediaUrl(article.cover_image), article.title, false)"
            />
          </div>

          <!-- GALLERY GRID -->
          <div v-if="galleryFiles.length > 0" class="max-w-6xl mx-auto">
            <h3 class="text-2xl font-black text-gray-900 mb-8 border-r-4 border-[#C5162E] pr-4">گالری تصاویر و ویدیوها</h3>
            
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div 
                v-for="(file, idx) in galleryFiles" 
                :key="idx"
                class="group flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                @click="openLightbox(getMediaUrl(file.id), file.description || file.title, file.type?.startsWith('video'))"
              >
                <!-- Thumbnail -->
                <div class="relative w-full aspect-square bg-gray-100 overflow-hidden">
                  <video 
                    v-if="file.type?.startsWith('video')" 
                    :src="getMediaUrl(file.id)" 
                    class="w-full h-full object-cover"
                    preload="metadata"
                  ></video>
                  <img 
                    v-else 
                    :src="getMediaUrl(file.id)" 
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <!-- Video Icon Overlay -->
                  <div v-if="file.type?.startsWith('video')" class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                    <div class="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                      <svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                </div>
                
                <!-- Caption -->
                <div v-if="file.description || file.title" class="p-4 text-sm text-gray-600 text-center font-medium line-clamp-2">
                  {{ file.description || file.title }}
                </div>
              </div>
            </div>
          </div>

          <!-- Optional Text Content -->
          <div v-if="article.content && article.content.trim() !== ''" class="max-w-4xl mx-auto mt-16 prose prose-lg prose-red text-gray-800 text-center" v-html="article.content"></div>
        </div>
      </div>

      <!-- ============================================== -->
      <!-- LAYOUT 2: STANDARD ARTICLE (isVideoType == false) -->
      <!-- ============================================== -->
      <article v-else class="max-w-4xl mx-auto px-6 lg:px-8 mt-8">
        
        <!-- Header -->
        <header class="mb-12 text-center">
          <div v-if="parsedTags.length" class="flex flex-wrap justify-center gap-2 mb-6">
            <span v-for="(tag, idx) in parsedTags" :key="idx" class="text-sm font-bold text-[#C5162E]">
              #{{ tag }}
            </span>
          </div>
          <h1 class="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-8">{{ article.title }}</h1>
          
          <div class="flex items-center justify-center gap-4 text-sm font-bold text-gray-500 border-y border-gray-200 py-4">
            <div class="flex items-center gap-2">
              <img 
                v-if="getMediaUrl(article.author_id?.avatar || article.author_id?.image)" 
                :src="getMediaUrl(article.author_id?.avatar || article.author_id?.image)" 
                class="w-8 h-8 rounded-full object-cover"
              />
              <span>{{ article.author_id?.name || 'آکادمی سایراکس' }}</span>
            </div>
            <span>|</span>
            <span>{{ formatDate(article.date_published) }}</span>
          </div>
        </header>

        <!-- Cover Image -->
        <div v-if="article.cover_image" class="w-full mb-16 shadow-lg border border-gray-100 rounded-xl overflow-hidden">
          <img 
            :src="getMediaUrl(article.cover_image)" 
            :alt="article.title" 
            class="w-full h-auto object-cover max-h-[600px]"
          />
        </div>

        <!-- Typography Content -->
        <div class="prose prose-lg prose-red max-w-none mx-auto text-gray-800 article-content-styled" v-html="article.content"></div>

      </article>

    </div>

    <!-- ============================================== -->
    <!-- LIGHTBOX OVERLAY -->
    <!-- ============================================== -->
    <div 
      v-if="lightbox.isOpen" 
      class="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 transition-opacity duration-300"
      @click.self="closeLightbox"
    >
      <button @click="closeLightbox" class="absolute top-6 right-8 text-white text-5xl hover:text-[#C5162E] transition-colors focus:outline-none">&times;</button>
      
      <div class="relative max-w-6xl max-h-[80vh] w-full flex justify-center items-center">
        <video 
          v-if="lightbox.isVideo" 
          :src="lightbox.url" 
          controls 
          autoplay
          class="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
        ></video>
        <img 
          v-else 
          :src="lightbox.url" 
          class="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
        />
      </div>
      
      <div v-if="lightbox.caption" class="mt-8 text-white text-xl font-medium text-center max-w-4xl px-4">
        {{ lightbox.caption }}
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useRoute, useAsyncData, useRuntimeConfig, useSeoMeta } from '#imports'

const config = useRuntimeConfig()
const directusUrl = config.public.directus?.rest?.baseUrl || 'http://localhost:8055'

const route = useRoute()
const slug = computed(() => route.params.slug as string)

// Lightbox State
const lightbox = reactive({
  isOpen: false,
  url: '',
  caption: '',
  isVideo: false
})

function openLightbox(url: string, caption: string, isVideo: boolean) {
  lightbox.url = url
  lightbox.caption = caption
  lightbox.isVideo = isVideo
  lightbox.isOpen = true
  document.body.style.overflow = 'hidden' // Prevent scrolling
}

function closeLightbox() {
  lightbox.isOpen = false
  lightbox.url = ''
  lightbox.caption = ''
  setTimeout(() => {
    document.body.style.overflow = ''
  }, 100)
}

const { data: response, error, pending } = await useAsyncData(
  `article-${slug.value}`,
  async () => {
    const url = import.meta.server ? `${directusUrl}/items/articles` : `/api/directus/items/articles`
    return await $fetch<{ data: any[] }>(url, {
      params: {
        'filter[slug][_eq]': slug.value,
        // We fetch gallery_files.* to get the junction table, and directus_files_id.* to get the actual file metadata
        'fields': '*,media_file.*,gallery_files.*,gallery_files.directus_files_id.*'
      }
    })
  },
  { watch: [slug] }
)

const articleData = computed(() => response.value?.data || [])

const article = computed(() => {
  if (articleData.value && Array.isArray(articleData.value) && articleData.value.length > 0) {
    return articleData.value[0]
  }
  return null
})

// Extract Gallery Files safely from the junction collection
const galleryFiles = computed(() => {
  if (!article.value?.gallery_files) return []
  const files = []
  for (const item of article.value.gallery_files) {
    // Handle both M2M junction object (item.directus_files_id) or direct M2A object
    const fileObj = item.directus_files_id || item.item || item
    if (fileObj && fileObj.id) {
      files.push(fileObj)
    }
  }
  return files
})

useSeoMeta({
  title: () => article.value ? `${article.value.title} | آکادمی سایراکس` : 'مقاله یافت نشد',
  ogTitle: () => article.value?.title || '',
  description: () => {
    if (!article.value?.content) return ''
    const plainText = article.value.content.replace(/<[^>]*>?/gm, '')
    return plainText.substring(0, 160) + '...'
  },
  ogImage: () => getMediaUrl(article.value?.cover_image)
})

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

const parsedTags = computed(() => {
  const tagsData = article.value?.tags
  if (!tagsData) return []
  if (Array.isArray(tagsData)) return tagsData
  if (typeof tagsData === 'string') return tagsData.split(',').map(t => t.trim()).filter(Boolean)
  return []
})
</script>

<style>
/* --- ARTICLE STYLES (Focus on typography) --- */
.article-content-styled p {
  margin-bottom: 1.5rem;
  line-height: 2.2;
}
.article-content-styled h1, 
.article-content-styled h2, 
.article-content-styled h3 {
  color: #111827;
  font-weight: 900;
  margin-top: 2.5rem;
  margin-bottom: 1.2rem;
}
.article-content-styled img {
  border-radius: 8px;
  margin: 2.5rem auto;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
.article-content-styled a {
  color: #C5162E;
  text-decoration: underline;
  text-underline-offset: 4px;
}
</style>
