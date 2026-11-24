<template>
  <div class="lg:py-5 py-3 w-full flex items-center justify-between">
    <IndexPageSliderNodesBlockItem
      v-for="(item, index) in props.data"
      :ref="nodesRefs.set"
      :key="index"
      :is-loading="props.isLoading"
      :node="item.node"
      :rubric="item.rubric"
      :class="{
        'justify-start': !lgPoint && index % 2 === 0,
        'justify-end': !lgPoint && index % 2 !== 0,
        'mx-0.5': index !== 0 && index !== props.data.length - 1,
        'mr-0.5': index === 0,
        'ml-0.5': index === props.data.length - 1,
      }"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, watch } from 'vue';

  import { useTemplateRefsList } from '@vueuse/core';

  import { useSliderBreakpoints } from '@/composables/useSliderBreakpoints';
  import type { INodeMainRubric } from '@/types/INodeMainRubric';
  import IndexPageSliderNodesBlockItem from './IndexPageSliderNodesBlockItem.vue';

  const props = defineProps<{
    data: {
      rubric: string;
      node: INodeMainRubric['nodes'][number];
    }[];
    isLoading: boolean;
  }>();

  const { lgPoint } = useSliderBreakpoints();
  const nodesRefs =
    useTemplateRefsList<
      InstanceType<typeof IndexPageSliderNodesBlockItem>
    >();

  watch(
    () => props.data.length,
    () => nextTick(() => nodesRefs.value?.forEach((v) => v.update())),
  );

  defineExpose({
    boundings: computed(() =>
      nodesRefs.value?.map((v) => ({
        rubric: v.$el?.dataset?.rubric as string | undefined,
        bounding: v.bounding,
      })),
    ),
  });
</script>
