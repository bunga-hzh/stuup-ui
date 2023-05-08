import type { App } from 'vue';
import BaseCard from '@/components/BaseCard.vue';

export const setupGlobalComponents = (app: App<Element>) => {
  app.component('BaseCard', BaseCard);
};
