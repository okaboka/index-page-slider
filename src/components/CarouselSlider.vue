<script lang="ts" setup generic="T extends { id: string }">
  /**
   * @link https://swiperjs.com/
   */
  import type { Swiper as SwiperClass } from 'swiper/types';
  import { ref } from 'vue';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { Keyboard, Navigation } from 'swiper/modules';
  import 'swiper/css';
  import 'swiper/css/navigation';

  interface IProps {
    items: T[];
    alwaysShowArrows?: boolean;
    centeredSlides?: boolean;
    slidesPerView?: number | 'auto';
    loop?: boolean;
  }

  const props = withDefaults(defineProps<IProps>(), {
    alwaysShowArrows: false,
    centeredSlides: false,
    slidesPerView: 'auto',
    loop: false,
  });

  const SPACE_BETWEEN = 10;

  const showArrows = ref(false);
  const isBeginning = ref(true);
  const isEnd = ref(false);
  const swiperInstance = ref<SwiperClass | null>(null);

  const updateEdges = (swiper: SwiperClass) => {
    isBeginning.value = swiper.isBeginning;
    isEnd.value = swiper.isEnd;
  };

  const setSwiperController = (swiper: SwiperClass) => {
    swiperInstance.value = swiper;
    updateEdges(swiper);
    return swiper;
  };

  const slidePrev = () => swiperInstance.value?.slidePrev();
  const slideNext = () => swiperInstance.value?.slideNext();
</script>

<template>
  <div
    class="relative"
    @mouseover="showArrows = true"
    @mouseleave="showArrows = false"
  >
    <swiper
      :slides-per-view="props.slidesPerView"
      :space-between="SPACE_BETWEEN"
      :loop="props.loop"
      :modules="[Navigation, Keyboard]"
      :centered-slides="props.centeredSlides"
      class="!z-[0]"
      :keyboard="{ enabled: true }"
      @swiper="setSwiperController"
      @slide-change="updateEdges"
    >
      <swiper-slide
        v-for="item in props.items"
        :key="item.id"
        :class="{ '!w-auto': props.slidesPerView === 'auto' }"
        v-slot="{ isActive }"
      >
        <slot
          :item="item"
          :is-active="!!isActive"
        />
      </swiper-slide>
    </swiper>
    <button
      v-show="props.alwaysShowArrows || showArrows"
      type="button"
      class="absolute top-1/2 -translate-y-1/2 h-10 w-10 bg-grayLight shadow-xl hover:bg-white/90 rounded-full flex items-center justify-center p-2 mx-3 transition-all z-[2] cursor-pointer left-0"
      :class="isBeginning ? 'pointer-events-none opacity-0' : ''"
      @click="slidePrev"
    >
      <svg
        class="h-6 w-6"
        viewBox="0 0 320 512"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
        />
      </svg>
    </button>
    <button
      v-show="props.alwaysShowArrows || showArrows"
      type="button"
      class="absolute top-1/2 -translate-y-1/2 h-10 w-10 bg-grayLight shadow-xl hover:bg-white/90 rounded-full flex items-center justify-center p-2 mx-3 transition-all z-[2] cursor-pointer right-0"
      :class="isEnd ? 'pointer-events-none opacity-0' : ''"
      @click="slideNext"
    >
      <svg
        class="h-6 w-6"
        viewBox="0 0 320 512"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
        />
      </svg>
    </button>
  </div>
</template>
