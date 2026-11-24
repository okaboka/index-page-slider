<template>
  <div class="min-h-screen bg-white py-20 font-sans">
    <div class="container mx-auto px-3">
      <h1 class="mb-8 text-center text-2xl font-medium">
        Index Page Slider
      </h1>
      <div class="flex w-full items-center justify-center lg:h-[560px]">
        <IndexPageSlider />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import IndexPageSlider from '@/components/IndexPageSlider.vue';
</script>
