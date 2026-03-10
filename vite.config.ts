import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const host = env.VITE_DEV_SERVER_HOST || '0.0.0.0'
  const port = Number(env.VITE_DEV_SERVER_PORT) || 4002
  const proxyTarget = env.VITE_API_PROXY_TARGET || env.VITE_API_BASE_URL

  return {
    plugins: [react()],
    server: {
      host,
      port,
      strictPort: false,
      proxy: proxyTarget
        ? {
            '/Auths': proxyTarget,
          }
        : undefined,
    },
  }
})

