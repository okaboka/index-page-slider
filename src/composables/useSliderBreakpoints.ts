import {
  breakpointsTailwind,
  createSharedComposable,
  useBreakpoints,
} from '@vueuse/core';

export const useSliderBreakpoints = createSharedComposable(() => {
  const breakpoints = useBreakpoints(breakpointsTailwind);

  return {
    smPoint: breakpoints.smaller('sm'),
    lgPoint: breakpoints.smaller('lg'),
    xl2Point: breakpoints.smaller('2xl'),
  };
});
