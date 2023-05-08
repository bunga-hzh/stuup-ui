import type { App } from 'vue';
import * as VexipIcon from '@vexip-ui/icons';

export const setupVexipIcon = (app: App<Element>) => {
  for (const [key, component] of Object.entries(VexipIcon)) {
    app.component(key, component);
  }
};
