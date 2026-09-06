<template>
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
</template>

<script setup lang="ts">
// Nuxt 3 auto-imports components from the `components/` directory.
// So explicit imports are not strictly necessary, but following the user's instructions:
import HeroSection from '../components/sections/HeroSection.vue'
import FeaturesSection from '../components/sections/FeaturesSection.vue'
import ClassesSection from '../components/sections/ClassesSection.vue'
import CoachesSection from '../components/sections/CoachesSection.vue'
import StatsSection from '../components/sections/StatsSection.vue'
import MediaSection from '../components/sections/MediaSection.vue'
import TestimonialSection from '../components/sections/TestimonialSection.vue'
import BlogSection from '../components/sections/BlogSection.vue'
import PreFooterSection from '../components/sections/PreFooterSection.vue'
</script>
