<template>
  <main class="min-h-screen bg-[#F5F5F2] pt-32 pb-24 relative overflow-hidden" dir="rtl">
    
    <!-- Decorative background element -->
    <div class="absolute -top-40 -right-40 w-96 h-96 bg-[#C5162E]/5 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-10">
      
      <!-- Page Header -->
      <header class="mb-16 flex flex-col items-center md:items-start relative text-center md:text-right">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-[#0B0D10] leading-none tracking-tighter accent-slash inline-block">
          اساتید سایراکس
        </h1>
        <p class="text-gray-500 font-bold text-sm md:text-base leading-relaxed mt-10 md:mt-10 border-r-2 border-[#C5162E] pr-4 max-w-xl">
          تیم مربیان سایراکس با تجربه میدانی و مدارک معتبر بین‌المللی آماده هدایت شما هستند. برای مشاهده سوابق و اطلاعات هر استاد، روی تصویر او کلیک کنید.
        </p>
      </header>

      <!-- Filter & Search Bar -->
      <div class="mb-16 border-4 border-[#0B0D10] bg-white grid grid-cols-1 md:grid-cols-3 shadow-[8px_8px_0px_0px_rgba(11,13,16,1)]">
        
        <!-- Search Input -->
        <div class="border-b-4 md:border-b-0 md:border-l-4 border-[#0B0D10] relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg class="w-6 h-6 text-[#0B0D10]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            v-model="searchQuery" 
            @keydown.enter="scrollToGrid"
            type="text" 
            placeholder="جستجوی نام استاد..." 
            class="w-full h-16 pl-14 pr-6 bg-transparent text-[#0B0D10] font-black placeholder-[#0B0D10]/40 outline-none rounded-none text-lg transition-colors focus:bg-gray-100"
          />
        </div>

        <!-- Role Filter -->
        <div class="border-b-4 md:border-b-0 md:border-l-4 border-[#0B0D10] relative bg-white">
          <select 
            v-model="selectedRole" 
            @change="scrollToGrid"
            class="w-full h-16 px-6 bg-transparent text-[#0B0D10] font-black appearance-none outline-none rounded-none text-lg cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <option value="">همه نقش‌ها (Role)</option>
            <option v-for="role in uniqueRoles" :key="role" :value="role">{{ role }}</option>
          </select>
          <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#0B0D10]"></div>
          </div>
        </div>

        <!-- Specialty Filter -->
        <div class="relative bg-white">
          <select 
            v-model="selectedSpecialty" 
            @change="scrollToGrid"
            class="w-full h-16 px-6 bg-transparent text-[#0B0D10] font-black appearance-none outline-none rounded-none text-lg cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <option value="">همه تخصص‌ها (Specialty)</option>
            <option v-for="spec in uniqueSpecialties" :key="spec" :value="spec">{{ spec }}</option>
          </select>
          <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <div class="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#0B0D10]"></div>
          </div>
        </div>

      </div>

      <!-- Loading Skeletons -->
      <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16">
        <div v-for="i in 4" :key="i" class="flex flex-col items-center text-center animate-pulse">
          <div class="relative w-full aspect-[4/5] mb-6 bg-gray-200 clip-coach-img"></div>
          <div class="w-full h-[3px] bg-gray-300 transform -skew-y-3 origin-left -mt-2 mb-6"></div>
          <div class="h-6 bg-gray-300 w-2/3 mb-2"></div>
          <div class="h-4 bg-gray-200 w-1/2"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="border-l-4 border-[#C5162E] bg-white p-8 max-w-2xl shadow-sm">
        <h2 class="text-[#0B0D10] font-black text-2xl mb-2">خطا در دریافت اطلاعات</h2>
        <p class="text-gray-500 font-bold text-sm">{{ error.message || error }}</p>
      </div>

      <!-- Coaches Grid -->
      <div ref="gridRef" v-else-if="filteredCoaches && filteredCoaches.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-16 scroll-mt-32">
        <div 
          v-for="(coach, index) in filteredCoaches" 
          :key="coach.id"
          class="group flex flex-col items-center text-center cursor-pointer transition-all duration-500 ease-out hover:-translate-y-2"
          @click="openModal(coach)"
        >
          <!-- Image Container with offset frame effect -->
          <div class="relative w-full aspect-[4/5] mb-6">
            <!-- Offset Red Frame -->
            <div class="absolute inset-0 bg-[#C5162E] clip-coach-img opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-0 translate-y-0 group-hover:translate-x-3 group-hover:translate-y-3 -z-10"></div>
            
            <!-- Main Image Box -->
            <div class="absolute inset-0 overflow-hidden bg-gray-200 clip-coach-img z-10 transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2 border-2 border-transparent group-hover:border-[#0B0D10]">
              <img 
                v-if="coach.avatar"
                :src="`${directusUrl}/assets/${coach.avatar}`" 
                :alt="coach.name" 
                class="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div v-else class="w-full h-full flex items-center justify-center font-black text-gray-300 text-3xl">SYRAX</div>
              
              <!-- Inner overlay gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
          
          <!-- Red Accent Line -->
          <div class="w-full h-[3px] bg-[#C5162E] transform -skew-y-3 origin-left -mt-2 mb-6 group-hover:bg-[#0B0D10] transition-colors duration-500"></div>
          
          <!-- Details -->
          <div class="flex items-center gap-2 mb-2 justify-center w-full">
            <h3 class="text-[#0B0D10] font-black text-2xl group-hover:text-[#C5162E] transition-colors duration-300 uppercase tracking-tight">{{ coach.name }}</h3>
            <!-- Arrow up-right Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 group-hover:text-[#C5162E] transition-colors duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="3" d="M7 17L17 7M17 7H9M17 7V15" />
            </svg>
          </div>
          
          <p class="text-gray-500 font-bold text-sm transition-colors duration-300 uppercase tracking-widest">{{ coach.role || coach.title }}</p>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="border-4 border-[#0B0D10] bg-white p-12 text-center max-w-2xl shadow-[8px_8px_0px_0px_rgba(11,13,16,1)]">
        <h2 class="text-[#0B0D10] font-black text-2xl">هیچ استادی با این مشخصات یافت نشد.</h2>
      </div>

    </div>

    <!-- Cool Light Aggressive Coach Details Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="selectedCoach" class="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6" dir="rtl">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/75 backdrop-blur-sm" @click="closeModal"></div>
          
          <!-- Modal Content (Light Mode) -->
          <div class="relative w-full max-w-5xl bg-[#F5F5F2] border-4 border-[#0B0D10] max-h-[92vh] md:h-[82vh] overflow-hidden flex flex-col md:flex-row shadow-[14px_14px_0px_0px_#0B0D10] clip-modal">
            
            <!-- Close Button -->
            <button @click="closeModal" class="absolute top-4 right-4 z-50 p-2.5 sm:p-3 bg-[#0B0D10] hover:bg-[#C5162E] text-white transition-colors duration-300 group border-2 border-[#0B0D10]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Image Side (Fixed full-height on desktop) -->
            <div class="w-full md:w-5/12 h-64 sm:h-80 md:h-full bg-gray-200 relative border-b-4 md:border-b-0 md:border-l-4 border-[#0B0D10] shrink-0 overflow-hidden">
              <img 
                v-if="selectedCoach.avatar"
                :src="`${directusUrl}/assets/${selectedCoach.avatar}`" 
                :alt="selectedCoach.name"
                class="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div v-else class="w-full h-full flex items-center justify-center font-black text-gray-400 text-4xl">SYRAX</div>
              
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 md:opacity-40 pointer-events-none"></div>
              
              <!-- Floating Text over image -->
              <div class="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 z-10 pointer-events-none">
                <div class="bg-[#C5162E] text-white px-4 py-2 font-black text-base md:text-lg uppercase tracking-widest inline-block skew-x-[-10deg] shadow-md">
                  <span class="skew-x-[10deg] block">{{ selectedCoach.role || selectedCoach.title || 'مربی' }}</span>
                </div>
              </div>
            </div>

            <!-- Content Side (Light Theme, Scrollable area) -->
            <div class="w-full md:w-7/12 p-6 md:p-10 lg:p-12 flex flex-col relative overflow-y-auto custom-scrollbar bg-white">
              
              <!-- Subtle Scroll Indicator for mobile -->
              <div class="w-full flex justify-center mb-3 md:hidden opacity-40">
                <div class="w-12 h-1 rounded-full bg-gray-400"></div>
              </div>

              <div class="mb-6 md:mb-8 border-b-4 border-[#0B0D10] pb-6 md:pb-8 relative">
                <!-- Decorative red bar -->
                <div class="absolute -right-6 md:-right-10 lg:-right-12 top-0 w-3 h-full bg-[#C5162E]"></div>
                
                <h2 class="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B0D10] mb-3 leading-none tracking-tighter">{{ selectedCoach.name }}</h2>
                <div class="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 mt-4">
                  <span v-if="selectedCoach.specialty" class="border-2 border-[#0B0D10] bg-[#F5F5F2] text-[#0B0D10] px-3.5 py-1.5 font-bold text-xs sm:text-sm tracking-widest inline-block">
                    تخصص: <span class="font-black text-[#C5162E]">{{ selectedCoach.specialty }}</span>
                  </span>
                  <span v-if="selectedCoach.schedule" class="border-2 border-[#0B0D10] bg-[#F5F5F2] text-[#0B0D10] px-3.5 py-1.5 font-bold text-xs sm:text-sm tracking-widest flex items-center gap-2 w-max">
                    <svg class="w-4 h-4 text-[#C5162E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>{{ selectedCoach.schedule }}</span>
                  </span>
                </div>
              </div>

              <!-- HTML Bio using Light custom-prose -->
              <div v-if="selectedCoach.bio" class="custom-prose-light flex-1 mb-8" v-html="selectedCoach.bio"></div>
              <p v-else class="text-gray-500 font-bold mb-8 text-sm md:text-base">توضیحات تکمیلی برای این استاد ثبت نشده است.</p>

              <!-- Instagram Button (if exists) -->
              <div v-if="selectedCoach.instagram" class="mt-auto pt-4 border-t-2 border-gray-100">
                <a 
                  :href="selectedCoach.instagram" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-[#0B0D10] hover:bg-[#C5162E] text-white px-8 py-3.5 font-black text-sm md:text-base uppercase tracking-widest font-en transition-colors duration-300 group border-2 border-[#0B0D10]"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  مشاهده اینستاگرام
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </Transition>
    </Teleport>

  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const config = useRuntimeConfig()
const directusUrl = config.public.directus?.rest?.baseUrl || 'http://localhost:8055'

// State for Filters
const searchQuery = ref('')
const selectedRole = ref('')
const selectedSpecialty = ref('')
const gridRef = ref<HTMLElement | null>(null)

// Function to scroll to grid after search/filter on mobile
const scrollToGrid = () => {
  if (window.innerWidth < 1024 && gridRef.value) {
    gridRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Fetch the coaches collection data via Directus REST API
const { data: coaches, pending, error } = await useAsyncData('coaches-page', async () => {
  try {
    const url = import.meta.client ? '/api/directus/items/coaches?fields=*' : `${directusUrl}/items/coaches?fields=*`
    const response = await $fetch<{ data: any[] }>(url)
    return response.data
  } catch (err) {
    console.error('Failed to fetch coaches data from Directus:', err)
    throw err
  }
})

// Extract unique filter options from fetched data
const uniqueRoles = computed(() => {
  if (!coaches.value) return []
  const roles = coaches.value.map(c => c.role || c.title).filter(Boolean)
  return [...new Set(roles)]
})

const uniqueSpecialties = computed(() => {
  if (!coaches.value) return []
  const specs = coaches.value.map(c => c.specialty).filter(Boolean)
  return [...new Set(specs)]
})

// Computed Filtered Coaches
const filteredCoaches = computed(() => {
  if (!coaches.value) return []
  
  return coaches.value.filter(coach => {
    // Search match
    const matchSearch = coach.name 
      ? coach.name.toLowerCase().includes(searchQuery.value.toLowerCase()) 
      : false
      
    // Role match
    const coachRole = coach.role || coach.title
    const matchRole = selectedRole.value 
      ? coachRole === selectedRole.value 
      : true
      
    // Specialty match
    const matchSpec = selectedSpecialty.value 
      ? coach.specialty === selectedSpecialty.value 
      : true

    return matchSearch && matchRole && matchSpec
  })
})

// Modal Logic
const selectedCoach = ref<any | null>(null)

const openModal = (coach: any) => {
  selectedCoach.value = coach
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}

const closeModal = () => {
  selectedCoach.value = null
  document.body.style.overflow = ''
}

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.font-en {
  font-family: system-ui, -apple-system, sans-serif;
}

/* Diagonal cut at the bottom of the card image container */
.clip-coach-img {
  clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
}

.clip-modal {
  clip-path: polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px);
}

.accent-slash {
  position: relative;
}
.accent-slash::after {
  content: '';
  position: absolute;
  bottom: -20px;
  right: 0;
  width: 60px;
  height: 4px;
  background-color: #C5162E;
  transform: skewX(-20deg);
}

/* Modal Fade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom Scrollbar for Modal (Light Mode) */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #F5F5F2;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #0B0D10;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #C5162E;
}

/* 
  Custom styling for HTML content (Bio) in LIGHT mode
*/
.custom-prose-light {
  color: #374151; /* text-gray-700 */
  font-weight: 700;
  line-height: 2;
  font-size: 1rem;
}
.custom-prose-light h1, .custom-prose-light h2, .custom-prose-light h3 {
  color: #0B0D10;
  font-weight: 900;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.35rem;
}
.custom-prose-light h1 { font-size: 1.8rem; }
.custom-prose-light p {
  margin-bottom: 1rem;
}
.custom-prose-light ul {
  list-style-type: none;
  padding-right: 1.5rem;
  margin-bottom: 1.25rem;
}
.custom-prose-light ul li {
  position: relative;
  margin-bottom: 0.5rem;
  color: #1F2937;
}
.custom-prose-light ul li::before {
  content: '';
  position: absolute;
  right: -1.25rem;
  top: 0.7rem;
  width: 6px;
  height: 6px;
  background-color: #C5162E;
  transform: rotate(45deg);
}
.custom-prose-light strong, .custom-prose-light b {
  color: #0B0D10;
  font-weight: 900;
}
</style>
