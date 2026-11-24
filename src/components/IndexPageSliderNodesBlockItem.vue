<template>
  <div
    :data-rubric="props.rubric"
    class="flex flex-col items-center lg:h-52 sm:h-36 h-30 sm:w-24 w-16 min-w-0"
  >
    <div
      ref="nodeRef"
      class="w-full lg:h-2/3 h-full"
    >
      <Skeleton v-if="props.isLoading" />
      <div
        v-else-if="props.node"
        class="flex flex-col items-center gap-1 w-full h-full"
      >
        <div
          class="sm:h-20 sm:w-20 h-14 w-14 shrink-0 overflow-hidden rounded-xl"
        >
          <img
            v-if="imageSrc"
            :src="imageSrc"
            :alt="props.node.name"
            loading="lazy"
            class="object-cover w-full h-full"
          />
          <div
            v-else
            class="object-cover w-full h-full bg-gradient-extra-light"
          />
        </div>
        <div class="line-clamp-3 text-sm text-center max-w-full min-w-0">
          {{ props.node.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, useTemplateRef } from 'vue';

  import { useElementBounding } from '@vueuse/core';

  import type { INodeMainRubric } from '@/types/INodeMainRubric';
  import Skeleton from './Skeleton.vue';

  const props = defineProps<{
    node: INodeMainRubric['nodes'][number];
    rubric: string;
    isLoading: boolean;
  }>();

  const nodeRef = useTemplateRef<HTMLDivElement>('nodeRef');
  const bounding = useElementBounding(nodeRef);

  const imageSrc = computed(() => props.node.mainImageSrc);

  defineExpose({
    bounding: computed(() => ({
      left: bounding.left.value,
      width: bounding.width.value,
      bottom: bounding.bottom.value,
      top: bounding.top.value,
    })),
    update: () => bounding.update(),
  });
</script>
