<template>
  <div
    :data-rubric="props.data.id"
    ref="rubricRef"
    class="min-w-0"
  >
    <div
      class="sm:px-3 px-2 sm:py-2 py-1 sm:text-[16px] text-xs font-medium border rounded-lg bg-successLight border-gray/20 min-w-0 max-sm:truncate"
    >
      {{ props.data.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, useTemplateRef } from 'vue';

  import { useElementBounding } from '@vueuse/core';

  import type { ISliderRubric } from '@/types/ISliderRubric';

  const props = defineProps<{
    data: ISliderRubric;
  }>();

  const rubricRef = useTemplateRef<HTMLDivElement>('rubricRef');
  const bounding = useElementBounding(rubricRef);

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
