<template>
  <div>
    <h3 v-if="!collapsed" class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-2 whitespace-nowrap">{{ title }}</h3>
    <div class="space-y-0.5">
      <template v-for="item in items" :key="item.label">
        <NuxtLink
          v-if="!isDisabled(item.to)"
          :to="item.to"
          @click="$emit('navigate')"
          @mouseenter="onEnter($event, item.label)"
          @mouseleave="hoveredLabel = null"
          class="flex items-center gap-3 rounded-lg transition-all duration-200"
          :class="[
            collapsed ? 'justify-center px-3 py-2' : 'px-4 py-2',
            isActive(item.to) ? 'text-white font-semibold shadow-md' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
          ]"
          :style="isActive(item.to) ? { background: 'linear-gradient(135deg, #3b82f6, #4f46e5)' } : {}"
        >
          <span :class="item.icon + ' w-5 h-5 shrink-0'"></span>
          <span v-if="!collapsed" class="text-sm whitespace-nowrap">{{ item.label }}</span>
        </NuxtLink>
        <div
          v-else
          @mouseenter="onEnter($event, item.label)"
          @mouseleave="hoveredLabel = null"
          class="flex items-center gap-3 rounded-lg text-gray-400 cursor-not-allowed opacity-60 select-none"
          :class="collapsed ? 'justify-center px-3 py-2' : 'px-4 py-2'"
          aria-disabled="true"
        >
          <span :class="item.icon + ' w-5 h-5 shrink-0'"></span>
          <span v-if="!collapsed" class="text-sm whitespace-nowrap">{{ item.label }}</span>
        </div>
      </template>
    </div>

    <!-- Floating tooltip badge shown when the sidebar is collapsed to icons only -->
    <Teleport to="body">
      <div
        v-if="collapsed && hoveredLabel"
        class="fixed z-[100] pointer-events-none rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg whitespace-nowrap animate-[navtooltip_0.12s_ease-out]"
        :style="{ ...tooltipStyle, transform: 'translateY(-50%)' }"
      >
        {{ hoveredLabel }}
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  items: Array<{ to: string; label: string; icon: string }>
  currentPath: string
  collapsed?: boolean
}>()

defineEmits(['navigate'])

const isActive = (route: string) => props.currentPath === route
const isDisabled = (route: string) => !route || route === '#'

const hoveredLabel = ref<string | null>(null)
const tooltipStyle = ref<{ top: string; left: string }>({ top: '0px', left: '0px' })

function onEnter(event: MouseEvent, label: string) {
  if (!props.collapsed) return
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  tooltipStyle.value = {
    top: `${rect.top + rect.height / 2}px`,
    left: `${rect.right + 10}px`,
  }
  hoveredLabel.value = label
}
</script>

<style>
@keyframes navtooltip {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%);
  }
}
</style>
