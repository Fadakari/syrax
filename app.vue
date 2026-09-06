<template>
  <div class="font-sans antialiased text-obsidian bg-bone min-h-screen flex flex-col overflow-x-hidden">
    <AppHeader />
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>
