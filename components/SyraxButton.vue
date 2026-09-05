<template>
  <NuxtLink
    v-if="props.to"
    :to="props.to"
    :class="[baseClasses, variantClasses[props.variant]]"
  >
    <span class="relative z-10 flex items-center gap-2">
      <span v-if="props.text">{{ props.text }}</span>
      <slot />
    </span>
    <!-- افکت هاور عمومی -->
    <span class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></span>
  </NuxtLink>

  <button
    v-else
    :type="props.type"
    :class="[baseClasses, variantClasses[props.variant]]"
  >
    <span class="relative z-10 flex items-center gap-2">
      <span v-if="props.text">{{ props.text }}</span>
      <slot />
    </span>
    <!-- افکت هاور عمومی -->
    <span class="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  text?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  to?: string
  type?: 'button' | 'submit' | 'reset'
}>(), {
  text: '',
  variant: 'primary',
  type: 'button'
})

const baseClasses = 'group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-black tracking-wide rounded-xl overflow-hidden transition-all duration-500 ease-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.97]'

const variantClasses = {
  primary: 'bg-accent text-white shadow-[0_4px_20px_-5px_rgba(197,22,46,0.4)] hover:shadow-[0_8px_30px_-5px_rgba(197,22,46,0.6)] hover:-translate-y-0.5 border border-accent/20',
  secondary: 'bg-obsidian text-bone shadow-[0_4px_20px_-5px_rgba(11,13,16,0.4)] hover:shadow-[0_8px_30px_-5px_rgba(11,13,16,0.6)] hover:-translate-y-0.5 border border-obsidian/20',
  outline: 'bg-transparent text-obsidian border-[1.5px] border-obsidian/10 hover:border-obsidian/30 hover:bg-obsidian/5 hover:-translate-y-0.5',
  ghost: 'bg-transparent text-coolgray hover:text-obsidian hover:bg-obsidian/5'
}
</script>
