// vite-env.d.ts
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  VITE_OPENWEATHER_API_KEY: string
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
