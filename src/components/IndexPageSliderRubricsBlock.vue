<template>
  <div class="py-5 flex justify-between w-full max-w-full min-w-0 gap-0.5">
    <IndexPageSliderRubricsBlockItem
      v-for="rubric in props.data"
      :key="rubric.id"
      :ref="rubricsRefs.set"
      :data="rubric"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, watch } from 'vue';

  import { useTemplateRefsList } from '@vueuse/core';

  import type { ISliderRubric } from '@/types/ISliderRubric';
  import IndexPageSliderRubricsBlockItem from './IndexPageSliderRubricsBlockItem.vue';

  const props = defineProps<{
    data: ISliderRubric[];
  }>();

  const rubricsRefs =
    useTemplateRefsList<
      InstanceType<typeof IndexPageSliderRubricsBlockItem>
    >();

  watch(
    () => props.data.length,
    () => nextTick(() => rubricsRefs.value?.forEach((v) => v.update())),
  );

  defineExpose({
    boundings: computed(() =>
      rubricsRefs.value?.map((v) => ({
        rubric: v.$el?.dataset?.rubric as string | undefined,
        bounding: v.bounding,
      })),
    ),
  });
</script>
