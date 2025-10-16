<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center p-6">
    <div class="max-w-2xl w-full text-center">
      <!-- Logo/Icon -->
      <div class="mb-8 animate-bounce-slow">
        <div class="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl">
          <span class="icon-[ic--twotone-stars] w-14 h-14 text-white"></span>
        </div>
      </div>

      <!-- Título -->
      <h1 class="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
        Bienvenido
      </h1>

      <p class="text-xl md:text-2xl text-white/90 mb-12 font-light">
        Demo de componentes modernos con PrimeVue y Tailwind CSS
      </p>

      <!-- Botón principal -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          label="Ver Demo"
          icon="pi pi-arrow-right"
          iconPos="right"
          size="large"
          class="text-lg px-8 py-4"
          @click="goToDemo"
        />
        <Button
          label="Documentación"
          icon="pi pi-book"
          severity="secondary"
          outlined
          size="large"
          class="text-lg px-8 py-4 !text-white !border-white hover:!bg-white/20"
        />
      </div>

      <!-- Features -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
          <span class="icon-[ic--twotone-bolt] w-10 h-10 text-yellow-300 mb-4 inline-block"></span>
          <h3 class="text-white font-bold text-lg mb-2">Rápido</h3>
          <p class="text-white/80 text-sm">Rendimiento optimizado</p>
        </div>

        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
          <span class="icon-[ic--twotone-palette] w-10 h-10 text-pink-300 mb-4 inline-block"></span>
          <h3 class="text-white font-bold text-lg mb-2">Moderno</h3>
          <p class="text-white/80 text-sm">Diseño actualizado</p>
        </div>

        <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
          <span class="icon-[ic--twotone-rocket-launch] w-10 h-10 text-green-300 mb-4 inline-block"></span>
          <h3 class="text-white font-bold text-lg mb-2">Fácil</h3>
          <p class="text-white/80 text-sm">Simple de usar</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

const goToDemo = () => {
  router.push('/demo')
}
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}
</style>
