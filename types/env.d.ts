/// <reference types="vite/client" />


interface ImportMetaEnv {
  //.env
  readonly VITE_APP_TITLE: string
  readonly VITE_PORT: number
  readonly VITE_OPEN: string
  //.env.[mode]
  readonly VITE_DEV: string
  readonly VITE_BASE_URL: string
  readonly VITE_OUT_DIR: string
  readonly VITE_DROP_DEBUGGER: string
  readonly VITE_DROP_CONSOLE: string
  readonly VITE_SOURCEMAP: string
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
