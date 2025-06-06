import { resolve } from 'path';
import { ConfigEnv, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react-swc';
import legacy from '@vitejs/plugin-legacy';
import { createHtmlPlugin } from 'vite-plugin-html';

import postcssPresetEnv from 'postcss-preset-env';
import postcssFlexBugsFixes from 'postcss-flexbugs-fixes';
import tailwindcss from '@tailwindcss/vite';

const { dependencies, version } = require('./package.json');

let proxy: any = {};
try {
  proxy = require('./vite.config.proxy.ts').default;
} catch (error) {
  // do nothing
}

const serverConfig = {
  port: 3010,
  // proxy: {
  //   '/api': {
  //     ws: false,
  //     target: 'https://xxx/',
  //     changeOrigin: true
  //   }
  // },
  cors: {
    origin: '*'
  },
  ...proxy
};

const reactDeps = [
  'react',
  'react-dom',
  'react-i18next',
  'i18next',
  'i18next-browser-languagedetector',
  'valtio',
  'iconoir-react',
  'classnames',
  'tailwindcss'
];
// const utilsDeps = [];

const manualChunks = {
  'react-bundle': reactDeps,
  // 'utils-bundle': utilsDeps,
  ...Object.keys(dependencies).reduce((chunks: any, name) => {
    if (![...reactDeps].includes(name)) {
      chunks[name] = [name];
    }
    return chunks;
  }, {})
};

export default ({ mode, command }: ConfigEnv): UserConfigExport => {
  return {
    build: {
      manifest: true,
      chunkSizeWarningLimit: 768,
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks: manualChunks
        }
      }
    },
    css: {
      modules: {
        localsConvention: 'dashesOnly'
      },
      postcss: {
        plugins: [
          postcssFlexBugsFixes() as any,
          postcssPresetEnv({
            autoprefixer: {
              flexbox: 'no-2009',
              grid: 'autoplace'
            },
            stage: 3,
            features: {
              'custom-properties': false
            }
          })
        ]
      },
      preprocessorOptions: {
        less: {
          // modifyVars: {
          //   hack: `true; @import "@/styles/themes/default.less";\n`
          // },
          javascriptEnabled: true
        }
      }
    },
    define: {
      __APP_ENV__: JSON.stringify(`${mode}`),
      // __APP_BACKEND__: JSON.stringify(`${process.env.__APP_BACKEND__ || ''}`),
      __APP_VERSION__: JSON.stringify(`v${version}`)
    },
    esbuild: {
      drop: ['console', 'debugger']
    },
    resolve: {
      alias: [
        // { find: /^~/, replacement: '' },
        { find: /^@\//, replacement: resolve(__dirname, '.', 'src') + '/' }
      ]
    },
    server: serverConfig,
    preview: { ...serverConfig, port: 8080 },
    plugins: [
      react(),
      tailwindcss(),
      createHtmlPlugin({
        inject: {
          data: {
            injectCss: '',
            injectScript:
              mode === 'development'
                ? ''
                : `<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "2fe7181efcb243be9bfe48ecb3627eb0"}'></script><!-- End Cloudflare Web Analytics -->`
          }
        },
        minify: true
      }),
      legacy({
        targets: ['defaults', 'ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        polyfills: ['es.promise.finally', 'es/index'],
        modernPolyfills: ['es.promise.finally', 'es/index']
      })
    ]
  };
};
