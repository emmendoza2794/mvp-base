<template>
  <!-- Mobile Bottom Navigation -->
  <nav id="mobile-bottom-nav" class="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 z-40">
    <div class="flex">
      <template v-for="item in mobileNavItems" :key="item.label">
        <NuxtLink
          v-if="!isDisabledRoute(item.to)"
          :to="item.to"
          class="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 px-2 transition-colors duration-200"
          :class="$route.path === item.to ? 'text-blue-600' : 'text-gray-500'"
        >
          <span :class="item.icon + ' w-6 h-6'"></span>
          <span class="text-[10px] font-medium leading-tight">{{ item.label }}</span>
        </NuxtLink>
        <div
          v-else
          class="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 px-2 text-gray-300 cursor-not-allowed opacity-60 select-none"
          aria-disabled="true"
        >
          <span :class="item.icon + ' w-6 h-6'"></span>
          <span class="text-[10px] font-medium leading-tight">{{ item.label }}</span>
        </div>
      </template>

      <!-- Menu Button -->
      <button
        @click="menuDrawerOpen = true"
        class="flex-1 flex flex-col items-center justify-center gap-1 py-2.5 px-2 transition-colors text-gray-500"
      >
        <span class="icon-[ic--twotone-menu] w-6 h-6"></span>
        <span class="text-[10px] font-medium leading-tight">Menú</span>
      </button>
    </div>
  </nav>

  <!-- Mobile Menu Drawer -->
  <Drawer v-model:visible="menuDrawerOpen" position="right" class="!w-[80%] sm:!w-80 lg:hidden">
    <template #header>
      <div class="flex items-center space-x-2">
        <span class="icon-[ic--twotone-menu] w-6 h-6 text-blue-600"></span>
        <h2 class="text-xl font-semibold text-gray-900">Menú</h2>
      </div>
    </template>

    <div class="flex flex-col h-full">
      <div class="flex-1 overflow-y-auto space-y-4 pb-4">
        <NavSection title="Principal" :items="mainNavItems" :current-path="$route.path" @navigate="menuDrawerOpen = false" />
        <NavSection title="Utilidades" :items="utilitiesItems" :current-path="$route.path" @navigate="menuDrawerOpen = false" />
        <NavSection title="Ejemplos" :items="exampleItems" :current-path="$route.path" @navigate="menuDrawerOpen = false" />
        <NavSection title="Configuración" :items="configItems" :current-path="$route.path" @navigate="menuDrawerOpen = false" />
      </div>
    </div>
  </Drawer>

  <!-- Desktop Sidebar Navigation -->
  <aside
    class="hidden lg:flex lg:flex-col fixed left-0 top-0 bottom-0 bg-white/80 backdrop-blur-md border-r border-gray-200 z-30 transition-all duration-200"
    :class="collapsed ? 'w-20' : 'w-64'"
  >
    <!-- Collapse/Expand Toggle -->
    <button
      @click="toggle"
      :title="collapsed ? 'Expandir menú' : 'Contraer menú'"
      class="absolute -right-3 top-[72px] w-6 h-6 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-300 transition-colors z-10"
    >
      <span :class="[collapsed ? 'icon-[ic--twotone-chevron-right]' : 'icon-[ic--twotone-chevron-left]', 'w-4 h-4']"></span>
    </button>

    <!-- Logo Section -->
    <div class="flex items-center space-x-3 p-4 overflow-hidden">
      <div class="bg-gradient-to-br from-blue-500 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
        <span class="icon-[ic--twotone-stars] w-7 h-7 text-white"></span>
      </div>
      <div v-show="!collapsed" class="whitespace-nowrap">
        <h1 class="text-lg font-bold text-gray-900">MVP Base</h1>
        <p class="text-xs text-gray-500">Tu template favorito</p>
      </div>
    </div>

    <nav class="flex flex-col flex-1 overflow-hidden">
      <div class="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-4">
        <NavSection title="Principal" :items="mainNavItems" :current-path="$route.path" :collapsed="collapsed" />
        <NavSection title="Utilidades" :items="utilitiesItems" :current-path="$route.path" :collapsed="collapsed" />
        <NavSection title="Ejemplos" :items="exampleItems" :current-path="$route.path" :collapsed="collapsed" />
        <NavSection title="Configuración" :items="configItems" :current-path="$route.path" :collapsed="collapsed" />
      </div>
    </nav>
  </aside>
</template>

<script setup lang="ts">
const menuDrawerOpen = ref(false)

const { collapsed, init, toggle } = useSidebar()

onMounted(() => init())

const mobileNavItems = [
  { to: '/', label: 'Inicio', icon: 'icon-[ic--twotone-home]' },
  { to: '/demo', label: 'Demo', icon: 'icon-[ic--twotone-dashboard]' },
  { to: '/docs', label: 'Docs', icon: 'icon-[ic--twotone-menu-book]' },
  { to: '#', label: 'Usuarios', icon: 'icon-[ic--twotone-group]' },
]

const isDisabledRoute = (route: string) => !route || route === '#'

// Principal
const mainNavItems = [
  { to: '/', label: 'Inicio', icon: 'icon-[ic--twotone-home]' },
  { to: '/demo', label: 'Dashboard Demo', icon: 'icon-[ic--twotone-dashboard]' },
  { to: '/docs', label: 'Documentación', icon: 'icon-[ic--twotone-menu-book]' },
  { to: '#', label: 'Usuarios', icon: 'icon-[ic--twotone-group]' },
  { to: '#', label: 'Reportes', icon: 'icon-[ic--twotone-bar-chart]' },
  { to: '#', label: 'Productos', icon: 'icon-[ic--twotone-inventory-2]' },
]

// Utilidades
const utilitiesItems = [
  { to: '#', label: 'Facturación', icon: 'icon-[ic--twotone-receipt-long]' },
  { to: '#', label: 'Pagos', icon: 'icon-[ic--twotone-payments]' },
  { to: '#', label: 'Analytics', icon: 'icon-[ic--twotone-trending-up]' },
]

// Ejemplos
const exampleItems = [
  { to: '/login-1', label: 'Login 1 (Card)', icon: 'icon-[ic--twotone-login]' },
  { to: '/login-2', label: 'Login 2 (Split)', icon: 'icon-[ic--twotone-login]' },
]

// Configuración
const configItems = [
  { to: '#', label: 'Mi Perfil', icon: 'icon-[ic--twotone-person]' },
  { to: '/settings', label: 'Configuraciones', icon: 'icon-[ic--twotone-settings]' },
]
</script>
