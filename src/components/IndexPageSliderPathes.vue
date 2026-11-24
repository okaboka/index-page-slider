<template>
  <svg class="">
    <template v-for="line in props.lines">
      <circle
        :cx="line.x1"
        :cy="line.y1"
        r="1.5"
        fill="#E6E3E3"
        stroke="#E6E3E3"
      />
      <path
        :d="createPath(line.x2, line.y2, line.x1, line.y1)"
        pathLength="1"
        stroke="#E6E3E3"
        ref="pathesRefs"
        fill="none"
        stroke-linecap="round"
      />

      <circle
        :cx="line.x2"
        :cy="line.y2"
        r="1.5"
        fill="white"
        stroke="#E6E3E3"
      />
    </template>
  </svg>
</template>

<script setup lang="ts">
  import { onBeforeUnmount, useTemplateRef, watch } from 'vue';

  import { useDebounceFn, useEventListener } from '@vueuse/core';

  const props = defineProps<{
    lines: { x1: number; y1: number; x2: number; y2: number }[];
  }>();

  let timeout: ReturnType<typeof setTimeout> | undefined;

  const pathesRefs = useTemplateRef<SVGPathElement[]>('pathesRefs');

  const createPath = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    curvature = 1,
  ) => {
    const cy1 = y1 + (y2 - y1) * curvature;
    const cy2 = y2 + (y1 - y2) * curvature;

    return `
      M ${x1} ${y1}
      C ${x1} ${cy1},
        ${x2} ${cy2},
        ${x2} ${y2}
    `;
  };

  const animatePath = (immediate = false) =>
    pathesRefs.value?.forEach((path) => {
      const reverse = Math.random() > 0.5;

      path.style.strokeDasharray = '1';

      path.style.strokeDashoffset = reverse ? '-1' : '1';

      path.style.opacity = '0';

      const delay = immediate ? 0 : Math.random() * 200;
      const duration = immediate ? 0 : 300 + Math.random() * 300;

      timeout = setTimeout(() => {
        path.style.transition = `stroke-dashoffset ${duration}ms ease`;

        path.style.strokeDashoffset = '0';
        path.style.opacity = '1';
      }, delay);
    });

  const animatePathDebounced = useDebounceFn(() => animatePath(true), 300);

  watch(pathesRefs, () => animatePath());
  useEventListener(window, 'resize', () => animatePathDebounced());

  onBeforeUnmount(() => clearTimeout(timeout));
</script>
