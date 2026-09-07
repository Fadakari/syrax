<template>
  <main class="min-h-screen bg-[#F5F5F2] pt-32 pb-24 font-sans selection:bg-[#C5162E] selection:text-white" dir="rtl">
    
    <!-- Subtle Background Glow (Matching Homepage & Classes Section) -->
    <div class="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C5162E] via-transparent to-transparent pointer-events-none"></div>

    <div class="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-20">
      
      <!-- Page Header -->
      <header class="mb-12 flex flex-col justify-center">
        <h1 class="text-4xl lg:text-5xl font-black text-black leading-tight mb-6 tracking-tighter accent-slash inline-block w-max">
          مسابقات و افتخارات
        </h1>
        <p class="text-gray-800 font-bold text-sm leading-relaxed mb-6 max-w-2xl">
          رویدادها، نتایج و مدال‌های کسب‌شده توسط قهرمانان آکادمی نینجا سایراکس در میادین قهرمانی.
        </p>
      </header>

      <!-- Search & Filter Bar (Matching Classes page style) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-gray-800 bg-[#F5F5F2] mb-16">
        
        <!-- Search Input -->
        <div class="border-b-2 md:border-b-0 md:border-l-2 border-gray-800 relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="جستجوی مسابقه یا قهرمان..." 
            class="w-full h-14 pl-12 pr-6 bg-transparent text-black font-bold placeholder-gray-600 outline-none rounded-none text-sm focus:bg-gray-800/50 transition-colors"
          />
        </div>

        <!-- Rank Filter -->
        <div class="border-b-2 md:border-b-0 md:border-l-2 border-gray-800 relative">
          <select 
            v-model="selectedRank" 
            class="w-full h-14 px-6 bg-transparent text-black font-bold appearance-none outline-none rounded-none text-sm cursor-pointer focus:bg-gray-800/50 transition-colors"
          >
            <option value="" class="bg-[#F5F5F2]">همه مقام‌ها (Rank)</option>
            <option v-for="rank in uniqueRanks" :key="rank" :value="rank" class="bg-[#F5F5F2]">{{ rank }}</option>
          </select>
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <div class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-gray-500"></div>
          </div>
        </div>

        <!-- Location Filter -->
        <div class="relative">
          <select 
            v-model="selectedLocation" 
            class="w-full h-14 px-6 bg-transparent text-black font-bold appearance-none outline-none rounded-none text-sm cursor-pointer focus:bg-gray-800/50 transition-colors"
          >
            <option value="" class="bg-[#F5F5F2]">همه شهرها و مکان‌ها</option>
            <option v-for="loc in uniqueLocations" :key="loc" :value="loc" class="bg-[#F5F5F2]">{{ loc }}</option>
          </select>
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <div class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-gray-500"></div>
          </div>
        </div>

      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 3" :key="i" class="h-[420px] animate-pulse bg-[#121418] clip-aggressive-card"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="border-2 border-[#C5162E] bg-[#121418] p-8 max-w-2xl">
        <h2 class="text-white font-black text-2xl mb-2">خطا در دریافت اطلاعات</h2>
        <p class="text-gray-400 font-bold text-sm mb-2">{{ error.message || error }}</p>
      </div>

      <!-- Competitions Cards Grid -->
      <div v-else-if="filteredCompetitions.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <article 
          v-for="comp in filteredCompetitions" 
          :key="comp.id"
          @click="openModal(comp)"
          class="group relative flex flex-col bg-[#121418] transition-all duration-500 ease-out cursor-pointer hover:-translate-y-2 clip-aggressive-card"
        >
          <!-- Hover Glow Effect Background -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#C5162E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <!-- Red Top Accent Line -->
          <div class="absolute top-0 left-0 w-full h-1 bg-gray-800 group-hover:bg-[#C5162E] transition-colors duration-500 z-10"></div>

          <!-- Media / Cover Area -->
          <div class="relative h-[230px] w-full overflow-hidden bg-gray-900">
            
            <!-- First Media Item (Image or Video) -->
            <template v-if="getFirstMedia(comp)">
              <video 
                v-if="isVideo(getFirstMedia(comp))" 
                :src="getMediaUrl(getFirstMedia(comp))" 
                muted 
                playsinline 
                loop 
                autoplay
                class="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              ></video>
              <img 
                v-else
                :src="getMediaUrl(getFirstMedia(comp))" 
                :alt="comp.title" 
                class="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
            </template>
            
            <!-- Fallback Graphic if no media uploaded yet -->
            <div v-else class="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1b1e24] to-[#0e1014] text-gray-700">
              <span class="font-black text-5xl tracking-widest text-white/10 mb-2">SYRAX</span>
              <span class="text-xs font-bold text-gray-500">مسابقات رزمی</span>
            </div>

            <!-- Gradient overlay for text readability -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#121418] via-[#121418]/60 to-transparent"></div>

            <!-- Rank Badge (Floating Top Right) -->
            <div v-if="comp.rank" class="absolute top-4 right-4 bg-[#C5162E] text-white px-3 py-1 text-[11px] font-black uppercase tracking-wider font-en shadow-lg shadow-red-500/30">
              {{ comp.rank }}
            </div>

            <!-- Media Count Tag (Floating Top Left) -->
            <div v-if="getMediaList(comp).length > 1" class="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 text-[10px] font-bold flex items-center gap-1.5 border border-white/10">
              <svg class="w-3.5 h-3.5 text-[#C5162E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span>{{ getMediaList(comp).length }} رسانه</span>
            </div>
          </div>

          <!-- Content Area -->
          <div class="px-6 pb-8 pt-2 flex flex-col flex-1 relative z-10">
            
            <!-- Title (Overlapping Header) -->
            <h3 class="text-white font-black text-xl mb-3 mt-[-35px] drop-shadow-md group-hover:text-[#C5162E] transition-colors duration-300 leading-snug">
              {{ comp.title }}
            </h3>

            <!-- Meta Row: Date & Location -->
            <div class="flex flex-wrap items-center gap-4 text-gray-400 text-xs font-bold mb-4">
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-[#C5162E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span>{{ formatDate(comp.date) }}</span>
              </div>
              <div v-if="comp.location" class="flex items-center gap-1.5">
                <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>{{ comp.location }}</span>
              </div>
            </div>

            <!-- Fighters Tag -->
            <div v-if="formatFighters(comp.fighters)" class="mb-5 bg-white/5 border border-white/5 p-3 flex items-start gap-2">
              <span class="w-2 h-2 rounded-full bg-[#C5162E] mt-1.5 shrink-0"></span>
              <div class="text-xs font-bold text-gray-300">
                <span class="text-gray-500 font-semibold ml-1">قهرمانان:</span>
                <span>{{ formatFighters(comp.fighters) }}</span>
              </div>
            </div>

            <!-- Card Bottom Action -->
            <div class="mt-auto flex items-center justify-between w-full text-gray-500 text-xs font-bold border-t border-gray-800/80 pt-4 group-hover:text-gray-300 transition-colors">
              <span>مشاهده جزئیات و گالری</span>
              <div class="flex items-center gap-1 text-[#C5162E] group-hover:translate-x-[-4px] transition-transform">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
              </div>
            </div>

          </div>

        </article>

      </div>

      <!-- Empty State -->
      <div v-else class="border-2 border-gray-800 p-12 text-center bg-[#121418] clip-aggressive-card max-w-2xl mx-auto">
        <h2 class="text-xl font-bold text-gray-400">هیچ مسابقه‌ای با این مشخصات یافت نشد.</h2>
      </div>

    </div>

    <!-- ==================== DETAILS & GALLERY MODAL ==================== -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="selectedComp" class="fixed inset-0 flex items-center justify-center px-4 py-6" style="z-index: 9990;" dir="rtl">
          
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/90 backdrop-blur-md" @click="closeModal"></div>

          <!-- Modal Window -->
          <div class="relative w-full max-w-4xl bg-[#121418] border-2 border-gray-800 max-h-[92vh] overflow-y-auto shadow-2xl clip-aggressive-card flex flex-col">
            
            <!-- Close Button -->
            <button @click="closeModal" class="absolute top-4 right-4 z-50 p-2.5 bg-black/70 hover:bg-[#C5162E] text-white transition-colors border border-white/10 group">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Modal Header / Hero Media -->
            <div class="relative w-full shrink-0 bg-black overflow-hidden flex items-center justify-center hero-media-container">
              
              <!-- Active Media Viewer (First Media or Clicked Media) -->
              <template v-if="activeModalMedia">
                <div class="relative w-full h-full cursor-pointer group" @click="openFullScreen(activeModalMedia)">
                  <!-- Zoom overlay hint -->
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center pointer-events-none">
                    <div class="bg-black/70 backdrop-blur-sm rounded-full p-4 border border-white/10 shadow-2xl">
                      <svg class="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/></svg>
                    </div>
                  </div>
                  <video 
                    v-if="isVideo(activeModalMedia)" 
                    :src="getMediaUrl(activeModalMedia)" 
                    autoplay 
                    playsinline 
                    muted
                    loop
                    class="w-full h-full object-contain bg-black"
                  ></video>
                  <img 
                    v-else 
                    :src="getMediaUrl(activeModalMedia)" 
                    :alt="selectedComp.title" 
                    class="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
              </template>
              
              <div v-else class="w-full h-full flex items-center justify-center bg-gray-900 text-gray-700">
                <span class="font-black text-6xl opacity-20 text-white">SYRAX</span>
              </div>

              <!-- Top-left Rank overlay inside modal -->
              <div v-if="selectedComp.rank" class="absolute top-4 left-4 z-20 bg-[#C5162E] text-white px-4 py-1.5 text-xs font-black uppercase tracking-wider font-en shadow-md pointer-events-none">
                {{ selectedComp.rank }}
              </div>
            </div>

            <!-- Media Gallery Thumbnails Selector (If multiple media items exist) -->
            <div v-if="getMediaList(selectedComp).length > 1" class="px-6 py-4 bg-[#0e1014] border-b border-gray-800 flex gap-3 overflow-x-auto">
              <button 
                v-for="(item, idx) in getMediaList(selectedComp)" 
                :key="idx"
                @click="activeModalMedia = item"
                class="relative w-20 h-14 border-2 shrink-0 overflow-hidden transition-all"
                :class="activeModalMedia === item ? 'border-[#C5162E] scale-105' : 'border-gray-800 opacity-60 hover:opacity-100'"
              >
                <span v-if="isVideo(item)" class="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] text-white z-10 group">
                  <svg class="w-6 h-6 drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </span>
                <video v-if="isVideo(item)" :src="getMediaUrl(item)" class="w-full h-full object-cover relative z-0"></video>
                <img v-else :src="getMediaUrl(item)" class="w-full h-full object-cover relative z-0" />
              </button>
            </div>

            <!-- Modal Content Body -->
            <div class="p-6 md:p-10 flex flex-col">
              
              <!-- Title & Meta -->
              <div class="mb-6 border-b border-gray-800 pb-6">
                <h2 class="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                  {{ selectedComp.title }}
                </h2>
                
                <div class="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-400">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-[#C5162E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <span>{{ formatDate(selectedComp.date) }}</span>
                  </div>
                  <div v-if="selectedComp.location" class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span>{{ selectedComp.location }}</span>
                  </div>
                </div>
              </div>

              <!-- Fighters Details Box -->
              <div v-if="formatFighters(selectedComp.fighters)" class="mb-8 p-4 bg-white/5 border-r-4 border-[#C5162E]">
                <span class="block text-xs text-gray-500 font-bold mb-1">قهرمانان اعزامی و مدال‌آوران:</span>
                <span class="text-base font-black text-white">{{ formatFighters(selectedComp.fighters) }}</span>
              </div>

              <!-- Rich Text Description -->
              <div v-if="selectedComp.description" class="custom-prose-modal" v-html="selectedComp.description"></div>
              <p v-else class="text-gray-500 text-sm">توضیحات بیشتری برای این مسابقه ثبت نشده است.</p>

            </div>

          </div>

        </div>
      </Transition>
    </Teleport>

    <!-- ==================== FULLSCREEN MEDIA VIEWER ==================== -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="fullScreenMedia" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md" style="z-index: 9999;" dir="rtl">
          <!-- Close Button -->
          <button @click="closeFullScreen" class="absolute top-6 right-6 md:top-8 md:right-8 z-50 p-3 bg-white/10 hover:bg-[#C5162E] text-white transition-colors rounded-full backdrop-blur-md border border-white/10 group">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <!-- Fullscreen Content Area -->
          <div class="relative w-full h-full flex items-center justify-center p-4 md:p-12">
            <video 
              v-if="isVideo(fullScreenMedia)" 
              :src="getMediaUrl(fullScreenMedia)" 
              controls 
              autoplay 
              class="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
            ></video>
            <img 
              v-else 
              :src="getMediaUrl(fullScreenMedia)" 
              class="max-w-full max-h-full object-contain shadow-2xl rounded-sm transition-transform cursor-zoom-out"
              @click="closeFullScreen"
            />
          </div>
        </div>
      </Transition>
    </Teleport>

  </main>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

definePageMeta({
  alias: ['/tournaments']
})

useSeoMeta({
  title: 'مسابقات و افتخارات | آکادمی نینجا سایراکس',
  description: 'پرونده رسمی افتخارات، مسابقات و قهرمانان آکادمی هنرهای رزمی سایراکس.',
  ogTitle: 'مسابقات و افتخارات | SYRAX Martial Records',
  ogDescription: 'ثبت رویدادها، نتایج و مدال‌های مبارزان تیم سایراکس در میادین قهرمانی.'
})

const config = useRuntimeConfig()
const directusUrl = config.public.directus?.rest?.baseUrl || 'http://localhost:8055'

// State for Filters & Search
const searchQuery = ref('')
const selectedRank = ref('')
const selectedLocation = ref('')

// Modal state
const selectedComp = ref<any | null>(null)
const activeModalMedia = ref<any | null>(null)
const fullScreenMedia = ref<any | null>(null)

const openModal = (comp: any) => {
  selectedComp.value = comp
  const mediaList = getMediaList(comp)
  activeModalMedia.value = mediaList.length ? mediaList[0] : null
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedComp.value = null
  activeModalMedia.value = null
  fullScreenMedia.value = null
  document.body.style.overflow = ''
}

const openFullScreen = (media: any) => {
  fullScreenMedia.value = media
}

const closeFullScreen = () => {
  fullScreenMedia.value = null
}

onUnmounted(() => {
  document.body.style.overflow = ''
})

// Fetch competitions
const { data: competitions, pending, error } = await useAsyncData('competitions-page', async () => {
  try {
    // We query with all potential fields for media
    const fields = '*,media.*,media.directus_files_id.*'
    const sort = '-date'
    const url = import.meta.client 
      ? `/api/directus/items/competitions?fields=${fields}&sort=${sort}` 
      : `${directusUrl}/items/competitions?fields=${fields}&sort=${sort}`

    const response = await $fetch<{ data: any[] }>(url)
    return response.data || []
  } catch (err) {
    console.error('Failed to fetch competitions from Directus:', err)
    throw err
  }
})

// Unique filter options
const uniqueRanks = computed(() => {
  if (!competitions.value) return []
  const ranks = competitions.value.map(c => c.rank).filter(Boolean)
  return [...new Set(ranks)]
})

const uniqueLocations = computed(() => {
  if (!competitions.value) return []
  const locs = competitions.value.map(c => c.location).filter(Boolean)
  return [...new Set(locs)]
})

// Filtered Competitions
const filteredCompetitions = computed(() => {
  if (!competitions.value) return []
  return competitions.value.filter(comp => {
    // Search match (in title or fighters)
    const fightersStr = formatFighters(comp.fighters)
    const query = searchQuery.value.toLowerCase().trim()
    const matchSearch = query 
      ? (comp.title?.toLowerCase().includes(query) || fightersStr.toLowerCase().includes(query))
      : true

    // Rank match
    const matchRank = selectedRank.value ? comp.rank === selectedRank.value : true

    // Location match
    const matchLocation = selectedLocation.value ? comp.location === selectedLocation.value : true

    return matchSearch && matchRank && matchLocation
  })
})

// Formatting Fighters array or string
const formatFighters = (fighters: any): string => {
  if (!fighters) return ''
  if (Array.isArray(fighters)) return fighters.join('، ')
  return String(fighters)
}

// Formatting Date
const formatDate = (dateStr: string | undefined | null) => {
  if (!dateStr) return 'اعلام نشده'
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return new Intl.DateTimeFormat('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(d)
  } catch {
    return dateStr
  }
}

// Unpack media from item regardless of Directus structure
const getMediaList = (comp: any): any[] => {
  if (!comp) return []
  const raw = comp.media || comp.images || comp.image || comp.gallery || comp.files
  if (!raw) return []
  if (Array.isArray(raw)) return raw
  return [raw]
}

// Get First Media item for the Card Cover
const getFirstMedia = (comp: any): any | null => {
  const list = getMediaList(comp)
  return list.length ? list[0] : null
}

// Extract actual asset URL for either direct file objects or junction M2M objects
const getMediaUrl = (mediaItem: any): string => {
  if (!mediaItem) return ''
  if (typeof mediaItem === 'string') {
    return `${directusUrl}/assets/${mediaItem}`
  }
  const fileObj = mediaItem.directus_files_id || mediaItem
  const fileId = typeof fileObj === 'string' ? fileObj : fileObj?.id
  return fileId ? `${directusUrl}/assets/${fileId}` : ''
}

// Check if a media file is a video
const isVideo = (mediaItem: any): boolean => {
  if (!mediaItem) return false
  const fileObj = mediaItem.directus_files_id || mediaItem
  if (typeof fileObj === 'object' && fileObj?.type) {
    return fileObj.type.includes('video')
  }
  const filename = fileObj?.filename_download || fileObj?.name || ''
  return /\.(mp4|webm|ogg|mov)$/i.test(filename)
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

/* Diagonal cut corner styling matching Classes and Homepage */
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

/* Modal Fade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* WYSIWYG Styling in Modal */
.custom-prose-modal {
  color: #9CA3AF;
  font-weight: 700;
  line-height: 1.9;
  font-size: 0.95rem;
}
.custom-prose-modal h1, 
.custom-prose-modal h2, 
.custom-prose-modal h3 {
  color: #FFFFFF;
  font-weight: 900;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}
.custom-prose-modal p {
  margin-bottom: 1rem;
}
.custom-prose-modal ul {
  list-style-type: none;
  padding-right: 1.25rem;
  margin-bottom: 1.25rem;
}
.custom-prose-modal ul li {
  position: relative;
  margin-bottom: 0.5rem;
  color: #D1D5DB;
}
.custom-prose-modal ul li::before {
  content: '';
  position: absolute;
  right: -1rem;
  top: 0.65rem;
  width: 5px;
  height: 5px;
  background-color: #C5162E;
  transform: rotate(45deg);
}
.custom-prose-modal strong, 
.custom-prose-modal b {
  color: #FFFFFF;
  font-weight: 900;
}

/* Explicit Modal Image Heights */
.hero-media-container {
  height: 240px;
}
@media (min-width: 768px) {
  .hero-media-container {
    height: 300px;
  }
}
</style>
