import { defineConfig, loadEnv } from 'vite'
import path from 'path';
import react from '@vitejs/plugin-react'

// Utility: figure out which app folder was passed in CLI
function getAppRoot() {
  const appArg = process.argv.find(arg => arg.startsWith("apps/"));
  return appArg ? path.resolve(__dirname, appArg) : path.resolve(__dirname, 'apps/default');
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const appRoot = getAppRoot();

  // Load env vars from monorepo root + app folder
  const env = {
    ...loadEnv(mode, process.cwd()),
    ...loadEnv(mode, appRoot),
  };

  return {
    root: appRoot,
    plugins: [react()],
    envPrefix: 'VITE_',
    define: {
      __APP_ENV__: JSON.stringify(env),
    },
    server: {
      port: 5173,
    }
  }
});
