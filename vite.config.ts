import {resolve} from 'path'
import type {ConfigEnv, UserConfig} from 'vite'
import {loadEnv} from 'vite'
import {createVitePlugins} from './config/vite'

// 当前执行node命令时文件夹的地址(工作目录)
const root = process.cwd()

const pathResolve = (dir: string) => {
  return resolve(root, '.', dir)
}
// https://vite.dev/config/
export default ({command, mode}: ConfigEnv): UserConfig => {
  let env = {} as any
  const isBuild = command === 'build'

  if (!isBuild) {
    env = loadEnv((process.argv[3] === '--mode' ? process.argv[4] : process.argv[3]), root)
  } else {
    env = loadEnv(mode, root)
  }
  return {
    base: env.VITE_BASE_PATH,
    root: root,
    // 服务端渲染
    server: {
      port: env.VITE_PORT, // 端口号
      host: '0.0.0.0',
      open: env.VITE_OPEN === 'true'
      // 本地跨域代理 默认后端会做跨域处理 请项目组实际情况决定是否开启
      // proxy: {
      //   ['/admin-api']: {
      //     target: env.VITE_BASE_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(new RegExp(`^/admin-api`), ''),
      //   },
      // },
    },
    // 项目使用的vite插件。 单独提取到config/vite/plugin中管理
    plugins: createVitePlugins(),
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.scss', '.css'],
      alias: [
        {
          find: /\@\//,
          replacement: `${pathResolve('src')}/`
        }
      ]
    },
    build: {
      minify: 'terser',
      outDir: env.VITE_OUT_DIR || 'dist',
      sourcemap: env.VITE_SOURCEMAP === 'true' ? 'inline' : false,
      // brotliSize: false,
      terserOptions: {
        compress: {
          drop_debugger: env.VITE_DROP_DEBUGGER === 'true',
          drop_console: env.VITE_DROP_CONSOLE === 'true'
        }
      },
      rollupOptions: {
        output: {
          manualChunks: {
            // echarts: ['echarts'] // 将 echarts 单独打包，参考 https://gitee.com/yudaocode/yudao-ui-admin-vue3/issues/IAB1SX 讨论
          }
        }
      }
    },
  }
}
