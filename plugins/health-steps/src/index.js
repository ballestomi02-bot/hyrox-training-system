import { registerPlugin } from '@capacitor/core';
export const HealthSteps = registerPlugin('HealthSteps', {
  web: () => import('./web.js').then(module => new module.HealthStepsWeb())
});
