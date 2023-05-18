import type { App } from 'vue';
import { Message, Confirm, Contextmenu, Loading, Notice, Toast } from 'vexip-ui';
import BaseCard from '@/components/BaseCard.vue';
import TableLayout from '@/components/TableLayout.vue';

export const setupGlobalComponents = (app: App<Element>) => {
  app.component('BaseCard', BaseCard);
  app.component('TableLayout', TableLayout);
  app.use(Message);
  app.use(Confirm);
  app.use(Contextmenu);
  app.use(Loading);
  app.use(Notice);
  app.use(Toast);
};
