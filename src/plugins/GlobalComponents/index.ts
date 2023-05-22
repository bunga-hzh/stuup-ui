import type { App } from 'vue';
import BaseCard from '@/components/BaseCard.vue';
import TableLayout from '@/components/TableLayout.vue';

export const setupGlobalComponents = (app: App<Element>) => {
  app.component('BaseCard', BaseCard);
  app.component('TableLayout', TableLayout);
};
