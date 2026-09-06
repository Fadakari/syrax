<template>
  <main class="min-h-screen pt-32 pb-24 font-sans selection:bg-[#C5162E] selection:text-white" dir="rtl">
    <!-- Subtle background pattern/glow like the homepage -->
    <div class="absolute top-0 right-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C5162E] via-transparent to-transparent pointer-events-none"></div>

    <div class="max-w-[1400px] mx-auto px-6 lg:px-8 relative z-20">
      <!-- Title Block (Matching Homepage structure) -->
      <header class="mb-12 flex flex-col justify-center">
        <h2 class="text-4xl lg:text-5xl font-black text-black leading-tight mb-6 tracking-tighter accent-slash inline-block w-max">
          تمرینات
        </h2>
        <p class="text-gray-400 font-bold text-sm leading-relaxed mb-10 max-w-xl">
          برنامه‌های تخصصی برای سطوح و اهداف مختلف. کلاس مناسب خود را با فیلترهای زیر پیدا کنید.
        </p>
      </header>

      <!-- Filter Bar -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 border-2 border-gray-800 bg-[#dedede] mb-16">
        <!-- Search -->
        <div class="border-b-2 md:border-b-0 md:border-l-2 border-gray-800 relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            v-model="searchQuery" 
            type="text" 
            placeholder="جستجوی کلاس..." 
            class="w-full h-14 pl-12 pr-6 bg-transparent text-black font-bold placeholder-gray-600 outline-none rounded-none text-sm focus:bg-gray-300/50 transition-colors"
          />
        </div>

        <!-- Level Filter -->
        <div class="border-b-2 md:border-b-0 md:border-l-2 border-gray-800 relative">
          <select 
            v-model="selectedLevel" 
            class="w-full h-14 px-6 bg-transparent text-black font-bold appearance-none outline-none rounded-none text-sm cursor-pointer focus:bg-gray-300/50 transition-colors"
          >
            <option value="" class="bg-[#f6f6f7]">همه سطوح (Level)</option>
            <option v-for="level in uniqueLevels" :key="level" :value="level" class="bg-[#f3f4f5]">{{ level }}</option>
          </select>
          <!-- Custom Arrow -->
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <div class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-gray-500"></div>
          </div>
        </div>

        <!-- Target Audience Filter -->
        <div class="relative">
          <select 
            v-model="selectedTarget" 
            class="w-full h-14 px-6 bg-transparent text-black font-bold appearance-none outline-none rounded-none text-sm cursor-pointer focus:bg-gray-300/50 transition-colors"
          >
            <option value="" class="bg-[#e4e4e4]">گروه هدف (Target)</option>
            <option v-for="target in uniqueTargets" :key="target" :value="target" class="bg-[#fcfdfe]">{{ target }}</option>
          </select>
          <!-- Custom Arrow -->
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <div class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-gray-500"></div>
          </div>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
        <div v-for="i in 4" :key="i" class="h-[400px] animate-pulse bg-[#121418] clip-aggressive-card"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="border-2 border-[#C5162E] bg-[#121418] p-8 max-w-2xl">
        <h2 class="text-white font-black text-2xl mb-2">خطا در دریافت اطلاعات</h2>
        <p class="text-gray-400 font-bold text-sm">{{ error.message || error }}</p>
      </div>

      <!-- Classes Grid (Matching Homepage perfectly) -->
      <div v-else-if="filteredClasses.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
        
        <div 
          v-for="cls in filteredClasses" 
          :key="cls.id"
          @click="openModal(cls)"
          class="group relative flex flex-col bg-[#121418] transition-all duration-700 ease-out cursor-pointer hover:-translate-y-2 clip-aggressive-card"
        >
          <!-- Hover Glow Effect Background -->
          <div class="absolute inset-0 bg-gradient-to-br from-[#C5162E]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <!-- Red Top Accent Line -->
          <div class="absolute top-0 left-0 w-full h-1 bg-gray-800 group-hover:bg-[#C5162E] transition-colors duration-500 z-10"></div>

          <!-- Image Area -->
          <div class="relative h-[220px] w-full overflow-hidden bg-gray-900">
            <!-- Using Class Image -->
            <img 
              v-if="cls.image" 
              :src="`${directusUrl}/assets/${cls.image}`" 
              :alt="cls.title" 
              class="w-full h-full object-cover opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
            />
            <div v-else class="w-full h-full flex items-center justify-center opacity-10">
              <span class="font-black text-6xl tracking-widest text-white">SYRAX</span>
            </div>
            
            <!-- Dark gradient overlay from bottom -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#121418] via-[#121418]/10 to-transparent"></div>
            
            <!-- Floating Badge for Target Audience -->
            <div v-if="cls.target_audience" class="absolute top-4 right-4 bg-[#C5162E] text-white px-3 py-1 text-[10px] font-black tracking-widest uppercase font-en transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-red-500/30">
              {{ cls.target_audience }}
            </div>
          </div>

          <!-- Content Area -->
          <div class="px-6 pb-8 pt-2 flex flex-col flex-1 relative z-10">
            <!-- Move title up into the image area overlapping -->
            <h3 class="text-white font-black text-xl mb-1 mt-[-40px] drop-shadow-md group-hover:text-[#C5162E] transition-colors duration-300">
              {{ cls.title }}
            </h3>
            
            <p class="text-gray-400 text-[11px] font-bold mb-6 group-hover:text-gray-300 transition-colors flex items-center gap-2">
              <span class="w-4 h-[2px] bg-[#C5162E] inline-block"></span>
              {{ cls.coach_id?.name || 'نامشخص' }}
            </p>
            
            <p class="text-gray-400 text-xs font-bold mb-6 group-hover:text-gray-300 transition-colors">
              {{ cls.level }}
            </p>
            
            <div class="mt-auto flex flex-col gap-3 w-full text-gray-500 text-[11px] font-bold border-t border-gray-800 pt-4">
              <div class="flex items-center justify-between">
                <!-- Days/Schedule -->
                <div class="flex items-center gap-1.5 group-hover:text-gray-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{{ cls.schedule_time || 'اعلام نشده' }}</span>
                </div>
                <!-- Age -->
                <div class="flex items-center gap-1.5 group-hover:text-gray-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{{ cls.age_group || 'همه سنین' }}</span>
                </div>
              </div>

              <!-- Price & Registration -->
              <div class="flex items-center justify-between pt-2">
                <span class="text-[#F5F5F2] font-black text-sm">{{ formatPrice(cls.price) }}</span>
                <span class="text-[#C5162E] group-hover:text-white transition-colors duration-300 flex items-center gap-1">
                  ثبت‌نام
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M15 19l-7-7 7-7"></path></svg>
                </span>
              </div>
            </div>
          </div>
          
        </div>

      </div>

      <!-- Empty State -->
      <div v-else class="border-2 border-gray-800 p-12 text-center bg-[#121418] clip-aggressive-card max-w-2xl mx-auto">
        <h2 class="text-xl font-bold text-gray-400">هیچ کلاسی با این مشخصات یافت نشد.</h2>
      </div>

    </div>

    <!-- Class Details Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="selectedClass" class="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6" dir="rtl">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/90 backdrop-blur-sm" @click="closeModal"></div>
          
          <!-- Modal Content -->
          <div class="relative w-full max-w-4xl bg-[#121418] border-2 border-gray-800 max-h-[95vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl clip-aggressive-card">
            
            <!-- Close Button -->
            <button @click="closeModal" class="absolute top-4 right-4 z-50 p-2 bg-black/50 backdrop-blur-md md:bg-gray-900 hover:bg-[#C5162E] text-white transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Image / Visual Side -->
            <div class="w-full md:w-2/5 md:min-h-full bg-[#0B0D10] relative overflow-hidden">
              <img 
                v-if="selectedClass.image"
                :src="`${directusUrl}/assets/${selectedClass.image}`" 
                :alt="selectedClass.title"
                class="w-full h-64 md:h-full object-cover grayscale opacity-60"
              />
              <div v-else class="w-full h-full min-h-[200px] flex items-center justify-center">
                <span class="font-black text-6xl tracking-widest text-gray-800">SYRAX</span>
              </div>
              <div class="absolute inset-0 bg-gradient-to-t from-[#121418] via-transparent to-transparent opacity-90 md:hidden"></div>
              
              <div class="absolute bottom-6 right-6 hidden md:block">
                 <div v-if="selectedClass.target_audience" class="bg-[#C5162E] text-white px-4 py-2 text-xs font-black tracking-widest uppercase font-en shadow-lg">
                  {{ selectedClass.target_audience }}
                </div>
              </div>
            </div>

            <!-- Content Side -->
            <div class="w-full md:w-3/5 p-8 md:p-12 flex flex-col relative z-10">
              
              <!-- Mobile Badge -->
              <div v-if="selectedClass.target_audience" class="bg-[#C5162E] text-white px-3 py-1 text-[10px] font-black tracking-widest uppercase font-en inline-block w-max mb-4 md:hidden">
                {{ selectedClass.target_audience }}
              </div>

              <!-- Title & Coach -->
              <div class="mb-8 border-b-2 border-gray-800 pb-8 relative">
                <!-- Red Accent Slash behind title -->
                <div class="absolute -left-4 top-4 w-12 h-1 bg-[#C5162E] skew-x-[-20deg]"></div>
                
                <h2 class="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">{{ selectedClass.title }}</h2>
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gray-800 border-2 border-gray-700 overflow-hidden">
                    <img v-if="selectedClass.coach_id?.avatar" :src="`${directusUrl}/assets/${selectedClass.coach_id.avatar}`" class="w-full h-full object-cover grayscale" />
                    <svg v-else class="w-full h-full text-gray-600 p-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                  </div>
                  <div>
                    <p class="text-gray-500 text-[10px] uppercase font-black tracking-wider">مربی کلاس</p>
                    <p class="text-gray-300 font-bold text-sm">استاد {{ selectedClass.coach_id?.name || 'نامشخص' }}</p>
                  </div>
                </div>
              </div>

              <!-- Detailed Grid -->
              <div class="grid grid-cols-2 gap-y-8 gap-x-4 mb-10">
                <div>
                  <p class="text-[10px] text-gray-500 font-en tracking-widest uppercase mb-1">Level</p>
                  <p class="text-white font-bold text-sm">{{ selectedClass.level || 'همه سطوح' }}</p>
                </div>
                <div>
                  <p class="text-[10px] text-gray-500 font-en tracking-widest uppercase mb-1">Age Group</p>
                  <p class="text-white font-bold text-sm">{{ selectedClass.age_group || 'همه سنین' }}</p>
                </div>
                <div>
                  <p class="text-[10px] text-gray-500 font-en tracking-widest uppercase mb-1">Schedule</p>
                  <p class="text-white font-bold text-sm">{{ selectedClass.schedule_time || 'اعلام نشده' }}</p>
                </div>
                <div>
                  <p class="text-[10px] text-gray-500 font-en tracking-widest uppercase mb-1">Duration</p>
                  <p class="text-white font-bold text-sm">{{ selectedClass.duration || '-' }}</p>
                </div>
                <div>
                  <p class="text-[10px] text-gray-500 font-en tracking-widest uppercase mb-1">Capacity</p>
                  <p class="text-white font-bold text-sm">{{ selectedClass.capacity ? `${selectedClass.capacity} نفر` : 'نامحدود' }}</p>
                </div>
                <div>
                  <p class="text-[10px] text-gray-500 font-en tracking-widest uppercase mb-1">Location</p>
                  <p class="text-white font-bold text-sm flex items-center gap-1">
                    <svg class="w-4 h-4 text-[#C5162E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {{ selectedClass.location || 'سالن اصلی سایراکس' }}
                  </p>
                </div>
              </div>

              <!-- Price & CTA -->
              <div class="mt-auto pt-8 border-t-2 border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <p class="text-[10px] text-gray-500 font-en tracking-widest uppercase mb-1">Price</p>
                  <p class="text-[#C5162E] font-black text-2xl tracking-tighter">{{ formatPrice(selectedClass.price) }}</p>
                </div>
                
                <button class="bg-[#C5162E] hover:bg-white text-white hover:text-[#0B0D10] px-8 py-4 font-black text-sm transition-colors flex items-center justify-center gap-3">
                  ثبت‌نام در این کلاس
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2.5" d="M7 17L17 7M17 7H9M17 7V15"></path></svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const config = useRuntimeConfig()
const directusUrl = config.public.directus?.rest?.baseUrl || 'http://localhost:8055'

// State for Filters
const searchQuery = ref('')
const selectedLevel = ref('')
const selectedTarget = ref('')

// Fetch Classes with Relational Data
const { data: classes, pending, error } = await useAsyncData('classes-page', async () => {
  try {
    const fields = '*,coach_id.*' // Fetch all permitted coach fields
    const url = import.meta.client 
      ? `/api/directus/items/classes?fields=${fields}` 
      : `${directusUrl}/items/classes?fields=${fields}`
      
    const response = await $fetch<{ data: any[] }>(url)
    return response.data
  } catch (err) {
    console.error('Failed to fetch classes data from Directus:', err)
    throw err
  }
})

// Extract unique filter options from fetched data
const uniqueLevels = computed(() => {
  if (!classes.value) return []
  const levels = classes.value.map(c => c.level).filter(Boolean)
  return [...new Set(levels)]
})

const uniqueTargets = computed(() => {
  if (!classes.value) return []
  const targets = classes.value.map(c => c.target_audience).filter(Boolean)
  return [...new Set(targets)]
})

// Computed Filtered Classes
const filteredClasses = computed(() => {
  if (!classes.value) return []
  
  return classes.value.filter(cls => {
    // Search match
    const matchSearch = cls.title 
      ? cls.title.toLowerCase().includes(searchQuery.value.toLowerCase()) 
      : false
      
    // Level match
    const matchLevel = selectedLevel.value 
      ? cls.level === selectedLevel.value 
      : true
      
    // Target match
    const matchTarget = selectedTarget.value 
      ? cls.target_audience === selectedTarget.value 
      : true

    return matchSearch && matchLevel && matchTarget
  })
})

// Modal Logic
const selectedClass = ref<any | null>(null)

const openModal = (cls: any) => {
  selectedClass.value = cls
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}

const closeModal = () => {
  selectedClass.value = null
  document.body.style.overflow = ''
}

onUnmounted(() => {
  document.body.style.overflow = ''
})

// Helper to format price in Tomans
const formatPrice = (price: string | number) => {
  if (!price) return 'تماس بگیرید'
  const num = Number(price)
  if (isNaN(num)) return price
  return num.toLocaleString('fa-IR') + ' تومان'
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

/* 
  Cool aggressive clip-path applied to the ENTIRE CARD, 
  cutting the top-left and bottom-right corners (in LTR).
  In RTL: Top-Right and Bottom-Left corners.
*/
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
