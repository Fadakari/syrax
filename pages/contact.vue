<template>
  <div class="min-h-screen bg-gray-50 font-sans selection:bg-[#C5162E] selection:text-white" dir="rtl">
    
    <div v-if="contactData">
      
      <!-- 1. Hero Section -->
      <section class="relative w-full bg-[#0B0D10] flex flex-col items-center justify-center py-32 px-6 overflow-hidden">
        <!-- Background Image -->
        <img 
          v-if="contactData.cover_image"
          :src="getMediaUrl(contactData.cover_image)" 
          alt="Contact Cover" 
          class="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        <div class="relative z-10 text-center flex flex-col items-center max-w-4xl mx-auto">
          <span class="px-4 py-1.5 bg-[#C5162E]/10 text-[#C5162E] rounded-full text-sm font-black tracking-widest mb-6 border border-[#C5162E]/20">آکادمی هنرهای رزمی</span>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8">
            {{ contactData.title || 'ارتباط با سایراکس' }}
          </h1>
          <p v-if="contactData.description" class="text-lg md:text-xl font-medium text-gray-300 leading-relaxed text-center">
            {{ contactData.description }}
          </p>
        </div>
      </section>

      <!-- 2. Branches Section -->
      <section v-if="contactData.branches && contactData.branches.length" class="max-w-7xl mx-auto px-6 py-20 relative z-20 -mt-12">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-5xl font-black text-gray-900 tracking-tight">شعب <span class="text-[#C5162E]">آکادمی</span></h2>
          <div class="w-16 h-1.5 bg-[#C5162E] mx-auto mt-6 rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- User-Friendly Branch Card -->
          <div 
            v-for="(branch, index) in contactData.branches" 
            :key="index"
            class="bg-white rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(197,22,46,0.1)] hover:border-[#C5162E]/30 transition-all duration-300 flex flex-col"
          >
            <!-- Branch Header -->
            <div class="flex items-center gap-4 mb-8">
              <div class="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <svg class="w-7 h-7 text-[#C5162E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
              </div>
              <div>
                <h3 class="text-2xl font-black text-gray-900">{{ branch.name }}</h3>
                <p v-if="branch.manager" class="text-sm font-bold text-gray-500 mt-1">مدیریت: <span class="text-gray-800">{{ branch.manager }}</span></p>
              </div>
            </div>

            <!-- Details -->
            <div class="flex flex-col gap-5 flex-1 mb-8">
              <div v-if="branch.address" class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.242-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div class="mt-2 text-gray-700 font-medium leading-relaxed">{{ branch.address }}</div>
              </div>

              <div v-if="branch.phones" class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div class="mt-2 text-gray-900 font-black text-lg tracking-wider" dir="ltr">{{ branch.phones }}</div>
              </div>

              <div v-if="branch.working_hours" class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div class="mt-2 text-gray-700 font-medium">{{ branch.working_hours }}</div>
              </div>
            </div>

            <!-- Map Button -->
            <a 
              v-if="branch.google_map_link" 
              :href="branch.google_map_link"
              target="_blank"
              class="mt-auto flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-lg hover:bg-[#C5162E] transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
              مسیریابی روی نقشه
            </a>
          </div>
        </div>
      </section>

      <!-- 3. Advanced Social Media Section -->
      <section v-if="contactData.social_media && contactData.social_media.length" class="bg-white py-24 border-t border-gray-100">
        <div class="max-w-5xl mx-auto px-6 text-center">
          <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            ما را در شبکه‌های اجتماعی دنبال کنید
          </h2>
          <p class="text-gray-500 font-medium mb-12 max-w-2xl mx-auto">
            برای اطلاع از آخرین اخبار، ویدیوهای تمرینی و دوره‌های جدید آکادمی سایراکس به صفحات رسمی ما بپیوندید.
          </p>
          
          <div class="flex flex-wrap justify-center gap-6">
            <a 
              v-for="(social, idx) in contactData.social_media"
              :key="idx"
              :href="social.link"
              target="_blank"
              class="group flex flex-col items-center justify-center gap-4 w-36 h-36 rounded-2xl bg-gray-50 hover:bg-[#C5162E] border border-gray-100 hover:border-[#C5162E] p-2 shadow-sm hover:shadow-[0_10px_30px_rgba(197,22,46,0.3)] transition-all duration-300 hover:-translate-y-2"
            >
              <!-- Dynamic Icon based on platform name -->
              <div class="text-gray-700 group-hover:text-white transition-colors duration-300" v-html="getSocialIcon(social.platform)"></div>
              <span class="font-bold text-gray-700 group-hover:text-white capitalize transition-colors duration-300">{{ social.platform }}</span>
            </a>
          </div>
        </div>
      </section>

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { readSingleton } from '@directus/sdk'
import { useAsyncData, useDirectusRest, useRuntimeConfig, useSeoMeta } from '#imports'

const config = useRuntimeConfig()
const directusUrl = config.public.directus?.rest?.baseUrl || 'http://localhost:8055'

const { data: contactData } = await useAsyncData(
  'contact-page-data',
  async () => {
    try {
      const response = await useDirectusRest(readSingleton('contact'))
      if (!response) return null
      return JSON.parse(JSON.stringify(response))
    } catch (err) {
      console.error('Failed to fetch contact singleton:', err)
      return null
    }
  }
)

if (contactData.value) {
  const seo = contactData.value.seo || {}
  useSeoMeta({
    title: seo.title || contactData.value.title || 'تماس با ما | آکادمی سایراکس',
    description: seo.meta_description || contactData.value.description || 'اطلاعات تماس و شعب آکادمی سایراکس',
    ogTitle: seo.title || contactData.value.title || 'تماس با ما | آکادمی سایراکس',
    ogDescription: seo.meta_description || contactData.value.description || '',
    ogImage: () => getMediaUrl(contactData.value?.cover_image)
  })
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

// Map platform names to SVG icons
function getSocialIcon(platform: string) {
  const name = platform.toLowerCase()
  
  const icons: Record<string, string> = {
    instagram: `<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>`,
    telegram: `<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.686c.223-.195-.054-.285-.346-.09l-6.4 4.024-2.76-.86c-.6-.185-.615-.6.125-.89l10.736-4.133c.5-.185.95.115.825.99z"/></svg>`,
    whatsapp: `<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
    youtube: `<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    linkedin: `<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    twitter: `<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>`,
    facebook: `<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    aparat: `<svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>` // Fallback generic play icon for aparat or others
  }
  
  for (const key in icons) {
    if (name.includes(key)) {
      return icons[key]
    }
  }
  
  // Default Link Icon
  return `<svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>`
}
</script>
