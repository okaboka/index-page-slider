import { type Ref, computed } from 'vue';

import { useElementBounding } from '@vueuse/core';

type TLinePoint = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

type TBounding = {
  left: number;
  width: number;
  bottom: number;
  top: number;
};

type TElRef = HTMLElement | undefined | null;

type TPair = {
  parent?: TBounding;
  children: TBounding[];
};

export const useSliderLines = (wrapper: Ref<TElRef>, pairs: Ref<TPair[]>) => {
  const wrapperBounding = useElementBounding(wrapper);

  const getBottomCenter = (elBounding?: TBounding) => {
    return {
      x:
        (elBounding?.left ?? 0) +
        (elBounding?.width ?? 0) / 2 -
        wrapperBounding.left.value,
      y: (elBounding?.bottom ?? 0) - wrapperBounding.top.value,
    };
  };

  const getTopCenter = (elBounding: TBounding) => {
    return {
      x: elBounding.left + elBounding.width / 2 - wrapperBounding.left.value,
      y: elBounding.top - wrapperBounding.top.value,
    };
  };

  const getPairLines = (pair: TPair) => {
    const topCenters = pair.children.map((v) => getTopCenter(v));
    const bottomCenter = getBottomCenter(pair.parent);

    return topCenters.map((v) => ({
      x1: bottomCenter.x,
      y1: bottomCenter.y,
      x2: v.x,
      y2: v.y,
    }));
  };

  const lines = computed((): TLinePoint[] => {
    return pairs.value
      .map((pair) => getPairLines(pair))
      .reduce<TLinePoint[]>((acc, cur) => {
        acc.push(...cur);

        return acc;
      }, []);
  });

  return lines;
};
