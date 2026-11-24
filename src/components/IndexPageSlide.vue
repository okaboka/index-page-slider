<template>
  <div class="">
    <div
      class="flex items-center justify-center max-w-full min-w-0 flex-col relative pb-6 pt-8"
    >
      <div
        ref="titleRef"
        class="truncate sm:max-w-[180px] max-w-[100px] mb-2"
      >
        {{ props.data.name }}
      </div>
      <div
        ref="imageRef"
        class="rounded-lg overflow-hidden relative sm:w-[100px] sm:h-[100px] w-[60px] h-[60px]"
      >
        <img
          v-if="imageLink"
          :src="imageLink"
          :alt="props.data.name"
          loading="lazy"
          class="object-cover w-full h-full"
        />
        <div
          v-else
          class="object-cover w-full h-full bg-gradient-extra-light"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import anime from 'animejs';
  import { computed, onMounted, useTemplateRef, watch } from 'vue';

  import { useSliderBreakpoints } from '@/composables/useSliderBreakpoints';
  import type { INodeApi } from '@/types/INodeApi';

  const props = defineProps<{
    data: INodeApi;
    isActive: boolean;
  }>();

  const ANIMATION_PARAMS = {
    easing: 'linear',
  } as const;

  const { smPoint } = useSliderBreakpoints();
  const imageRef = useTemplateRef<HTMLDivElement>('imageRef');
  const titleRef = useTemplateRef<HTMLElement>('titleRef');

  const imageLink = computed(() => props.data.imageSrc);

  const callAnimation = (immediate = false) =>
    anime
      .timeline(ANIMATION_PARAMS)
      .add({
        targets: imageRef.value ?? undefined,
        duration: immediate ? 0 : 200,
        ...(props.isActive
          ? {
              scale: smPoint.value ? 1.2 : 1.5,
            }
          : {
              scale: 1,
            }),
      })
      .add({
        targets: titleRef.value ?? undefined,
        duration: immediate ? 0 : 50,
        ...(props.isActive
          ? {
              scale: smPoint.value ? 1.2 : 1.5,
              translateY: smPoint.value ? -20 : -30,
              fontWeight: {
                value: 500,
              },
            }
          : {
              translateY: 0,
              fontWeight: 400,
              scale: 1,
            }),
      });

  watch(
    () => props.isActive,
    () => callAnimation(),
  );

  onMounted(() => callAnimation(true));
</script>
