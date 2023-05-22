import type { App } from 'vue';
import { ElLoading, ElScrollbar, ElMessage } from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

const plugins = [ElLoading, ElMessage];

const components = [ElScrollbar];

export const setupElementPlusIcon = (app: App<Element>) => {
  plugins.forEach(plugin => {
    app.use(plugin);
  });

  components.forEach(component => {
    app.component(component.name, component);
  });

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

  app.config.globalProperties.$message = ElMessage;
};
