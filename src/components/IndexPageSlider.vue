<template>
  <div
    ref="wrapperRef"
    class="relative w-full flex flex-col items-center"
  >
    <IndexPageSliderPathes
      v-if="topNodes.length || bottomNodes.length"
      :key="activeSlide"
      :lines="lines"
      class="absolute top-0 left-0 w-full h-full pointer-events-none z-1"
    />

    <IndexPageSliderNodesBlock
      v-if="lgPoint"
      ref="nodesTopBlockRef"
      :key="activeSlide"
      :data="topNodes"
      :is-loading="isLoading"
      class="lg:mb-8 mb-4"
    />

    <IndexPageSliderRubricsBlock
      v-if="lgPoint"
      ref="rubricsTopBlockRef"
      :key="activeSlide"
      :data="topRubrics"
      class="lg:mb-8 mb-4"
    />

    <div
      ref="sliderContainerRef"
      class="max-w-full xl:w-[680px] mb-4"
    >
      <CarouselSlider
        always-show-arrows
        :items="mockSlides"
        :slides-per-view="3"
        centered-slides
        loop
      >
        <template #default="{ item, isActive }">
          <IndexPageSlide
            :ref="
              () => {
                if (isActive) activeSlide = item.id;
              }
            "
            :data="item"
            :is-active="isActive"
          />
        </template>
      </CarouselSlider>
    </div>

    <IndexPageSliderRubricsBlock
      ref="rubricsBottomRef"
      :key="activeSlide"
      :data="bottomRubrics"
      class="lg:mt-8 mt-4"
    />

    <IndexPageSliderNodesBlock
      ref="nodesBottomBlockRef"
      :key="activeSlide"
      :data="bottomNodes"
      :is-loading="isLoading"
      class="lg:mt-8 mt-4"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, useTemplateRef, watch } from 'vue';

  import {
    useElementBounding,
    useResizeObserver,
    useTimeoutFn,
  } from '@vueuse/core';

  import CarouselSlider from '@/components/CarouselSlider.vue';
  import IndexPageSlide from '@/components/IndexPageSlide.vue';
  import IndexPageSliderNodesBlock from '@/components/IndexPageSliderNodesBlock.vue';
  import IndexPageSliderPathes from '@/components/IndexPageSliderPathes.vue';
  import IndexPageSliderRubricsBlock from '@/components/IndexPageSliderRubricsBlock.vue';
  import { useSliderBreakpoints } from '@/composables/useSliderBreakpoints';
  import { useSliderLines } from '@/composables/useSliderLines';
  import {
    MOCK_RUBRIC_DEFINITIONS,
    getMockMainRubrics,
    mockSlides,
  } from '@/mocks/sliderData';
  import type { INodeMainRubric } from '@/types/INodeMainRubric';
  import type { ISliderRubric } from '@/types/ISliderRubric';

  const { lgPoint, xl2Point } = useSliderBreakpoints();

  const wrapperRef = useTemplateRef<HTMLDivElement>('wrapperRef');
  const sliderContainerRef = useTemplateRef<HTMLDivElement>(
    'sliderContainerRef',
  );

  const rubricsTopBlockRef =
    useTemplateRef<InstanceType<typeof IndexPageSliderRubricsBlock>>(
      'rubricsTopBlockRef',
    );
  const rubricsBottomRef =
    useTemplateRef<InstanceType<typeof IndexPageSliderRubricsBlock>>(
      'rubricsBottomRef',
    );
  const nodesTopBlockRef =
    useTemplateRef<InstanceType<typeof IndexPageSliderNodesBlock>>(
      'nodesTopBlockRef',
    );
  const nodesBottomBlockRef = useTemplateRef<
    InstanceType<typeof IndexPageSliderNodesBlock>
  >('nodesBottomBlockRef');

  const sliderBounding = useElementBounding(sliderContainerRef);
  useResizeObserver(wrapperRef, () => sliderBounding.update());

  const LOADING_DELAY = 500;

  const isLoading = ref(false);
  const activeSlide = ref<string>(mockSlides[0]?.id ?? '');

  const { start: startLoadingTimer } = useTimeoutFn(
    () => {
      isLoading.value = false;
    },
    LOADING_DELAY,
    { immediate: false },
  );

  watch(activeSlide, () => {
    isLoading.value = true;
    startLoadingTimer();
  });

  const rubricSettings = computed<ISliderRubric[]>(() => {
    const childrenCounts = [
      1,
      xl2Point.value ? 1 : 2,
      1,
      1,
      xl2Point.value ? 1 : 2,
      xl2Point.value ? 1 : 2,
      xl2Point.value ? 1 : 2,
      1,
    ] as const;

    return MOCK_RUBRIC_DEFINITIONS.map((rubric, index) => ({
      ...rubric,
      childrenCount: childrenCounts[index] ?? 1,
    }));
  });

  const mainRubrics = computed(() => getMockMainRubrics(activeSlide.value));

  const rubricNodes = computed(() =>
    rubricSettings.value.reduce<
      { node: INodeMainRubric['nodes'][number]; rubric: string }[]
    >((acc, cur) => {
      const rubricNodesData =
        mainRubrics.value.find((v) => v.id === cur.id)?.nodes ?? [];

      acc.push(
        ...rubricNodesData
          .map((node) => ({
            node,
            rubric: cur.id,
          }))
          .slice(0, cur.childrenCount),
      );

      return acc;
    }, []),
  );

  const topNodes = computed(() =>
    rubricNodes.value.filter((v) =>
      rubricSettings.value.slice(4).find((rs) => rs.id === v.rubric),
    ),
  );

  const bottomNodes = computed(() =>
    lgPoint.value
      ? rubricNodes.value.filter((v) =>
          rubricSettings.value.slice(0, 4).find((rs) => rs.id === v.rubric),
        )
      : rubricNodes.value,
  );

  const topRubrics = computed(() =>
    rubricSettings.value
      .slice(4)
      .filter((v) => !!topNodes.value.find((item) => item.rubric === v.id)),
  );

  const bottomRubrics = computed(() =>
    (lgPoint.value
      ? rubricSettings.value.slice(0, 4)
      : rubricSettings.value
    ).filter((v) => !!bottomNodes.value.find((item) => item.rubric === v.id)),
  );

  const rubricsBoundingsBottom = computed(
    () => rubricsBottomRef.value?.boundings,
  );
  const rubricsBoundingsTop = computed(
    () => rubricsTopBlockRef.value?.boundings,
  );
  const nodesBoundingsBottom = computed(
    () => nodesBottomBlockRef.value?.boundings,
  );
  const nodesBoundingsTop = computed(() => nodesTopBlockRef.value?.boundings);

  const lines = useSliderLines(
    wrapperRef,
    computed(() => [
      ...(nodesBoundingsTop.value?.map(({ rubric, bounding }) => ({
        parent: bounding,
        children:
          rubricsBoundingsTop.value
            ?.filter((v) => v.rubric === rubric)
            ?.map((v) => v.bounding) ?? [],
      })) ?? []),
      ...(rubricsBoundingsTop.value?.map(({ bounding }) => ({
        parent: bounding,
        children: [
          {
            left: sliderBounding.left.value,
            width: sliderBounding.width.value,
            bottom: sliderBounding.bottom.value,
            top: sliderBounding.top.value,
          },
        ],
      })) ?? []),
      {
        parent: {
          left: sliderBounding.left.value,
          width: sliderBounding.width.value,
          bottom: sliderBounding.bottom.value,
          top: sliderBounding.top.value,
        },
        children: rubricsBoundingsBottom.value?.map((v) => v.bounding) ?? [],
      },
      ...(rubricsBoundingsBottom.value?.map(({ rubric, bounding }) => ({
        parent: bounding,
        children:
          nodesBoundingsBottom.value
            ?.filter((v) => v.rubric === rubric)
            ?.map((v) => v.bounding) ?? [],
      })) ?? []),
    ]),
  );
</script>
