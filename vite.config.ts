import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { VexipUIResolver } from '@vexip-ui/plugins';
import postcsspxtoviewport from 'postcss-px-to-viewport';

// https://vitejs.dev/config/
const viteConfig = defineConfig(async (mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd());
  return {
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
    css: {
      postcss: {
        plugins: [
          postcsspxtoviewport({
            unitToConvert: 'px', // 要转化的单位
            viewportWidth: 1920, // UI设计稿的宽度
            unitPrecision: 6, // 转换后的精度，即小数点位数
            propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
            minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            landscape: false, // 是否处理横屏情况
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});

export default viteConfig;
