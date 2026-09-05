<template>
  <div class="font-sans antialiased text-obsidian bg-bone min-h-screen overflow-x-hidden">
    <AppHeader />
    <main>
      <HeroSection />
      <FeaturesSection />
      <ClassesSection />
      <CoachesSection />
      <StatsSection />
      <MediaSection />
      <TestimonialSection />
      <BlogSection />
      <PreFooterSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import FeaturesSection from '../components/sections/FeaturesSection.vue'
import CoachesSection from '../components/sections/CoachesSection.vue'
import ClassesSection from '../components/sections/ClassesSection.vue'
import StatsSection from '../components/sections/StatsSection.vue'
import MediaSection from '../components/sections/MediaSection.vue'
import TestimonialSection from '../components/sections/TestimonialSection.vue'
import BlogSection from '../components/sections/BlogSection.vue'
import PreFooterSection from '../components/sections/PreFooterSection.vue'
import AppFooter from '../components/AppFooter.vue'
</script>