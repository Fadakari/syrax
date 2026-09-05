<template>
  <div class="font-sans antialiased text-obsidian bg-bone min-h-screen">
    <AppHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <ClassesSection />
      <FeaturesSection />
      <CoachesSection />
      <AppFooter />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import FeaturesSection from '../components/sections/FeaturesSection.vue'
import CoachesSection from '../components/sections/CoachesSection.vue'
import ClassesSection from '../components/sections/ClassesSection.vue'
import AppFooter from '../components/AppFooter.vue'
</script>