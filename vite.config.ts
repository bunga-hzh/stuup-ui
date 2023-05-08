import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { VexipUIResolver } from '@vexip-ui/plugins';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VexipUIResolver()],
    }),
    AutoImport({
      vueTemplate: true,
      resolvers: [VexipUIResolver()],
      imports: [
        {
          '@vexip-ui/icons': Object.keys(await import('@vexip-ui/icons'))
            // 使通过变量使用的图标类组件的名称也具有 'I' 前缀
            .map(name => (name.match(/^I[0-9]/) ? name : [name, `I${name}`])),
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
